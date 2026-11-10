import "server-only";

/* Suppression for outbound email.

   The web service has no database and Render's filesystem is ephemeral,
   so the durable record lives at the provider: an organization-level
   AgentMail block entry for the "send" direction. Once an address is on
   it, AgentMail rejects any later send to that address from any inbox,
   which holds even if the sender script's local state is stale.

   Every request is also written to stdout as a structured line so the
   Render log stream keeps a second, dated trail. */

export type SuppressReason = "unsubscribe" | "bounce" | "complaint" | "reply-opt-out";

export const OPT_OUT_PATTERN =
  /\b(unsubscribe|remove me|take me off|opt[\s-]?out|no thanks|not interested|stop|do not (e-?mail|contact))\b/i;

export async function suppress(email: string, reason: SuppressReason): Promise<void> {
  const entry = email.trim().toLowerCase();
  console.log("[outreach suppress]", JSON.stringify({ email: entry, reason, at: new Date().toISOString() }));

  const apiKey = process.env.AGENTMAIL_API_KEY;
  if (!apiKey) throw new Error("AGENTMAIL_API_KEY is not set; suppression was logged but not enforced");

  const { AgentMailClient } = await import("agentmail");
  const client = new AgentMailClient({ apiKey });
  try {
    await client.lists.create("send", "block", { entry, reason });
  } catch (err) {
    // Already on the list is the outcome we want.
    if ((err as { statusCode?: number }).statusCode === 409) return;
    throw err;
  }
}
