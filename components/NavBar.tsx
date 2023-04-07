import { Box, Grid, GridItem, Input, Show } from '@chakra-ui/react';
import Logo from './Logo';
import UserMenu from './UserMenu';
import SearchBar from './SearchBar';
import { useRouter } from 'next/router';

const NavBar = () => {
  const router = useRouter();

  const redirectToHomePage = () => {
    router.push('/');
  };

  return (
    <Grid
      // bgColor='green.500'
      // maxWidth='1000px'
      // margin='auto'
      templateAreas={{
        base: `"logo menu"`,
        lg: `"logo search menu"`,
      }}
      templateColumns={{
        base: '140px 1fr',
        lg: '140px auto 50px',
      }}
      alignItems='center'
    >
      <GridItem area={'logo'}>
        <Box onClick={redirectToHomePage} cursor='pointer'>
          <Logo size='2rem' />
        </Box>
      </GridItem>
      <Show above='lg'>
        <GridItem area={'search'}>
          <SearchBar />
        </GridItem>
      </Show>
      <GridItem area={'menu'} alignItems='center'>
        <UserMenu />
      </GridItem>
    </Grid>

    // <HStack justifyContent='flex-end' bgColor='green.500' padding={1}>
    //   <ColorModeSwitch />
    //   <Menu>
    //     <MenuButton
    //       as={IconButton}
    //       aria-label='Options'
    //       icon={<CgProfile />}
    //       variant='ghost'
    //       fontSize='25px'
    //     />
    //     <MenuList>
    //       <MenuGroup>
    //         <MenuItem>
    //           {currentUser &&
    //             `${currentUser.firstName} ${currentUser.lastName}`}
    //         </MenuItem>
    //       </MenuGroup>
    //       <MenuDivider />
    //       <MenuGroup>
    //         <MenuItem>My Account</MenuItem>
    //       </MenuGroup>
    //       <MenuDivider />
    //       <MenuGroup>
    //         <MenuItem onClick={handleLogout}>Logout</MenuItem>
    //       </MenuGroup>
    //     </MenuList>
    //   </Menu>
    // </HStack>
  );
};

export default NavBar;
