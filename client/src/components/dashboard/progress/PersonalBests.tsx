import { Dumbbell, Zap } from "lucide-react";

export default function PersonalBests() {
  return (
    <>
      <div className="pt-4 flex items-center justify-between">
        <h3 className="text-lg font-bold text-text-main">Personal Bests</h3>
        <button className="text-primary-hover text-sm font-bold cursor-pointer hover:underline">
          View All
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
        <div className="min-w-[160px] bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex flex-col gap-3">
          <div className="size-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Dumbbell className="text-primary-hover" size={24} />
          </div>
          <div>
            <p className="text-xs text-text-muted font-bold uppercase">
              Deadlift
            </p>
            <p className="text-xl font-bold text-text-main">140 kg</p>
          </div>
        </div>
        <div className="min-w-[160px] bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex flex-col gap-3">
          <div className="size-10 rounded-lg bg-orange-100 flex items-center justify-center">
            <Zap className="text-orange-500" size={24} />
          </div>
          <div>
            <p className="text-xs text-text-muted font-bold uppercase">
              Bench Press
            </p>
            <p className="text-xl font-bold text-text-main">105 kg</p>
          </div>
        </div>
      </div>
    </>
  );
}
