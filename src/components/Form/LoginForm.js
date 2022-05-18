import React, { useState } from 'react'
import { TextInput, View } from 'react-native'
import styles from './styles'
import PropTypes from 'prop-types'
import { useGlobalState } from '../../hooks/login'
import { placeholders } from './constants'

export default function LoginForm({ navigation }) {
  const [email, setEmail] = useGlobalState('email')
  const [password, setPassword] = useGlobalState('password')

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder={placeholders.EMAIL}
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setEmail(text)}
        value={email}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholderTextColor="#aaaaaa"
        secureTextEntry
        placeholder={placeholders.PASSWORD}
        onChangeText={(text) => setPassword(text)}
        value={password}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
    </View>
  )
}

LoginForm.propTypes = {
  navigation: PropTypes.object,
}
