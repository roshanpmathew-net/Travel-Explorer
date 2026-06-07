import { Button } from "@/components/ui/button";
import Featured from "@/ui-components/Featured";
import Recents from "@/ui-components/Recents";
import { ArrowRight, PlaneTakeoff } from "lucide-react";
import { useTranslation } from "react-i18next";
import {useNavigate} from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center mt-5">
      <div className="w-full bg-linear-to-br from-blue-50 to-slate-100 flex items-center justify-between px-11 py-16 overflow-hidden">
        
        <div className="max-w-2xl py-10 flex flex-col gap-6">
          
          <p className="bg-white shadow-sm border border-slate-200 py-2 px-4 rounded-full w-fit text-xs font-medium flex items-center gap-2 text-slate-700">
            <PlaneTakeoff size={14} />
            {
              t("next_generation_travel_planning")
            }
            
          </p>

          <div className="flex flex-col gap-2">
            <h1 className="text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              {t("hero_title_part1")}
            </h1>

            <h1 className="text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
               {t("hero_title_part2")}{" "}
              <span className="text-[#2563EB]">
                Voyage
              </span>
            </h1>
          </div>

          <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
             {t("hero_description")}
            
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
              onClick={() => navigate('/explore')}
            >
              {t("start_exploring")}
              
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
              {t("how_it_works")}
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

       
      <div className="w-full px-11 flex flex-col mt-4 mb-10 ">
        <Featured/>
      </div> 

      
      <div className="w-full bg-linear-to-br from-blue-50 to-slate-100 px-11 flex flex-col mt-4 mb-10  ">
        <Recents/>
      </div>
    </div>
  );
};

export default Home;