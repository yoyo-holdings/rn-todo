import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ImageBackground,
  ToastAndroid,
} from 'react-native';
import {
  Box,
  Icon,
  Input,
  Text,
  HStack,
  Center,
  Button,
  Modal,
  FormControl,
} from 'native-base';
import {v4 as uuidv4} from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {CustomHeader} from 'Components/Layout/CustomHeader';
import font from 'Theme/font';
import colors from 'Theme/colors';

function NoteScreen() {
  const [NoteList, setNoteList] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteText, setNewNoteText] = useState('');

  useEffect(() => {
    getNote();
  }, []);

  const getNote = async () => {
    try {
      const note = await AsyncStorage.getItem('usernote');
      let currentNote = JSON.parse(note);
      if (currentNote === null) {
        currentNote = [];
      }
      setNoteList(currentNote);
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
    }
  };

  const addNote = async () => {
    try {
      const newNote = {
        id: uuidv4(),
        title: newNoteTitle,
        text: newNoteText,
        date: new Date(),
      };
      await AsyncStorage.setItem(
        'usertodo',
        JSON.stringify([...NoteList, newNote]),
      );
      setNoteList([...NoteList, newNote]);
      setNewNoteTitle('');
      setNewNoteText('');
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
    }
  };

  return (
    <>
      <CustomHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('../../Theme/bgImage.png')}
          style={styles.imageStyle}>
          <View>
            <Text style={styles.userText}>Hello User</Text>
            <Text style={styles.userSubtitle}>Add New Note?</Text>
          </View>
          <Box w="100%" style={styles.noteInputContainer}>
            <Input
              placeholder="Title"
              style={styles.noteInput}
              value={newNoteTitle}
              onChangeText={val => setNewNoteTitle(val)}
              _light={{
                placeholderTextColor: 'blueGray.400',
              }}
              _dark={{
                placeholderTextColor: 'blueGray.50',
              }}
            />
            <Input
              placeholder="Text"
              style={styles.noteInput}
              value={newNoteText}
              onChangeText={val => setNewNoteText(val)}
              _light={{
                placeholderTextColor: 'blueGray.400',
              }}
              _dark={{
                placeholderTextColor: 'blueGray.50',
              }}
            />
            <Button
              onPress={addNote}
              style={{
                justifyContent: 'center',
                height: 40,
                backgroundColor: colors.purple,
                marginTop: 10,
                borderRadius: 5,
              }}>
              <Text>Add</Text>
            </Button>
          </Box>
        </ImageBackground>

        <View style={styles.noteContainer}>
          <Text style={styles.userSubtitle}>Your Note List :</Text>
        </View>

        {NoteList.length > 0 ? (
          NoteList.map(note => (
            <Box w="100%" style={styles.cardNote} key={note.id}>
              <Text
                numberOfLines={1}
                style={{
                  width: '100%',
                  fontFamily: font.PoppinsBold,
                }}>
                {note.title.toUpperCase()}
              </Text>
              <Text
                numberOfLines={3}
                style={{
                  width: '100%',
                }}>
                {note.text}
              </Text>
            </Box>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your Note is Empty..</Text>
          </View>
        )}
      </ScrollView>
    </>
  );
}

export default NoteScreen;

const styles = StyleSheet.create({
  imageStyle: {
    height: 350,
    width: null,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  userText: {
    paddingTop: 8,
    fontSize: 26,
    fontFamily: font.PoppinsBold,
    color: colors.white,
  },
  userSubtitle: {
    paddingTop: 8,
    fontSize: 14,
    fontFamily: font.PoppinsBold,
    color: colors.white,
    marginBottom: 8,
  },
  noteInputContainer: {
    backgroundColor: colors.white,
    borderRadius: 5,
    borderColor: 'transparent',
  },
  noteInput: {
    fontFamily: font.PoppinsRegular,
    fontSize: 16,
  },
  todoContainer: {
    marginTop: -215,
    paddingHorizontal: 16,
  },
  cardNote: {
    borderRadius: 5,
    elevation: 0,
    borderColor: 'transparent',
    backgroundColor: colors.white,
  },
  emptyContainer: {
    height: 100,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
  },
});
