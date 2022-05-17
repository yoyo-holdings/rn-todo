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
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {CustomHeader} from '../Layout/CustomHeader';
import font from '../../Theme/font';
import colors from '../../Theme/colors';

function TodoScreen() {
  const [todoList, setTodoList] = useState([]);
  const [newTodoName, setNewTodoName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [todoId, setTodoId] = useState('');
  const [todoEdit, setTodoEdit] = useState('');

  useEffect(() => {
    getTodo();
  }, []);

  const toggleTodo = async (id, key, value) => {
    try {
      const copyArray = todoList.map(todo =>
        todo.id === id ? {...todo, [key]: value} : todo,
      );
      await AsyncStorage.setItem('usertodo', JSON.stringify(copyArray));
      setTodoList(copyArray);
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
    }
  };

  const openModal = (modal, id) => {
    setShowModal(true);
    setTodoId(id);
  };

  const editTodo = async () => {
    try {
      const copyArray = todoList.map(todo => {
        if (todo.id === todoId) {
          return {
            ...todo,
            name: todoEdit,
            isChecked: todo.isChecked,
          };
        } else {
          return todo;
        }
      });
      await AsyncStorage.setItem('usertodo', JSON.stringify(copyArray));
      setTodoList(copyArray);
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
    }

    setShowModal(false);
    setTodoId('');
    setTodoEdit('');
  };

  const deleteTodo = async id => {
    try {
      const copyArray = todoList.filter(todo => todo.id !== id);
      await AsyncStorage.setItem('usertodo', JSON.stringify(copyArray));
      setTodoList(copyArray);
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
    }
  };

  const addTodo = async () => {
    try {
      const newTodo = {
        id: uuidv4(),
        name: newTodoName,
        isChecked: false,
      };
      await AsyncStorage.setItem(
        'usertodo',
        JSON.stringify([...todoList, newTodo]),
      );
      setTodoList([...todoList, newTodo]);
      setNewTodoName('');
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
    }
  };

  const getTodo = async () => {
    try {
      const todo = await AsyncStorage.getItem('usertodo');
      let currentTodo = JSON.parse(todo);
      if (currentTodo === null) {
        currentTodo = [];
      }
      setTodoList(currentTodo);
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
            <Text style={styles.userSubtitle}>What are you going to do?</Text>
          </View>
          <Box w="100%" style={styles.todoInputContainer}>
            <Input
              InputRightElement={
                <Icon
                  as={<Ionicons name="add-outline" />}
                  size="md"
                  m={2}
                  _light={{
                    color: 'black',
                  }}
                  _dark={{
                    color: 'gray.300',
                  }}
                  onPress={addTodo}
                />
              }
              placeholder="Add To-Do"
              style={styles.todoInput}
              value={newTodoName}
              onChangeText={val => setNewTodoName(val)}
              _light={{
                placeholderTextColor: 'blueGray.400',
              }}
              _dark={{
                placeholderTextColor: 'blueGray.50',
              }}
            />
          </Box>
        </ImageBackground>

        <View style={styles.todoContainer}>
          <Text style={styles.userSubtitle}>Your To-Do List :</Text>

          {todoList.length > 0 ? (
            todoList.map(todo => (
              <Box w="100%" style={styles.cardTodo} key={todo.id}>
                <Input
                  InputLeftElement={
                    <Icon
                      as={
                        <Ionicons
                          name={
                            !todo.isChecked
                              ? 'square-outline'
                              : 'checkbox-outline'
                          }
                        />
                      }
                      size="md"
                      m={2}
                      _light={{
                        color: 'black',
                      }}
                      _dark={{
                        color: 'gray.300',
                      }}
                      onPress={() =>
                        toggleTodo(todo.id, 'isChecked', !todo.isChecked)
                      }
                    />
                  }
                  style={{
                    textDecorationLine: todo.isChecked
                      ? 'line-through'
                      : 'none',
                  }}
                  value={todo.name}
                  _light={{
                    placeholderTextColor: 'blueGray.400',
                  }}
                  _dark={{
                    placeholderTextColor: 'blueGray.50',
                  }}
                  InputRightElement={
                    <HStack space={2} justifyContent="flex-end">
                      <Icon
                        as={<Ionicons name={'create-outline'} />}
                        size="md"
                        _light={{
                          color: 'black',
                        }}
                        _dark={{
                          color: 'gray.300',
                        }}
                        onPress={() => openModal(true, todo.id)}
                      />
                      <Icon
                        style={{marginRight: 8}}
                        as={<Ionicons name={'trash-outline'} />}
                        size="md"
                        _light={{
                          color: 'black',
                        }}
                        _dark={{
                          color: 'gray.300',
                        }}
                        onPress={() => deleteTodo(todo.id)}
                      />
                    </HStack>
                  }
                />
              </Box>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Your Todo is Empty..</Text>
            </View>
          )}

          <Center>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
              <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>Edit Todo</Modal.Header>
                <Modal.Body>
                  <FormControl>
                    <FormControl.Label>Todo</FormControl.Label>
                    <Input value={todoEdit} onChangeText={setTodoEdit} />
                  </FormControl>
                </Modal.Body>
                <Modal.Footer>
                  <Button.Group space={2}>
                    <Button
                      variant="ghost"
                      colorScheme="blueGray"
                      onPress={() => {
                        setShowModal(false);
                      }}>
                      Cancel
                    </Button>
                    <Button
                      onPress={() => {
                        editTodo();
                      }}>
                      Save
                    </Button>
                  </Button.Group>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
          </Center>
        </View>
      </ScrollView>
    </>
  );
}

export default TodoScreen;

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
  todoInputContainer: {
    backgroundColor: colors.white,
    borderRadius: 5,
    borderColor: 'transparent',
  },
  todoInput: {
    fontFamily: font.PoppinsRegular,
    fontSize: 16,
  },
  todoContainer: {
    marginTop: -215,
    paddingHorizontal: 16,
  },
  cardTodo: {
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
