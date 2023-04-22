import { SimpleGrid, Image, Box } from '@chakra-ui/react';

interface PhotoPreviewProps {
  photos: File[];
  handleDelete: (photoToDelete: File) => void;
}

const PhotoPreview = ({ photos, handleDelete }: PhotoPreviewProps) => {
  return (
    <SimpleGrid
      columns={{ md: 2, lg: 3 }}
      spacing={2}
      maxHeight='500px'
      overflowY='auto'
    >
      {photos.map((photo) => (
        <Box key={photo.name} style={{ position: 'relative' }}>
          <Image
            src={URL.createObjectURL(photo as Blob)}
            fit='cover'
            alt=''
            style={{ aspectRatio: 1 }}
          />
          <Box
            _hover={{ color: 'red.400' }}
            cursor='pointer'
            fontWeight='bold'
            color='white'
            onClick={() => handleDelete(photo)}
            style={{ position: 'absolute', top: '0px', right: '5px' }}
          >
            X
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default PhotoPreview;
