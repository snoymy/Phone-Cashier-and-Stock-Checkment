import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Alert,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import ModalPopup from '../components/ModalPopup';
import useFetchputItems from './useFetchputItems';

const CashierSummary = ({navigate, params}) => {
  const [visible, setVisible] = React.useState(false);
  const [modalshow, setModalshow] = useState("text")
  const productList = params.productList;
  const productISBNMap = params.productISBNMap
  const productPrice = params.productPrice
  const data = params.data
  const scrollViewRef = useRef();

  const onSubmit = async () => {
    let updateData = [...data]
    data.map((item, index)=>{
      const sum = (parseInt(item.quantity) - parseInt(productList[item.barcode])).toString()
      updateData[index].quantity = sum === "NaN" ? item.quantity : sum
    })

    //send to data base
    updateData.map(async (item, index)=>{
      const res = await useFetchputItems(item.id, item) 
    })

    navigate.unUseState("prodlist")
    setModalshow("text")
    setVisible(true)
  }

  const calPrice = () => {
    let sum = 0
    Object.keys(productList).map((item, index) => {
      sum += productPrice[item] * productList[item]
    })

    return sum
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.headerText}>Summary</Text>
      </View>
      <ModalPopup visible={visible}>

        {
          modalshow === "text"?
            <>
            <View style={{marginBottom:20}}>
                <Text style={{color:"black", fontSize:20, textAlign:"center"}}>
                  Success
                </Text>
            </View>

            <View style={{justifyContent: 'center', flexDirection:"row"}}>
              <TouchableOpacity onPress={() => {
                  setVisible(false)
                  navigate.backto("Home")
                }}>
                <Text style={[styles.modelbutton, {backgroundColor:"red"}]}>Close</Text>
              </TouchableOpacity>
            </View>
            </>
            :
            <>
            <View style={{marginBottom:20, flexDirection:"row", justifyContent:"center", width:"100%"}}>
              <Image
                source={require('../../assets/qrcode.png')}
                style={{
                  height: 250,
                  width: 250,
                }}
              />
            </View>

            <View style={{justifyContent: 'center', flexDirection:"row"}}>
              <TouchableOpacity onPress={() => {
                  setVisible(false)
                }}>
                <Text style={[styles.modelbutton, {backgroundColor:"black"}]}>Close</Text>
              </TouchableOpacity>
            </View>
            </>
        }
      </ModalPopup>
      <View style={styles.middle}>
        <SafeAreaView style={styles.display}>
          <View style={{flexDirection:"row", justifyContent:"space-between"}}>
            <Text style={styles.textTitSec}>Summary</Text>
            <Text style={styles.textTitSec}>Qty.</Text>
          </View>
          <ScrollView
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({animated: true})
            }>
            {Object.keys(productList).map((item, index) => {
              return (
                <View
                  key={index} 
                  style={{
                    flex:1,
                    flexDirection:"row",
                    backgroundColor: '#fff',
                    maxWidth: '100%',
                    paddingTop: 20,
                    paddingBottom: 10,
                    borderRadius: 5,
                    borderRadius: 5,
                    borderBottomWidth: 2,
                    borderColor: '#ddd',
                  }}>
                    <View style={{width:"83%", flexDirection:"row", justifyContent:"space-between"}}>
                    <View>
                      <Text style={{fontWeight:"bold", color: '#000'}}>
                        {productISBNMap[item]}
                      </Text>
                      <Text style={{color: '#000', fontSize:13}}>
                        S/N: {item}
                      </Text>
                    </View>
                    </View>
                    <View style={{alignItems:"center"}}>
                      <Text style={{flex:1, color: '#000', fontSize:13, fontWeight:"bold"}}>
                        {productPrice[item]}฿ 
                      </Text>
                      <Text style={{flex:1, color: '#000', fontSize:13}}>
                        x {productList[item]}
                      </Text>
                    </View>
                </View>
              );
            })}
          </ScrollView>
        </SafeAreaView>
      </View>
      <View style={{paddingBottom:10, paddingRight:20, flexDirection:"row", justifyContent:"flex-end"}}>
        <Text style={{color:"black", fontSize:20}}>
          Total:&nbsp;&nbsp;
        </Text>
        <Text style={{color:"black", fontSize:20, fontWeight:"bold"}}>
          {calPrice()}
        </Text>
        <Text style={{color:"black", fontSize:20}}>
          &nbsp;&nbsp;Baht
        </Text>
      </View>
      <View style={styles.botBar}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.5}
          onPress={() => onSubmit()}>
          <Text style={styles.textbutton}>Checkout</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.button, {width: "20%", marginLeft:10}]}
            activeOpacity={0.5}
            onPress={() => {
              setModalshow("qr")
              setVisible(true)
            }}
        >
        <Image
          source={require('../../assets/qr-icon.png')}
          style={{
            height: 30,
            width: 30,
            tintColor: "white"
          }}
        />
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
    flex: 1 / 4,
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
    backgroundColor: '#ee0000',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 32,
    textAlign: 'center',
    color: "#fff"
  },
  display: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    borderWidth: 2.5,
    borderRadius: 30,
  },
  textTitSec: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#000"
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

export default CashierSummary;