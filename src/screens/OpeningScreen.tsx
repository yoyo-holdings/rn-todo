import React, { FC } from 'react';
import { useState } from 'react';
import {View, Text, StyleSheet} from 'react-native'
import  {Input, Button}  from '../components';
import { useNavigation } from '../navigation';
 
 const OpeningScreen = () => {
    const [username, setUsername] = useState<string | null>(null);
    const { navigate } = useNavigation()

    const handleLogin = () => {
        if(username !== ""){
            navigate('TODO');
        }else{
            alert('Please input your credentials!');
        }
        
      };
    
    return (
        <View style={styles.container}>
            <Text>TODO APP</Text>
            <Input placeholder="What's Your Name?" onChangeText={(text: React.SetStateAction<string | null>) => setUsername(text)} value={""}/>
            <Button text="Proceed" handleClick={handleLogin}/>
        </View>
    )
}

export default OpeningScreen;

const styles =  StyleSheet.create({
     container: {
         flex: 1,
         justifyContent: 'center',
         alignItems: 'center',

     }
})
