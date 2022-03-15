import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    TextInput
} from 'react-native';

const ForgotPass = ({navigate}) => {
    const sendResetPasscode = () => {
        navigate.back()
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Trooper</Text>
            </View>
            <View style={styles.footer}>
                <View>
                    <Text style={styles.footerText}>Please enter your email address.</Text>
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Email."
                        placeholderTextColor="#fff"
                    />
                </View>
                    <TouchableOpacity 
                        style={styles.loginBtn}
                        onPress={()=>sendResetPasscode()}
                    >
                        <Text style={styles.loginText}>Send</Text>
                    </TouchableOpacity>
                </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f54254',
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 65,
        fontWeight: 'bold',
    },
    footer: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 20,
        paddingHorizontal: 30,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: "#cacaca"
    },
    inputView: {
        backgroundColor: "#FFC0CB",
        borderRadius: 30,
        width: "90%",
        height: 45,
        marginBottom: 20,
        alignItems: 'flex-start',
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
        width: "100%",
    },
    help_button: {
        height: 30,
        marginBottom: 5,
    },

    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f54254",
        marginTop: 10
    },
});

export default ForgotPass;
