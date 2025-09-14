import React, { useMemo } from 'react';
import Icon from '../../../components/AppIcon';

const WordCloudVisualization = ({ keywords }) => {
  const processedKeywords = useMemo(() => {
    return keywords?.map(keyword => ({
      ...keyword,
      fontSize: Math.max(12, Math.min(32, keyword?.frequency * 2)),
      color: getKeywordColor(keyword?.category)
    }));
  }, [keywords]);

  function getKeywordColor(category) {
    const colors = {
      ocean: 'text-blue-600',
      urban: 'text-orange-600',
      weather: 'text-cyan-600',
      emergency: 'text-red-600',
      safety: 'text-green-600',
      default: 'text-gray-600'
    };
    return colors?.[category] || colors?.default;
  }

  const getKeywordIcon = (category) => {
    const icons = {
      ocean: 'Waves',
      urban: 'Building',
      weather: 'Cloud',
      emergency: 'AlertTriangle',
      safety: 'Shield',
      default: 'Hash'
    };
    return icons?.[category] || icons?.default;
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Trending Keywords</h3>
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={16} className="text-primary" />
            <span className="text-sm text-muted-foreground">Last 24 hours</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap items-center justify-center gap-3 min-h-48">
          {processedKeywords?.map((keyword, index) => (
            <div
              key={keyword?.id}
              className={`inline-flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-muted/50 transition-colors cursor-pointer ${keyword?.color}`}
              style={{ fontSize: `${keyword?.fontSize}px` }}
              title={`${keyword?.text}: ${keyword?.frequency} mentions`}
            >
              <Icon 
                name={getKeywordIcon(keyword?.category)} 
                size={Math.max(12, keyword?.fontSize * 0.6)} 
                className="opacity-70"
              />
              <span className="font-medium">{keyword?.text}</span>
              <span className="text-xs opacity-60">({keyword?.frequency})</span>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="text-muted-foreground">Ocean</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                <span className="text-muted-foreground">Urban</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                <span className="text-muted-foreground">Emergency</span>
              </div>
            </div>
            <span className="text-muted-foreground">
              {processedKeywords?.reduce((sum, k) => sum + k?.frequency, 0)} total mentions
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordCloudVisualization;