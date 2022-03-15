import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Alert,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import ModalPopup from '../components/ModalPopup';
import useFetchputItems from './useFetchputItems';

const RemoveSummary = ({navigate, params}) => {
  const [visible, setVisible] = React.useState(false);
  const productList = params.productList;
  const productISBNMap = params.productISBNMap
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
    setVisible(true)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.headerText}>Summary</Text>
      </View>
      <ModalPopup visible={visible}>

        <View style={{marginBottom:20}}>
            <Text style={{color:"black", fontSize:20, textAlign:"center"}}>
              Success
            </Text>
        </View>

        <View style={{justifyContent: 'center', flexDirection:"row"}}>
          <TouchableOpacity onPress={() => {
              setVisible(false)
              navigate.backto("Stock")
            }}>
            <Text style={[styles.modelbutton, {backgroundColor:"red"}]}>Close</Text>
          </TouchableOpacity>
        </View>

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
                    <View style={{width:"90%"}}>
                      <Text style={{flex:1, fontWeight:"bold", color: '#000'}}>
                        {productISBNMap[item]}
                      </Text>
                      <Text style={{flex:1, color: '#000', fontSize:13}}>
                        S/N: {item}
                      </Text>
                    </View>
                    <View style={{alignItems:"center"}}>
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
      <View style={styles.botBar}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.5}
          onPress={() => onSubmit()}>
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

export default RemoveSummary;