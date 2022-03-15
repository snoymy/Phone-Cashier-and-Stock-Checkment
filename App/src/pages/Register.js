import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Alert,
  TouchableOpacity,
  TextInput,  
  Image,
} from 'react-native';
import { NavBar, NavButton, NavTitle } from '../components/NavBar';
import Scanner from '../components/Scanner';
import ModalPopup from '../components/ModalPopup';
import useFetchpostItems from './useFetchpostItems';

const Register = ({navigate}) => {
    const [productName, setProductName] = useState("")
    const [productISBN, setProductISBN] = useState("")
    const [contact, setContact] = useState("")
    const [address, setAddress] = useState("")
    const [price, setPrice] = useState("")
    const [scanned, setScanned] = useState(true);
    const [visible, setVisible] = React.useState(false);
    const [popUpText, setPopUpText] = useState("")
    const [errorText, setErrorText] = useState("")

    const submitData = async () => {
        if(productName == "" || productName == "" || contact == "" || price == ""){
            setErrorText("Please fill all informaltion before submit.")
            return
        }

        const data = {
          title: productName,
          barcode:   productISBN,
          quantity: "0",
          price: price,
          contact: contact,
          address: address,
        }

        const res = await useFetchpostItems(data)

        setPopUpText("Success")
        setVisible(true)
        setProductName("")
        setProductISBN("")
        setContact("")
        setPrice("")
    }

  const onScanned = ({type, data}) => {
    setScanned(true);
    setProductISBN(data)
    setVisible(false)
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    //setProductList([...productList, {prodName:mockup[data], serial:data}]);
  };

    return (
        <SafeAreaView style={styles.container}>
        <NavBar
            NavSpace="8%"
            BarStyle={[styles.topBar, {maxWidth: '100%'}]}
            Left={() => (
            <NavButton
                style={{color: '#fff'}}
                onPress={() => navigate.back()}
                symbol={'❮'}
            />
            )}
            Center={() => (
            <NavTitle
                style={[styles.headerText, {minWidth: '70%'}]}
                title={'Register Product'}
            />
            )}
            Right={() => (
            <NavButton
                style={{color: '#fff', marginRight: 10}}
                onPress={() => navigate.backto(navigate.defaultPage)}
                symbol={'⌂'}
            />
            )}
        />
        <ModalPopup visible={visible}>
          {
            popUpText === "" ?
              <View style={{marginBottom:20, width:"100%", height:200, alignItems:"center", overflow:"hidden"}}>
                <Scanner Callback={onScanned} State={scanned} />
              </View>
              :
              <View style={{marginBottom:20}}>
                  <Text style={{color:"black", fontSize:20, textAlign:"center"}}>
                    {popUpText}
                  </Text>
              </View>
          }

          <View style={{justifyContent: 'center', flexDirection:"row"}}>
            <TouchableOpacity onPress={() => {
                setPopUpText("")
                setVisible(false)
            }}>
              <Text style={[styles.modelbutton, {backgroundColor:"red"}]}>Close</Text>
            </TouchableOpacity>
          </View>

        </ModalPopup>
        <View style={styles.middle}>
            <View style={{marginBottom:20}}>
                <Text style={styles.text}>
                    Product Name:
                </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(input) => {
                      setProductName(input)
                      setErrorText("")
                    }}
                    value={productName}
                    placeholder="Product name"
                    placeholderTextColor={'#aaa'}
                />
            </View>
            <View style={{marginBottom:20, width:"100%"}}>
                <Text style={styles.text}>
                    ISBN:
                </Text>
                <View style={{flexDirection:"row", width:"100%"}}>
                  <TextInput
                      style={[styles.input, {width:"80%"}]}
                      onChangeText={(input) => {
                        setProductISBN(input)
                        setErrorText("")
                      }}
                      value={productISBN}
                      placeholder="ISBN"
                      placeholderTextColor={'#aaa'}
                      keyboardType="numeric"
                  />
                  <TouchableOpacity
                      style={[styles.button, {width: "20%", marginLeft:10}]}
                      activeOpacity={0.5}
                      onPress={() => {
                        setScanned(false)
                        setVisible(true)
                      }}
                  >
                  <Image
                    source={require('../../assets/scan.png')}
                    style={{
                      height: 30,
                      width: 30,
                      tintColor: "white"
                    }}
                  />
                  </TouchableOpacity>
                </View>
            </View>
            <View style={{marginBottom:20}}>
                <Text style={styles.text}>
                Price:
                </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(input) => {
                      setPrice(input)
                      setErrorText("")
                    }}
                    value={price}
                    placeholder="Price"
                    placeholderTextColor={'#aaa'}
                    keyboardType="numeric"
                />
            </View>
            <View style={{marginBottom:20}}>
                <Text style={styles.text}>
                Contact:
                </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(input) => {
                      setContact(input)
                      setErrorText("")
                    }}
                    value={contact}
                    placeholder="Contact"
                    placeholderTextColor={'#aaa'}
                    keyboardType="numeric"
                />
            </View>
            <View style={{marginBottom:20}}>
                <Text style={styles.text}>
                Address:
                </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(input) => {
                      setAddress(input)
                      setErrorText("")
                    }}
                    value={address}
                    placeholder="Address"
                    placeholderTextColor={'#aaa'}
                />
            </View>
            <Text style={styles.error}>
                {errorText}
            </Text>
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.5}
                onPress={submitData}
            >
            <Text style={styles.textbutton}>Confirm</Text>
            </TouchableOpacity>
        </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  topBar: {
    //flex: 1 / 4,
    padding: 5,
    backgroundColor: '#ee0000',
  },
  middle: {
    flex: 3,
    padding: 25,
  },
  botBar: {
    flex: 1 / 3,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
    //backgroundColor: '#f54254',
    backgroundColor: '#ee0000',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 32,
    textAlign: 'center',
    color:"#fff",
  },
  display: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'white',
    borderWidth: 2.5,
    borderRadius: 30,
  },
  textTitSec: {
    fontSize: 16,
    fontWeight: 'bold',
    color:"black"
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: 'black',
  },
  textbutton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  text: {
    color: "black"
  },
  input: {
    borderColor: "#b6b6b6",
    color: "black",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10
  },
  error: {
    marginBottom:20, 
    textAlign:"center", 
    color:"#ee0000", 
    fontWeight:"bold", 
    fontSize:15
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

export default Register;

