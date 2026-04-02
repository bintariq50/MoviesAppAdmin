import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Pressable } from 'react-native';
import COLORS from '../../utils/colors';
import FONTS from '../../utils/fonts';

import { useAuthStore } from '../../store/useAuthStore';


export default function Login() {
    const { login } = useAuthStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false)
    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter email and password");
            return;
        }
        try {
            await login(email.trim(), password);
            console.log("User logged in successfully");
        } catch (error) {
            console.log("Login error:", error.message);
            Alert.alert("Login Failed", error.message);
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>Login</Text>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.textlbl}>Email</Text>

                <View style={styles.input}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter Your Email"
                        placeholderTextColor={COLORS.searchBarTextColor}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
                <Text style={styles.textlbl}>Password</Text>

                <View style={styles.input}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter Your Password"
                        placeholderTextColor={COLORS.searchBarTextColor}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>
            </View>

            <Pressable onPress={handleLogin}>
                <Text style={styles.buttonContainer}>Login</Text>
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: "5%",
        backgroundColor: COLORS.white
    },
    headingContainer: {
        height: 150,
        justifyContent: "center",
        alignItems: 'center'
    },
    heading: {
        fontSize: 24,
        fontFamily: FONTS.bold
    },
    inputContainer: {
        marginBottom: 20
    },
    input: {
        borderWidth: 1,
        marginVertical: 10,
        borderRadius: 10,
        borderColor: COLORS.searchBarTextColor,
    },
    textlbl: {
        fontFamily: FONTS.bold,
        fontSize: 14
    },
    textInput: {
        padding: 10,
        color: COLORS.black,
        fontSize: 14,
        fontFamily: FONTS.regular,

    },
    buttonContainer: {
        marginTop: 10,
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: "center",
        backgroundColor: COLORS.brandPrimary,
        color: COLORS.white,
        fontSize: 14,
        fontFamily: FONTS.bold,
        borderWidth: 1,
        paddingVertical: 10,
        textAlign: "center"
    },


    buttonColor: {

    },

});

