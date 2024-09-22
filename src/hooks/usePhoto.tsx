import {PermissionsAndroid, Platform} from 'react-native';
import {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PERMISSIONS, request} from 'react-native-permissions';

export default function usePhoto() {
  const [photos, setPhotos] = useState<string[]>([]);

  const initLaunchImage = () => {
    requestStoragePermission();
  };

  const initLaunchCamera = () => {
    requestCameraPermission();
  };

  const handleLaunchCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxWidth: 800,
      },
      response => {
        if (response.assets) {
          let uri = response.assets[0].uri as string;
          setPhotos([...photos, uri]);
        }
      },
    );
  };
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'App Camera Permission',
            message: 'App needs access to your camera ',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          handleLaunchCamera();
          console.log('Camera permission given');
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      try {
        const result = await request(PERMISSIONS.IOS.CAMERA);
        if (result === 'granted') {
          console.log('Kamera izni verildi');
        } else {
          console.log('Kamera izni reddedildi');
        }
      } catch (error) {
        console.log('Kamera izni talebi sırasında hata:', error);
      }
    }
  };
  const handleLaunchImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxWidth: 800,
      },
      response => {
        if (response.assets) {
          let uri = response.assets[0].uri as string;
          setPhotos([...photos, uri]);
        }
      },
    );
  };
  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(result => {
        if (result === 'granted') {
          handleLaunchImage();
        } else {
          console.log('İzin verilmedi');
        }
      });
    } else {
      request(PERMISSIONS.IOS.PHOTO_LIBRARY).then(result => {
        if (result === 'granted') {
          handleLaunchImage();
        } else {
          console.log('İzin verilmedi');
        }
      });
    }
  };
  const deletePhoto = (index: number) => {
    let newPhotos = photos.filter((photo, i) => i !== index);
    setPhotos(newPhotos);
  };
  const clearPhotos = () => {
    setPhotos([]);
  };

  return {
    photos,
    deletePhoto,
    initLaunchImage,
    initLaunchCamera,
    setPhotos,
    clearPhotos,
  };
}
