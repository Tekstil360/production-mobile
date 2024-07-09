import React from 'react';
import Container from '../components/Container/Container';

import {AppDispatch} from '../store';
import {useDispatch} from 'react-redux';
import {useGetMeQuery} from '../services/authService';

export default function Home() {
  const data = useGetMeQuery();
  const dispatch: AppDispatch = useDispatch();
  return <Container title="Anasayfa" header showNotification></Container>;
}
