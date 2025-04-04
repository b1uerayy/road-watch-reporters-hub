
import React from 'react';
import MainLayout from '../layout/MainLayout';
import ReportForm from '../components/ReportForm';

const ReportPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Report a Road Issue</h1>
        <ReportForm />
      </div>
    </MainLayout>
  );
};

export default ReportPage;
