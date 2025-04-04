
import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, MapPin, BarChart, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import MainLayout from '../layout/MainLayout';
import ReportCard from '../components/ReportCard';
import MapView from '../components/MapView';
import StatsCard from '../components/StatsCard';
import { mockReports, totalReports, fixedReports } from '../utils/mockData';

const Index: React.FC = () => {
  // Get the 3 most recent reports
  const recentReports = [...mockReports]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 3);
  
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Hero Section */}
        <section className="relative rounded-lg overflow-hidden mb-8 bg-gradient-to-br from-primary to-blue-700">
          <div className="container mx-auto px-4 py-10 md:py-16 relative z-10">
            <div className="max-w-2xl text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Report Road Issues in Your Community
              </h1>
              <p className="text-lg md:text-xl mb-6 text-white/90">
                Help improve your local infrastructure by reporting damaged roads, potholes, and other issues. Together we can make our roads safer.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90">
                  <Link to="/report">
                    <Camera className="h-5 w-5 mr-2" />
                    Report an Issue
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10">
                  <Link to="/map">
                    <MapPin className="h-5 w-5 mr-2" />
                    View Issue Map
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/10 transform skew-x-12 translate-x-1/2 hidden lg:block"></div>
        </section>
        
        {/* Stats Overview */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <StatsOverviewCard
              title="Total Reports"
              value={totalReports}
              description="Issues reported by users"
              icon={<Camera className="h-5 w-5" />}
              color="bg-blue-50 text-blue-600"
            />
            <StatsOverviewCard
              title="Fixed Issues"
              value={fixedReports}
              description="Successfully resolved reports"
              icon={<MapPin className="h-5 w-5" />}
              color="bg-green-50 text-green-600"
            />
            <StatsOverviewCard
              title="Active Users"
              value={mockReports.length > 10 ? Math.round(mockReports.length * 1.7) : 17}
              description="Citizens helping their community"
              icon={<User className="h-5 w-5" />}
              color="bg-amber-50 text-amber-600"
            />
          </div>
        </section>
        
        {/* Recent Reports */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Recent Reports</h2>
            <Link to="/map" className="text-primary hover:underline font-medium text-sm">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentReports.map(report => (
              <ReportCard key={report.id} report={report} compact />
            ))}
          </div>
        </section>
        
        {/* Map View */}
        <section className="pt-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Issue Map</h2>
            <Link to="/map" className="text-primary hover:underline font-medium text-sm">
              Full Map View
            </Link>
          </div>
          <MapView />
        </section>
        
        {/* Statistics */}
        <section className="pt-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Statistics</h2>
            <Link to="/stats" className="text-primary hover:underline font-medium text-sm">
              Detailed Analysis
            </Link>
          </div>
          <StatsCard />
        </section>
      </div>
    </MainLayout>
  );
};

interface StatsOverviewCardProps {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const StatsOverviewCard: React.FC<StatsOverviewCardProps> = ({ 
  title, 
  value, 
  description, 
  icon, 
  color 
}) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
    <div className="flex items-start">
      <div className={`p-2 rounded-lg ${color}`}>
        {icon}
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </div>
    </div>
  </div>
);

export default Index;
