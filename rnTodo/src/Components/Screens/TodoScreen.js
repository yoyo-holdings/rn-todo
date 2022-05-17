import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {Box, Icon, Input, Text, Divider, VStack} from 'native-base';
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
          style={{
            height: 350,
            width: null,
            paddingHorizontal: 16,
            paddingVertical: 16,
          }}>
          <View>
            <Text style={styles.userText}>Hello User</Text>
            <Text style={[styles.userText, {fontSize: 14, marginBottom: 8}]}>
              What are you going to do?
            </Text>
          </View>
          <Box w="100%" style={styles.todoInput}>
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
              style={{fontFamily: font.PoppinsRegular, fontSize: 16}}
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

        <View style={{marginTop: -215, paddingHorizontal: 16}}>
          <Text style={[styles.userText, {fontSize: 14}]}>
            Your To-Do List :
          </Text>

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
            <View style={{height: 100}}>
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 50,
                }}>
                Your Todo is Empty..
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
}

export default TodoScreen;

const styles = StyleSheet.create({
  userText: {
    paddingTop: 8,
    fontSize: 26,
    fontFamily: font.PoppinsBold,
    color: colors.white,
  },
  userTextContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: -350,
  },
  todoInput: {
    backgroundColor: colors.white,
    borderRadius: 5,
    borderColor: 'transparent',
  },
  cardTodo: {
    marginTop: 8,
    borderRadius: 5,
    elevation: 0,
    borderColor: 'transparent',
    backgroundColor: colors.white,
  },
});
