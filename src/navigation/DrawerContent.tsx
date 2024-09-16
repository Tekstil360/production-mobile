import React from 'react';
import styled from 'styled-components';
import DrawerHeader from '../sections/DrawerContent/DrawerHeader';
import DrawerSeason from '../sections/DrawerContent/DrawerSeason';
import DrawerMenu from '../sections/DrawerContent/DrawerMenu';
import DrawerFooter from '../sections/DrawerContent/DrawerFooter';

import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {SafeAreaView} from 'react-native';
import useHasPermission from '../hooks/useHasPermission';

export default function DrawerContent() {
  const drawerSeasonOpen = useSelector(
    (x: RootState) => x.app.drawerSeasonOpen,
  );
  const canSeason = useHasPermission('Season');
  return (
    <Container>
      <DrawerHeader showSeason={canSeason} />
      {!drawerSeasonOpen ? (
        <>
          <DrawerMenu />
          <DrawerFooter />
        </>
      ) : (
        canSeason && <DrawerSeason />
      )}
    </Container>
  );
}
const Container = styled(SafeAreaView)`
  background-color: #d7c9bc;
  flex: 1;
`;
