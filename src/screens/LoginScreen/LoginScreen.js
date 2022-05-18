import React, { useState } from 'react'
import { Image, Text, TouchableOpacity, View, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './styles'
import { firebase } from 'firebaseconf/config'
import PropTypes from 'prop-types'
import LoginForm from '../../components/Form/LoginForm'
import { useGlobalState } from '../../hooks/login'

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useGlobalState('email')
  const [password, setPassword] = useGlobalState('password')
  const onFooterLinkPress = () => {
    navigation.navigate('Registration')
  }

  const onLoginPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid
        const usersRef = firebase.firestore().collection('users')
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              Alert.alert('User does not exist anymore.')
              return
            }
            const user = firestoreDocument.data()
            navigation.replace('Home', { user: user })
          })
          .catch((error) => {
            Alert.alert(
              'Failed to retrieve user data, please check your network',
            )
            console.log(error)
          })
      })
      .catch((error) => {
        Alert.alert('Login Failed, Please check email or password.')
        console.log(error)
      })
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always"
      >
        <Image
          style={styles.logo}
          source={require('../../../assets/logo.png')}
        />
        <LoginForm />
        <TouchableOpacity style={styles.button} onPress={() => onLoginPress()}>
          <Text style={styles.buttonTitle}>Log in</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Don't have an account?{' '}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Sign up
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

LoginScreen.propTypes = {
  navigation: PropTypes.object,
}
