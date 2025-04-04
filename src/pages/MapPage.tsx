
import React from 'react';
import MainLayout from '../layout/MainLayout';
import MapView from '../components/MapView';

const MapPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Issue Map</h1>
        <p className="text-gray-600">
          Explore reported road issues across the city. Click on markers to view details.
        </p>
        <div className="h-[700px]">
          <MapView />
        </div>
      </div>
    </MainLayout>
  );
};

export default MapPage;
