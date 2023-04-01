import React from 'react';
import { View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Button from '../ui/Button.js';

export default function ImagePickerComponent({onImageSelected}) {
    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            onImageSelected(result.assets[0].uri);
        } else {
            alert('You did not select any image.');
        }
    };

    return (
        <View>
            <Button label='Select Image'
            onPress={pickImageAsync}
            color={'blue'}
          />
        </View>
    );
}
