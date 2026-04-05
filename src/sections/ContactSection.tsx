import { useCallback, useState, memo } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { profile } from "../data/site";
import { SectionWrapper } from "../components/ui/SectionWrapper";
import { Button } from "../components/ui/Button";
import {
  validateContactForm,
  type ContactFormValues,
  type ContactFormErrors,
} from "../utils/validation";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const initialValues: ContactFormValues = { name: "", email: "", message: "" };

function ContactSectionInner() {
  const reduceMotion = usePrefersReducedMotion();
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const onChange = useCallback(
    (field: keyof ContactFormValues) =>
      (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValues((v) => ({ ...v, [field]: e.target.value }));
        setErrors((er) => ({ ...er, [field]: undefined }));
        setStatus("idle");
      },
    [],
  );

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const nextErrors = validateContactForm(values);
      setErrors(nextErrors);

      if (Object.keys(nextErrors).length > 0) {
        setStatus("error");
        return;
      }

      setStatus("loading");

      try {
        const res = await fetch("https://formspree.io/f/xreqwykd", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(values),
        });

        if (res.ok) {
          setStatus("success");
          setValues(initialValues);
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    },
    [values],
  );

  return (
    <SectionWrapper
      id="contact"
      eyebrow="Contact"
      title="Let’s build something thoughtful"
    >
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-lg leading-relaxed text-ink-muted">
            Tell me about your product, team, or idea. I typically reply within
            two business days.
          </p>
          <p className="mt-4 text-sm text-ink-muted">
            Prefer email directly?{" "}
            <a
              className="font-medium text-accent hover:underline"
              href={`mailto:${profile.email}`}
            >
              {profile.email}
            </a>
          </p>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-sm sm:p-8"
          noValidate
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.05 }}
        >
          <div className="space-y-5">
            <div>
              <label
                htmlFor="contact-name"
                className="block text-sm font-medium text-ink"
              >
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                value={values.name}
                onChange={onChange("name")}
                className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-sm"
              />
              {errors.name && (
                <p className="text-xs text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="block text-sm font-medium text-ink"
              >
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={values.email}
                onChange={onChange("email")}
                className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-sm"
              />
              {errors.email && (
                <p className="text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-sm font-medium text-ink"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                value={values.message}
                onChange={onChange("message")}
                className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-sm"
              />
              {errors.message && (
                <p className="text-xs text-red-600">{errors.message}</p>
              )}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Sending..." : "Send message"}
            </Button>

            {status === "success" && (
              <p className="text-sm text-green-600">
                Message sent successfully.
              </p>
            )}

            {status === "error" && (
              <p className="text-sm text-red-600">
                Something went wrong. Try again.
              </p>
            )}
          </div>
        </motion.form>
      </div>
    </SectionWrapper>
  );
}

const ContactSection = memo(ContactSectionInner);
export default ContactSection;
