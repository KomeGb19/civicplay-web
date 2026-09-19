"use client";

import { useState } from "react";

type FormValues = {
  name: string;
  email: string;
  organization: string;
  partnershipType: string;
  heardAbout: string;
};

type BecomePartnerModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: FormValues) => Promise<void>;
};

export function BecomePartnerModal({
  open,
  onClose,
  onSubmit,
}: BecomePartnerModalProps) {
  if (!open) return null;

  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    email: "",
    organization: "",
    partnershipType: "",
    heardAbout: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const heardAboutOptions = [
    { value: "", label: "Select how you heard about us" },
    { value: "social_media", label: "Social Media" },
    { value: "friend_colleague", label: "Friend or Colleague" },
    { value: "event_workshop", label: "Event or Workshop" },
    { value: "online_search", label: "Online Search" },
    { value: "other", label: "Other" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formValues.name.trim()) {
      setErrorMessage("Please enter your name");
      return;
    }

    if (!formValues.email.trim()) {
      setErrorMessage("Please enter your email");
      return;
    }

    // Simple email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formValues.email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    if (!formValues.partnershipType.trim()) {
      setErrorMessage("Please describe how you intend to become a partner");
      return;
    }

    if (!formValues.heardAbout) {
      setErrorMessage("Please select how you heard about us");
      return;
    }

    setLoading(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      if (onSubmit) {
        await onSubmit(formValues);
      } else {
        // Simulate API call if no handler provided
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }

      setSubmitStatus("success");
      // Reset form after success
      setFormValues({
        name: "",
        email: "",
        organization: "",
        partnershipType: "",
        heardAbout: "",
      });
    } catch (err) {
      setSubmitStatus("error");
      setErrorMessage("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] bg-navy-deep/10 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Become a partner form"
    >
      {/* Card-based modal content */}
      <div className="relative w-full max-w-2xl mx-auto h-full max-h-[90vh] flex flex-col">
        {/* Modal background card */}
        <div className="my-auto w-full rounded-2xl bg-navy-deep/90 backdrop-blur-xl border border-cream/20 shadow-2xl">
          {/* Header with close button */}
          <div className="flex items-center justify-between p-6 border-b border-cream/10">
            <h2 className="text-xl font-[family-name:var(--font-syne)] font-bold text-cream">
              Become a Partner
            </h2>
            <button
              type="button"
              className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-cream hover:bg-white/20 transition-colors"
              onClick={onClose}
              aria-label="Close modal"
            >
              ×
            </button>
          </div>

          {/* Modal body with scrolling if needed - override global scrollbar hidden */}
          <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh] scrollbar scrollbar-thin scrollbar-track-[var(--color-navy-deep)]/20 scrollbar-thumb-[var(--color-cream)]/30 hover:scrollbar-thumb-[var(--color-cream)]/50">
            {/* Success state */}
            {submitStatus === "success" && (
              <div className="space-y-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green/20 text-green mb-2">
                  ✓
                </div>
                <h3 className="font-[family-name:var(--font-syne)] text-2xl font-bold text-cream">
                  Thank you!
                </h3>
                <p className="text-cream-muted text-center">
                  We've received your partnership inquiry and will get back to
                  you soon.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-4 rounded-full bg-green px-6 py-2.5 font-[family-name:var(--font-cal)] text-sm font-bold uppercase tracking-wide text-nav hover:bg-green/90 transition-colors"
                >
                  Close
                </button>
              </div>
            )}

            {/* Error state */}
            {submitStatus === "error" && errorMessage && (
              <div className="bg-[var(--color-coral)]/20 rounded-lg p-4 text-[var(--color-coral)] text-sm">
                {errorMessage}
              </div>
            )}

            {/* Form */}
            {submitStatus !== "success" && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-cream"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formValues.name}
                    onChange={(e) =>
                      setFormValues((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="block w-full rounded-lg bg-navy-deep/50 border border-cream/20 px-4 py-3 text-cream placeholder:text-cream-muted focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/30 transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-cream"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formValues.email}
                    onChange={(e) =>
                      setFormValues((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="block w-full rounded-lg bg-navy-deep/50 border border-cream/20 px-4 py-3 text-cream placeholder:text-cream-muted focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/30 transition-all"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="organization"
                    className="block text-sm font-medium text-cream"
                  >
                    Organization (optional)
                  </label>
                  <input
                    id="organization"
                    type="text"
                    value={formValues.organization}
                    onChange={(e) =>
                      setFormValues((prev) => ({
                        ...prev,
                        organization: e.target.value,
                      }))
                    }
                    className="block w-full rounded-lg bg-navy-deep/50 border border-cream/20 px-4 py-3 text-cream placeholder:text-cream-muted focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/30 transition-all"
                    placeholder="Enter your organization name"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="partnershipType"
                    className="block text-sm font-medium text-cream"
                  >
                    How you intend to become a partner
                  </label>
                  <textarea
                    id="partnershipType"
                    value={formValues.partnershipType}
                    onChange={(e) =>
                      setFormValues((prev) => ({
                        ...prev,
                        partnershipType: e.target.value,
                      }))
                    }
                    className="block w-full rounded-lg bg-navy-deep/50 border border-cream/20 px-4 py-3 text-cream placeholder:text-cream-muted focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/30 transition-all"
                    rows={4}
                    placeholder="Describe how you'd like to partner with us (e.g., content creation, event hosting, translation, etc.)"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="heardAbout"
                    className="block text-sm font-medium text-cream"
                  >
                    Where did you hear about us
                  </label>
                  <select
                    id="heardAbout"
                    value={formValues.heardAbout}
                    onChange={(e) =>
                      setFormValues((prev) => ({
                        ...prev,
                        heardAbout: e.target.value,
                      }))
                    }
                    className="block w-full rounded-lg bg-navy-deep/50 border border-cream/20 px-4 py-3 text-cream placeholder:text-cream-muted focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/30 transition-all"
                    required
                  >
                    {heardAboutOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-4">
                  {loading ? (
                    <div className="loader mx-auto" />
                  ) : (
                    <button
                      type="submit"
                      className="w-full rounded-full bg-green px-6 py-2.5 font-[family-name:var(--font-cal)] text-sm font-bold uppercase tracking-wide text-nav hover:bg-green/90 transition-colors"
                    >
                      Submit Application
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full rounded-full bg-white/10 px-6 py-2.5 font-[family-name:var(--font-cal)] text-sm font-semibold text-cream hover:bg-white/20 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
