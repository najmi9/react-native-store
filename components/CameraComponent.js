import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

const CameraComponent = ({ onPictureTaken }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);

  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (isCameraReady && cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      onPictureTaken(photo.uri);
    }
  };

  const handleCameraReady = () => {
    setIsCameraReady(true);
  };

  const flipCamera = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={cameraRef} type={cameraType} onCameraReady={handleCameraReady}>
        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <Ionicons name="ios-camera" size={50} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.flipButton} onPress={flipCamera}>
          <Ionicons name="ios-camera-reverse-sharp" size={40} color="#fff" />
        </TouchableOpacity>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
  },
  camera: {
    height: 500,
  },
  captureButton: {
    bottom: -450,
    alignSelf: 'center',
  },
  flipButton: {
    position: 'absolute',
    top: 0,
    right: 5,
  },
});

export default CameraComponent;
