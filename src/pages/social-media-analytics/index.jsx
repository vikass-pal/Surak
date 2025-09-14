import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import SocialMediaFeed from './components/SocialMediaFeed';
import WordCloudVisualization from './components/WordCloudVisualization';
import TrendAnalysisCharts from './components/TrendAnalysisCharts';
import AnalyticsFilters from './components/AnalyticsFilters';
import GeographicOverlay from './components/GeographicOverlay';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const SocialMediaAnalytics = () => {
  const [activeFilters, setActiveFilters] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState('dashboard');

  // Mock data for social media posts
  const mockPosts = [
    {
      id: 1,
      platform: 'twitter',
      username: 'mumbai_citizen',
      content: `Heavy flooding in Bandra area! Water level rising rapidly. Roads completely submerged. Avoid this route if possible. #MumbaiFloods #Emergency`,
      media: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop',
      likes: 234,
      comments: 45,
      shares: 89,
      location: 'Bandra, Mumbai',
      sentiment: 'negative',
      verificationStatus: 'pending',
      timestamp: '2 minutes ago',
      hazardType: 'flooding'
    },
    {
      id: 2,
      platform: 'instagram',
      username: 'chennai_alerts',
      content: `Tsunami warning issued for Chennai coast. Authorities advising immediate evacuation from coastal areas. Stay safe everyone! 🌊⚠️`,
      media: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
      likes: 567,
      comments: 123,
      shares: 234,
      location: 'Chennai, Tamil Nadu',
      sentiment: 'negative',
      verificationStatus: 'verified',
      timestamp: '15 minutes ago',
      hazardType: 'tsunami'
    },
    {
      id: 3,
      platform: 'twitter',
      username: 'kochi_marine',
      content: `Oil spill detected near Kochi port. Marine life at risk. Coast guard responding. Fishermen advised to avoid the area.`,
      media: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
      likes: 189,
      comments: 67,
      shares: 145,
      location: 'Kochi, Kerala',
      sentiment: 'negative',
      verificationStatus: 'investigating',
      timestamp: '1 hour ago',
      hazardType: 'oilspill'
    },
    {
      id: 4,
      platform: 'instagram',
      username: 'vizag_weather',
      content: `High waves alert for Visakhapatnam beach. Wave height reaching 4-5 meters. Beach activities suspended for safety.`,
      media: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=300&fit=crop',
      likes: 345,
      comments: 78,
      shares: 156,
      location: 'Visakhapatnam, AP',
      sentiment: 'neutral',
      verificationStatus: 'verified',
      timestamp: '3 hours ago',
      hazardType: 'highwaves'
    },
    {
      id: 5,
      platform: 'twitter',
      username: 'delhi_emergency',
      content: `Electrocution hazard reported in Connaught Place due to waterlogged streets and exposed wires. BSES team dispatched.`,
      media: null,
      likes: 123,
      comments: 34,
      shares: 67,
      location: 'New Delhi',
      sentiment: 'negative',
      verificationStatus: 'pending',
      timestamp: '4 hours ago',
      hazardType: 'electrocution'
    }
  ];

  // Mock data for trending keywords
  const mockKeywords = [
    { id: 1, text: 'flooding', frequency: 45, category: 'urban' },
    { id: 2, text: 'tsunami', frequency: 32, category: 'ocean' },
    { id: 3, text: 'emergency', frequency: 28, category: 'emergency' },
    { id: 4, text: 'evacuation', frequency: 25, category: 'safety' },
    { id: 5, text: 'highwaves', frequency: 22, category: 'ocean' },
    { id: 6, text: 'oilspill', frequency: 18, category: 'ocean' },
    { id: 7, text: 'waterlogged', frequency: 16, category: 'urban' },
    { id: 8, text: 'coastguard', frequency: 14, category: 'safety' },
    { id: 9, text: 'electrocution', frequency: 12, category: 'urban' },
    { id: 10, text: 'landslide', frequency: 10, category: 'urban' }
  ];

  // Mock data for trend analysis
  const mockTrendData = [
    { time: '00:00', oceanHazards: 12, urbanHazards: 8, emergencyAlerts: 3 },
    { time: '04:00', oceanHazards: 15, urbanHazards: 12, emergencyAlerts: 5 },
    { time: '08:00', oceanHazards: 23, urbanHazards: 18, emergencyAlerts: 8 },
    { time: '12:00', oceanHazards: 34, urbanHazards: 25, emergencyAlerts: 12 },
    { time: '16:00', oceanHazards: 28, urbanHazards: 22, emergencyAlerts: 9 },
    { time: '20:00', oceanHazards: 31, urbanHazards: 19, emergencyAlerts: 11 }
  ];

  const mockPlatformData = [
    { platform: 'Twitter', posts: 456, verified: 234 },
    { platform: 'Instagram', posts: 234, verified: 123 },
    { platform: 'Facebook', posts: 123, verified: 67 }
  ];

  const mockSentimentData = [
    { name: 'Negative', value: 45 },
    { name: 'Neutral', value: 35 },
    { name: 'Positive', value: 20 }
  ];

  const mockGeoData = [
    { location: 'Mumbai', posts: 45, severity: 'high' },
    { location: 'Chennai', posts: 32, severity: 'medium' },
    { location: 'Kochi', posts: 28, severity: 'medium' },
    { location: 'Visakhapatnam', posts: 19, severity: 'low' }
  ];

  const handleVerifyPost = (post) => {
    console.log('Verifying post:', post?.id);
    // In a real app, this would make an API call
  };

  const handleDismissPost = (post) => {
    console.log('Dismissing post:', post?.id);
    // In a real app, this would make an API call
  };

  const handleFiltersChange = (filters) => {
    setActiveFilters(filters);
    console.log('Filters updated:', filters);
    // In a real app, this would trigger data refetch
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const viewModes = [
    { id: 'dashboard', label: 'Dashboard View', icon: 'LayoutDashboard' },
    { id: 'feed', label: 'Feed Only', icon: 'List' },
    { id: 'analytics', label: 'Analytics Only', icon: 'BarChart3' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="BarChart3" size={24} color="white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Social Media Analytics</h1>
                  <p className="text-muted-foreground">AI-powered hazard detection from social media</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {viewModes?.map((mode) => (
                    <Button
                      key={mode?.id}
                      variant={viewMode === mode?.id ? 'default' : 'ghost'}
                      size="sm"
                      iconName={mode?.icon}
                      onClick={() => setViewMode(mode?.id)}
                    >
                      <span className="hidden md:inline">{mode?.label}</span>
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  iconName="RefreshCw"
                  loading={refreshing}
                  onClick={handleRefresh}
                >
                  <span className="hidden md:inline">Refresh</span>
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="MessageCircle" size={20} className="text-primary" />
                  <div>
                    <div className="text-2xl font-bold text-foreground">1,247</div>
                    <div className="text-sm text-muted-foreground">Posts Analyzed</div>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={20} className="text-success" />
                  <div>
                    <div className="text-2xl font-bold text-success">892</div>
                    <div className="text-sm text-muted-foreground">Verified Hazards</div>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={20} className="text-warning" />
                  <div>
                    <div className="text-2xl font-bold text-warning">156</div>
                    <div className="text-sm text-muted-foreground">Pending Review</div>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="TrendingUp" size={20} className="text-primary" />
                  <div>
                    <div className="text-2xl font-bold text-primary">24%</div>
                    <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6">
            <AnalyticsFilters 
              onFiltersChange={handleFiltersChange}
              activeFilters={activeFilters}
            />
          </div>

          {/* Main Content */}
          {viewMode === 'dashboard' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Feed */}
              <div className="lg:col-span-2 space-y-6">
                <SocialMediaFeed
                  posts={mockPosts}
                  onVerifyPost={handleVerifyPost}
                  onDismissPost={handleDismissPost}
                />
                <GeographicOverlay geoData={mockGeoData} />
              </div>

              {/* Right Column - Analytics */}
              <div className="space-y-6">
                <WordCloudVisualization keywords={mockKeywords} />
                <TrendAnalysisCharts
                  trendData={mockTrendData}
                  platformData={mockPlatformData}
                  sentimentData={mockSentimentData}
                />
              </div>
            </div>
          )}

          {viewMode === 'feed' && (
            <div className="max-w-4xl mx-auto">
              <SocialMediaFeed
                posts={mockPosts}
                onVerifyPost={handleVerifyPost}
                onDismissPost={handleDismissPost}
              />
            </div>
          )}

          {viewMode === 'analytics' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <WordCloudVisualization keywords={mockKeywords} />
              <TrendAnalysisCharts
                trendData={mockTrendData}
                platformData={mockPlatformData}
                sentimentData={mockSentimentData}
              />
              <div className="lg:col-span-2">
                <GeographicOverlay geoData={mockGeoData} />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SocialMediaAnalytics;