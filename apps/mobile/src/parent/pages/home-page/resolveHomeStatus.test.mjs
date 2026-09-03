import assert from "node:assert/strict";
import test from "node:test";

const module = await import("./resolveHomeStatus.ts").catch(() => ({}));
const { resolveHomeStatus } = module;

const sentItem = (status) => ({ status });

test("prioritizes multiple unread check-ins over sent state", () => {
  assert.equal(typeof resolveHomeStatus, "function");

  assert.equal(
    resolveHomeStatus({
      pendingReceivedCount: 2,
      latestSentItem: sentItem("WAITING_CONFIRM"),
    }),
    "multiple",
  );
});

test("returns received for exactly one unread check-in", () => {
  assert.equal(
    resolveHomeStatus({
      pendingReceivedCount: 1,
      latestSentItem: sentItem("CONFIRMED"),
    }),
    "received",
  );
});

test("returns sent while the latest sent check-in is waiting", () => {
  assert.equal(
    resolveHomeStatus({
      pendingReceivedCount: 0,
      latestSentItem: sentItem("WAITING_CONFIRM"),
    }),
    "sent",
  );
});

test("returns checked after the latest sent check-in is confirmed", () => {
  assert.equal(
    resolveHomeStatus({
      pendingReceivedCount: 0,
      latestSentItem: sentItem("CONFIRMED"),
    }),
    "checked",
  );
});

test("returns empty without unread or sent check-ins", () => {
  assert.equal(
    resolveHomeStatus({
      pendingReceivedCount: 0,
      latestSentItem: null,
    }),
    "empty",
  );
});
