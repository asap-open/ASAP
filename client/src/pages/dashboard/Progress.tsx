import { useState } from "react";
import ProgressHeader from "../../components/dashboard/progress/ProgressHeader";
import TimeFrameFilter from "../../components/dashboard/progress/TimeFrameFilter";
import ConsistencyHeatmap from "../../components/dashboard/progress/ConsistencyHeatmap";
import MobileConsistency from "../../components/dashboard/progress/MobileConsistency";
import BodyWeightChart from "../../components/dashboard/progress/BodyWeightChart";
import VolumeStats from "../../components/dashboard/progress/VolumeStats";
import MuscleDistribution from "../../components/dashboard/progress/MuscleDistribution";
import PersonalBests from "../../components/dashboard/progress/PersonalBests";

export default function Progress() {
  const [range, setRange] = useState("1M");

  return (
    <div className="min-h-screen pb-32">
      <ProgressHeader />
      <main className="max-w-7xl mx-auto px-6 space-y-6">
        <div className="max-w-md mx-auto lg:max-w-none">
          <TimeFrameFilter selected={range} onSelect={setRange} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 auto-rows-min">
          <div className="lg:col-span-2">
            {/* Desktop View */}
            <div className="hidden lg:block">
              <ConsistencyHeatmap range={range} />
            </div>
            {/* Mobile View */}
            <div className="lg:hidden">
              <MobileConsistency range={range} />
            </div>
          </div>
          <BodyWeightChart range={range} />
          <VolumeStats range={range} />
          <MuscleDistribution range={range} />
          <PersonalBests />
        </div>
      </main>
    </div>
  );
}
