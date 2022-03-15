import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    TextInput
} from 'react-native';
import ModalPopup from '../components/ModalPopup';

const Login = ({navigate, params}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [visible, setVisible] = React.useState(false);
    const [text, setText] = useState("")

    const authorize = () => {
        if(email === "root" && password === "root"){
            params.setAuthorizeToken("test")
        }
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(email) === false) {
            setText("Invalid Email")
            setVisible(true)
            return;
        }

        if(email === "user@email.com" && password === "password" || email === "u@e.com" && password === "pass"){
            params.setAuthorizeToken("test")
        }
        else{
            setText("Wrong Email or Password")
            setVisible(true)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ModalPopup visible={visible}>

                <View style={{marginBottom:20}}>
                    <Text style={{color:"black", fontSize:20, textAlign:"center"}}>
                        {text}
                    </Text>
                </View>

                <View style={{justifyContent: 'center', flexDirection:"row"}}>
                <TouchableOpacity onPress={() => setVisible(false)}>
                    <Text style={[styles.modelbutton, {backgroundColor:"red"}]}>Close</Text>
                </TouchableOpacity>
                </View>

            </ModalPopup>
            <View style={styles.header}>
                <Text style={styles.headerText}>Trooper</Text>
            </View>
            <View style={styles.footer}>
                <View>
                    <Text style={styles.footerText}>User login</Text>
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Email."
                        placeholderTextColor="#fff"
                        onChangeText={(email) => setEmail(email)}
                    />
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Password."
                        placeholderTextColor="#fff"
                        secureTextEntry={true}
                        onChangeText={(password) => setPassword(password)}
                    />
                </View>
                    <TouchableOpacity
                        onPress={()=> navigate.to("ForgotPass")}
                    >
                        <Text style={styles.help_button}>Forget Password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.loginBtn}
                        onPress={()=> authorize()}
                    >
                        <Text style={styles.loginText}>Sign in</Text>
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
        flex: 3,
        backgroundColor: '#f4f4f4',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 20,
        paddingHorizontal: 30,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 40,
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
        color: "#bababa",
    },

    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f54254",
        marginTop: 40
    },
    modelbutton: {
        color:"white", 
        backgroundColor:"black", 
        width:100, 
        padding:10, 
        margin:5,
        borderRadius:10, 
        textAlign:"center"
    }
});

export default Login;
