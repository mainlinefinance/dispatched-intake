"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AsYouType } from "libphonenumber-js";
import { useState } from "react";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import QaPair from "@/components/chat/QaPair";
import SystemBubble from "@/components/chat/SystemBubble";
import TypingIndicator from "@/components/chat/TypingIndicator";
import { useTypingDelay } from "@/components/chat/useTypingDelay";
import { SCREEN8 } from "@/lib/copy";
import {
  ContactSchema,
  type ContactInput,
  type IntakePayload,
} from "@/lib/validation";

type Props = {
  payloadBase: Omit<IntakePayload, "contact">;
  onSubmitted: (contact: ContactInput) => void;
};

export default function Screen08Contact({ payloadBase, onSubmitted }: Props) {
  const typing = useTypingDelay();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting },
    setValue,
    control,
  } = useForm<ContactInput>({
    resolver: zodResolver(ContactSchema),
    mode: "onBlur",
    defaultValues: { name: "", mobile: "", email: "" },
  });

  /* useWatch returns a memoizable value; the raw `watch()` function
     does not and fails React Compiler's incompatible-library check. */
  const mobileValue = useWatch({ control, name: "mobile" }) ?? "";

  const onSubmit: SubmitHandler<ContactInput> = async (data) => {
    setSubmitError(null);
    // ANALYTICS_HOOK: intake_submit_attempt
    try {
      const res = await fetch("/api/intake/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payloadBase, contact: data }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setSubmitError(
          typeof body?.error === "string"
            ? "We couldn\u2019t save that. Check your details and try again."
            : "Something went wrong. Try again."
        );
        return;
      }
      // ANALYTICS_HOOK: intake_submit_success
      onSubmitted(data);
    } catch {
      setSubmitError("Network error. Check your connection and try again.");
    }
  };

  if (typing) return <TypingIndicator />;

  const nameHasError = touchedFields.name && errors.name;
  const mobileHasError = touchedFields.mobile && errors.mobile;
  const emailHasError = touchedFields.email && errors.email;

  return (
    <QaPair>
      <SystemBubble>{SCREEN8.leadIn}</SystemBubble>
      <form
        id="contact-form"
        onSubmit={handleSubmit(onSubmit)}
        className="form-stack"
        noValidate
      >
        <div className="field">
          <label className="lbl" htmlFor="contact-name">
            {SCREEN8.nameLabel}
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            className={`input${nameHasError ? " error" : ""}`}
            {...register("name")}
          />
          <span className={`help${nameHasError ? " error" : ""}`}>
            {nameHasError ? errors.name?.message : SCREEN8.nameHelp}
          </span>
        </div>

        <div className="field">
          <label className="lbl" htmlFor="contact-mobile">
            {SCREEN8.mobileLabel}
          </label>
          <input
            id="contact-mobile"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className={`input mono${mobileHasError ? " error" : ""}`}
            value={mobileValue}
            {...register("mobile")}
            onChange={(e) => {
              const formatted = new AsYouType("US").input(e.target.value);
              setValue("mobile", formatted, { shouldValidate: false });
            }}
          />
          <span className={`help${mobileHasError ? " error" : ""}`}>
            {mobileHasError ? errors.mobile?.message : SCREEN8.mobileHelp}
          </span>
        </div>

        <div className="field">
          <label className="lbl" htmlFor="contact-email">
            {SCREEN8.emailLabel}
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            className={`input${emailHasError ? " error" : ""}`}
            {...register("email")}
          />
          <span className={`help${emailHasError ? " error" : ""}`}>
            {emailHasError ? errors.email?.message : SCREEN8.emailHelp}
          </span>
        </div>

        {submitError ? (
          <span className="help error" role="alert">
            {submitError}
          </span>
        ) : null}

        {/* Hidden submit so Enter works in any field; the visible button
            lives in the bottom-actions bar and links via form="contact-form". */}
        <button
          type="submit"
          style={{
            position: "absolute",
            left: "-9999px",
            width: 1,
            height: 1,
          }}
          disabled={isSubmitting}
          aria-hidden="true"
          tabIndex={-1}
        >
          submit
        </button>
      </form>
    </QaPair>
  );
}
