import React, { useState } from 'react'
import { Image, TextInput, View } from 'react-native'
import styles from './styles'
import PropTypes from 'prop-types'
import { placeholders } from './constants'
import { useGlobalState } from '../../hooks/register'
export default function RegistrationForm() {
  const [fullName, setFullName] = useGlobalState('fullName')
  const [email, setEmail] = useGlobalState('email')
  const [password, setPassword] = useGlobalState('password')
  const [confirmPassword, setConfirmPassword] = useGlobalState(
    'confirmPassword',
  )

  return (
    <View>
      <Image style={styles.logo} source={require('../../../assets/logo.png')} />
      <TextInput
        style={styles.input}
        placeholder={placeholders.FULLNAME}
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setFullName(text)}
        value={fullName}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
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
      <TextInput
        style={styles.input}
        placeholderTextColor="#aaaaaa"
        secureTextEntry
        placeholder={placeholders.CONFIRMPASSWORD}
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
    </View>
  )
}

RegistrationForm.propTypes = {
  navigation: PropTypes.object,
}
