import { useState, useCallback } from 'react';

interface UseOfferGalleryProps {
  images: string[];
}

export const useOfferGallery = ({ images }: UseOfferGalleryProps) => {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const currentImg = images[currentImgIdx];
  const hasMultipleImages = images.length > 1;
  const totalImages = images.length;

  const nextImage = useCallback(() => {
    setCurrentImgIdx((current) => Math.min(current + 1, images.length - 1));
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentImgIdx((current) => Math.max(current - 1, 0));
  }, []);

  return {
    currentImg,
    currentImgIdx,
    hasMultipleImages,
    totalImages,
    nextImage,
    prevImage,
  };
};
