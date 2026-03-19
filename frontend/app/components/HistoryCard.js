export default function HistoryCard({ item }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-3 text-xs font-medium text-slate-500">
        {new Date(item.createdAt).toLocaleString()}
      </p>

      <div className="space-y-2 text-sm text-slate-700">
        <div>
          <span className="font-semibold text-slate-900">Prompt: </span>
          <span>{item.userPrompt}</span>
        </div>
        <div>
          <span className="font-semibold text-slate-900">Venue: </span>
          <span>{item.venueName}</span>
        </div>
        <div>
          <span className="font-semibold text-slate-900">Location: </span>
          <span>{item.location}</span>
        </div>
        <div>
          <span className="font-semibold text-slate-900">Cost: </span>
          <span>{item.estimatedCost}</span>
        </div>
        <div>
          <span className="font-semibold text-slate-900">Why it fits: </span>
          <span>{item.whyItFits}</span>
        </div>
      </div>
    </div>
  );
}