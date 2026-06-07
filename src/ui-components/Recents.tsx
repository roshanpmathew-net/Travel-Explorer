import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { ClockFading } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Recents = () => {
  const { user } = useAuth();
  const { t } = useTranslation()
  return (
    <section className="w-full mt-2 mb-10 pt-10">
      
      <div className="flex items-center gap-2 mb-5">
        <ClockFading className="w-5 h-5 text-[#2563EB]" />
        <h2 className="text-xl font-semibold text-gray-900">
          {
                t("recently_viewed")
              }
        </h2>
      </div>

      
      {user ? (
        <div className="rounded-xl border bg-white/80 p-4 shadow-sm">
          <p className="text-gray-700">{user.name}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-gray-200 bg-gray-50 px-6 py-10 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
            <ClockFading className="h-7 w-7 text-[#2563EB]" />
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900">
              {
                t("recently_viewed")
              }
            </h3>
            <p className="mt-1 max-w-sm text-sm text-gray-500">
              Log in to view and keep track of the destinations you've
              recently explored.
            </p>
          </div>

          <Link to="/login">
            <Button className="bg-[#2563EB] hover:bg-[#1D4ED8] cursor-pointer px-6">
              {
                t("login")
              }
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default Recents;