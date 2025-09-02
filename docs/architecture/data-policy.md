# Data Policy Guide (React Query)

## 0) 전제

- RN 환경: `onlineManager` ← NetInfo, `focusManager` ← AppState로 이미 브릿지 연결
- 전역 기본값(권장):
  ```tsx
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000, // 기본 1분
        gcTime: 30 * 60_000, // 30분 후 캐시 정리
        retry: 1, // 실패 1회 재시도
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        refetchOnMount: false,
      },
      mutations: { retry: 0 },
    },
  });
  ```

## 1) 로그인 & 회원가입

### 1-1 로그인 (카카오 OAuth)

- **특성**: 서버 라운드트립 짧음, 캐싱 불필요 → `useMutation`
- **정책**:
  - 로그인 성공 시 토큰은 **HTTP-only 쿠키**(또는 안전한 저장) 사용
  - 성공 후 사용자 최소 정보 프리패치(프로필/가족목록)
- **스니펫**:
  ```tsx
  const login = useMutation({
    mutationFn: kakaoOAuthCallback, // code -> server -> token
    onSuccess: async (_data) => {
      await qc.invalidateQueries({ queryKey: ["profile", "me"] });
      await qc.invalidateQueries({ queryKey: ["family", "list"] });
    },
  });
  ```

## 2) 계정 생성( onboarding )

### 2-1 계정 생성 / 2-2 정보 등록 / 2-3 완료

- **특성**: 단계적 폼 제출 → `useMutation`
- **정책**:
  - 제출 성공 시 다음 스텝으로 이동, 마지막 스텝에서 핵심 데이터 프리패치
  - 실패 시 간단 문구 + 다시 시도 버튼(토스트 남발 금지)
- **스니펫**:
  ```tsx
  const saveGuardian = useMutation({
    mutationFn: postGuardianInfo,
    onSuccess: () => qc.invalidateQueries(["profile", "me"]),
  });

  const saveElder = useMutation({
    mutationFn: postElderInfo,
    onSuccess: () => qc.invalidateQueries(["profile", "me"]),
  });
  ```

## 3) 홈

### 3-1 네비게이션

- **특성**: 정적 라벨/아이콘/뱃지(서버 카운트가 붙을 수 있음)
- **정책**:
  - 정적 메타는 코드 내 상수
  - 뱃지 카운트(예: 알림 수) 만 쿼리: `staleTime: 30s`, 포커스 시 조용히 갱신
- **스니펫**:
  ```tsx
  useQuery({
    queryKey: ["badge", "notifications"],
    queryFn: fetchNotifCount,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
  });
  ```

### 3-2 오늘의 날씨 (외부 Open API)

- **특성**: 실시간성 높음, 외부 API 제한 고려
- **정책(권장)**:
  - `staleTime: 0`(항상 stale), `refetchInterval: 180000`(3분)
  - 위치 변경 시 즉시 재요청
  - 요청 실패율 높으면 interval 늘리기(요금·쿼터 고려)
- **스니펫**:
  ```tsx
  useQuery({
    queryKey: ["weather", location], // {lat,lng} or city
    queryFn: fetchWeather,
    staleTime: 0,
    refetchInterval: 180_000,
    refetchOnReconnect: true,
  });
  ```

### 3-4 대시보드(보호자용: 접속 여부, 게임 누적 등)

- **특성**: 준실시간 통계/요약
- **정책**:
  - `staleTime: 60s`, 포커스 시 조용히 갱신
  - 무의미한 깜빡임 방지: 이전 데이터 유지(`placeholderData` or `keepPreviousData`)
- **스니펫**:
  ```tsx
  useQuery({
    queryKey: ["dashboard", "guardian", elderId],
    queryFn: fetchGuardianDashboard,
    staleTime: 60_000,
    refetchOnWindowFocus: true,
    placeholderData: keepPreviousData,
  });
  ```

## 4) 꿀팁(생활/어르신 관련)

### 4-1 오늘의 꿀팁

- **특성**: 하루 3~4개 랜덤, 실시간성 낮음
- **정책**:
  - `staleTime: 24h`, 재진입 자동 갱신 없음
- **스니펫**:
  ```tsx
  useQuery({
    queryKey: ["dailyTips", userSegment], // 세그먼트별 다를 수 있음
    queryFn: fetchDailyTips,
    staleTime: 24 * 60 * 60_000,
    refetchOnMount: false,
  });
  ```

## 5) 게임(두뇌 퀴즈/카드뒤집기 등)

### 5-1 게임 데이터

- **특성**: 규칙/문항은 거의 정적
- **정책**:
  - 정적 자원은 `staleTime: Infinity`
  - 진행상황(누적 점수/최근 기록)은 `staleTime: 1–5min`
- **스니펫**:
  ```tsx
  // 정적 룰/문항
  useQuery({
    queryKey: ["game", "meta", gameId],
    queryFn: fetchGameMeta,
    staleTime: Infinity,
  });

  // 동적 진행
  useQuery({
    queryKey: ["game", "progress", userId, gameId],
    queryFn: fetchGameProgress,
    staleTime: 5 * 60_000,
  });

  // 점수 기록(낙관적 업데이트)
  const submitScore = useMutation({
    mutationFn: postScore,
    onMutate: async (newScore) => {
      await qc.cancelQueries({
        queryKey: ["game", "progress", userId, gameId],
      });
      const prev = qc.getQueryData(["game", "progress", userId, gameId]);
      qc.setQueryData(
        ["game", "progress", userId, gameId],
        optimisticAddScore(prev, newScore)
      );
      return { prev };
    },
    onError: (_e, _v, ctx) =>
      qc.setQueryData(["game", "progress", userId, gameId], ctx?.prev),
    onSettled: () =>
      qc.invalidateQueries({ queryKey: ["game", "progress", userId, gameId] }),
  });
  ```

