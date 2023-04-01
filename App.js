import { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import Button from './ui/Button.js';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import CameraComponent from './components/CameraComponent.js';

export default function App() {
  const [selectedImage, setSelectedImage] = useState('');
  const [openCamera, setOpenCamera] = useState(false);

  const [status, requestPermission] = MediaLibrary.usePermissions();

  const imageRef = useRef();

  if (status === null) {
    requestPermission();
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Saved!");
      }

      setSelectedImage('');
      setOpenCamera(false);
    } catch (e) {
      console.log(e);
    }
  };

  const onPictureTaken = (image) => {
    setSelectedImage(image);
    setOpenCamera(false);
  }

  return (
    <View style={styles.container}>
      <View ref={imageRef} collapsable={false}>
      <Text style={styles.text}>Hello World, This is 'Imad Najmi'</Text>
        <Text style={styles.text}>My First React Native App</Text>

        <View style={styles.center}>
          {selectedImage === '' &&
            <Image source={require('./assets/logo.jpg')} style={styles.logo}/> ||
            <Image source={{ uri: selectedImage }} style={styles.image}/>}
        </View>

        {!openCamera && <Button label={'Select Image'}
          onPress={pickImageAsync}
          color={'blue'}
        />}

        {!openCamera && <Button label={'Open Camera'}
          onPress={() => { setOpenCamera(true) }}
          color={'brown'}
        />}

        { openCamera && <CameraComponent onPictureTaken={onPictureTaken} /> }
      </View>

      { selectedImage !== '' && <Button label={'Save Image'} onPress={onSaveImageAsync} color={'green'} />}

      { selectedImage !== '' && <Button label={'Cancel'} onPress={() => { setSelectedImage('') }} color={'red'} />}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: 'white'
  },
  logo: {
    width: 300,
    height: 110,
    resizeMode: 'contain',
    margin: 10
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    margin: 10
  }
});
