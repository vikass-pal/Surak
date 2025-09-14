import React, { useState, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const MediaUpload = ({ files, onFilesChange }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true);
    } else if (e?.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);

    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFiles(e?.dataTransfer?.files);
    }
  };

  const handleChange = (e) => {
    e?.preventDefault();
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFiles(e?.target?.files);
    }
  };

  const handleFiles = (fileList) => {
    const validFiles = Array.from(fileList)?.filter(file => {
      const isValidType = file?.type?.startsWith('image/') || file?.type?.startsWith('video/');
      const isValidSize = file?.size <= 50 * 1024 * 1024; // 50MB limit
      return isValidType && isValidSize;
    });

    const newFiles = validFiles?.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file?.name,
      size: file?.size,
      type: file?.type,
      preview: file?.type?.startsWith('image/') ? URL.createObjectURL(file) : null
    }));

    onFilesChange([...files, ...newFiles]);
  };

  const removeFile = (fileId) => {
    const updatedFiles = files?.filter(f => f?.id !== fileId);
    onFilesChange(updatedFiles);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const onButtonClick = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg p-6 border border-border">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Camera" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Media Evidence</h3>
            <p className="text-sm text-muted-foreground">Upload photos or videos of the hazard</p>
          </div>
        </div>

        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <div className="space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <Icon name="Upload" size={24} color="var(--color-muted-foreground)" />
            </div>
            <div>
              <p className="text-lg font-medium text-foreground mb-2">
                Drop files here or click to upload
              </p>
              <p className="text-sm text-muted-foreground">
                Support for images and videos up to 50MB each
              </p>
            </div>
            <Button
              variant="outline"
              onClick={onButtonClick}
              iconName="Plus"
              iconPosition="left"
            >
              Choose Files
            </Button>
          </div>
        </div>

        {files?.length > 0 && (
          <div className="mt-6 space-y-4">
            <h4 className="text-sm font-medium text-foreground">Uploaded Files ({files?.length})</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {files?.map((file) => (
                <div key={file?.id} className="bg-muted rounded-lg p-4 border border-border">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={file?.type?.startsWith('image/') ? 'Image' : 'Video'} 
                        size={16} 
                        color="var(--color-muted-foreground)" 
                      />
                      <span className="text-xs font-medium text-foreground truncate">
                        {file?.name}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(file?.id)}
                      className="h-6 w-6 text-muted-foreground hover:text-error"
                    >
                      <Icon name="X" size={12} />
                    </Button>
                  </div>

                  {file?.preview && (
                    <div className="mb-3">
                      <Image
                        src={file?.preview}
                        alt={file?.name}
                        className="w-full h-24 object-cover rounded"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{formatFileSize(file?.size)}</span>
                    <div className="flex items-center space-x-1 text-success">
                      <Icon name="CheckCircle" size={12} />
                      <span>Ready</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} color="var(--color-warning)" className="mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-warning mb-1">Upload Guidelines</p>
              <ul className="text-warning/80 space-y-1 text-xs">
                <li>• Clear photos showing the hazard and surrounding area</li>
                <li>• Videos should be under 2 minutes for faster processing</li>
                <li>• Avoid uploading sensitive personal information</li>
                <li>• Multiple angles help verification teams assess severity</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaUpload;