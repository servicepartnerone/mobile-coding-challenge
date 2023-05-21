import {createSlice, PayloadAction, ThunkAction} from '@reduxjs/toolkit';
import {api} from './api';

export interface PhotoState {
  photos: Photo[];
}

export interface Photo {
  images?: [];
  id: number;
  title: string;
  description: string;
  url: string;
  comments?: Comment[];
}

export interface Comment {
  id: number;
  text: string;
}

const initialState: PhotoState = {
  photos: [],
};

export const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    getPhotosAction: (state, action: PayloadAction<Photo[]>) => {
      state.photos = action.payload;
    },
    updatePhotoAction: (state, action: PayloadAction<Photo>) => {
      const updatedPhoto = action.payload;
      const index = state.photos.findIndex(
        photo => photo.id === updatedPhoto.id,
      );
      if (index !== -1) {
        state.photos[index] = {...state.photos[index], ...updatedPhoto};
      }
    },
    deletePhotoAction: (state, action: PayloadAction<number>) => {
      const deletedPhotoId = action.payload;
      state.photos = state.photos.filter(photo => photo.id !== deletedPhotoId);
    },
  },
});

export const {updatePhotoAction, getPhotosAction, deletePhotoAction} =
  photoSlice.actions;

export const fetchPhotos =
  (): ThunkAction<void, PhotoState, unknown, PayloadAction<Photo[]>> =>
  async dispatch => {
    try {
      const response = await fetch(api);
      if (!response.ok) {
        throw new Error('Failed to fetch photos');
      }
      const data = await response.json();
      const {photos} = data;
      dispatch(getPhotosAction(photos));
      console.log('Fetched photos:', photos);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

export default photoSlice.reducer;
