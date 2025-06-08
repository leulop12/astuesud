import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, Eye, Users, Lock, Tag, Calendar, User as UserIcon, FileText } from 'lucide-react';
import { User, FileItem, SearchFilters } from '../../types';
import { mockFiles, mockCourses, resourceTypes, departments } from '../../data/mockData';
import { mockUsers } from '../../utils/auth';

interface FileBrowserProps {
  currentUser: User;
}

const FileBrowser: React.FC<FileBrowserProps> = ({ currentUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'downloads' | 'name'>('date');

  const filteredFiles = useMemo(() => {
    let files = mockFiles.filter(file => {
      // Access control
      if (file.visibility === 'Private' && file.uploadedBy !== currentUser.id) {
        return false;
      }
      if (file.visibility === 'Class Only' && !currentUser.enrolledCourses.includes(file.courseCode)) {
        return false;
      }

      // Search filters
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesName = file.name.toLowerCase().includes(searchLower);
        const matchesTags = file.tags.some(tag => tag.toLowerCase().includes(searchLower));
        const matchesDescription = file.description?.toLowerCase().includes(searchLower);
        if (!matchesName && !matchesTags && !matchesDescription) {
          return false;
        }
      }

      if (filters.courseCode && file.courseCode !== filters.courseCode) {
        return false;
      }
      if (filters.resourceType && file.resourceType !== filters.resourceType) {
        return false;
      }
      if (filters.uploadedBy && file.uploadedBy !== filters.uploadedBy) {
        return false;
      }

      return true;
    });

    // Sort files
    files.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
        case 'downloads':
          return b.downloadCount - a.downloadCount;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return files;
  }, [searchTerm, filters, sortBy, currentUser]);

  const handleDownload = (file: FileItem) => {
    // In a real app, this would handle the actual download
    console.log('Downloading file:', file.name);
    // Update download count (mock)
    file.downloadCount += 1;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('word')) return '📝';
    if (type.includes('powerpoint')) return '📊';
    if (type.includes('image')) return '🖼️';
    return '📁';
  };

  const getVisibilityIcon = (visibility: FileItem['visibility']) => {
    switch (visibility) {
      case 'Public': return <Eye className="w-4 h-4 text-green-500" />;
      case 'Class Only': return <Users className="w-4 h-4 text-blue-500" />;
      case 'Private': return <Lock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Files</h1>
        <p className="text-gray-600">Discover and download files shared by your classmates</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search files, tags, or descriptions..."
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'downloads' | 'name')}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="date">Sort by Date</option>
            <option value="downloads">Sort by Downloads</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
              <select
                value={filters.courseCode || ''}
                onChange={(e) => setFilters(prev => ({ ...prev, courseCode: e.target.value || undefined }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Courses</option>
                {mockCourses.map((course) => (
                  <option key={course.code} value={course.code}>
                    {course.code} - {course.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Resource Type</label>
              <select
                value={filters.resourceType || ''}
                onChange={(e) => setFilters(prev => ({ ...prev, resourceType: e.target.value || undefined }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                {resourceTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Uploaded By</label>
              <select
                value={filters.uploadedBy || ''}
                onChange={(e) => setFilters(prev => ({ ...prev, uploadedBy: e.target.value || undefined }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Students</option>
                {mockUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.firstName} {user.lastName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Found {filteredFiles.length} file{filteredFiles.length !== 1 ? 's' : ''}
        </p>
        <div className="text-sm text-gray-500">
          Showing results you have access to
        </div>
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredFiles.map((file) => {
          const uploader = mockUsers.find(u => u.id === file.uploadedBy);
          const course = mockCourses.find(c => c.code === file.courseCode);
          
          return (
            <div key={file.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{getFileIcon(file.type)}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{file.name}</h3>
                    <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getVisibilityIcon(file.visibility)}
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <FileText className="w-4 h-4" />
                    <span>{file.courseCode}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Tag className="w-4 h-4" />
                    <span>{file.resourceType}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <UserIcon className="w-4 h-4" />
                    <span>{uploader?.firstName} {uploader?.lastName}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(file.uploadedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {file.description && (
                  <p className="text-sm text-gray-600">{file.description}</p>
                )}

                {file.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {file.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Download className="w-4 h-4" />
                  <span>{file.downloadCount} downloads</span>
                </div>
                <button
                  onClick={() => handleDownload(file)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredFiles.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No files found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  );
};

export default FileBrowser;