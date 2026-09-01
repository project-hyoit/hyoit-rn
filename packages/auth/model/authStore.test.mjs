import assert from "node:assert/strict";
import test from "node:test";

const { useAuthStore } = await import("./authStore.ts?auth-store-persistence-test");

test("auth store exposes persistence for app restarts", () => {
  assert.equal(typeof useAuthStore.persist, "object");
});
