import {View, Text} from 'react-native';
import React from 'react';
import Container from '../../components/Container/Container';

export default function UserScreen() {
  return (
    <Container header title="Kullanıcılar" goBackShow>
      <Text>Users</Text>
    </Container>
  );
}
