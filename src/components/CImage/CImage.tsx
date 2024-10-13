import React from 'react';
import {Image} from 'react-native';

export default function CImage({
  imageUrl,
  w,
  h,
}: {
  imageUrl: string;
  w?: number;
  h?: number;
}) {
  return (
    <Image
      source={{uri: imageUrl}}
      style={{width: w || '100%', height: h || '100%'}}
    />
  );
}
