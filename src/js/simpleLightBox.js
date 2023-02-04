// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

export const gallery = new SimpleLightbox('.gallery a', {captionData: 'alt', captionDelay: 250});