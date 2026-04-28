import { describe, expect, it } from "vitest";
import { createActor } from "xstate";
import { intakeMachine } from "@/lib/machine";

function walkToScreen07(amount = 95000, credit: "720+" | "under-580" = "720+") {
  const actor = createActor(intakeMachine).start();
  actor.send({ type: "SELECT_USE_CASE", value: "repairs" });
  actor.send({ type: "SELECT_VERTICAL", value: "owner-operator" });
  actor.send({ type: "SELECT_AMOUNT", amount, band: "custom" });
  actor.send({ type: "SELECT_REVENUE", tier: 3 });
  actor.send({ type: "SELECT_TIB", tier: 4 });
  actor.send({ type: "SELECT_CREDIT", value: credit });
  return actor;
}

describe("intakeMachine", () => {
  it("happy path reaches submitted with populated context", () => {
    const actor = walkToScreen07();
    expect(actor.getSnapshot().value).toBe("screen07");

    actor.send({ type: "CONTINUE" });
    expect(actor.getSnapshot().value).toBe("screen08");

    actor.send({
      type: "SUBMIT_CONTACT",
      contact: {
        name: "Marcus Holloway",
        mobile: "(405) 318-2740",
        email: "marcus@hollowayfreight.com",
      },
    });

    const snapshot = actor.getSnapshot();
    expect(snapshot.value).toBe("submitted");
    expect(snapshot.status).toBe("done");
    expect(snapshot.context.contact?.name).toBe("Marcus Holloway");
  });

  it("GO_BACK preserves context values", () => {
    const actor = createActor(intakeMachine).start();
    actor.send({ type: "SELECT_USE_CASE", value: "repairs" });
    actor.send({ type: "SELECT_VERTICAL", value: "owner-operator" });
    actor.send({ type: "SELECT_AMOUNT", amount: 50000, band: "preset-low" });
    expect(actor.getSnapshot().value).toBe("screen04");

    actor.send({ type: "GO_BACK" });
    expect(actor.getSnapshot().value).toBe("screen03");
    expect(actor.getSnapshot().context.amount).toBe(50000);
    expect(actor.getSnapshot().context.amountBand).toBe("preset-low");

    actor.send({ type: "GO_BACK" });
    expect(actor.getSnapshot().value).toBe("screen02");
    expect(actor.getSnapshot().context.vertical).toBe("owner-operator");
    expect(actor.getSnapshot().context.useCase).toBe("repairs");

    actor.send({ type: "GO_BACK" });
    expect(actor.getSnapshot().value).toBe("screen01");
    expect(actor.getSnapshot().context.useCase).toBe("repairs");
  });

  it("GO_BACK on screen01 is a no-op (no reverse transition defined)", () => {
    const actor = createActor(intakeMachine).start();
    actor.send({ type: "GO_BACK" });
    expect(actor.getSnapshot().value).toBe("screen01");
  });

  it("entry to screen07 computes matchEstimate", () => {
    const actor = walkToScreen07();
    const snapshot = actor.getSnapshot();
    expect(snapshot.context.matchEstimate).toMatchObject({
      tier: "A",
      lenderCount: 7,
      rangeLow: 61750,
      rangeHigh: 118750,
    });
  });

  it("recomputes matchEstimate when returning to screen07 with new credit", () => {
    const actor = walkToScreen07(80000, "720+");
    expect(actor.getSnapshot().context.matchEstimate?.tier).toBe("A");

    actor.send({ type: "GO_BACK" });
    expect(actor.getSnapshot().value).toBe("screen06");
    actor.send({ type: "SELECT_CREDIT", value: "under-580" });
    expect(actor.getSnapshot().value).toBe("screen07");
    expect(actor.getSnapshot().context.matchEstimate?.tier).toBe("B");
  });

  it("MARK_MATCH_SEEN sets hasSeenMatch to true and stays true across back-nav", () => {
    const actor = walkToScreen07();
    expect(actor.getSnapshot().context.hasSeenMatch).toBe(false);

    actor.send({ type: "MARK_MATCH_SEEN" });
    expect(actor.getSnapshot().context.hasSeenMatch).toBe(true);

    actor.send({ type: "GO_BACK" });
    actor.send({ type: "SELECT_CREDIT", value: "580-650" });
    expect(actor.getSnapshot().value).toBe("screen07");
    expect(actor.getSnapshot().context.hasSeenMatch).toBe(true);
  });

  it("initial context fields are all null / false", () => {
    const actor = createActor(intakeMachine).start();
    const ctx = actor.getSnapshot().context;
    expect(ctx.useCase).toBeNull();
    expect(ctx.vertical).toBeNull();
    expect(ctx.amount).toBeNull();
    expect(ctx.amountBand).toBeNull();
    expect(ctx.revenueTier).toBeNull();
    expect(ctx.timeInBusinessTier).toBeNull();
    expect(ctx.creditBand).toBeNull();
    expect(ctx.matchEstimate).toBeNull();
    expect(ctx.contact).toBeNull();
    expect(ctx.hasSeenMatch).toBe(false);
  });

  it("prefill: useCase + vertical + amount lands on screen04 with all three set", () => {
    const actor = createActor(intakeMachine).start();
    actor.send({ type: "SELECT_USE_CASE", value: "fuel" });
    actor.send({ type: "SELECT_VERTICAL", value: "owner-operator" });
    actor.send({ type: "SELECT_AMOUNT", amount: 75000, band: "custom" });
    expect(actor.getSnapshot().value).toBe("screen04");
    expect(actor.getSnapshot().context.useCase).toBe("fuel");
    expect(actor.getSnapshot().context.vertical).toBe("owner-operator");
    expect(actor.getSnapshot().context.amount).toBe(75000);
  });

  it("prefill: only useCase lands on screen02", () => {
    const actor = createActor(intakeMachine).start();
    actor.send({ type: "SELECT_USE_CASE", value: "equipment" });
    expect(actor.getSnapshot().value).toBe("screen02");
  });

  it("prefill: useCase + vertical lands on screen03", () => {
    const actor = createActor(intakeMachine).start();
    actor.send({ type: "SELECT_USE_CASE", value: "bridge" });
    actor.send({ type: "SELECT_VERTICAL", value: "small-fleet" });
    expect(actor.getSnapshot().value).toBe("screen03");
  });
});
