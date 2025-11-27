import axios from 'axios';

const server = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '53374429-639c77152d70b3fe75f006246',
    q: '',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  },
});

export function getImagesByQuery(query) {
  return server.get('', {
    params: {
      q: query,
    },
  });
}
