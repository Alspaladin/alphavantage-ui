import axios from 'axios';

const API_KEY = `RIBXT3XYLI69PC0Q`;

const BASE_URL = `https://www.alphavantage.co/query?apikey=${API_KEY}`;

export default async function ApiClient({ url, method }: any): Promise<any> {
  try {
    const response = await axios({
      url: `${BASE_URL}&${url}`,
      method,
      responseType: 'json',
    });

    return response.data;
  } catch (error: any) {
    if (error && error.response && error.response!.status === 401) {
      window.location = '/' as any;
      return undefined;
    }
    throw error;
  }
}
