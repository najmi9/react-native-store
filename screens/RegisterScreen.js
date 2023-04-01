import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Handle registration logic
  };

  return (
    <View>
      <Text>Register Screen</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}

export default RegisterScreen;
