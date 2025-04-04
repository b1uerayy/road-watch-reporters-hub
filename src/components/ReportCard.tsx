
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, MapPin, ArrowUp, ArrowDown } from 'lucide-react';
import { type Report } from '../utils/mockData';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ReportCardProps {
  report: Report;
  compact?: boolean;
}

const ReportCard: React.FC<ReportCardProps> = ({ report, compact = false }) => {
  const formattedDate = new Date(report.timestamp).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Reported': return 'bg-status-reported';
      case 'Under Review': return 'bg-status-review';
      case 'Repair Scheduled': return 'bg-status-scheduled';
      case 'Fixed': return 'bg-status-fixed';
      default: return 'bg-gray-400';
    }
  };
  
  const renderStatusBadge = () => {
    let bgColor;
    switch(report.status) {
      case 'Reported': bgColor = 'bg-red-500'; break;
      case 'Under Review': bgColor = 'bg-amber-500'; break;
      case 'Repair Scheduled': bgColor = 'bg-blue-500'; break;
      case 'Fixed': bgColor = 'bg-emerald-500'; break;
      default: bgColor = 'bg-gray-500';
    }
    
    return (
      <Badge className={`${bgColor} text-white`}>
        {report.status}
      </Badge>
    );
  };

  if (compact) {
    return (
      <Link to={`/report/${report.id}`} className="block">
        <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden">
          <div className="relative">
            <img 
              src={report.imageUrl} 
              alt={report.title}
              className="w-full h-40 object-cover"
            />
            <div className="absolute top-2 right-2">
              {renderStatusBadge()}
            </div>
          </div>
          <div className="p-3">
            <h3 className="font-semibold text-gray-900 line-clamp-1">{report.title}</h3>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <MapPin size={14} className="mr-1" />
              <span className="line-clamp-1">{report.location.address}</span>
            </div>
            <div className="flex justify-between items-center mt-2 text-xs">
              <span>{formattedDate}</span>
              <div className="flex items-center">
                <MessageSquare size={14} className="mr-1" />
                <span>{report.comments.length}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden animate-fade-in">
      <div className="relative">
        <img 
          src={report.imageUrl}
          alt={report.title}
          className="w-full h-48 sm:h-56 md:h-64 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h2 className="text-white font-bold text-xl">{report.title}</h2>
          <div className="flex items-center text-white text-sm mt-1">
            <MapPin size={14} className="mr-1" />
            <span className="truncate">{report.location.address}</span>
          </div>
        </div>
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {renderStatusBadge()}
          <Badge variant="secondary" className="whitespace-nowrap">
            {report.reportCount} {report.reportCount === 1 ? 'report' : 'reports'}
          </Badge>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <img 
              src={report.userProfileImage}
              alt={report.userName}
              className="w-8 h-8 rounded-full mr-2 object-cover"
            />
            <div>
              <p className="font-medium text-sm">{report.userName}</p>
              <p className="text-xs text-gray-500">{formattedDate}</p>
            </div>
          </div>
          <Link to={`/report/${report.id}`}>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </Link>
        </div>
        
        <p className="text-gray-700 line-clamp-2 mb-3">{report.description}</p>
        
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
          <h4 className="font-medium text-sm mb-2">Road Information</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex flex-col">
              <span className="text-gray-500 text-xs">Road ID</span>
              <span className="font-medium">{report.roadInfo.id}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 text-xs">Type</span>
              <span className="font-medium">{report.roadInfo.type}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 text-xs">Contractor</span>
              <span className="font-medium">{report.roadInfo.contractor}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 text-xs">Construction Year</span>
              <span className="font-medium">{report.roadInfo.constructionYear}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 text-xs">Last Repaired</span>
              <span className="font-medium">{report.roadInfo.lastRepaired}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 text-xs">Estimated Cost</span>
              <span className="font-medium">{report.roadInfo.estimatedCost}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 border-t pt-3">
          <div className="flex justify-between">
            <span className="text-sm font-medium">{report.comments.length} Comments</span>
            <div className="flex gap-2">
              <button className="text-gray-600 hover:text-blue-600 text-sm flex items-center">
                <ArrowUp size={16} className="mr-1" />
                Upvote
              </button>
              <button className="text-gray-600 hover:text-red-600 text-sm flex items-center">
                <ArrowDown size={16} className="mr-1" />
                Downvote
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
