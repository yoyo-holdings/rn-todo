import React from 'react';
import { useState } from 'react';
import {View, Text, StyleSheet, SafeAreaView, StatusBar, FlatList} from 'react-native'
import TodoInput from '../TodoInput';
import TodoItem from '../TodoItem';
 
interface Props {
    navigation: any;
  }
export const Home: React.FC<Props> = ({ navigation }) => {
    const [todoItems, setTodoItems] = useState([{text: "", completed: true}]);

    // Add a new item to the state
    function addTodoItem(_text: any) {
        setTodoItems([...todoItems, {text:_text, completed: false}]);
    }

    // Delete an item from state by index
    function deleteTodoItem(_index: number){
        let tempArr = [...todoItems];
        tempArr.splice(_index, 1);
        setTodoItems(tempArr)
    }

    // Function to set completed to true by index.
    function completeTodoItem(_index: number){
        let tempArr = [...todoItems];
        tempArr[_index].completed = true;
        setTodoItems(tempArr)
    }

    // Render
    return (
        <>
            <StatusBar barStyle={"light-content"} backgroundColor={"#212121"}/>
            <SafeAreaView style={{padding: 16, justifyContent: 'space-between', flex: 1}}>
                <FlatList
                    data={todoItems}
                    keyExtractor={(_item, index) => index.toString()}
                    renderItem={({item, index}) => {
                        return (
                            <TodoItem
                                item={item}
                                deleteFunction={() => deleteTodoItem(index)}
                                completeFunction={() => completeTodoItem(index)}
                                
                            />
                        )
                    }}
                />
                <TodoInput onPress={addTodoItem} />
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    content: {
      flex: 1,
      justifyContent: "flex-start"
  },
    container: {
      flex: 1,
      padding: 10,
    },
    titleStyle: {
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: -30,
      marginBottom: 10
    },
    buttonStyle: {
      flexDirection: 'row',
      flex: 1,
      padding: 10,
      marginTop: 50
    },
    touchableOpacityStyle: {
      position: 'absolute',
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      right: 30,
      bottom: 30,
    },
    floatingButtonStyle: {
      resizeMode: 'contain',
      width: 80,
      height: 80,    
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      backgroundColor: 'white',
      width: 350,
      height: 450,
      borderRadius: 20,
      padding: 30,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    textStyle: {
      fontWeight: 'bold',
      textAlign: 'center',
      alignSelf: 'flex-start',
    },
    todoText:{
      fontSize: 36, 
      fontWeight: 'bold',
      margin: 30
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    submit: {
      marginRight: 10
    },
 
  });