import { FruitKey } from "@/shared/assets/fruits";
import { useEffect, useState } from "react";
export const useMemoryGameState = <T>(
  items: T[],
  onPairMatched?: (fruit: FruitKey) => void,
  onMismatch?: () => void,
  onComplete?: () => void
) => {
  const [open, setOpen] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [lock, setLock] = useState(false);

  // 게임 완료
  useEffect(() => {
    if (matched.size === items.length && items.length > 0) {
      onComplete?.();
    }
  }, [matched, items.length, onComplete]);

  // 게임 리셋
  useEffect(() => {
    setOpen([]);
    setMatched(new Set());
    setLock(false);
  }, [items]);

  return {
    open,
    matched,
    lock,
    setOpen,
    setMatched,
    setLock,
  };
};
