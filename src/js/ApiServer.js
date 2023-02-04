import axios from "axios";

export class UnsplashAPI {
  static BASE_URL = 'https://pixabay.com/api';
  static API_KEY = '33213566-adb6b676a53ab03e5eed217c1';

  constructor() {
    this.page = 1;
    this.q = null;
  }


  fetchPhotosbyQuery() {
    const searchParams = {
      params: {
        key: UnsplashAPI.API_KEY,
        q: this.q,
        page: this.page, 
        per_page: 40, 
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    };

    return axios.get(`${UnsplashAPI.BASE_URL}/`, searchParams);
   
  }
}
