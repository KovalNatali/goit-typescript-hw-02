import axios from 'axios';
const API_KEY = '38386717-8fe577dd1ca73c2d4057f199b';

interface ApiResponse {
  total: number;
  total_pages: number;
  hits: [];
  totalHits: number;
}

export const fetchImage = async (
  query: string,
  page: number
): Promise<ApiResponse> => {
  const { data } = await axios.get<ApiResponse>(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data;
};
