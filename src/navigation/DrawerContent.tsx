import React from 'react';
import styled from 'styled-components';
import DrawerHeader from '../sections/DrawerContent/DrawerHeader';
import DrawerSeason from '../sections/DrawerContent/DrawerSeason';
import DrawerMenu from '../sections/DrawerContent/DrawerMenu';
import DrawerFooter from '../sections/DrawerContent/DrawerFooter';

import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {SafeAreaView} from 'react-native';

export default function DrawerContent() {
  const drawerSeasonOpen = useSelector(
    (x: RootState) => x.app.drawerSeasonOpen,
  );

  return (
    <Container>
      <DrawerHeader />
      {!drawerSeasonOpen ? (
        <>
          <DrawerMenu />
          <DrawerFooter />
        </>
      ) : (
        <DrawerSeason />
      )}
    </Container>
  );
}
const Container = styled(SafeAreaView)`
  background-color: #d7c9bc;
  flex: 1;
`;
