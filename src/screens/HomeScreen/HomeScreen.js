import React, { useEffect, useState, useLayoutEffect } from 'react'
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  Alert,
} from 'react-native'
import styles from './styles'
import { firebase } from 'firebaseconf/config'
import PropTypes, { string } from 'prop-types'
import { useGlobalState } from '../../hooks/dataUpdate'
import TodoList from '../../components/List/TodoList'
export default function HomeScreen(props) {
  const [entities, setEntities] = useGlobalState('entities')
  const [entityTitle, setEntityTitle] = useGlobalState('entityTitle')
  const [entityText, setEntityText] = useGlobalState('entityText')
  const [postView, setPostView] = useGlobalState('postView')
  const entityRef = firebase.firestore().collection('entities')
  const { route, navigation, user } = props
  const userID = route?.params?.user.id ?? user?.id

  useLayoutEffect(() => {
    navigation?.setOptions({
      _headerRight: () => (
        <TouchableOpacity onPress={onLogout}>
          <Text style={styles.LOGOUT}>logout</Text>
        </TouchableOpacity>
      ),
      _headerLeft: () => null,
      get headerRight() {
        return this._headerRight
      },
      get headerLeft() {
        return this._headerLeft
      },
      set headerRight(value) {
        this._headerRight = value
      },
      set headerLeft(value) {
        this._headerLeft = value
      },
    })
  }, [navigation])
  useEffect(() => {
    if (userID) {
      entityRef
        .where('authorID', '==', userID)
        .orderBy('createdAt', 'asc')
        .onSnapshot(
          (querySnapshot) => {
            const newEntities = []
            querySnapshot.forEach((doc) => {
              const entity = doc.data()
              entity.id = doc.id
              newEntities.push(entity)
            })
            setEntities(newEntities)
          },
          (error) => {
            console.log(error)
          },
        )
    }
  }, [])

  const onAddButtonPress = () => {
    if (entityText && entityText.length > 0) {
      const timestamp = firebase.firestore?.FieldValue?.serverTimestamp()
      const data = {
        title: entityTitle,
        text: entityText,
        authorID: userID ? userID : null,
        createdAt: timestamp ? timestamp : null,
        status: 'TODO',
      }
      entityRef
        .add(data)
        .then((_doc) => {
          setEntityText('')
          setEntityTitle('')
          Keyboard.dismiss()
        })
        .catch((error) => {
          Alert.alert(error)
        })
    }
  }

  const onLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        Alert.alert('sign out success')
        navigation.replace('Login', { user: null })
      })
      .catch((error) => {
        Alert.alert(error)
      })
  }

  return (
    <View style={styles.container}>
      {postView && (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Title"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setEntityTitle(text)}
            value={entityTitle}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Content"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setEntityText(text)}
            value={entityText}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
      )}

      {entities && (
        <View style={styles.listContainer}>
          <SafeAreaView>
            <TodoList />
          </SafeAreaView>
        </View>
      )}
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => setPostView(!postView)}
      >
        <Text style={styles.buttonText}>
          {postView ? 'Hide Form' : 'Add New Post'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
HomeScreen.propTypes = {
  route: PropTypes.object,
  user: PropTypes.object,
  navigation: PropTypes.object,
}
