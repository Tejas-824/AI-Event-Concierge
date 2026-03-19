export default function ProposalCard({ proposal }) {
  if (!proposal) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Current Proposal</h2>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          Latest
        </span>
      </div>

      <div className="space-y-4 text-sm text-slate-700">
        <div>
          <p className="font-semibold text-slate-900">User Request</p>
          <p className="mt-1">{proposal.userPrompt}</p>
        </div>

        <div>
          <p className="font-semibold text-slate-900">Venue Name</p>
          <p className="mt-1">{proposal.venueName}</p>
        </div>

        <div>
          <p className="font-semibold text-slate-900">Location</p>
          <p className="mt-1">{proposal.location}</p>
        </div>

        <div>
          <p className="font-semibold text-slate-900">Estimated Cost</p>
          <p className="mt-1">{proposal.estimatedCost}</p>
        </div>

        <div>
          <p className="font-semibold text-slate-900">Why it fits</p>
          <p className="mt-1 leading-7">{proposal.whyItFits}</p>
        </div>
      </div>
    </div>
  );
}