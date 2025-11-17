/**
 * Image utility functions
 */

/**
 * Hotlink korumalı görselleri proxy üzerinden yüklemek için
 */
export function getProxiedImageUrl(originalUrl: string): string {
  // Unsplash ve CDN görselleri için proxy kullanma
  if (
    originalUrl.includes('unsplash.com') ||
    originalUrl.includes('cdn.coverr.co') ||
    originalUrl.includes('toptanerotikshop.com')
  ) {
    return originalUrl;
  }

  // erotikshoptoptan.com görselleri için proxy kullan
  if (originalUrl.includes('erotikshoptoptan.com')) {
    return `/api/image-proxy?url=${encodeURIComponent(originalUrl)}`;
  }

  return originalUrl;
}

/**
 * Tüm galeri görsellerini proxy üzerinden yükle
 */
export function getProxiedGallery(gallery: Array<{ src: string; alt: string; width?: number; height?: number }>) {
  return gallery.map(image => ({
    ...image,
    src: getProxiedImageUrl(image.src),
  }));
}
