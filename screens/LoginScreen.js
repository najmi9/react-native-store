import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { createNavigationContainerRef } from '@react-navigation/native';
import { getJWTToken } from '../utils/auth.js';
import storage from '../utils/storage.js';

export default function LoginScreen() {
    const navigationRef = createNavigationContainerRef()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(storage.get('jwt-token'));

    const handleLogin = () => {
        setLoading(true);
        const emailRegex = /\S+@\S+\.\S+/;
        const sValidEmail = emailRegex.test(email);

        if (!email || !password || !sValidEmail) {
            setError('Please fill in all fields with valid information.');
            setLoading(false);
            return;
        }

        getJWTToken(email, password)
        .then((r) => {
            if (r.error) {
                throw new Error(r.error);
            }

            if (!r.token) {
                throw new Error('No token received.');
            }

            setLoading(false);
            setLoggedIn(true);

            const token = r.token;
            AsyncStorage.setItem('jwt-token', token);
            setLoggedIn(true);
        })
        .catch(error => {
            setLoading(false);
            setError(error.message);
        });
    }

    if (loggedIn) {
      if (navigationRef.isReady()) {
          navigationRef.navigate('Home', {});
      }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="white"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="white"
            />
            <Button title="Login" onPress={handleLogin} />
            {loading && <Text>Loading...</Text>}
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        color: 'white',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: 'white',
    },
    input: {
        height: 40,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 5,
        color: 'white',
    },
    error: {
        color: 'red',
    },
});
