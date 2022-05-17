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
  Stack,
  Button,
  Modal,
  FormControl,
} from 'native-base';
import {v4 as uuidv4} from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {CustomHeader} from '../Layout/CustomHeader';
import font from '../../Theme/font';
import colors from '../../Theme/colors';

function NoteScreen() {
  const [NoteList, setNoteList] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteText, setNewNoteText] = useState('');

  useEffect(() => {
    getNote();
  }, []);

  // console.log(NoteList, 'NoteList');

  const getNote = async () => {
    try {
      const note = await AsyncStorage.getItem('usernote');
      let currentNote = JSON.parse(note);
      if (currentNote === null) {
        currentNote = [];
      }
      currentNote.sort((a, b) => new Date(b.date) - new Date(a.date));
      setNoteList(currentNote);
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
    }
  };

  const deleteNote = async id => {
    try {
      const copyArray = NoteList.filter(note => note.id !== id);
      await AsyncStorage.setItem('usernote', JSON.stringify(copyArray));
      setNoteList(copyArray);
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
      const mergeNote = [...NoteList, newNote];
      mergeNote.sort((a, b) => new Date(b.date) - new Date(a.date));
      await AsyncStorage.setItem('usernote', JSON.stringify(mergeNote));
      setNoteList(mergeNote);
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
            <Box style={styles.boxInput}>
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
            </Box>
            <Box style={styles.boxInput}>
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
            </Box>
            <Button onPress={addNote} style={styles.btnInput}>
              <Text>Add</Text>
            </Button>
          </Box>
        </ImageBackground>

        <View style={styles.noteContainer}>
          <Text style={[styles.userSubtitle, {color: colors.black}]}>
            Your Note List :
          </Text>

          {NoteList.length > 0 ? (
            NoteList.map(note => (
              <Box key={note.id}>
                <Stack
                  mb="2.5"
                  mt="1.5"
                  pl="2"
                  pb="1"
                  direction="row"
                  w="100%"
                  bg="primary.600"
                  rounded="sm"
                  shadow={'3'}
                  style={{justifyContent: 'space-between'}}>
                  <Stack direction="column">
                    <Text fontSize="2xl" style={styles.note}>
                      {note.title.toUpperCase()}
                    </Text>
                    <Text fontSize="lg" style={styles.note}>
                      {note.text}
                    </Text>
                  </Stack>
                  <Stack direction="row">
                    <Icon
                      as={<Ionicons name="create-outline" />}
                      size="md"
                      m={2}
                      style={{marginRight: 0}}
                      _light={{
                        color: 'white',
                      }}
                      //onPress={addTodo}
                    />
                    <Icon
                      as={<Ionicons name="trash-outline" />}
                      size="md"
                      m={2}
                      _light={{
                        color: 'white',
                      }}
                      onPress={() => deleteNote(note.id)}
                    />
                  </Stack>
                </Stack>
              </Box>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Your Note is Empty..</Text>
            </View>
          )}
        </View>
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
    borderColor: 'transparent',
  },
  boxInput: {
    backgroundColor: colors.white,
    marginTop: 8,
    borderRadius: 5,
  },
  btnInput: {
    justifyContent: 'center',
    height: 40,
    backgroundColor: colors.purple,
    marginTop: 10,
    borderRadius: 5,
  },
  noteInput: {
    fontFamily: font.PoppinsRegular,
    fontSize: 16,
  },
  noteContainer: {
    marginTop: -100,
    paddingHorizontal: 16,
  },
  cardNote: {
    flexDirection: 'column',
    borderRadius: 5,
    elevation: 0,
    borderColor: 'transparent',
  },
  note: {
    color: colors.white,
  },
  emptyContainer: {
    height: 100,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
  },
});
