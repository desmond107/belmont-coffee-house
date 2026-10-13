"use client";

import { useState } from "react";

export type Status = "idle" | "sending" | "success" | "error";

/** Posts a form to /api/inquiry and tracks status and invalid fields. */
export function useSubmit(type: string) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [invalid, setInvalid] = useState<string[]>([]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data: Record<string, string | string[]> = { type };
    for (const key of new Set(fd.keys())) {
      const all = fd.getAll(key).map(String);
      data[key] = all.length > 1 ? all : all[0];
    }
    setStatus("sending");
    setError("");
    setInvalid([]);
    try {
      const res = await fetch("/api/inquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setStatus("error");
        setError(json.error ?? "Something went wrong.");
        setInvalid(json.fields ?? []);
        const first = json.fields?.[0];
        if (first) (form.elements.namedItem(first) as HTMLElement | null)?.focus?.();
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("Network error. Please check your connection and try again.");
    }
  }

  return { status, error, invalid, onSubmit };
}
