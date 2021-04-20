import React, {useState} from 'react';
import {TouchableOpacity, View, Text, TextInput, KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import { Button, Input } from './components';

export default function TodoInput(props: { onPress: (arg0:any) => void; }) {
    const [text, setText] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        props.onPress(text);
        setText("")
    }

    // Render
    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        <View style={styles.container}>
            <Input placeholder="Add Task Here" onChangeText={(text: React.SetStateAction<string>) => setText(text)} value={text} />
            <Button text="Add Task" handleClick={handleSubmit}/>
        </View>
        </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: "flex-start"
    },
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
        marginTop:-100
    }
});