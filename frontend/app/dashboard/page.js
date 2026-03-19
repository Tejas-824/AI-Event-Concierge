"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import api from "../lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    setPageLoading(false);
  }, [router]);

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) {
      setError("Please enter event description");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const res = await api.post(
        "/events/generate",
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProposal(res.data.proposal);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to generate proposal");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-600">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold text-slate-900">Dashboard</h1>

        <form
          onSubmit={handleGenerate}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Event Description
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your corporate offsite request"
            className="min-h-[140px] w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
          />

          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-4 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {loading ? "Please wait..." : "Generate Proposal"}
          </button>
        </form>

        {proposal && (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              {proposal.venueName}
            </h2>
            <p className="mb-2 text-slate-700">
              <span className="font-semibold">Location:</span>{" "}
              {proposal.location}
            </p>
            <p className="mb-2 text-slate-700">
              <span className="font-semibold">Estimated Cost:</span>{" "}
              {proposal.estimatedCost}
            </p>
            <p className="text-slate-700">
              <span className="font-semibold">Why It Fits:</span>{" "}
              {proposal.whyItFits}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}