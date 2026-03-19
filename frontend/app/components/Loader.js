export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-slate-900"></div>
      <p className="mt-4 text-sm font-medium text-slate-600">AI is planning...</p>
    </div>
  );
}