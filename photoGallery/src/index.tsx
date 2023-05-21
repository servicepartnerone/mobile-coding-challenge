import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import PhotoGallery from './screens/photoGallery';

const queryClient = new QueryClient();

const AppContainer = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PhotoGallery />
      </Provider>
    </QueryClientProvider>
  );
};

export default AppContainer;
