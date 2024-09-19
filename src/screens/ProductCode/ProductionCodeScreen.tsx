import {View, Text} from 'react-native';
import React from 'react';
import Container from '../../components/Container/Container';

export default function ProductionCodeScreen() {
  return (
    <Container header title="Üretim Kodlarım" goBackShow>
      <Container type="container" p={10}>
        <Text>ProductionCodes</Text>
      </Container>
    </Container>
  );
}
