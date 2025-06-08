import React from 'react';
import { User, FileItem } from '../../types';
import { BarChart3, Download, Upload, Users, TrendingUp, FileText, Clock } from 'lucide-react';
import { mockFiles, mockCourses } from '../../data/mockData';

interface DashboardProps {
  currentUser: User;
}

const Dashboard: React.FC<DashboardProps> = ({ currentUser }) => {
  // Calculate stats
  const userFiles = mockFiles.filter(file => file.uploadedBy === currentUser.id);
  const totalDownloads = userFiles.reduce((sum, file) => sum + file.downloadCount, 0);
  const recentFiles = mockFiles
    .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
    .slice(0, 5);

  const stats = [
    {
      label: 'Files Uploaded',
      value: userFiles.length,
      icon: Upload,
      color: 'bg-blue-500',
      change: '+2 this week',
    },
    {
      label: 'Total Downloads',
      value: totalDownloads,
      icon: Download,
      color: 'bg-green-500',
      change: '+15 this week',
    },
    {
      label: 'Enrolled Courses',
      value: currentUser.enrolledCourses.length,
      icon: Users,
      color: 'bg-purple-500',
      change: 'Fall 2024',
    },
    {
      label: 'Files Available',
      value: mockFiles.filter(f => 
        f.visibility === 'Public' || 
        currentUser.enrolledCourses.includes(f.courseCode)
      ).length,
      icon: FileText,
      color: 'bg-orange-500',
      change: '+5 this week',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {currentUser.firstName}!
        </h1>
        <p className="text-blue-100 text-lg">
          Ready to share knowledge and collaborate with your classmates?
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <span className="text-sm font-medium">{currentUser.academicProgram}</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <span className="text-sm font-medium">{currentUser.yearLevel}</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <span className="text-sm font-medium">{currentUser.department}</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Files */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Files</h2>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {recentFiles.map((file) => (
              <div key={file.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{file.courseCode} • {file.resourceType}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">
                    {new Date(file.uploadedAt).toLocaleDateString()}
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Download className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{file.downloadCount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enrolled Courses */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Your Courses</h2>
            <Users className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {mockCourses
              .filter(course => currentUser.enrolledCourses.includes(course.code))
              .map((course) => {
                const courseFiles = mockFiles.filter(f => f.courseCode === course.code);
                return (
                  <div key={course.code} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{course.code}</h3>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {courseFiles.length} files
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{course.name}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{course.instructor}</span>
                      <span>{course.semester}</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
            <Upload className="w-6 h-6 text-blue-600" />
            <span className="font-medium text-blue-900">Upload Files</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
            <FileText className="w-6 h-6 text-green-600" />
            <span className="font-medium text-green-900">Browse Files</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
            <Users className="w-6 h-6 text-purple-600" />
            <span className="font-medium text-purple-900">Find Classmates</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
            <TrendingUp className="w-6 h-6 text-orange-600" />
            <span className="font-medium text-orange-900">View Analytics</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;