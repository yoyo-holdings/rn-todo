import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ImageBackground,
  ToastAndroid,
} from 'react-native';
import {Box, Icon, Input, Text} from 'native-base';
import {v4 as uuidv4} from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {CustomHeader} from '../Layout/CustomHeader';
import font from '../../Theme/font';
import colors from '../../Theme/colors';

function TodoScreen() {
  const [todoList, setTodoList] = useState([]);
  const [newTodoName, setNewTodoName] = useState('');

  useEffect(() => {
    getTodo();
  }, []);

  console.log(todoList, 'todoList');

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
      console.log(newTodo, 'newTodo');
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
            todoList.map((todo, index) => (
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
                  onChangeText={val => setNewTodoName(val)}
                  _light={{
                    placeholderTextColor: 'blueGray.400',
                  }}
                  _dark={{
                    placeholderTextColor: 'blueGray.50',
                  }}
                  InputRightElement={
                    <Icon
                      as={<Ionicons name={'trash-outline'} />}
                      size="md"
                      m={2}
                      _light={{
                        color: 'black',
                      }}
                      _dark={{
                        color: 'gray.300',
                      }}
                      onPress={() => deleteTodo(todo.id)}
                    />
                  }
                />
              </Box>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Your Todo is Empty..</Text>
            </View>
          )}
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
  userTextContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: -350,
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
