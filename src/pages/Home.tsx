import { Button } from "@/components/ui/button";
import { ArrowRight, PlaneTakeoff } from "lucide-react";

const Home = () => {
  return (
    <div className="flex flex-col items-center mt-5">
      <div className="w-full bg-linear-to-br from-blue-50 to-slate-100 flex items-center justify-between px-20 py-16 overflow-hidden">
        
        <div className="max-w-2xl py-10 flex flex-col gap-6">
          
          <p className="bg-white shadow-sm border border-slate-200 py-2 px-4 rounded-full w-fit text-xs font-medium flex items-center gap-2 text-slate-700">
            <PlaneTakeoff size={14} />
            Next Generation Travel Planning
          </p>

          <div className="flex flex-col gap-2">
            <h1 className="text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Discover Your Next
            </h1>

            <h1 className="text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Adventure with{" "}
              <span className="text-[#2563EB]">
                Voyage
              </span>
            </h1>
          </div>

          <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
            Navigate through global destinations with high-precision
            data, curated local insights, and an effortless planning
            experience designed for the modern explorer.
          </p>

          <div className="flex gap-4 pt-2">
            <Button
              className="
                h-12
                px-8
                bg-[#2563EB]
                hover:bg-[#1D4ED8]
                text-white
                shadow-md
                transition-all
                duration-300
                hover:shadow-lg
                cursor-pointer
              "
            >
              Start Exploring
              <ArrowRight className="ml-1" size={18} />
            </Button>

            <Button
              variant="outline"
              className="
                h-12
                px-8
                border-slate-300
                bg-white
                text-slate-700
                hover:bg-slate-900
                hover:text-white
                transition-all
                duration-300
                cursor-pointer
              "
            >
              How it Works
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <img
            className="
              h-130
              w-auto
              object-contain
              drop-shadow-2xl
              rounded-lg
             
              
            "
            src="./images/globe.png"
            alt="Globe"
          />
        </div>
      </div>

      {/* Featured */}
      {/* <div className="w-full px-4 flex flex-col items-center">
        Featured
      </div> */}

      {/* Recently Viewed */}
      {/* <div className="w-full bg-blue-100/50 px-4 flex flex-col items-center">
        Recently Viewed
      </div> */}
    </div>
  );
};

export default Home;