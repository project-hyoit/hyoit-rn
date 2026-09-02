import assert from "node:assert/strict";
import test from "node:test";

const stateModule = await import("./checkInState.ts").catch(() => ({}));
const { createCheckIn, markCheckInAsChecked } = stateModule;

const NOW = "2026-09-02T18:00:00.000Z";

test("creates a real pending check-in from sender to the opposite role", () => {
  assert.equal(typeof createCheckIn, "function");

  const item = createCheckIn("parent", "잘 지내고 있어요", "id-1", NOW);

  assert.equal(item.senderRole, "parent");
  assert.equal(item.receiverRole, "child");
  assert.equal(item.message, "잘 지내고 있어요");
  assert.equal(item.checkedAt, undefined);
});

test("only the receiver can confirm a check-in", () => {
  assert.equal(typeof markCheckInAsChecked, "function");
  const item = createCheckIn("parent", "밥 잘 먹고 다녀", "id-2", NOW);

  const senderAttempt = markCheckInAsChecked([item], "id-2", "parent", NOW);
  assert.equal(senderAttempt[0].checkedAt, undefined);

  const receiverAttempt = markCheckInAsChecked(
    [item],
    "id-2",
    "child",
    NOW,
  );
  assert.equal(receiverAttempt[0].checkedAt, NOW);
});

test("confirming one check-in does not mutate other records", () => {
  const first = createCheckIn("child", "엄마 잘 지내?", "id-3", NOW);
  const second = createCheckIn("parent", "응 잘 지내", "id-4", NOW);

  const next = markCheckInAsChecked([first, second], "id-3", "parent", NOW);

  assert.equal(next[0].checkedAt, NOW);
  assert.equal(next[1].checkedAt, undefined);
});