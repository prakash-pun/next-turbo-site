export const SkeletonLoading = () => {
  return (
    <div className="mx-auto my-2 rounded-md border border-blue-800 p-4 shadow">
      <div className="flex animate-pulse space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-4 h-4 w-40 rounded bg-slate-700"></div>
              <div className="col-span-2 h-4 w-40 rounded bg-slate-700"></div>
              <div className="col-span-2 h-4 w-40 rounded bg-slate-700"></div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-2 h-10 rounded bg-slate-700"></div>
              <div className="col-span-2 h-10 rounded bg-slate-700"></div>
            </div>
            <div className="h-2 w-40 rounded bg-slate-700"></div>
            <div className="h-10 rounded bg-slate-700"></div>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-4">
              <div className=" col-span-4 h-8 w-24 rounded bg-slate-700"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
