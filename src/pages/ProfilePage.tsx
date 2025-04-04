
import React from 'react';
import MainLayout from '../layout/MainLayout';
import UserProfile from '../components/UserProfile';

const ProfilePage: React.FC = () => {
  return (
    <MainLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="text-gray-600">
          Manage your account, view your reports, and track your progress.
        </p>
        <UserProfile />
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
