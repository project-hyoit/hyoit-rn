import assert from "node:assert/strict";
import test from "node:test";

const stateModule = await import("./checkInState.ts").catch(() => ({}));
const { createCheckIn, sendCheckIn, markCheckInAsChecked } = stateModule;

const NOW = "2026-09-03T18:00:00.000Z";

const createItem = (overrides = {}) =>
  createCheckIn({
    senderRole: "parent",
    message: "잘 지내고 있어요",
    id: "id-1",
    createdAt: NOW,
    ...overrides,
  });

test("creates a pending check-in for the opposite role", () => {
  const item = createItem();

  assert.equal(item.senderRole, "parent");
  assert.equal(item.receiverRole, "child");
  assert.equal(item.message, "잘 지내고 있어요");
  assert.equal(item.checkedAt, undefined);
});

test("normalizes message text at the domain boundary", () => {
  const item = createItem({ message: "   밥 먹었어?   " });

  assert.equal(item.message, "밥 먹었어?");
});

test("rejects a blank message before creating a check-in", () => {
  const item = createItem({ message: "   " });

  assert.equal(item, null);
});

test("sends a check-in without mutating the previous conversation", () => {
  assert.equal(typeof sendCheckIn, "function");
  const previousItem = createItem({ id: "old" });
  const previousItems = [previousItem];

  const result = sendCheckIn({
    items: previousItems,
    senderRole: "child",
    message: "  잘 있어요  ",
    id: "new",
    createdAt: NOW,
  });

  assert.equal(previousItems.length, 1);
  assert.equal(result.sentItem.id, "new");
  assert.equal(result.sentItem.message, "잘 있어요");
  assert.equal(result.sentItem.receiverRole, "parent");
  assert.deepEqual(result.items.map((item) => item.id), ["new", "old"]);
});

test("does not change conversation when sending a blank message", () => {
  const previousItem = createItem({ id: "old" });
  const previousItems = [previousItem];

  const result = sendCheckIn({
    items: previousItems,
    senderRole: "child",
    message: "   ",
    id: "new",
    createdAt: NOW,
  });

  assert.equal(result.sentItem, null);
  assert.equal(result.items, previousItems);
});

test("only the receiver can confirm a check-in", () => {
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

test("keeps the same array when confirmation is a no-op", () => {
  const item = createItem({ id: "id-3" });
  const items = [item];

  const senderAttempt = markCheckInAsChecked({
    items,
    itemId: "id-3",
    viewerRole: "parent",
    checkedAt: NOW,
  });
  assert.equal(senderAttempt, items);

  const missingAttempt = markCheckInAsChecked({
    items,
    itemId: "missing",
    viewerRole: "child",
    checkedAt: NOW,
  });
  assert.equal(missingAttempt, items);
});
