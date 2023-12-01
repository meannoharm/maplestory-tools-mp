export const imageUrl = (image) => {
  if (!image) {
    throw new Error('Image file is required');
  }
  const imageUrlBase =
    'https://mp-19037f1d-5a0a-45fb-b476-e7007e9c6546.cdn.bspapp.com/assets';
  if (Array.isArray(image)) {
    return image.reduce((acc, cur) => {
      return `${acc}/${cur}`;
    }, imageUrlBase);
  } else {
    return `${imageUrlBase}/${image}`
  }
};
