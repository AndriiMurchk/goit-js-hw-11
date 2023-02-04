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

  unsplashApi.q = event.target.elements.searchQuery.value.trim();

try {

  const response = await unsplashApi.fetchPhotosbyQuery();

  const { data } = response;
  console.log(response);
    if (data.hits.length === 0) {
      
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      
      event.target.reset();

      galleryListEl.innerHTML = '';

      loadMoreBtnEl.classList.add('js-is-hidden');

      return;
    }

    galleryListEl.innerHTML = createGalleryCards(data.hits);
    gallery.refresh();
    loadMoreBtnEl.classList.remove('js-is-hidden');
  } catch(err) {
      console.log(err);
  };

  
};

const onLoadMoreBtnClick = async event => {
  
  unsplashApi.page +=1;

  try {
    const response = await unsplashApi.fetchPhotosbyQuery();
    const { data } = response;

    Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
    galleryListEl.insertAdjacentHTML('beforeend', createGalleryCards(data.hits));
    gallery.refresh();

    
   
  } catch (err) {
    console.log(err)
  }
       
};

window.addEventListener('scroll', () => {
  const documentRect = document.documentElement.getBoundingClientRect();
  
  console.log('bottom', documentRect.bottom);
  if (documentRect.bottom < document.documentElement.clientHeight + 500) {

    onLoadMoreBtnClick();
  }

});



searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);


