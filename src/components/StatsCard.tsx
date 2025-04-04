
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  weeklyStats, 
  topRoads, 
  totalReports, 
  fixedReports, 
  inProgressReports 
} from '../utils/mockData';

const StatsCard: React.FC = () => {
  // Prepare data for chart
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const maxValue = Math.max(...weeklyStats);
  
  // Calculate percentages
  const fixedPercentage = Math.round((fixedReports / totalReports) * 100);
  const inProgressPercentage = Math.round((inProgressReports / totalReports) * 100);
  const reportedPercentage = 100 - fixedPercentage - inProgressPercentage;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Reports Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">{totalReports}</p>
                <p className="text-sm text-gray-500">Total Reports</p>
              </div>
              <div className="flex gap-2">
                <StatusIndicator color="bg-status-fixed" label="Fixed" value={fixedPercentage} />
                <StatusIndicator color="bg-status-scheduled" label="In Progress" value={inProgressPercentage} />
                <StatusIndicator color="bg-status-reported" label="Reported" value={reportedPercentage} />
              </div>
            </div>
            
            <div className="pt-2">
              <p className="text-sm font-medium mb-2">Reports this week</p>
              <div className="flex items-end h-32 gap-1">
                {weeklyStats.map((value, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-primary/80 rounded-t" 
                      style={{ height: `${(value / maxValue) * 100}%` }}
                    ></div>
                    <span className="text-xs mt-1">{days[index]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Top Reported Roads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topRoads.map((road, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium truncate max-w-[70%]">{road.name}</span>
                  <span className="text-sm text-gray-500">{road.count} reports</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${(road.count / topRoads[0].count) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <p className="text-xs text-gray-500">Data from last 30 days</p>
        </CardFooter>
      </Card>
    </div>
  );
};

interface StatusIndicatorProps {
  color: string;
  label: string;
  value: number;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ color, label, value }) => (
  <div className="flex flex-col items-center">
    <div className="flex items-center">
      <div className={`w-3 h-3 rounded-full ${color} mr-1`}></div>
      <span className="text-sm">{value}%</span>
    </div>
    <span className="text-xs text-gray-500">{label}</span>
  </div>
);

export default StatsCard;
