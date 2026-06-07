import { type ReactNode } from "react";

interface Details {
  label: string;
  icon: ReactNode;
  value: string | number;
}

interface DetailCardProps {
  details: Details;
}

const DetailCard = ({ details }: DetailCardProps) => {
  return (
    <div className="group bg-blue-100/80 backdrop-blur-sm border border-blue-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-200 text-blue-600 mb-4">
        {details.icon}
      </div>

      <p className="text-xs font-semibold tracking-wider uppercase text-gray-500">
        {details.label}
      </p>

      <h3 className="mt-1 text-lg font-bold text-gray-900 wrap-break-word">
        {details.value}
      </h3>
    </div>
  );
};

export default DetailCard;