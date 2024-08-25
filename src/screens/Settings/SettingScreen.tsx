import {View, Text} from 'react-native';
import React from 'react';
import Container from '../../components/Container/Container';

export default function SettingScreen() {
  return (
    <Container header title="Ayarlar" goBackShow>
      <Text>Settings</Text>
    </Container>
  );
}
