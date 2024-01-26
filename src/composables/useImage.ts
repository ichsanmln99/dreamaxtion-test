export default function () {
  function get({ url, size }: { url: string; size: 500 | 200 | 'original' | string | number }) {
    const imagePath = 'https://image.tmdb.org/t/p/'
    const imageSize = size === 'original' ? size : 'w' + size
    return imagePath + imageSize + '/' + url
  }

  return {
    get
  }
}
