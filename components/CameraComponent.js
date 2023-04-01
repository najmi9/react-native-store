import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

const CameraComponent = ({ onPictureTaken }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (isCameraReady && cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      onPictureTaken(photo);
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
      <Camera style={styles.camera} ref={(ref) => setCameraRef(ref)} type={cameraType} onCameraReady={handleCameraReady}>
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
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  captureButton: {
    marginBottom: 20,
  },
  flipButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default CameraComponent;
