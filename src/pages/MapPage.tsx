
import React from 'react';
import MainLayout from '../layout/MainLayout';
import MapView from '../components/MapView';

const MapPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="space-y-4 bg-custom-light-bg text-custom-almost-black p-4 rounded-lg">
        <h1 className="text-2xl font-bold text-custom-dark-blue">Issue Map</h1>
        <p className="text-custom-medium">
          Explore reported road issues across the city. Click on markers to view details.
        </p>
        <div className="h-[700px] border border-custom-medium rounded-lg overflow-hidden">
          <MapView />
        </div>
      </div>
    </MainLayout>
  );
};

export default MapPage;

