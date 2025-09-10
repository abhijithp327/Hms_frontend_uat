import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Calendar, FileText, Users, AlertTriangle, Package, MapPin, 
  Briefcase, Search, Filter, ChevronLeft, ChevronRight, Clock
} from 'lucide-react';

interface Report {
  id: number;
  type: 'Driving Job' | 'Marine Fouling' | 'Tool Delivery' | 'Leave Application' | 'Duty Slip';
  title: string;
  date: string;
  status: 'Completed' | 'In Progress' | 'Pending' | 'Approved' | 'Rejected';
  location?: string;
  priority?: 'Low' | 'Medium' | 'High' | 'Critical';
  assignee?: string;
  description?: string;
  duration?: string;
}

const DiverAllReports: React.FC = () => {
  // Reports page states
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');
  const [currentReportPage, setCurrentReportPage] = useState<number>(1);
  const reportsPerPage = 10;

  // Enhanced sample data with more reports
  const allReports: Report[] = [
    {
      id: 1,
      type: 'Driving Job',
      title: 'Underwater Hull Inspection - Vessel MV Atlantic',
      date: '2024-01-15',
      status: 'Completed',
      location: 'Harbor Bay - Dock 3',
      priority: 'High',
      assignee: 'John Smith',
      description: 'Complete hull inspection including propeller and rudder assessment',
      duration: '4 hours'
    },
    {
      id: 2,
      type: 'Marine Fouling',
      title: 'Hull Cleaning Assessment - Cargo Ship Neptune',
      date: '2024-01-14',
      status: 'In Progress',
      location: 'Port Marina - Berth 7',
      priority: 'Critical',
      assignee: 'Sarah Wilson',
      description: 'Marine growth removal and anti-fouling coating inspection',
      duration: '6 hours'
    },
    {
      id: 3,
      type: 'Tool Delivery',
      title: 'Underwater Welding Equipment Request',
      date: '2024-01-13',
      status: 'Pending',
      location: 'Workshop - Storage Unit 5',
      priority: 'Medium',
      assignee: 'Mike Johnson',
      description: 'Delivery of welding rods and underwater cutting tools',
      duration: '1 hour'
    },
    {
      id: 4,
      type: 'Duty Slip',
      title: 'Night Shift Coverage Request',
      date: '2024-01-12',
      status: 'Approved',
      priority: 'Low',
      assignee: 'Emma Davis',
      description: 'Emergency duty coverage for night operations',
      duration: '8 hours'
    },
    {
      id: 5,
      type: 'Leave Application',
      title: 'Medical Leave Request',
      date: '2024-01-11',
      status: 'Approved',
      priority: 'High',
      assignee: 'Robert Brown',
      description: 'Medical leave for routine health checkup',
      duration: 'N/A'
    },
    {
      id: 6,
      type: 'Driving Job',
      title: 'Emergency Propeller Repair - Ferry Express',
      date: '2024-01-10',
      status: 'Completed',
      location: 'Emergency Dock - Pier 1',
      priority: 'Critical',
      assignee: 'Alex Turner',
      description: 'Emergency repair of damaged propeller blade',
      duration: '3 hours'
    },
    {
      id: 7,
      type: 'Marine Fouling',
      title: 'Barnacle Removal - Yacht Serenity',
      date: '2024-01-09',
      status: 'Completed',
      location: 'Marina Bay - Slip 15',
      priority: 'Medium',
      assignee: 'Lisa Chen',
      description: 'Complete barnacle and marine growth removal',
      duration: '5 hours'
    },
    {
      id: 8,
      type: 'Tool Delivery',
      title: 'Diving Equipment Maintenance',
      date: '2024-01-08',
      status: 'In Progress',
      location: 'Dive Center - Equipment Room',
      priority: 'High',
      assignee: 'David Park',
      description: 'Routine maintenance of diving gear and safety equipment',
      duration: '3 hours'
    },
    {
      id: 9,
      type: 'Duty Slip',
      title: 'Weekend Emergency Standby',
      date: '2024-01-07',
      status: 'Completed',
      priority: 'Medium',
      assignee: 'Jennifer White',
      description: 'Emergency standby duty for weekend operations',
      duration: '12 hours'
    },
    {
      id: 10,
      type: 'Leave Application',
      title: 'Annual Leave Request',
      date: '2024-01-06',
      status: 'Pending',
      priority: 'Low',
      assignee: 'Mark Thompson',
      description: 'Annual vacation leave request',
      duration: 'N/A'
    },
    {
      id: 11,
      type: 'Driving Job',
      title: 'Anchor Chain Inspection - Cargo Vessel',
      date: '2024-01-05',
      status: 'Completed',
      location: 'Port Authority - Berth 12',
      priority: 'High',
      assignee: 'Rachel Green',
      description: 'Detailed inspection of anchor chain and windlass system',
      duration: '4 hours'
    },
    {
      id: 12,
      type: 'Marine Fouling',
      title: 'Hull Survey - Research Vessel',
      date: '2024-01-04',
      status: 'In Progress',
      location: 'Research Station - Dock A',
      priority: 'Medium',
      assignee: 'Tom Wilson',
      description: 'Pre-voyage hull condition survey and cleaning',
      duration: '6 hours'
    },
    {
      id: 13,
      type: 'Tool Delivery',
      title: 'Hydraulic Tools Calibration',
      date: '2024-01-03',
      status: 'Completed',
      location: 'Technical Workshop - Bay 2',
      priority: 'High',
      assignee: 'Chris Martinez',
      description: 'Calibration and testing of hydraulic cutting tools',
      duration: '2 hours'
    },
    {
      id: 14,
      type: 'Driving Job',
      title: 'Underwater Photography - Survey Mission',
      date: '2024-01-02',
      status: 'Completed',
      location: 'Offshore Platform - Section C',
      priority: 'Medium',
      assignee: 'Nina Rodriguez',
      description: 'Photographic documentation of underwater structures',
      duration: '5 hours'
    },
    {
      id: 15,
      type: 'Duty Slip',
      title: 'Holiday Coverage Assignment',
      date: '2024-01-01',
      status: 'Approved',
      priority: 'Low',
      assignee: 'Kevin Lee',
      description: 'Holiday season emergency response coverage',
      duration: '10 hours'
    },
    {
      id: 16,
      type: 'Marine Fouling',
      title: 'Antifouling Paint Assessment - Tanker',
      date: '2023-12-31',
      status: 'Pending',
      location: 'Dry Dock - Station 4',
      priority: 'Critical',
      assignee: 'Amanda Foster',
      description: 'Assessment of antifouling paint effectiveness and condition',
      duration: '7 hours'
    },
    {
      id: 17,
      type: 'Leave Application',
      title: 'Training Course Attendance',
      date: '2023-12-30',
      status: 'Approved',
      priority: 'Medium',
      assignee: 'Brian Cooper',
      description: 'Advanced underwater welding certification course',
      duration: 'N/A'
    },
    {
      id: 18,
      type: 'Driving Job',
      title: 'Cable Inspection - Submarine Cable',
      date: '2023-12-29',
      status: 'In Progress',
      location: 'Offshore Site - Grid Reference 42',
      priority: 'Critical',
      assignee: 'Helen Zhang',
      description: 'Inspection of underwater communication cable integrity',
      duration: '8 hours'
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

  // Filter and search logic
  const filteredReports = useMemo(() => {
    return allReports.filter(report => {
      const matchesType = filter === 'all' || report.type === filter;
      const matchesSearch = searchTerm === '' || 
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.assignee?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.location?.toLowerCase().includes(searchTerm.toLowerCase());
      
      let matchesDate = true;
      if (dateFrom && dateTo) {
        const reportDate = new Date(report.date);
        const fromDate = new Date(dateFrom);
        const toDate = new Date(dateTo);
        matchesDate = reportDate >= fromDate && reportDate <= toDate;
      }
      
      return matchesType && matchesSearch && matchesDate;
    });
  }, [allReports, filter, searchTerm, dateFrom, dateTo]);

  // Pagination logic
  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);
  const paginatedReports = filteredReports.slice(
    (currentReportPage - 1) * reportsPerPage,
    currentReportPage * reportsPerPage
  );

  const reportTypes = ['all', 'Driving Job', 'Marine Fouling', 'Tool Delivery', 'Duty Slip', 'Leave Application'];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">All Reports</h1>
            <p className="text-gray-600">Comprehensive view of all diving operations reports</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <Card className="bg-blue-50 border-blue-200 hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-blue-600 text-sm font-medium mb-1">Total Reports</p>
                <p className="text-3xl font-bold text-blue-900 mb-2">{allReports.length}</p>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-600">All time</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200 hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-green-600 text-sm font-medium mb-1">Completed</p>
                <p className="text-3xl font-bold text-green-900 mb-2">
                  {allReports.filter(r => r.status === 'Completed').length}
                </p>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-600">
                    {Math.round((allReports.filter(r => r.status === 'Completed').length / allReports.length) * 100)}% completion rate
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <Briefcase className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200 hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-orange-600 text-sm font-medium mb-1">In Progress</p>
                <p className="text-3xl font-bold text-orange-900 mb-2">
                  {allReports.filter(r => r.status === 'In Progress').length}
                </p>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-600">Active tasks</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-orange-100">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200 hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-purple-600 text-sm font-medium mb-1">Filtered Results</p>
                <p className="text-3xl font-bold text-purple-900 mb-2">{filteredReports.length}</p>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-600">Current view</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <Filter className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Filters & Search</CardTitle>
          <CardDescription>Filter and search through all reports</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="Search reports by title, assignee, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <div className="flex flex-wrap gap-2 p-1 bg-gray-100 rounded-lg">
              {reportTypes.map((type) => (
                <Button
                  key={type}
                  variant={filter === type ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setFilter(type)}
                  className={`text-xs ${
                    filter === type 
                      ? 'bg-primary shadow-sm' 
                      : 'hover:bg-gray-200'
                  }`}
                >
                  {type === 'all' ? 'All Types' : type}
                </Button>
              ))}
            </div>
          </div>

          {/* Date Range Filter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
          </div>

          {/* Clear Filters */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm text-gray-600">
              Showing {filteredReports.length} of {allReports.length} reports
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setFilter('all');
                setSearchTerm('');
                setDateFrom('');
                setDateTo('');
                setCurrentReportPage(1);
              }}
            >
              <Filter className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">Reports Overview</CardTitle>
          <CardDescription>Detailed view of all reports with comprehensive information</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Report Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assignee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {getTypeIcon(report.type)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{report.title}</div>
                          <div className="text-sm text-gray-500 mt-1">
                            <div className="flex items-center gap-1 mb-1">
                              <Calendar className="h-3 w-3" />
                              {report.date}
                            </div>
                            {report.location && (
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {report.location}
                              </div>
                            )}
                          </div>
                          {report.description && (
                            <div className="text-xs text-gray-400 mt-2 max-w-xs">
                              {report.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="outline" className="text-xs">
                        {report.type}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStatusVariant(report.status)} className="text-xs">
                        {report.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {report.priority && (
                        <Badge variant={getPriorityVariant(report.priority)} className="text-xs">
                          {report.priority}
                        </Badge>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {report.assignee}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.duration}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredReports.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 mb-2">No reports found matching your criteria.</p>
              <p className="text-sm text-gray-400">Try adjusting your filters or search terms.</p>
            </div>
          )}

          {/* Pagination */}
          {filteredReports.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing {((currentReportPage - 1) * reportsPerPage) + 1} to {Math.min(currentReportPage * reportsPerPage, filteredReports.length)} of {filteredReports.length} results
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentReportPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentReportPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <span className="text-sm text-gray-700">
                    Page {currentReportPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentReportPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentReportPage === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DiverAllReports;