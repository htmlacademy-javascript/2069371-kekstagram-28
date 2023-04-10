import { renderingPhotos } from './rendering-photos.js';
import './scale.js';
import './effects.js';
import { getData, sendData } from './api.js';
import { showAlert, debounce } from './util.js';
import { setOnFormSubmit, hideModal } from './form.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import './upload-file.js';
import './filter.js';
import { init, getFilteredPictures} from './filter.js';


setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    hideModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  const debouncedRenderGallery = debounce(renderingPhotos);
  init(data, debouncedRenderGallery);
  renderingPhotos(getFilteredPictures());
} catch (err) {
  showAlert(err);
}
