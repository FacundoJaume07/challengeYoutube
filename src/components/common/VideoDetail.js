import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import parseISO from 'date-fns/parseISO';

const VideoDetail = ({ video }) => {
  if (!video) {
    return null;
  }

  const formatNumber = (num) => {
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    const tier = Math.log10(Math.abs(num)) / 3 | 0;

    if (tier === 0) return num;

    const suffix = suffixes[tier];
    const scale = Math.pow(10, tier * 3);

    const scaled = num / scale;

    return scaled.toFixed(1) + suffix;
  };

  const formatUploadDate = (uploadDate) => {
    const distance = formatDistanceToNow(parseISO(uploadDate), { addSuffix: true });
    return `Subido ${distance}`;
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
        {`Chanel: ${video.channelTitle}`}
        </Typography>
        <Typography variant="subtitle1">
          {`${formatNumber(video.views)} views`}
        </Typography>
        <Typography variant="subtitle1">
          {formatUploadDate(video.uploadDate)}
        </Typography>
        <Typography variant="subtitle1">
          {`${formatNumber(video.likes)} likes`}
        </Typography>
        <Typography variant="subtitle1">
          {`${formatNumber(video.comments)} comments`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VideoDetail;
