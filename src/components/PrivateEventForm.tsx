"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

interface PrivateEventFormData {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  eventType: string;
  guestCount: number;
  message: string;
}

const EVENT_TYPES = [
  "Birthday",
  "Corporate",
  "Baby Shower",
  "Brand Activation",
  "Other",
] as const;

export default function PrivateEventForm() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PrivateEventFormData>({
    defaultValues: {
      eventType: EVENT_TYPES[0],
    },
  });

  const onSubmit = async (data: PrivateEventFormData) => {
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/private-events-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        setStatus("error");
        setErrorMessage(
          json.error || "Something went wrong. Please try again.",
        );
        return;
      }

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-16 px-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-nomu-sage/20 mb-6">
          <svg
            className="w-8 h-8 text-nomu-sage"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="font-serif text-2xl text-nomu-charcoal mb-3">
          Inquiry sent!
        </h3>
        <p className="text-nomu-charcoal/70 max-w-md mx-auto leading-relaxed">
          Thank you for your interest. We&apos;ll review your event details and get
          back to you within 24 hours to discuss availability and pricing.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
        noValidate
      >
        {/* Name + Email row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Field label="Name" error={errors.name?.message}>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className={inputClass}
              placeholder="Your full name"
            />
          </Field>

          <Field label="Email" error={errors.email?.message}>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email",
                },
              })}
              className={inputClass}
              placeholder="you@example.com"
            />
          </Field>
        </div>

        {/* Phone + Preferred Date row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Field label="Phone" error={errors.phone?.message}>
            <input
              type="tel"
              {...register("phone", { required: "Phone is required" })}
              className={inputClass}
              placeholder="+41 79 123 45 67"
            />
          </Field>

          <Field label="Preferred Date" error={errors.preferredDate?.message}>
            <input
              type="date"
              {...register("preferredDate", {
                required: "Please select a date",
              })}
              className={inputClass}
              min={new Date().toISOString().split("T")[0]}
            />
          </Field>
        </div>

        {/* Event Type + Guest Count row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Field label="Event Type" error={errors.eventType?.message}>
            <select
              {...register("eventType", {
                required: "Please select an event type",
              })}
              className={inputClass}
            >
              {EVENT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>

          <Field
            label="Expected Guest Count"
            error={errors.guestCount?.message}
          >
            <input
              type="number"
              min={1}
              {...register("guestCount", {
                required: "Guest count is required",
                valueAsNumber: true,
                min: { value: 1, message: "At least 1 guest" },
              })}
              className={inputClass}
              placeholder="e.g. 30"
            />
          </Field>
        </div>

        {/* Message */}
        <Field label="Message" error={errors.message?.message}>
          <textarea
            rows={4}
            {...register("message", {
              required: "Please tell us about your event",
            })}
            className={`${inputClass} resize-y`}
            placeholder="Tell us about your event — any special requests, preferred time of day, dietary needs..."
          />
        </Field>

        {/* Error display */}
        {status === "error" && (
          <div className="rounded-2xl bg-red-50 border border-red-200 text-red-700 px-6 py-4 text-sm">
            {errorMessage}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-nomu-charcoal text-white px-10 py-3.5 text-base font-medium transition-all duration-200 hover:bg-nomu-charcoal/85 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Sending…
            </>
          ) : (
            "Send Inquiry"
          )}
        </button>
      </form>
    </div>
  );
}

/* ─── Shared input style ─── */
const inputClass =
  "w-full rounded-2xl border border-nomu-stone/50 bg-white px-5 py-3.5 text-nomu-charcoal placeholder:text-nomu-stone/70 text-base transition-colors duration-200 focus:outline-none focus:border-nomu-sage focus:ring-2 focus:ring-nomu-sage/30";

/* ─── Field wrapper ─── */
function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-nomu-charcoal/80">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-sm text-red-600 mt-0.5" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
