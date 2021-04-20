import React, { useState } from 'react';
import {Text, TouchableOpacity, StyleSheet, View, CheckBox} from 'react-native';
import { Button } from './components';

export default function TodoItem(props: { item: { completed: boolean; text: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }; completeFunction: () => void; deleteFunction: () => void; }) {
    const [isSelected, setSelection] = useState(true);

    // Update style according to props
    let style = props.item.completed ? {
        textDecorationLine: 'line-through'
    } : {
        textDecorationLine: 'none'
    }



    return (
        <View style={styles.container}>
       
        <TouchableOpacity
            onPress={() => props.completeFunction()}
            style={{paddingVertical: 8, flexDirection: 'row', justifyContent: 'space-between'}}>
         <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={styles.checkbox}
            />
            <Text style={[{fontSize: 24}]}>{props.item.text}</Text>
            <TouchableOpacity
                style={styles.delete}
                onPress={() => props.deleteFunction()}>
                <Text style={{color: '#fafafa'}}>X</Text>
            </TouchableOpacity>
        </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        paddingLeft: 10,
    
    }, 
    checkbox: {
        width: 20,
        height: 20, 
        alignSelf: 'center'
      },
    delete: {
        marginRight: -80,
        padding: 8, 
        backgroundColor: '#212121', 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 8
    },
    delete2: {
        alignSelf: 'flex-end',
        justifyContent: 'center',
        marginRight:  10
    }, 
});