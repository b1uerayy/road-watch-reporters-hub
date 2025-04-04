
import React, { useState } from 'react';
import { MapPin, Filter } from 'lucide-react';
import { mockReports } from '../utils/mockData';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const MapView: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    reported: true,
    review: true,
    scheduled: true,
    fixed: true
  });

  // Filter reports based on status
  const filteredReports = mockReports.filter(report => {
    if (report.status === 'Reported' && filters.reported) return true;
    if (report.status === 'Under Review' && filters.review) return true;
    if (report.status === 'Repair Scheduled' && filters.scheduled) return true;
    if (report.status === 'Fixed' && filters.fixed) return true;
    return false;
  });

  const getMarkerColor = (status: string) => {
    switch(status) {
      case 'Reported': return 'bg-status-reported';
      case 'Under Review': return 'bg-status-review';
      case 'Repair Scheduled': return 'bg-status-scheduled';
      case 'Fixed': return 'bg-status-fixed';
      default: return 'bg-gray-400';
    }
  };

  const selectedReportData = selectedReport 
    ? mockReports.find(r => r.id === selectedReport) 
    : null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-[500px] relative">
      {/* Static Map Placeholder */}
      <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
        <p className="text-gray-500 font-medium">Map View (Interactive map would be integrated here)</p>
      </div>
      
      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col items-end space-y-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="shadow-md">
              <Filter className="h-4 w-4 mr-2" />
              Filter Issues
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuCheckboxItem
              checked={filters.reported}
              onCheckedChange={(checked) => setFilters({...filters, reported: checked})}
            >
              <div className="flex items-center">
                <span className="h-3 w-3 rounded-full bg-status-reported mr-2"></span>
                Reported
              </div>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.review}
              onCheckedChange={(checked) => setFilters({...filters, review: checked})}
            >
              <div className="flex items-center">
                <span className="h-3 w-3 rounded-full bg-status-review mr-2"></span>
                Under Review
              </div>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.scheduled}
              onCheckedChange={(checked) => setFilters({...filters, scheduled: checked})}
            >
              <div className="flex items-center">
                <span className="h-3 w-3 rounded-full bg-status-scheduled mr-2"></span>
                Scheduled
              </div>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.fixed}
              onCheckedChange={(checked) => setFilters({...filters, fixed: checked})}
            >
              <div className="flex items-center">
                <span className="h-3 w-3 rounded-full bg-status-fixed mr-2"></span>
                Fixed
              </div>
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Map Pins */}
      <div className="absolute inset-0">
        {filteredReports.map((report) => (
          <div 
            key={report.id}
            className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${30 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`
            }}
            onClick={() => setSelectedReport(report.id)}
          >
            <div 
              className={`${getMarkerColor(report.status)} ${selectedReport === report.id ? 'pulse-ring' : ''} text-white p-2 rounded-full flex items-center justify-center`}
            >
              <MapPin className="h-4 w-4" />
            </div>
          </div>
        ))}
      </div>
      
      {/* Selected Report Info */}
      {selectedReportData && (
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-md border border-gray-200 animate-fade-in">
          <div className="flex items-start">
            <img
              src={selectedReportData.imageUrl}
              alt={selectedReportData.title}
              className="w-20 h-20 object-cover rounded-md mr-3"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{selectedReportData.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-1 mb-1">{selectedReportData.location.address}</p>
              <div className="flex items-center justify-between">
                <div 
                  className={`${getMarkerColor(selectedReportData.status)} text-white px-2 py-0.5 rounded-full text-xs inline-flex items-center`}
                >
                  {selectedReportData.status}
                </div>
                <Button size="sm" variant="link" className="p-0 h-auto" onClick={() => setSelectedReport(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;
