export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

export const getStatusColor = (status: string): string => {
  const statusLower = status.toLowerCase();
  if (statusLower.includes('completed')) return '#10b981';
  if (statusLower.includes('progress') || statusLower.includes('active')) return '#3b82f6';
  if (statusLower.includes('scheduled') || statusLower.includes('pending')) return '#f59e0b';
  if (statusLower.includes('cancelled')) return '#ef4444';
  return '#6b7280';
};

