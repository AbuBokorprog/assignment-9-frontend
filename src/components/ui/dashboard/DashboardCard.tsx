import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  bgColor: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon,
  bgColor,
}) => {
  return (
    <div
      className={`${bgColor} rounded-lg p-6 shadow-md flex items-center justify-between`}
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <div className="text-3xl text-gray-700">{icon}</div>
    </div>
  );
};

export default DashboardCard;
