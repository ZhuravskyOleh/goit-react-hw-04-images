import axios from 'axios';
import { PER_PAGE, KEY } from 'services/constants';

axios.defaults.baseURL = 'https://pixabay.com/api';

export async function readData(query, page) {
  const response = await axios.get(
    `?key=${KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}&q=${query}&page=${page}`
  );

  // isMore -flag shower button of 'read-more'
  const isMore = response.data.totalHits > PER_PAGE * page;

  return { reqGallery: response.data.hits, isMore };
}
