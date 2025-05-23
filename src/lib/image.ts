import imageUrlBuilder from '@sanity/image-url';
import { sanity } from './sanity';

const builder = imageUrlBuilder(sanity);

interface SanityImageSource {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
} 