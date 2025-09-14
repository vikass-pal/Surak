import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

import Button from '../../../components/ui/Button';

const TrendAnalysisCharts = ({ trendData, platformData, sentimentData }) => {
  const [activeChart, setActiveChart] = useState('trends');
  const [timeRange, setTimeRange] = useState('24h');

  const chartTabs = [
    { id: 'trends', label: 'Trend Analysis', icon: 'TrendingUp' },
    { id: 'platforms', label: 'Platform Distribution', icon: 'BarChart3' },
    { id: 'sentiment', label: 'Sentiment Analysis', icon: 'Heart' }
  ];

  const timeRanges = [
    { id: '1h', label: '1 Hour' },
    { id: '6h', label: '6 Hours' },
    { id: '24h', label: '24 Hours' },
    { id: '7d', label: '7 Days' }
  ];

  const COLORS = ['#0369A1', '#0891B2', '#059669', '#F59E0B', '#EF4444'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-modal">
          <p className="text-sm font-medium text-popover-foreground">{`Time: ${label}`}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.dataKey}: ${entry?.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderTrendChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={trendData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis 
          dataKey="time" 
          stroke="#475569"
          fontSize={12}
        />
        <YAxis 
          stroke="#475569"
          fontSize={12}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="oceanHazards" 
          stroke="#0369A1" 
          strokeWidth={2}
          name="Ocean Hazards"
          dot={{ fill: '#0369A1', strokeWidth: 2, r: 4 }}
        />
        <Line 
          type="monotone" 
          dataKey="urbanHazards" 
          stroke="#0891B2" 
          strokeWidth={2}
          name="Urban Hazards"
          dot={{ fill: '#0891B2', strokeWidth: 2, r: 4 }}
        />
        <Line 
          type="monotone" 
          dataKey="emergencyAlerts" 
          stroke="#EF4444" 
          strokeWidth={2}
          name="Emergency Alerts"
          dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderPlatformChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={platformData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis 
          dataKey="platform" 
          stroke="#475569"
          fontSize={12}
        />
        <YAxis 
          stroke="#475569"
          fontSize={12}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar 
          dataKey="posts" 
          fill="#0369A1" 
          name="Total Posts"
          radius={[4, 4, 0, 0]}
        />
        <Bar 
          dataKey="verified" 
          fill="#059669" 
          name="Verified Posts"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderSentimentChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={sentimentData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {sentimentData?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );

  const renderActiveChart = () => {
    switch (activeChart) {
      case 'trends':
        return renderTrendChart();
      case 'platforms':
        return renderPlatformChart();
      case 'sentiment':
        return renderSentimentChart();
      default:
        return renderTrendChart();
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Analytics Dashboard</h3>
          <div className="flex items-center space-x-2">
            {timeRanges?.map((range) => (
              <Button
                key={range?.id}
                variant={timeRange === range?.id ? 'default' : 'ghost'}
                size="xs"
                onClick={() => setTimeRange(range?.id)}
              >
                {range?.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex space-x-1">
          {chartTabs?.map((tab) => (
            <Button
              key={tab?.id}
              variant={activeChart === tab?.id ? 'default' : 'ghost'}
              size="sm"
              iconName={tab?.icon}
              iconPosition="left"
              onClick={() => setActiveChart(tab?.id)}
            >
              {tab?.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="p-6">
        {renderActiveChart()}
      </div>
      <div className="px-6 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary">1,247</div>
            <div className="text-sm text-muted-foreground">Total Posts Analyzed</div>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-success">892</div>
            <div className="text-sm text-muted-foreground">Verified Hazards</div>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-warning">156</div>
            <div className="text-sm text-muted-foreground">Pending Review</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendAnalysisCharts;