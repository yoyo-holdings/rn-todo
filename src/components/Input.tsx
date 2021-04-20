import React, { FC } from 'react';
import { TextInput, View, StyleSheet, Dimensions } from 'react-native';

const {height, width} = Dimensions.get('screen')

interface Props {
    placeholder: string;
    onChangeText: (text: string) => void
    value: string;
}

export const Input :FC<Props> = (props) => {
    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder={props.placeholder} onChangeText={props.onChangeText}/>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        minWidth: 250,
        alignSelf: 'center',
        backgroundColor: '#e3e3e3',
        borderRadius: 5,
        marginVertical:  10
   },
   input: {
       padding: 15
   }

})