import React, {useState, useRef, useEffect} from 'react';
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
import AddStock from './AddStock';
import { NavBar, NavButton, NavTitle } from '../components/NavBar';
import IconBar from '../components/IconBar';
import ModalPopup from '../components/ModalPopup';
import useFetchgetItems from './useFetchgetItems';

const Stock = ({navigate}) => {
  const [productList, setProductList] = useState({});
  const [visible, setVisible] = React.useState(false);
  const [showItem, setShowItem] = useState("")
  const [productPrice, setProductPrice] = useState({})
  const [productQuantity, setProductQuantity] = useState({});
  const [productISBNMap, setProductISBNMap] = useState({})
  const [mockdatabase, setMockdatabase] = useState([])
  const scrollViewRef = useRef();

  //const mockdatabase = [
  //  {
  //    id:"1234",
  //    barcode:"9789749582428",
  //    title:"Product 1",
  //    quantity:"100",
  //    contact:"123",
  //    price:"20"
  //  },
  //  {
  //    id:"1234",
  //    barcode:"9786164929609",
  //    title:"Product 2",
  //    quantity:"100",
  //    contact:"456",
  //    price:"20"
  //  },
  //  {
  //    id:"1234",
  //    barcode:"6901443199341",
  //    title:"Product 3",
  //    quantity:"100",
  //    contact:"789",
  //    price:"20"
  //  },
  //]

  const getData = async () => {
    const res = await useFetchgetItems()
    console.log("stock", res)
    setMockdatabase(res)
  }

  useEffect(() => {
    let prodmap_tmp = {...productISBNMap}
    let prodlist_tmp = {...productList}
    let prodprice_tmp = {...productPrice}
    let prodquantity_tmp = {...productQuantity}
    mockdatabase.map((item, index)=>{
      prodmap_tmp[item.barcode] =  item.title
      prodlist_tmp[item.barcode] =  item.quantity
      prodprice_tmp[item.barcode] = item.price
      prodquantity_tmp[item.barcode] = item.quantity
    })    
    setProductISBNMap(prodmap_tmp)
    setProductList(prodlist_tmp)
    setProductPrice(prodprice_tmp)
    setProductQuantity(prodquantity_tmp)
  }, [mockdatabase])

  useEffect(() => {
    getData()
    let prodmap_tmp = {...productISBNMap}
    let prodlist_tmp = {...productList}
    let prodprice_tmp = {...productPrice}
    let prodquantity_tmp = {...productQuantity}
    mockdatabase.map((item, index)=>{
      prodmap_tmp[item.barcode] =  item.title
      prodlist_tmp[item.barcode] =  item.quantity
      prodprice_tmp[item.barcode] = item.price
      prodquantity_tmp[item.barcode] = item.quantity
    })    
    setProductISBNMap(prodmap_tmp)
    setProductList(prodlist_tmp)
    setProductPrice(prodprice_tmp)
    setProductQuantity(prodquantity_tmp)

  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <NavBar
        NavSpace="8%"
        BarStyle={[styles.topBar, {maxWidth: '100%'}]}
        Left={() => <NavButton style={{color:"#bbb"}} onPress={()=>navigate.back()} symbol={"❮"}/>}
        Center={() => <NavTitle style={[styles.headerText, {minWidth:"70%"}]} title={"Stock"} />}
      />
      {
      }
      {/*
      <View style={styles.topBar}>
        <Text style={styles.headerText}>Stock</Text>
      </View>
      */}
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
            {
              Object.keys(productList).map((item, index) => {
                console.log(productISBNMap[item])
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
                                Product Name: {productISBNMap[showItem]}
                              </Text>
                              <Text style={{color:"black", fontSize:15}}>
                                Price: {productPrice[showItem]} Baht
                              </Text>
                              <Text style={{color:"black", fontSize:15}}>
                                Quantity: {productQuantity[showItem]}
                              </Text>
                          </View>

                          <View style={{justifyContent: 'center', flexDirection:"row"}}>
                            <TouchableOpacity onPress={() => setVisible(false)}>
                              <Text style={[styles.modelbutton, {backgroundColor:"red"}]}>Close</Text>
                            </TouchableOpacity>
                          </View>

                        </ModalPopup>
                        <TouchableOpacity 
                          style={{width:"90%", flexDirection:"row", width:"100%"}}
                          onPress={() => {setShowItem(item); setVisible(true)}}
                        >
                        <View style={{width:"83%"}}>
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
                        </TouchableOpacity>
                    </View>
                  );
                }
              })
            }
          </ScrollView>
        </SafeAreaView>
      </View>
      {/*
      <View style={styles.botBar}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.5}
          onPress={() => navigate.to('AddStock')}>
          <Text style={styles.textbutton}>ADD</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.5}
          onPress={() => navigate.to('RemoveStock')}>
          <Text style={styles.textbutton}>REMOVE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.5}
          onPress={() => navigate.to('OrderStock')}>
          <Text style={styles.textbutton}>ORDER</Text>
        </TouchableOpacity>
      </View>
      */}
      <IconBar 
        elements={[
          {
            icon:require("../../assets/add.png"),
            iconColor:"white",
            text:"ADD",
            textColor:"white",
            callback:() => navigate.to('AddStock')
          },
          {
            icon:require("../../assets/remove.png"),
            iconColor:"white",
            text:"REMOVE",
            textColor:"white",
            callback:() => navigate.to('RemoveStock')
          },
          {
            icon:require("../../assets/register.png"),
            iconColor:"white",
            text:"REGISTER",
            textColor:"white",
            callback:() => navigate.to('Register')
          },
          {
            icon:require("../../assets/order.png"),
            iconColor:"white",
            text:"ORDER",
            textColor:"white",
            callback:() => navigate.to('OrderStock')
          },
        ]}
        style={styles.botBar}
      />
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
    color:"black",
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

export default Stock;
