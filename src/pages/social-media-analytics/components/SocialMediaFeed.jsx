import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SocialMediaFeed = ({ posts, onVerifyPost, onDismissPost }) => {
  const [selectedPosts, setSelectedPosts] = useState(new Set());

  const handleSelectPost = (postId) => {
    const newSelected = new Set(selectedPosts);
    if (newSelected?.has(postId)) {
      newSelected?.delete(postId);
    } else {
      newSelected?.add(postId);
    }
    setSelectedPosts(newSelected);
  };

  const handleBulkAction = (action) => {
    selectedPosts?.forEach(postId => {
      const post = posts?.find(p => p?.id === postId);
      if (post) {
        if (action === 'verify') {
          onVerifyPost(post);
        } else if (action === 'dismiss') {
          onDismissPost(post);
        }
      }
    });
    setSelectedPosts(new Set());
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'twitter': return 'Twitter';
      case 'instagram': return 'Instagram';
      default: return 'MessageCircle';
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      case 'neutral': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getVerificationBadge = (status) => {
    switch (status) {
      case 'verified':
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <Icon name="CheckCircle" size={12} className="mr-1" />
          Verified
        </span>;
      case 'dismissed':
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <Icon name="XCircle" size={12} className="mr-1" />
          Dismissed
        </span>;
      case 'investigating':
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <Icon name="Clock" size={12} className="mr-1" />
          Investigating
        </span>;
      default:
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          <Icon name="AlertCircle" size={12} className="mr-1" />
          Pending
        </span>;
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Live Social Media Feed</h3>
          {selectedPosts?.size > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {selectedPosts?.size} selected
              </span>
              <Button
                variant="outline"
                size="sm"
                iconName="Check"
                onClick={() => handleBulkAction('verify')}
              >
                Verify All
              </Button>
              <Button
                variant="destructive"
                size="sm"
                iconName="X"
                onClick={() => handleBulkAction('dismiss')}
              >
                Dismiss All
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {posts?.map((post) => (
          <div
            key={post?.id}
            className={`p-4 border-b border-border hover:bg-muted/50 transition-colors ${
              selectedPosts?.has(post?.id) ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={selectedPosts?.has(post?.id)}
                onChange={() => handleSelectPost(post?.id)}
                className="mt-1 rounded border-border"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon name={getPlatformIcon(post?.platform)} size={16} className="text-primary" />
                    <span className="text-sm font-medium text-foreground">@{post?.username}</span>
                    <span className="text-xs text-muted-foreground">{post?.timestamp}</span>
                  </div>
                  {getVerificationBadge(post?.verificationStatus)}
                </div>

                <p className="text-sm text-foreground mb-2 line-clamp-3">{post?.content}</p>

                {post?.media && (
                  <div className="mb-2">
                    <Image
                      src={post?.media}
                      alt="Social media post content"
                      className="w-full h-32 object-cover rounded-md"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Heart" size={12} />
                      <span>{post?.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="MessageCircle" size={12} />
                      <span>{post?.comments}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Share" size={12} />
                      <span>{post?.shares}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={12} />
                      <span>{post?.location}</span>
                    </div>
                    <div className={`flex items-center space-x-1 ${getSentimentColor(post?.sentiment)}`}>
                      <Icon name="TrendingUp" size={12} />
                      <span className="capitalize">{post?.sentiment}</span>
                    </div>
                  </div>

                  {post?.verificationStatus === 'pending' && (
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="xs"
                        iconName="Check"
                        onClick={() => onVerifyPost(post)}
                      >
                        Verify
                      </Button>
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="X"
                        onClick={() => onDismissPost(post)}
                      >
                        Dismiss
                      </Button>
                      <Button
                        variant="secondary"
                        size="xs"
                        iconName="Search"
                      >
                        Investigate
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialMediaFeed;