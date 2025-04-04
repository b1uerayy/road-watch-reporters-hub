
import React from 'react';
import { currentUser, mockReports } from '../utils/mockData';
import { Camera, MapPin, MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import ReportCard from './ReportCard';

const UserProfile: React.FC = () => {
  // Filter reports by user
  const userReports = mockReports.filter(report => report.userId === currentUser.id);
  
  // Calculate next rank threshold
  let nextRankThreshold = 0;
  let progressToNextRank = 0;
  
  switch(currentUser.rank) {
    case 'Observer':
      nextRankThreshold = 50;
      progressToNextRank = (currentUser.xp / nextRankThreshold) * 100;
      break;
    case 'Reporter':
      nextRankThreshold = 150;
      progressToNextRank = ((currentUser.xp - 50) / (nextRankThreshold - 50)) * 100;
      break;
    case 'Inspector':
      nextRankThreshold = 300;
      progressToNextRank = ((currentUser.xp - 150) / (nextRankThreshold - 150)) * 100;
      break;
    default:
      progressToNextRank = 100;
  }
  
  const getRankColor = (rank: string) => {
    switch(rank) {
      case 'Observer': return 'bg-rank-observer';
      case 'Reporter': return 'bg-rank-reporter';
      case 'Inspector': return 'bg-rank-inspector';
      case 'Supervisor': return 'bg-rank-supervisor';
      default: return 'bg-gray-400';
    }
  };
  
  const getNextRank = () => {
    switch(currentUser.rank) {
      case 'Observer': return 'Reporter';
      case 'Reporter': return 'Inspector';
      case 'Inspector': return 'Supervisor';
      default: return 'Max Rank';
    }
  };
  
  const nextRank = getNextRank();
  
  return (
    <div className="animate-fade-in">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative">
            <img 
              src={currentUser.profileImage} 
              alt={currentUser.name} 
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className={`absolute -bottom-1 -right-1 ${getRankColor(currentUser.rank)} text-white p-1 rounded-full`}>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15L8.5 8L15.5 8L12 15Z" fill="currentColor"/>
              </svg>
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold">{currentUser.name}</h2>
            <p className="text-gray-500">{currentUser.email}</p>
            
            <div className="mt-4 flex flex-col md:flex-row gap-4 items-center">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold">{userReports.length}</p>
                  <p className="text-sm text-gray-500">Reports</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{currentUser.xp}</p>
                  <p className="text-sm text-gray-500">XP Points</p>
                </div>
              </div>
              
              <div className="flex-1 md:ml-6">
                <div className="flex justify-between mb-1 items-center">
                  <div className="flex items-center">
                    <Badge className={`${getRankColor(currentUser.rank)} text-white mr-2`}>
                      {currentUser.rank}
                    </Badge>
                    {nextRank !== 'Max Rank' && (
                      <span className="text-sm text-gray-500">Next: {nextRank}</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    {currentUser.xp} / {nextRankThreshold} XP
                  </span>
                </div>
                <Progress value={progressToNextRank} className="h-2" />
              </div>
            </div>
          </div>
          
          <Button variant="outline" size="sm" className="md:self-start">
            Edit Profile
          </Button>
        </div>
      </div>
      
      {/* Profile Content */}
      <Tabs defaultValue="reports">
        <TabsList className="mb-4">
          <TabsTrigger value="reports" className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            My Reports
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center">
            <Camera className="h-4 w-4 mr-1" />
            Activity
          </TabsTrigger>
          <TabsTrigger value="comments" className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-1" />
            Comments
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {userReports.length > 0 ? (
              userReports.map(report => (
                <ReportCard key={report.id} report={report} compact />
              ))
            ) : (
              <div className="col-span-full bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-gray-500">You haven't submitted any reports yet.</p>
                <Button className="mt-4">Report an Issue</Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="activity">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <p className="text-gray-500">Activity timeline will be displayed here.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="comments">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <p className="text-gray-500">Your comments will be displayed here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
