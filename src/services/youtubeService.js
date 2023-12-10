import youtubeSearch from 'youtube-api-v3-search';

const apiKey = 'AIzaSyD-88EWVA3yKwbnYbjEHm0aEk2KkG1XkXA';

export const searchVideos = async (query) => {
        try {
            const result = await youtubeSearch(apiKey, { q: query });
    
          if (result && result.length > 3) {
           return result;
          } else {
            console.error('No se encontraron videos.');
          }
        } catch (error) {
          console.error('Error al realizar la búsqueda:', error);
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
    console.error('Error al obtener estadísticas del video:', error);
    return null;
  }
};
