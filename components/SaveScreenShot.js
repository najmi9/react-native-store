
import * as MediaLibrary from 'expo-media-library';
import { View } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import Button from '../ui/Button.js';

export default function SaveScreenShot({reset, imageRef}) {
    const [status, requestPermission] = MediaLibrary.usePermissions();

    if (status === null) {
        requestPermission();
    }

    const onSaveImageAsync = async () => {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });

        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert("Saved!");
        }

        reset();
    };

    return <View>
        <Button label={'Save Image'} onPress={onSaveImageAsync} color={'green'} />
    </View>
}
