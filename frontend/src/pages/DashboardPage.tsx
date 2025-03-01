import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Briefcase, 
  BookmarkCheck, 
  Bell, 
  Settings, 
  ChevronRight,
  Calendar
} from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('applications');

  // Mock data (replace with real data later)
  const recentApplications = [
    { id: 1, role: 'Senior React Developer', company: 'Tech Corp', status: 'Under Review', date: '2024-03-15' },
    { id: 2, role: 'Frontend Engineer', company: 'Innovation Labs', status: 'Interviewed', date: '2024-03-14' },
    { id: 3, role: 'Full Stack Developer', company: 'StartUp Inc', status: 'Applied', date: '2024-03-13' },
  ];

  const savedJobs = [
    { id: 1, role: 'UI/UX Designer', company: 'Design Studio', location: 'Remote', salary: '$90k - $120k' },
    { id: 2, role: 'Product Manager', company: 'Tech Giants', location: 'New York', salary: '$110k - $150k' },
    { id: 3, role: 'DevOps Engineer', company: 'Cloud Services', location: 'San Francisco', salary: '$130k - $160k' },
  ];

  const notifications = [
    { id: 1, message: 'Interview scheduled with Tech Corp', time: '2 hours ago', type: 'interview' },
    { id: 2, message: 'New message from Innovation Labs', time: '1 day ago', type: 'message' },
    { id: 3, message: 'Application viewed by StartUp Inc', time: '2 days ago', type: 'view' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.email?.split('@')[0]}</h1>
              <p className="text-gray-600 mt-1">Here's what's happening with your job search</p>
            </div>
            <div className="flex space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                <Bell className="h-6 w-6" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                <Settings className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                <h3 className="text-xl font-bold text-gray-900">24</h3>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <BookmarkCheck className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Interviews Scheduled</p>
                <h3 className="text-xl font-bold text-gray-900">5</h3>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Saved Jobs</p>
                <h3 className="text-xl font-bold text-gray-900">12</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('applications')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'applications'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Recent Applications
              </button>
              <button
                onClick={() => setActiveTab('saved')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'saved'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Saved Jobs
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'notifications'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Notifications
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'applications' && (
              <div className="space-y-6">
                {recentApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors duration-150">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{app.role}</h3>
                      <p className="text-sm text-gray-600">{app.company}</p>
                    </div>
                    <div className="flex items-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        app.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                        app.status === 'Interviewed' ? 'bg-green-100 text-green-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {app.status}
                      </span>
                      <ChevronRight className="h-5 w-5 text-gray-400 ml-4" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'saved' && (
              <div className="space-y-6">
                {savedJobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors duration-150">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{job.role}</h3>
                      <p className="text-sm text-gray-600">{job.company}</p>
                      <div className="flex items-center mt-2 space-x-4">
                        <span className="text-sm text-gray-500">{job.location}</span>
                        <span className="text-sm text-gray-500">{job.salary}</span>
                      </div>
                    </div>
                    <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-150">
                      Apply Now
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                {notifications.map((notif) => (
                  <div key={notif.id} className="flex items-start p-4 hover:bg-gray-50 rounded-lg transition-colors duration-150">
                    <div className={`p-2 rounded-full ${
                      notif.type === 'interview' ? 'bg-green-100' :
                      notif.type === 'message' ? 'bg-blue-100' :
                      'bg-yellow-100'
                    }`}>
                      <Bell className={`h-5 w-5 ${
                        notif.type === 'interview' ? 'text-green-600' :
                        notif.type === 'message' ? 'text-blue-600' :
                        'text-yellow-600'
                      }`} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">{notif.message}</p>
                      <p className="text-sm text-gray-500">{notif.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 