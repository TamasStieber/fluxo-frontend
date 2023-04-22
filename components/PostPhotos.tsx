import { Box, Image } from '@chakra-ui/react';
import Masonry from 'react-smart-masonry';

interface PostPhotosProps {
  photoFolder: string;
  photos: string[];
}

const breakpoints = { md: 500, lg: 900 };

const PostPhotos = ({ photoFolder, photos }: PostPhotosProps) => {
  const url = process.env.BACKEND_URL + '/' + photoFolder;
  const mdColumns = photos.length < 3 ? photos.length : 2;
  const lgColumns = photos.length < 4 ? photos.length : 3;
  return (
    <Masonry
      style={{ width: '100%' }}
      breakpoints={breakpoints}
      columns={{ md: mdColumns, lg: lgColumns }}
      gap={5}
    >
      {photos.map((photo) => (
        <Image
          key={photo}
          alt=''
          src={url + '/' + photo}
          fit='cover'
          width='100%'
        ></Image>
      ))}
    </Masonry>
  );
};

export default PostPhotos;
