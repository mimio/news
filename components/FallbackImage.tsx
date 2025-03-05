'use client';

import Image, { ImageProps } from 'next/image';
import { useState, useEffect } from 'react';
import { getRandomWikiImage } from '@/lib/wikiImages';

interface FallbackImageProps extends Omit<ImageProps, 'onError'> {
  topic?: string;
}

export function FallbackImage({ src, topic, alt, ...props }: FallbackImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  const handleError = async () => {
    try {
      const fallbackSrc = await getRandomWikiImage(topic);
      setImageSrc(fallbackSrc);
    } catch (error) {
      console.error('Error loading fallback image:', error);
      setImageSrc('/placeholder.jpg');
    }
  };

  return (
    <Image
      {...props}
      src={imageSrc}
      alt={alt}
      onError={handleError}
      onLoadingComplete={() => setIsLoading(false)}
      className={`${props.className || ''} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
    />
  );
} 