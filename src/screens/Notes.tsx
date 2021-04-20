import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState } from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Modal,
} from 'react-native';
import { Button, Input } from '../components';



interface Account {
    title: string;
    text: string;
  }
const Note = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [addNotes, setAddNotes] = useState<Account[]>([]);
    const [error, showError] = useState<Boolean>(false);

  const accounts = {
        title: title,
        text: text,
    }
        
  //  const renderItem =  ({ item }: { item: any }) => (<View key={item.key}><Text>{item.title}</Text></View>);

    const handleSubmit = async () =>  {
        if (title.trim() && text.trim()) {
            setAddNotes([...addNotes, { title: title, text: text}]);
            setModalVisible(false)
        }
        
        else {
            showError(true);
        setTitle("");
        setText("");
        }
            try {
              await AsyncStorage.setItem(
                "@UserAccount:key",
                JSON.stringify(accounts)
              );
              console.log(accounts)
            } catch (error) {
                alert(error)
            }
          
      };
      const load = async () =>  {
            try {
              await AsyncStorage.getItem(
                "@UserAccount:key"
              );
            } catch (error) {
                alert(error)
            }
          
      };
      const deleteFunction = (_index: number) =>  {
        let tempArr = [...addNotes];
        tempArr.splice(_index, 1);
        setAddNotes(tempArr)
      }  
      const openModal = () => {
         //function to handle click on floating Action Button
          setModalVisible(true)
      };

      useEffect(() => {
          load();
      }, []);
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Input placeholder="Title" value={""} onChangeText={e => {
            setTitle(e);
            showError(false);
          }}/> 
            <Text style={styles.textStyle}>TITLE</Text>
            <Input placeholder="Text" value={""} onChangeText={e => {
            setText(e);
            showError(false);
          }}/>
            <Text style={styles.textStyle}>TEXT</Text>
          <View style={styles.buttonStyle}>
          <View style={styles.submit}>
            <Button text="Save" handleClick={handleSubmit}/>
          </View>
            <Button text="Close" handleClick={() => setModalVisible(false)}/>
          </View>
          </View>
        </View>
      </Modal>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={openModal}
          style={styles.touchableOpacityStyle}>
          <Image
            source={require('../images/add.png')}
            style={styles.floatingButtonStyle}
          />
        </TouchableOpacity>
      {addNotes.map((accounts: Account, index: number) => (
        <TouchableOpacity>
        <View style={styles.output} key={`${index}_${accounts.title}_${accounts.text}`}>
          <Text style={styles.title}>
            {accounts.title} 
          </Text>
          <Text style={styles.text}>          
            {accounts.text}
          </Text>
          <View style={styles.delete} >
            <Button text="Delete" handleClick={deleteFunction}/>
        </View>
        </View>
       
        </TouchableOpacity>
        
      ))}
    
      <View>

      </View>
      </View>
    </SafeAreaView>
  );
};

export default Note;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  titleStyle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
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
    fontSize: 18
  },
  text:{
    textAlign: 'center',
    alignSelf: 'flex-start',
    fontSize: 18
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  title:{
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'flex-start',
    fontSize: 24
  },
  output: {
    borderBottomWidth: 2,
    marginVertical: 10, 
    justifyContent: 'center',
  },
  submit: {
    marginRight: 10
  },
  delete: {
    alignSelf: 'flex-end',
    paddingBottom: 20,
    justifyContent: 'center',
    marginTop: -40
}, 

});