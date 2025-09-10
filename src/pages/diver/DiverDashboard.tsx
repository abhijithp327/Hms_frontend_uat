import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, FileText, Users, AlertTriangle, Package, Clock, MapPin, Briefcase, Eye, Wrench } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Report {
  id: number;
  type: 'Diving Job' | 'Marine Fouling' | 'Tool Delivery' | 'Leave Application' | 'Duty Slip';
  title: string;
  date: string;
  status: 'Completed' | 'In Progress' | 'Pending' | 'Approved' | 'Rejected';
  location?: string;
  priority?: 'Low' | 'Medium' | 'High' | 'Critical';
  assignee?: string;
}

interface QuickStat {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
  pendingCount: number;
}

const DiverDashboard: React.FC = () => {

  const navigate = useNavigate();

  const [filter, setFilter] = useState<string>('all');

  // Quick Stats Data
  const quickStats: QuickStat[] = [
    {
      title: 'Diver Job Reports',
      value: 12,
      icon: Briefcase,
      color: 'text-blue-900',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      pendingCount: 2
    },
    {
      title: 'Join Duty Slip',
      value: 247,
      icon: FileText,
      color: 'text-green-900',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      pendingCount: 5
    },
    {
      title: 'Leave Applications',
      value: 8,
      icon: AlertTriangle,
      color: 'text-orange-900',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      pendingCount: 10,
    },
    {
      title: 'Marine Fouling Reports',
      value: 34,
      icon: Package,
      color: 'text-purple-900',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      pendingCount: 5
    },
    {
      title: 'Tool List / Delivery Note',
      value: 34,
      icon: Wrench,
      color: 'text-purple-900',
      bgColor: 'bg-red-100',
      borderColor: 'border-purple-200',
      pendingCount: 8,
    }
  ];

  // Recent Reports Data
  const recentReports: Report[] = [
    {
      id: 1,
      type: 'Diving Job',
      title: 'Underwater Hull Inspection - Vessel MV Atlantic',
      date: '2024-01-15',
      status: 'Completed',
      location: 'Harbor Bay - Dock 3',
      priority: 'High',
      assignee: 'John Smith'
    },
    {
      id: 2,
      type: 'Marine Fouling',
      title: 'Hull Cleaning Assessment - Cargo Ship Neptune',
      date: '2024-01-14',
      status: 'In Progress',
      location: 'Port Marina - Berth 7',
      priority: 'Critical',
      assignee: 'Sarah Wilson'
    },
    {
      id: 3,
      type: 'Tool Delivery',
      title: 'Underwater Welding Equipment Request',
      date: '2024-01-13',
      status: 'Pending',
      location: 'Workshop - Storage Unit 5',
      priority: 'Medium',
      assignee: 'Mike Johnson'
    },
    {
      id: 4,
      type: 'Duty Slip',
      title: 'Night Shift Coverage Request',
      date: '2024-01-12',
      status: 'Approved',
      priority: 'Low',
      assignee: 'Emma Davis'
    },
    {
      id: 5,
      type: 'Leave Application',
      title: 'Medical Leave Request',
      date: '2024-01-11',
      status: 'Approved',
      priority: 'High',
      assignee: 'Robert Brown'
    },
    {
      id: 6,
      type: 'Diving Job',
      title: 'Emergency Propeller Repair - Ferry Express',
      date: '2024-01-10',
      status: 'Completed',
      location: 'Emergency Dock - Pier 1',
      priority: 'Critical',
      assignee: 'Alex Turner'
    }
  ];

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'Completed':
      case 'Approved':
        return 'default';
      case 'In Progress':
        return 'secondary';
      case 'Pending':
        return 'outline';
      case 'Rejected':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getPriorityVariant = (priority?: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (priority) {
      case 'Critical':
        return 'destructive';
      case 'High':
        return 'default';
      case 'Medium':
        return 'secondary';
      case 'Low':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Driving Job':
        return <Briefcase className="h-4 w-4" />;
      case 'Marine Fouling':
        return <AlertTriangle className="h-4 w-4" />;
      case 'Tool Delivery':
        return <Package className="h-4 w-4" />;
      case 'Duty Slip':
        return <Calendar className="h-4 w-4" />;
      case 'Leave Application':
        return <Users className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const filteredReports = recentReports.filter(report => {
    if (filter === 'all') return true;
    return report.type === filter;
  });

  const reportTypes = ['all', 'Driving Job', 'Marine Fouling', 'Tool Delivery', 'Duty Slip', 'Leave Application'];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
            <p className="text-gray-600">Monitor your diving operations and track progress</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {quickStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className={`relative ${stat.bgColor} ${stat.borderColor} hover:shadow-md transition-shadow`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className={`${stat.color.replace('900', '600')} text-sm font-medium mb-1`}>
                      {stat.title}
                    </p>
                    <p className={`text-3xl font-bold ${stat.color} mb-2`}>
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor.replace('50', '100')}`}>
                    <IconComponent className={`h-6 w-6 ${stat.color.replace('900', '600')}`} />
                  </div>
                </div>
              </CardContent>
              {/* Add the new conditional pending count badge at the bottom of the Card */}
              {stat.pendingCount && stat.pendingCount > 0 && (
                <div className="p-4 pt-0">
                  <Badge variant="outline" className="text-xs font-medium text-amber-600 bg-amber-50">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    {stat.pendingCount} Pending
                  </Badge>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Recent Reports Section */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl font-bold">Recent Reports</CardTitle>
              <CardDescription>Latest activity across all operations</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="w-fit" onClick={() => { navigate('/diver-reports') }}>
              <Eye className="h-4 w-4 mr-2" />
              View All Reports
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-6 p-1 bg-gray-100 rounded-lg">
            {reportTypes.map((type) => (
              <Button
                key={type}
                variant={filter === type ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilter(type)}
                className={`text-xs ${filter === type
                  ? 'bg-primary shadow-sm'
                  : 'hover:bg-gray-200'
                  }`}
              >
                {type === 'all' ? 'All Reports' : type}
              </Button>
            ))}
          </div>

          {/* Reports List */}
          <div className="space-y-4 p-0">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="mt-1">
                        {getTypeIcon(report.type)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{report.title}</h4>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {report.date}
                          </div>
                          {report.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {report.location}
                            </div>
                          )}
                          {report.assignee && (
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {report.assignee}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusVariant(report.status)} className="text-xs">
                      {report.status}
                    </Badge>
                    {report.priority && (
                      <Badge variant={getPriorityVariant(report.priority)} className="text-xs">
                        {report.priority}
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs">
                      {report.type}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredReports.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No reports found for the selected filter.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DiverDashboard;