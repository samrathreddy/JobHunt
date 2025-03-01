import React, { useState, useMemo } from 'react';
import { Search, MapPin, Building, Clock, BookmarkPlus, SlidersHorizontal, ChevronDown } from 'lucide-react';

const JobsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Mock data for demonstration
  const jobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      type: 'Full-time',
      experience: 'Senior Level',
      posted: '2 days ago',
      description: 'We are looking for an experienced Frontend Developer to join our team. The ideal candidate will have strong experience with React, TypeScript, and modern web technologies.\n\nResponsibilities:\n• Develop new user-facing features\n• Build reusable components and libraries\n• Optimize applications for maximum performance\n\nRequirements:\n• 5+ years of experience with JavaScript/TypeScript\n• Strong proficiency in React.js and its ecosystem\n• Experience with modern frontend build pipelines and tools\n• Understanding of server-side rendering and its benefits\n\nBenefits:\n• Competitive salary\n• Health, dental, and vision insurance\n• Flexible working hours\n• Remote work options\n• Professional development budget',
      salary: '$130,000 - $180,000',
      logo: 'https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80'
    },
    {
      id: 2,
      title: 'Backend Engineer',
      company: 'StartupX',
      location: 'Remote',
      type: 'Full-time',
      experience: 'Mid Level',
      posted: '1 day ago',
      description: 'Join our fast-growing startup as a Backend Engineer. You will be responsible for developing and maintaining our core API services.\n\nResponsibilities:\n• Design and implement scalable backend services\n• Work with databases and caching systems\n• Collaborate with frontend teams\n\nRequirements:\n• 3+ years of backend development experience\n• Strong knowledge of Node.js and TypeScript\n• Experience with SQL and NoSQL databases\n• Understanding of microservices architecture\n\nBenefits:\n• Competitive salary\n• Equity package\n• Flexible working hours\n• Remote-first culture',
      salary: '$100,000 - $140,000',
      logo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80'
    },
    {
      id: 3,
      title: 'Frontend Engineer',
      company: 'InnovateCo',
      location: 'New York, NY',
      type: 'Part-time',
      experience: 'Entry Level',
      posted: '3 days ago',
      description: 'Looking for a talented Frontend Engineer to join our team. This is a great opportunity for someone starting their career in web development.\n\nResponsibilities:\n• Implement user interface components\n• Work with designers to implement pixel-perfect designs\n• Write clean, maintainable code\n\nRequirements:\n• 1+ years of experience with React\n• Strong HTML, CSS, and JavaScript skills\n• Good understanding of responsive design\n• Passion for learning and growth\n\nBenefits:\n• Competitive hourly rate\n• Flexible schedule\n• Mentorship program\n• Growth opportunities',
      salary: '$40-60/hour',
      logo: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80'
    }
  ];

  // Filter and sort jobs
  const filteredJobs = useMemo(() => {
    let filtered = [...jobs];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Job type filter
    if (selectedJobTypes.length > 0) {
      filtered = filtered.filter(job => selectedJobTypes.includes(job.type));
    }

    // Experience level filter
    if (selectedExperience.length > 0) {
      filtered = filtered.filter(job => selectedExperience.includes(job.experience));
    }

    // Sorting
    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => parseInt(a.posted) - parseInt(b.posted));
        break;
      case 'relevance':
      default:
        // For demo purposes, relevance is the default order
        break;
    }

    return filtered;
  }, [searchTerm, selectedJobTypes, selectedExperience, sortBy]);

  // Set first job as selected by default
  React.useEffect(() => {
    if (filteredJobs.length > 0 && selectedJob === null) {
      setSelectedJob(filteredJobs[0].id);
    }
  }, [filteredJobs]);

  const selectedJobDetails = jobs.find(job => job.id === selectedJob);

  const toggleJobType = (type: string) => {
    setSelectedJobTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const toggleExperience = (level: string) => {
    setSelectedExperience(prev =>
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Bar with Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for jobs, companies, or keywords..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="relevance">Most Relevant</option>
              <option value="recent">Most Recent</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <SlidersHorizontal className="h-5 w-5" />
            Filters
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Job Type</h3>
                <div className="space-x-2">
                  {['Full-time', 'Part-time', 'Contract'].map(type => (
                    <button
                      key={type}
                      onClick={() => toggleJobType(type)}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedJobTypes.includes(type)
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Experience Level</h3>
                <div className="space-x-2">
                  {['Entry Level', 'Mid Level', 'Senior Level'].map(level => (
                    <button
                      key={level}
                      onClick={() => toggleExperience(level)}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedExperience.includes(level)
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className={`bg-white rounded-lg p-6 cursor-pointer transition-all ${
                selectedJob === job.id
                  ? 'ring-2 ring-blue-500 shadow-md'
                  : 'hover:shadow-md border border-gray-200'
              }`}
              onClick={() => setSelectedJob(job.id)}
            >
              <div className="flex items-start">
                <img
                  src={job.logo}
                  alt={`${job.company} logo`}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="ml-4 flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <Building className="h-4 w-4 mr-1" />
                        {job.company}
                        <MapPin className="h-4 w-4 ml-4 mr-1" />
                        {job.location}
                        <Clock className="h-4 w-4 ml-4 mr-1" />
                        {job.posted}
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700">
                      <BookmarkPlus className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="mt-4 flex items-center space-x-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {job.type}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      {job.experience}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Job Details */}
        <div className="lg:sticky lg:top-8 h-fit">
          {selectedJobDetails ? (
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <img
                    src={selectedJobDetails.logo}
                    alt={`${selectedJobDetails.company} logo`}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedJobDetails.title}</h2>
                    <div className="mt-1 text-gray-500">
                      {selectedJobDetails.company} • {selectedJobDetails.location}
                    </div>
                    <div className="mt-2 text-blue-600 font-medium">
                      {selectedJobDetails.salary}
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Apply Now
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {selectedJobDetails.type}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {selectedJobDetails.experience}
                  </span>
                  <span className="text-gray-500 text-sm">
                    Posted {selectedJobDetails.posted}
                  </span>
                </div>

                <div className="prose max-w-none">
                  {selectedJobDetails.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-600 whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center text-gray-500">
              Select a job to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobsPage;