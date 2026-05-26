"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";

const TIME_SLOTS = (() => {
  const slots: string[] = [];
  for (let h = 8; h <= 17; h++) {
    for (const m of ["00", "30"]) {
      if (h === 17 && m === "30") break;
      slots.push(`${String(h).padStart(2, "0")}:${m}`);
    }
  }
  return slots;
})();

const PARTY_SIZES = Array.from({ length: 12 }, (_, i) => i + 1);

type FormData = {
  date: string;
  time: string;
  partySize: number;
  name: string;
  email: string;
  phone: string;
  message?: string;
};

export default function ReservationForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      date: "",
      time: "",
      partySize: 2,
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const today = useMemo(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        setStatus("error");
        setErrorMessage(json.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
      setErrorMessage("Could not reach the server. Please check your connection and try again.");
    }
  };

  const fieldClasses =
    "w-full rounded-2xl border border-nomu-stone/40 bg-white px-5 py-3.5 text-nomu-charcoal placeholder:text-nomu-charcoal/40 focus:border-nomu-sage focus:outline-none focus:ring-2 focus:ring-nomu-sage/20 transition-colors text-base";

  const labelClasses = "block text-sm font-medium text-nomu-charcoal/80 mb-1.5";

  const errorClasses = "mt-1.5 text-sm text-red-600";

  if (status === "success") {
    return (
      <div
        className="mx-auto max-w-2xl rounded-2xl bg-nomu-beige p-10 sm:p-14 text-center"
        role="alert"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-nomu-sage/20 mb-6">
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
        <h3 className="font-serif text-2xl text-nomu-charcoal mb-3">
          Thank You!
        </h3>
        <p className="text-nomu-charcoal/70 text-base leading-relaxed">
          We&apos;ll confirm your reservation by email shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="mx-auto max-w-2xl space-y-6"
    >
      {/* Date & Time row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Date */}
        <div>
          <label htmlFor="res-date" className={labelClasses}>
            Date <span className="text-nomu-sage">*</span>
          </label>
          <input
            id="res-date"
            type="date"
            min={today}
            className={fieldClasses}
            {...register("date", { required: "Date is required" })}
          />
          {errors.date && (
            <p className={errorClasses} role="alert">{errors.date.message}</p>
          )}
        </div>

        {/* Time */}
        <div>
          <label htmlFor="res-time" className={labelClasses}>
            Time <span className="text-nomu-sage">*</span>
          </label>
          <select
            id="res-time"
            className={fieldClasses}
            {...register("time", { required: "Time is required" })}
          >
            <option value="" disabled>
              Select a time
            </option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {errors.time && (
            <p className={errorClasses} role="alert">{errors.time.message}</p>
          )}
        </div>
      </div>

      {/* Party Size */}
      <div>
        <label htmlFor="res-party" className={labelClasses}>
          Party Size <span className="text-nomu-sage">*</span>
        </label>
        <select
          id="res-party"
          className={fieldClasses}
          {...register("partySize", {
            required: "Party size is required",
            valueAsNumber: true,
            min: { value: 1, message: "Minimum 1 guest" },
            max: { value: 12, message: "Maximum 12 guests" },
          })}
        >
          {PARTY_SIZES.map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "Guest" : "Guests"}
            </option>
          ))}
        </select>
        {errors.partySize && (
          <p className={errorClasses} role="alert">{errors.partySize.message}</p>
        )}
      </div>

      {/* Name & Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label htmlFor="res-name" className={labelClasses}>
            Name <span className="text-nomu-sage">*</span>
          </label>
          <input
            id="res-name"
            type="text"
            placeholder="Your full name"
            className={fieldClasses}
            {...register("name", {
              required: "Name is required",
              minLength: { value: 2, message: "Name must be at least 2 characters" },
            })}
          />
          {errors.name && (
            <p className={errorClasses} role="alert">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="res-email" className={labelClasses}>
            Email <span className="text-nomu-sage">*</span>
          </label>
          <input
            id="res-email"
            type="email"
            placeholder="hello@example.com"
            className={fieldClasses}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className={errorClasses} role="alert">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="res-phone" className={labelClasses}>
          Phone <span className="text-nomu-sage">*</span>
        </label>
        <input
          id="res-phone"
          type="tel"
          placeholder="+41 00 000 00 00"
          className={fieldClasses}
          {...register("phone", {
            required: "Phone number is required",
            minLength: { value: 5, message: "Please enter a valid phone number" },
          })}
        />
        {errors.phone && (
          <p className={errorClasses} role="alert">{errors.phone.message}</p>
        )}
      </div>

      {/* Message (optional) */}
      <div>
        <label htmlFor="res-message" className={labelClasses}>
          Message <span className="text-nomu-charcoal/40">(optional)</span>
        </label>
        <textarea
          id="res-message"
          rows={3}
          placeholder="Any special requests or notes..."
          className={fieldClasses}
          {...register("message")}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-nomu-charcoal px-8 py-4 text-base font-medium text-white transition-all duration-200 hover:bg-nomu-charcoal/85 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Submitting..." : "Reserve a Table"}
      </button>

      {/* Error state */}
      {status === "error" && (
        <div
          className="rounded-2xl bg-red-50 border border-red-200 p-5 text-center"
          role="alert"
        >
          <p className="text-red-700 text-sm mb-3">{errorMessage}</p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="text-sm font-medium text-red-700 underline hover:text-red-800 transition-colors"
          >
            Try again
          </button>
        </div>
      )}
    </form>
  );
}
