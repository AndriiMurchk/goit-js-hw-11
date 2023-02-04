import { gallery } from './js/simpleLightBox';
import Notiflix from 'notiflix';
import { UnsplashAPI } from './js/ApiServer';
import { createGalleryCards } from './js/templates/gallery-cards';

const searchFormEl = document.querySelector('.search-form');
const galleryListEl = document.querySelector('.js-gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

const unsplashApi = new UnsplashAPI();

const onSearchFormSubmit = async event => {
  event.preventDefault();
  
  unsplashApi.page = 1;
  unsplashApi.q = event.target.elements.searchQuery.value.trim(); 
   
  
try {

  const response = await unsplashApi.fetchPhotosbyQuery();

  const { data } = response;

  event.target.reset();
  loadMoreBtnEl.classList.add('js-is-hidden');

    if (data.hits.length === 0 || unsplashApi.q === '') {
      
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      
      galleryListEl.innerHTML = '';
      
      return;
    }

    if(data.totalHits > 40) {
      loadMoreBtnEl.classList.remove('js-is-hidden');
    }

    galleryListEl.innerHTML = createGalleryCards(data.hits);
    gallery.refresh();
    
  } catch(err) {
      console.log(err);
  };

  
};

const onLoadMoreBtnClick = async event => {
  
  unsplashApi.page +=1;
  
  try {
    const response = await unsplashApi.fetchPhotosbyQuery();
    const { data } = response;
    
    if (unsplashApi.page === Math.ceil(data.totalHits / 40)) {
      loadMoreBtnEl.classList.add('js-is-hidden');
    }

    Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
   
    galleryListEl.insertAdjacentHTML('beforeend', createGalleryCards(data.hits));
    gallery.refresh();
    

  } catch (err) {
    console.log(err)
  }
       
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);


