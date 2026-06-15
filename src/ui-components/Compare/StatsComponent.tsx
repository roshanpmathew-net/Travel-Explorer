import { StatProgress } from "./StatProgress";
import { CircleDollarSign, BusFront, ShieldCheck, Circle } from "lucide-react";
import type {CountryDetails} from '@/pages/Compare'


interface StatsProps{
    CountryProps: CountryDetails,
    bgcolor: string,
    text_color : string
}


const StatsComponent = ({CountryProps, bgcolor, text_color}: StatsProps) => {
  return (
    <div className="space-y-10">
      <div>
        <div className="flex items-center gap-2 mb-2 font-medium">
          <CircleDollarSign size={18} />
          <span>Cost of Living</span>
        </div>

        <StatProgress
          value={CountryProps.costOfLivingPerDayUSD}
          max={200}
          color={bgcolor}
        />

        <p className="mt-1 text-sm font-semibold text-blue-600">
          ${CountryProps.costOfLivingPerDayUSD}/day
        </p>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2 font-medium">
          <BusFront size={18} />
          <span>Infrastructure Quality</span>
        </div>

        <StatProgress
          value={CountryProps.infrastructureRating}
          max={10}
          color={bgcolor}
        />

        <p className="mt-1 text-sm font-semibold text-blue-600">
          {CountryProps.infrastructureRating}/10
        </p>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2 font-medium">
          <ShieldCheck size={18} />
          <span>Safety Index</span>
        </div>

        <StatProgress
          value={CountryProps.safetyScore}
          max={10}
          color={bgcolor}
        />

        <p className="mt-1 text-sm font-semibold text-blue-600">
          {CountryProps.safetyScore}/10
        </p>
      </div>

      <div className="grid grid-cols-2 gap-5 mt-8">
  <div className="rounded-xl bg-slate-100 px-5 py-4">
    <p className="text-sm text-slate-500">
      Climate
    </p>

    <h3 className={`mt-1 text-lg font-semibold ${text_color} `}>
      {CountryProps.climate}
    </h3>
  </div>

  <div className="rounded-xl bg-slate-100 px-5 py-4">
    <p className="text-sm text-slate-500">
      Top Industry
    </p>

    <h3 className={`mt-1 text-lg font-semibold ${text_color} `}>
      {CountryProps.topIndustry}
    </h3>
  </div>
</div>
    </div>
  );
};

export default StatsComponent;
