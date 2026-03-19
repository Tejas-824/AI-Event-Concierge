"use client";

import { useState } from "react";

export default function SearchForm({ onSubmit, loading }) {
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!prompt.trim()) {
      setError("Please describe your event");
      return;
    }

    if (prompt.trim().length < 10) {
      setError("Please enter at least 10 characters");
      return;
    }

    setError("");
    onSubmit(prompt);
    setPrompt("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <label className="block text-sm font-semibold text-slate-700">
        Describe your corporate offsite
      </label>

      <textarea
        rows={4}
        value={prompt}
        onChange={(e) => {
          setPrompt(e.target.value);
          if (error) setError("");
        }}
        placeholder="Example: A 10-person leadership retreat in the mountains for 3 days with a $4k budget"
        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-slate-500"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {loading ? "Generating..." : "Generate Proposal"}
      </button>
    </form>
  );
}