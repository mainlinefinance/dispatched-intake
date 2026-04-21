import { assign, setup } from "xstate";
import { estimateMatch } from "./estimateMatch";
import type {
  AmountBand,
  BandTier,
  Contact,
  CreditBand,
  IntakeContext,
  UseCase,
  Vertical,
} from "./types";
import { INITIAL_CONTEXT } from "./types";

export type IntakeEvent =
  | { type: "SELECT_USE_CASE"; value: UseCase }
  | { type: "SELECT_VERTICAL"; value: Vertical }
  | { type: "SELECT_AMOUNT"; amount: number; band: AmountBand }
  | { type: "SELECT_REVENUE"; tier: BandTier }
  | { type: "SELECT_TIB"; tier: BandTier }
  | { type: "SELECT_CREDIT"; value: CreditBand }
  | { type: "CONTINUE" }
  | { type: "SUBMIT_CONTACT"; contact: Contact }
  | { type: "MARK_MATCH_SEEN" }
  | { type: "GO_BACK" };

export type IntakeStateValue =
  | "screen01"
  | "screen02"
  | "screen03"
  | "screen04"
  | "screen05"
  | "screen06"
  | "screen07"
  | "screen08"
  | "submitted";

export const intakeMachine = setup({
  types: {
    context: {} as IntakeContext,
    events: {} as IntakeEvent,
  },
}).createMachine({
  id: "intake",
  initial: "screen01",
  context: INITIAL_CONTEXT,
  states: {
    screen01: {
      on: {
        SELECT_USE_CASE: {
          target: "screen02",
          actions: assign({
            useCase: ({ event }) => event.value,
          }),
        },
      },
    },
    screen02: {
      on: {
        SELECT_VERTICAL: {
          target: "screen03",
          actions: assign({
            vertical: ({ event }) => event.value,
          }),
        },
        GO_BACK: { target: "screen01" },
      },
    },
    screen03: {
      on: {
        SELECT_AMOUNT: {
          target: "screen04",
          actions: assign({
            amount: ({ event }) => event.amount,
            amountBand: ({ event }) => event.band,
          }),
        },
        GO_BACK: { target: "screen02" },
      },
    },
    screen04: {
      on: {
        SELECT_REVENUE: {
          target: "screen05",
          actions: assign({
            revenueTier: ({ event }) => event.tier,
          }),
        },
        GO_BACK: { target: "screen03" },
      },
    },
    screen05: {
      on: {
        SELECT_TIB: {
          target: "screen06",
          actions: assign({
            timeInBusinessTier: ({ event }) => event.tier,
          }),
        },
        GO_BACK: { target: "screen04" },
      },
    },
    screen06: {
      on: {
        SELECT_CREDIT: {
          target: "screen07",
          actions: assign({
            creditBand: ({ event }) => event.value,
          }),
        },
        GO_BACK: { target: "screen05" },
      },
    },
    screen07: {
      entry: assign({
        matchEstimate: ({ context }) => estimateMatch(context),
      }),
      on: {
        CONTINUE: { target: "screen08" },
        MARK_MATCH_SEEN: {
          actions: assign({ hasSeenMatch: true }),
        },
        GO_BACK: { target: "screen06" },
      },
    },
    screen08: {
      on: {
        SUBMIT_CONTACT: {
          target: "submitted",
          actions: assign({
            contact: ({ event }) => event.contact,
          }),
        },
        GO_BACK: { target: "screen07" },
      },
    },
    submitted: {
      type: "final",
    },
  },
});
