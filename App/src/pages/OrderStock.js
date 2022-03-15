import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Alert,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  Animated,
  Linking,
} from 'react-native';
import { NavBar, NavButton, NavTitle } from '../components/NavBar';
import ModalPopup from '../components/ModalPopup';
import useFetchgetItems from './useFetchgetItems';

const OrderStock = ({navigate}) => {
  const scrollViewRef = useRef();
  const [visible, setVisible] = React.useState(false);
  const [showItem, setShowItem] = useState("")
  const [contactList, setContactList] = useState({})
  const [productISBNMap, setProductISBNMap] = useState({})
  const [mockdatabase, setMockdatabase] = useState([])

  //const mockdatabase = [
  //  {
  //    id:"1234",
  //    barcode:"9789749582428",
  //    title:"Product 1",
  //    quantity:"100",
  //    contact:"02345678",
  //    price:"20"
  //  },
  //  {
  //    id:"1234",
  //    barcode:"9786164929609",
  //    title:"Product 2",
  //    quantity:"100",
  //    contact:"02345678",
  //    price:"20"
  //  },
  //  {
  //    id:"1234",
  //    barcode:"6901443199341",
  //    title:"Product 3",
  //    quantity:"100",
  //    contact:"02345678",
  //    price:"20"
  //  },
  //]

  const getData = async () => {
    const res = await useFetchgetItems()
    setMockdatabase(res)
  }

  useEffect(() => {
    let prodlist_tmp = {...productISBNMap}
    let contactlist_tmp = {...contactList}
    mockdatabase.map((item, index)=>{
      prodlist_tmp[item.barcode] =  item.title
      contactlist_tmp[item.barcode] =  item.contact
    })    
    setProductISBNMap(prodlist_tmp)
    setContactList(contactlist_tmp)
  }, [mockdatabase])

  useEffect(()=>{
    getData()
    let prodlist_tmp = {...productISBNMap}
    let contactlist_tmp = {...contactList}
    mockdatabase.map((item, index)=>{
      prodlist_tmp[item.barcode] =  item.title
      contactlist_tmp[item.barcode] =  item.contact
    })    
    setProductISBNMap(prodlist_tmp)
    setContactList(contactlist_tmp)
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <NavBar
        NavSpace="8%"
        BarStyle={[styles.topBar, {maxWidth: '100%'}]}
        Left={() => <NavButton style={{color:"#fff"}} onPress={()=>navigate.back()} symbol={"❮"}/>}
        Center={() => <NavTitle style={[styles.headerText, {minWidth:"70%"}]} title={"Order Stock"} />}
        Right={() => <NavButton style={{color:"#fff", marginRight:10}} onPress={()=>navigate.backto(navigate.defaultPage)} symbol={"⌂"}/>}
      />
      {/*
      <View style={styles.topBar}>
        <Text style={styles.headerText}>Order Stock</Text>
      </View>
      */}
      <View style={styles.middle}>
        <SafeAreaView style={styles.display}>
          <View style={{flexDirection:"row", justifyContent:"space-between"}}>
            <Text style={styles.textTitSec}>Products</Text>
          </View>
          <ScrollView
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({animated: true})
            }>
            {Object.keys(productISBNMap).map((item, index) => {
              if(productISBNMap[item] != undefined){
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
                      <ModalPopup visible={visible}>

                        <View style={{marginBottom:20}}>
                            <Text style={{color:"black", fontSize:15}}>
                              Tel: {contactList[showItem]}
                            </Text>
                            <Text style={{color:"black", fontSize:15}}>
                              Address: xxxxxx 
                            </Text>
                        </View>

                        <View style={{justifyContent: 'center', flexDirection:"row"}}>
                          <TouchableOpacity onPress={() => Linking.openURL(`tel:${contactList[showItem]}`)}>
                            <Text style={[styles.modelbutton, {backgroundColor:"green"}]}>Call</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => setVisible(false)}>
                            <Text style={[styles.modelbutton, {backgroundColor:"red"}]}>Close</Text>
                          </TouchableOpacity>
                        </View>

                      </ModalPopup>
                      <TouchableOpacity 
                        style={{width:"90%"}}
                        onPress={() => {setShowItem(item); setVisible(true)}}
                      >
                        <Text style={{flex:1, fontWeight:"bold", color: '#000'}}>
                          {productISBNMap[item]}
                        </Text>
                        <Text style={{flex:1, color: '#000', fontSize:13}}>
                          S/N: {item}
                        </Text>
                      </TouchableOpacity>
                  </View>
                );
              }
            })}
          </ScrollView>
        </SafeAreaView>
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
    flex: 4,
    padding: 25,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 32,
    textAlign: 'center',
    color: "#fff",
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
    color: "black"
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
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

export default OrderStock;
