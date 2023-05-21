import React, {useEffect} from 'react';
import {useQuery, UseQueryResult} from 'react-query';
import {useDispatch, useSelector} from 'react-redux';
import Card from '../components/Card';
import {View, Text} from '../components/Elements';
import {RootState} from '../redux/store';
import {fetchPhotos, Photo} from '../redux/reducer';
import {styles} from '../styles';

const fetchPhotosData = async (dispatch: any) => {
  try {
    await dispatch(fetchPhotos());
  } catch (error) {
    console.error('Error fetching photos:', error);
  }
};

const PhotoGallery: React.FC = () => {
  const dispatch = useDispatch();
  const photos: Photo[] = useSelector((state: RootState) => state.photo.photos);
  const queryResult: UseQueryResult<Photo[], unknown> = useQuery('photos', () =>
    fetchPhotosData(dispatch),
  );

  useEffect(() => {
    fetchPhotosData(dispatch);
  }, [dispatch]);

  const {isLoading, error} = queryResult;

  return (
    <View size="lg" style={styles.container}>
      {isLoading ? (
        <Text size="lg">Loading, please wait...</Text>
      ) : error ? (
        <Text size="lg">Error: {JSON.stringify(error)}</Text>
      ) : photos.length > 0 ? (
        <Card data={photos} />
      ) : (
        <Text>No photos available</Text>
      )}
    </View>
  );
};

export default PhotoGallery;
