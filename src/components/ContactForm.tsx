"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; data: { name: string } }
  | { status: "error"; message: string };

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>();

  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
  });

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitState({ status: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json();

      if (!res.ok) {
        setSubmitState({
          status: "error",
          message: json.error || "Something went wrong. Please try again.",
        });
        return;
      }

      if (json.success) {
        setSubmitState({ status: "success", data: { name: values.name } });
        reset();
      } else {
        setSubmitState({
          status: "error",
          message: json.error || "Failed to send. Please try again.",
        });
      }
    } catch {
      setSubmitState({
        status: "error",
        message:
          "Could not connect to the server. Please check your connection and try again.",
      });
    }
  };

  // Success state
  if (submitState.status === "success") {
    return (
      <div className="text-center py-12 px-6 bg-nomu-soft-white rounded-2xl border border-nomu-stone/20">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-nomu-sage/20">
          <svg
            className="h-7 w-7 text-nomu-sage"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="font-serif text-xl text-nomu-charcoal mb-2">
          Thank you, {submitState.data.name}!
        </h3>
        <p className="text-nomu-charcoal/70 text-sm max-w-sm mx-auto">
          Your message has been sent. We&apos;ll get back to you as soon as
          possible.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="bg-white rounded-2xl border border-nomu-stone/20 p-6 sm:p-8 space-y-6"
    >
      {/* Name */}
      <div>
        <label
          htmlFor="contact-name"
          className="block text-sm font-medium text-nomu-charcoal mb-1.5"
        >
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          {...register("name", { required: "Name is required" })}
          className={`w-full rounded-xl border px-4 py-3 text-sm text-nomu-charcoal bg-nomu-soft-white placeholder:text-nomu-charcoal/40 focus:outline-none focus:ring-2 focus:ring-nomu-sage/40 focus:border-nomu-sage transition-shadow ${
            errors.name ? "border-red-400" : "border-nomu-stone/40"
          }`}
          placeholder="Your name"
        />
        {errors.name && (
          <p className="mt-1.5 text-xs text-red-500" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="contact-email"
          className="block text-sm font-medium text-nomu-charcoal mb-1.5"
        >
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please enter a valid email",
            },
          })}
          className={`w-full rounded-xl border px-4 py-3 text-sm text-nomu-charcoal bg-nomu-soft-white placeholder:text-nomu-charcoal/40 focus:outline-none focus:ring-2 focus:ring-nomu-sage/40 focus:border-nomu-sage transition-shadow ${
            errors.email ? "border-red-400" : "border-nomu-stone/40"
          }`}
          placeholder="hello@example.com"
        />
        {errors.email && (
          <p className="mt-1.5 text-xs text-red-500" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-nomu-charcoal mb-1.5"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          {...register("message", {
            required: "Message is required",
            minLength: {
              value: 10,
              message: "Message should be at least 10 characters",
            },
          })}
          className={`w-full rounded-xl border px-4 py-3 text-sm text-nomu-charcoal bg-nomu-soft-white placeholder:text-nomu-charcoal/40 focus:outline-none focus:ring-2 focus:ring-nomu-sage/40 focus:border-nomu-sage transition-shadow resize-y ${
            errors.message ? "border-red-400" : "border-nomu-stone/40"
          }`}
          placeholder="How can we help you?"
        />
        {errors.message && (
          <p className="mt-1.5 text-xs text-red-500" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Error state */}
      {submitState.status === "error" && (
        <div
          className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          {submitState.message}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitState.status === "submitting"}
        className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-nomu-charcoal text-white px-8 py-3.5 text-sm font-medium hover:bg-nomu-charcoal/85 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitState.status === "submitting" ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
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
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}
