
import React from 'react';
import MainLayout from '../layout/MainLayout';
import StatsCard from '../components/StatsCard';

const StatsPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Statistics Dashboard</h1>
        <p className="text-gray-600">
          View comprehensive statistics about road issues and reporting activity.
        </p>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <StatsCard />
        </div>
      </div>
    </MainLayout>
  );
};

export default StatsPage;
