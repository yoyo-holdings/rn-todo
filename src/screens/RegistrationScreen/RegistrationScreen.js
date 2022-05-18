import React, { useState } from 'react'
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './styles'
import RegistrationForm from '../../components/Form/RegistrationForm'
import { firebase } from 'firebaseconf/config'
import PropTypes from 'prop-types'
import { useGlobalState } from '../../hooks/register'

export default function RegistrationScreen({ navigation }) {
  const [fullName, setFullName] = useGlobalState('fullName')
  const [email, setEmail] = useGlobalState('email')
  const [password, setPassword] = useGlobalState('password')
  const [confirmPassword, setConfirmPassword] = useGlobalState(
    'confirmPassword',
  )
  const [isLoading, setIsLoading] = useState(false)

  const onFooterLinkPress = () => {
    navigation.navigate('Login')
  }

  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      Alert.alert("Passwords don't match.")
      return
    }
    setIsLoading(true)
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid
        const data = {
          id: uid,
          email,
          fullName,
        }
        const usersRef = firebase.firestore().collection('users')
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            navigation.replace('Home', { user: data })
          })
          .catch((error) => {
            Alert.alert('Something Went Wrong, Please try again.')
            console.log(error)
          })
      })
      .catch((error) => {
        Alert.alert('Register Failed, Please use another Email/Password')
        console.log(error)
      })
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always"
      >
        <RegistrationForm />
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <TouchableOpacity
            style={password.length > 5 ? styles.button : styles.disabledButton}
            onPress={() => (password.length > 5 ? onRegisterPress() : null)}
          >
            <Text style={styles.buttonTitle}>Create account</Text>
          </TouchableOpacity>
        )}

        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Already got an account?{' '}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Log in
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

RegistrationScreen.propTypes = {
  navigation: PropTypes.object,
}
