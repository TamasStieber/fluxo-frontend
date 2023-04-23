import {
  Box,
  Grid,
  GridItem,
  Image,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import styled from 'styled-components';

interface PostPhotosProps {
  photoFolder: string;
  photos: string[];
}

interface ImageElementProps {
  url: string;
  height: number;
  onClick: () => void;
  remainingIndicator?: boolean;
  remaining?: number;
}

const ImageElement = (props: ImageElementProps) => {
  const { url, height, onClick, remainingIndicator, remaining } = props;
  return (
    <>
      {remainingIndicator ? (
        <Box
          display='flex'
          position='relative'
          height={height}
          onClick={onClick}
          style={{
            backgroundImage: `url(${url})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          }}
        >
          <Box
            display='flex'
            position='absolute'
            alignItems='center'
            justifyContent='center'
            color='white'
            fontSize='2rem'
            cursor='pointer'
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              width: '100%',
              height: '100%',
            }}
          >
            {`+${remaining}`}
          </Box>
        </Box>
      ) : (
        <Box
          width='100%'
          height={height}
          onClick={onClick}
          style={{
            backgroundImage: `url(${url})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            cursor: 'pointer',
          }}
        ></Box>
      )}
    </>
  );
};

const PostPhotos = ({ photoFolder, photos }: PostPhotosProps) => {
  const [index, setIndex] = useState(-1);

  const url = process.env.BACKEND_URL + '/' + photoFolder;
  const maxPhotosShown = 3;

  const slides = photos.map((photo) => ({ src: url + '/' + photo }));

  const firstPhoto = photos[0];
  const photosInSecondRow = photos.slice(1, maxPhotosShown);
  const remainingPhotos = photos.slice(maxPhotosShown);

  const height = [250, 200];
  const rows = photosInSecondRow.length > 0 ? 2 : 1;
  const columns =
    photos.length > maxPhotosShown
      ? photosInSecondRow.length + 1
      : photosInSecondRow.length;

  const mdColumns = photos.length < 3 ? photos.length : 2;
  const lgColumns = photos.length < 4 ? photos.length : 3;

  if (photos.length === 0) return null;

  return (
    <>
      <VStack alignItems='stretch'>
        <ImageElement
          url={url + '/' + firstPhoto}
          height={
            photosInSecondRow.length > 0 ? height[0] : height[0] + height[1]
          }
          onClick={() => setIndex(0)}
        />
        {photosInSecondRow.length > 0 && (
          <SimpleGrid columns={columns} gap={2}>
            {photosInSecondRow.map((photo, index) => (
              <ImageElement
                key={photo}
                url={url + '/' + photo}
                height={height[1]}
                onClick={() => setIndex(index + 1)}
              />
            ))}
            {remainingPhotos.length > 0 && (
              <ImageElement
                url={url + '/' + remainingPhotos[0]}
                height={height[1]}
                onClick={() => setIndex(maxPhotosShown)}
                remainingIndicator
                remaining={remainingPhotos.length}
              />
            )}
          </SimpleGrid>
        )}
      </VStack>
      <Lightbox
        plugins={[Thumbnails]}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
      />
    </>
  );
};

export default PostPhotos;
