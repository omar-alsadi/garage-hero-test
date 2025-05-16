import Image from "next/image";

const StatSummary = ({
  icon,
  label,
  percent,
  amount,
}: {
  icon: string;
  label: string;
  percent: string;
  amount: string;
}) => (
  <div>
    <div className="flex items-center">
      <Image src={icon} alt={`${label} icon`} width={16} height={16} priority />
      <span className="ml-1 text-sm font-light text-gray-500">{label}</span>
    </div>
    <h3 className="my-1 text-2xl font-bold">{percent}</h3>
    <p className="text-sm font-light text-gray-500">{amount}</p>
  </div>
);

export default StatSummary;
