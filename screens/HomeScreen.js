import { useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Button from '../ui/Button.js';
import CameraComponent from '../components/CameraComponent.js';
import ImagePickerComponent from '../components/ImagePickerComponent.js';
import { Link } from '@react-navigation/native';
import SaveScreenShot from '../components/SaveScreenShot.js';

export default function HomeScreen() {
  const [selectedImage, setSelectedImage] = useState('');
  const [openCamera, setOpenCamera] = useState(false);

  const canOpenCamera = selectedImage === '' && !openCamera;
  const canSaveImage = selectedImage !== '' && !openCamera;
  const canOpenImagePicker = selectedImage === '' && !openCamera;
  const canCancel = selectedImage !== '' || openCamera;

  const imageRef = useRef();

  const onPictureTaken = image => {
    setOpenCamera(false);
    setSelectedImage(image);
  }

  const onCancel = () => {
    setSelectedImage('');
    setOpenCamera(false);
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View ref={imageRef} collapsable={false} style={{marginTop: 60}}>
          <Text style={styles.text}>NajmiDev Company</Text>
          <Text style={styles.text}>najmi.store</Text>

          <View style={styles.center}>
            {selectedImage !== '' &&  <Image source={{ uri: selectedImage }} style={styles.image}/>}
          </View>

          {canOpenImagePicker && <ImagePickerComponent
            onImageSelected={(img) => setSelectedImage(img)}/>}

          {canOpenCamera && <Button label={'Open Camera'}
            onPress={() => { setOpenCamera(true) }}
            color={'brown'}
          />}

          { openCamera && <CameraComponent onPictureTaken={onPictureTaken} /> }
        </View>

        { canSaveImage && <SaveScreenShot reset={onCancel} imageRef={imageRef}/>}

        { canCancel && <Button label={'Cancel'} onPress={onCancel} color={'red'} />}

        <Link to='/register' style={styles.link}>
           Register
        </Link>

        <Link to='/login' style={styles.link}>
            Login
        </Link>

        <Link to='/store' style={styles.link}>
            Store
        </Link>
      </ScrollView>
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
    margin: 10,
    borderRadius: 100
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
  },
  link: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
    margin: 5,
    borderRadius: 10,
    backgroundColor: 'coral',
    textAlign: 'center',
  }
});