## 6) 챗봇(OpenAI API)

### 6-1 대화

- **특성**: 요청마다 응답 다름, 캐싱 불필요
- **정책**:
  - `useMutation`으로 전송/응답
  - 실패 시 간단 문구, 재시도 버튼
- **스니펫**:
  ```tsx
  const sendMessage = useMutation({
    mutationFn: chatWithAI, // {history, input} -> {reply}
    onError: () => toast("답변을 불러오지 못했어요"),
  });
  ```

## 7) 프로필

### 7-1 카카오 계정 정보 표시

- **특성**: 사용자 기본 정보(변경 드묾)
- **정책**:
  - 보기: `staleTime: 5m`, 재진입 자동 갱신 없음
  - 수정: 성공 시 invalidate
- **스니펫**:
  ```tsx
  const { data: me } = useQuery({
    queryKey: ["profile", "me"],
    queryFn: fetchMe,
    staleTime: 5 * 60_000,
  });

  const updateMe = useMutation({
    mutationFn: patchMe,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["profile", "me"] }),
  });
  ```

### 7-2 음성지원(TTS) on/off 토글

- **특성**: 즉시 피드백 필요, 서버/로컬 동시 반영 가능
- **정책**:
  - 낙관적 업데이트로 즉시 토글 반영
- **스니펫**:
  ```tsx
  const toggleTTS = useMutation({
    mutationFn: setTTSOption,
    onMutate: async (enabled: boolean) => {
      await qc.cancelQueries({ queryKey: ["profile", "me"] });
      const prev = qc.getQueryData(["profile", "me"]);
      qc.setQueryData(["profile", "me"], (old) => ({
        ...old,
        ttsEnabled: enabled,
      }));
      return { prev };
    },
    onError: (_e, _v, ctx) => qc.setQueryData(["profile", "me"], ctx?.prev),
    onSettled: () => qc.invalidateQueries({ queryKey: ["profile", "me"] }),
  });
  ```

### 7-3 로그아웃

- **특성**: 세션 종료
- **정책**:
  - 쿠키/스토리지 정리, 민감 쿼리 캐시 **remove** 혹은 reset
- **스니펫**:
  ```tsx
  const logout = useMutation({
    mutationFn: apiLogout,
    onSuccess: () => {
      qc.removeQueries({ queryKey: ["profile"] });
      qc.removeQueries({ queryKey: ["family"] });
      // 필요 시 qc.clear() 고려
    },
  });
  ```

## 8) TTS (모든 페이지 공통)

### 8-1 음성지원

- **특성**: 네트워크 무관, 로컬 기능
- **정책**:
  - 서버 요청 없음. UI 문구를 짧고 명확하게 유지
  - 버튼 길게 누르면(2초) 읽어주기 등 접근성 패턴 일관화
- **스니펫**:
  ```tsx
  // React Query 관여 없음. UI/상태 로컬 관리
  ```

## 9) 가족 구성원 관리

### 9-1 구성원 목록/프로필 관리

- **특성**: 목록 + 개별 CRUD
- **정책**:
  - 목록: `staleTime: 2m`, 포커스 시 조용히 갱신
  - 추가/삭제/수정: 낙관적 업데이트 → 실패 시 되돌리기
- **스니펫**:
  ```tsx
  // 목록
  useQuery({
    queryKey: ["family", "list", userId],
    queryFn: fetchFamilyList,
    staleTime: 2 * 60_000,
    refetchOnWindowFocus: true,
    placeholderData: keepPreviousData,
  });

  // 추가
  const addMember = useMutation({
    mutationFn: postMember,
    onMutate: async (newMember) => {
      await qc.cancelQueries({ queryKey: ["family", "list", userId] });
      const prev = qc.getQueryData(["family", "list", userId]);
      qc.setQueryData(
        ["family", "list", userId],
        optimisticAdd(prev, newMember)
      );
      return { prev };
    },
    onError: (_e, _v, ctx) =>
      qc.setQueryData(["family", "list", userId], ctx?.prev),
    onSettled: () =>
      qc.invalidateQueries({ queryKey: ["family", "list", userId] }),
  });

  // 삭제
  const removeMember = useMutation({
    mutationFn: deleteMember,
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ["family", "list", userId] });
      const prev = qc.getQueryData(["family", "list", userId]);
      qc.setQueryData(["family", "list", userId], optimisticRemove(prev, id));
      return { prev };
    },
    onError: (_e, _v, ctx) =>
      qc.setQueryData(["family", "list", userId], ctx?.prev),
    onSettled: () =>
      qc.invalidateQueries({ queryKey: ["family", "list", userId] }),
  });
  ```

---

## A. 에러/오프라인 UX 공통 규칙

- **로딩**: 스켈레톤 3~5개 고정, 스피너 최소화
- **실패**: “연결이 원활하지 않아요” + “다시 시도” 버튼 1개
- **오프라인**: 상단 배지 “오프라인 · 저장된 내용 표시 중”
- **재연결**: 조용히 동기화. 데이터 변화가 크면 상단 스낵바 “내용이 업데이트됐어요”

## B. 키( queryKey ) 규칙

- `[도메인, 리소스, 식별자?, 파라미터?]`
  - `['profile','me']`
  - `['family','list', userId]`
  - `['weather', {lat, lng}]`
  - `['game','progress', userId, gameId]`

## C. 접근성(어르신 친화) 체크리스트

- 버튼 크기/간격 충분(48dp 이상)
- 로딩/실패 문구 **짧고 큰 글씨**
- 깜빡임 최소화(placeholder/keepPreviousData 활용)
- 토스트는 핵심 작업에만, 1회 제한
- 뒤로 가기 시 스크롤/선택 상태 유지
