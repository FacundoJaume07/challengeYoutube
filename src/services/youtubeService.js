import youtubeSearch from 'youtube-api-v3-search';

const apiKey = 'AIzaSyD-88EWVA3yKwbnYbjEHm0aEk2KkG1XkXA';

export const searchVideos = async (query) => {
  try {
    const result = await youtubeSearch(apiKey, { q: query });

    if (result && result.items && result.items.length > 3) {
      return result;
    } else {
      console.error('No videos found.');
    }
  } catch (error) {
    console.error('Error searching:', error);
  }
};

export const getVideoStatistics = async (videoId) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=statistics&key=${apiKey}`
    );

    const data = await response.json();

    if (data.items && data.items.length > 0) {
      return data.items[0].statistics;
    }

    return null;
  } catch (error) {
    console.error('Error getting video statistics:', error);
    return null;
  }
};
