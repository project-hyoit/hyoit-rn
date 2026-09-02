import assert from "node:assert/strict";
import test from "node:test";

const stateModule = await import("./checkInState.ts").catch(() => ({}));
const { createCheckIn, markCheckInAsChecked } = stateModule;

const NOW = "2026-09-03T18:00:00.000Z";

const createItem = (overrides = {}) =>
  createCheckIn({
    senderRole: "parent",
    message: "잘 지내고 있어요",
    id: "id-1",
    createdAt: NOW,
    ...overrides,
  });

test("creates a real pending check-in from sender to the opposite role", () => {
  assert.equal(typeof createCheckIn, "function");

  const item = createItem();

  assert.equal(item.senderRole, "parent");
  assert.equal(item.receiverRole, "child");
  assert.equal(item.message, "잘 지내고 있어요");
  assert.equal(item.checkedAt, undefined);
});
test("only the receiver can confirm a check-in", () => {
  assert.equal(typeof markCheckInAsChecked, "function");
  const item = createItem({ id: "id-2" });

  const senderAttempt = markCheckInAsChecked({
    items: [item],
    itemId: "id-2",
    viewerRole: "parent",
    checkedAt: NOW,
  });
  assert.equal(senderAttempt[0].checkedAt, undefined);

  const receiverAttempt = markCheckInAsChecked({
    items: [item],
    itemId: "id-2",
    viewerRole: "child",
    checkedAt: NOW,
  });
  assert.equal(receiverAttempt[0].checkedAt, NOW);
});
test("confirming one check-in does not mutate other records", () => {
  const first = createItem({ senderRole: "child", id: "id-3" });
  const second = createItem({ id: "id-4" });

  const next = markCheckInAsChecked({
    items: [first, second],
    itemId: "id-3",
    viewerRole: "parent",
    checkedAt: NOW,
  });

  assert.equal(next[0].checkedAt, NOW);
  assert.equal(next[1].checkedAt, undefined);
});
