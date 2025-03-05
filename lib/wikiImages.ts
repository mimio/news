import axios from 'axios';

const FALLBACK_TOPICS = [
  'storytelling',
  'folklore',
  'mythology',
  'literature',
  'world_culture',
  'history',
  'traditions'
];

interface WikiPage {
  imageinfo?: [{
    url: string;
  }];
  images?: {
    title: string;
  }[];
}

interface WikiImageResponse {
  query: {
    pages: {
      [key: string]: WikiPage;
    };
  };
}

export async function getRandomWikiImage(topic?: string): Promise<string> {
  try {
    const searchTerm = topic || FALLBACK_TOPICS[Math.floor(Math.random() * FALLBACK_TOPICS.length)];
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=images|imageinfo&iiprop=url&generator=search&gsrsearch=${searchTerm}&gsrlimit=10&origin=*`;
    
    const response = await axios.get<WikiImageResponse>(apiUrl);
    const pages = response.data.query?.pages || {};
    
    // Get all image titles from the pages
    const imageFiles = Object.values(pages)
      .flatMap((page: WikiPage) => page.images || [])
      .map(img => img.title)
      .filter(title => 
        title.toLowerCase().endsWith('.jpg') || 
        title.toLowerCase().endsWith('.png')
      );

    if (imageFiles.length === 0) {
      return '/placeholder.jpg';
    }

    // Get a random image from the list
    const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
    
    // Get the actual URL for the image
    const imageUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url&titles=${encodeURIComponent(randomImage)}&origin=*`;
    const imageResponse = await axios.get<WikiImageResponse>(imageUrl);
    
    const firstPage = Object.values(imageResponse.data.query.pages)[0] as WikiPage;
    const imageInfo = firstPage?.imageinfo?.[0];
    return imageInfo?.url || '/placeholder.jpg';
  } catch (error) {
    console.error('Error fetching Wikipedia image:', error);
    return '/placeholder.jpg';
  }
} 