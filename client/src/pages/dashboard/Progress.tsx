import ProgressHeader from "../../components/dashboard/progress/ProgressHeader";
import TimeFrameFilter from "../../components/dashboard/progress/TimeFrameFilter";
import ConsistencyHeatmap from "../../components/dashboard/progress/ConsistencyHeatmap";
import BodyWeightChart from "../../components/dashboard/progress/BodyWeightChart";
import VolumeStats from "../../components/dashboard/progress/VolumeStats";
import MuscleDistribution from "../../components/dashboard/progress/MuscleDistribution";
import PersonalBests from "../../components/dashboard/progress/PersonalBests";

export default function Progress() {
  return (
    <div className="min-h-screen pb-32">
      <ProgressHeader />
      <main className="max-w-md mx-auto px-6 space-y-6">
        <TimeFrameFilter />
        <ConsistencyHeatmap />
        <BodyWeightChart />
        <VolumeStats />
        <MuscleDistribution />
        <PersonalBests />
      </main>
    </div>
  );
}
