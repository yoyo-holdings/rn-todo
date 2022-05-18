import React, { useEffect, useState, useLayoutEffect } from 'react'
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native'
import Checkbox from 'expo-checkbox'
import styles from './styles'
import { firebase } from 'firebaseconf/config'
import { useGlobalState } from '../../hooks/dataUpdate'

export default function TodoList(props) {
  const [entities, setEntities] = useGlobalState('entities')
  const [updateText, setUpdateText] = useState('')
  const [isUpdating, setIsUpdating] = useGlobalState('isUpdating')
  const [updateTitle, setUpdateTitle] = useState('')
  const [updateIndex, setUpdateIndex] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const entityRef = firebase.firestore().collection('entities')
  const { route, navigation, user } = props
  const userID = route?.params?.user.id ?? user?.id

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

  const deletePost = (index) => {
    setDisabled(true)
    entityRef
      .doc(entities[index].id)
      .delete()
      .then(() => {
        setDisabled(false)
        Alert.alert('delete success')
      })
      .catch((error) => {
        setDisabled(false)
        Alert.alert(error)
      })
  }

  const changeStatus = (index) => {
    entityRef
      .doc(entities[index].id)
      .update('status', 'DONE')
      .then(() => {
        Alert.alert('update success')
        setDisabled(false)
      })
      .catch((error) => {
        Alert.alert(error)
      })
  }

  const updating = (index) => {
    setDisabled(true)
    setUpdateIndex(index)
  }

  const submitUpdate = (index) => {
    setIsUpdating(true)
    if (updateText !== '' && updateTitle !== '') {
      entityRef
        .doc(entities[index].id)
        .update({
          title: updateTitle,
          text: updateText,
        })
        .then(() => {
          Alert.alert('update success')
          setUpdateTitle('')
          setUpdateText('')
          setDisabled(false)
          setIsUpdating(false)
          setUpdateIndex(null)
        })
        .catch((error) => {
          Alert.alert(error)
        })
    } else if (updateText !== '' && updateTitle == '') {
      entityRef
        .doc(entities[index].id)
        .update({
          text: updateText,
        })
        .then(() => {
          Alert.alert('update success')
          setUpdateText('')
          setDisabled(false)
          setIsUpdating(false)
          setUpdateIndex(null)
        })
        .catch((error) => {
          Alert.alert(error)
        })
    }
    if (updateText == '' && updateTitle !== '') {
      entityRef
        .doc(entities[index].id)
        .update({
          title: updateTitle,
        })
        .then(() => {
          Alert.alert('update success')
          setUpdateTitle('')
          setDisabled(false)
          setIsUpdating(false)
          setUpdateIndex(null)
        })
        .catch((error) => {
          Alert.alert(error)
        })
    }
  }

  const renderEntity = ({ item, index }) => {
    return (
      <View style={styles.card}>
        <View style={styles.flexTitle}>
          {updateIndex == index ? (
            <TextInput
              style={styles.titleUpdate}
              placeholder="Title"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setUpdateTitle(text)}
              value={updateTitle !== '' ? updateTitle : item.title}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
          ) : (
            <Text style={styles.titleText}>
              {index + 1 + '. ' + item.title}
            </Text>
          )}
          <Checkbox
            value={item.status == 'DONE' ? true : false}
            onValueChange={() => (disabled ? null : changeStatus(index))}
            style={styles.checkbox}
            color={item.status == 'DONE' ? '#00FF00' : undefined}
          />
        </View>
        {updateIndex == index ? (
          <TextInput
            style={styles.titleUpdate}
            placeholder="Content"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setUpdateText(text)}
            value={updateText !== '' ? updateText : item.text}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
        ) : (
          <Text style={styles.entityText}>{item.text}</Text>
        )}
        <View style={styles.flexformContainer}>
          {updateIndex == index ? (
            <View>
              {isUpdating ? (
                <ActivityIndicator />
              ) : (
                <TouchableOpacity
                  style={styles.updateButton}
                  onPress={() => submitUpdate(index)}
                >
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <TouchableOpacity
              style={disabled ? styles.DisabledButton : styles.updateButton}
              onPress={() => (disabled ? null : updating(index))}
            >
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={disabled ? styles.DisabledButton : styles.deleteButton}
            onPress={() => (disabled ? null : deletePost(index))}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  return (
    <FlatList
      data={entities}
      renderItem={renderEntity}
      keyExtractor={(item) => item.id}
      inverted={true}
    />
  )
}
