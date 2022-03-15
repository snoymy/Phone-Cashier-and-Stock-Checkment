import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Button,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {NavBar, NavButton, NavTitle} from '../components/NavBar';
import Scanner from '../components/Scanner';
import ModalPopup from '../components/ModalPopup';
import useFetchgetItems from './useFetchgetItems';

const AddStock = ({navigate}) => {
  const [scanned, setScanned] = useState(true);
  const [productList, setProductList] = useState({});
  const [ISBN, setISNB] = useState();
  const [visible, setVisible] = React.useState(false);
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
    setMockdatabase(res)
  }

  useEffect(() => {
    let prodlist_tmp = {...productISBNMap}
    mockdatabase.map((item, index)=>{
      prodlist_tmp[item.barcode] =  item.title
    })    
    setProductISBNMap(prodlist_tmp)
  }, [mockdatabase])

  useEffect(() => {
    getData()
    let state = navigate.loadState("prodlist");
    console.log("state ", state)
    if(state !== undefined){
        setProductList({...state})
        setTimeout(()=>{
          navigate.unUseState("prodlist")
        }, 1000)
    }
    
    let prodlist_tmp = {...productISBNMap}
    mockdatabase.map((item, index)=>{
      prodlist_tmp[item.barcode] =  item.title
    })    
    setProductISBNMap(prodlist_tmp)

  }, [])

  const onScanned = ({type, data}) => {
    setScanned(true);
    setISNB(data)
    if(productISBNMap[data] === undefined){
      setVisible(true)
      return
    }
    if(data in productList){
      productList[data] = productList[data]+1
      setProductList(productList);
    }
    else{
      productList[data] = 1
      setProductList(productList);
    }
  };

  const Spinner = ({productList, item}) => {
    return (
      <View style={{flexDirection:"row"}}>
        <TouchableOpacity
          style={styles.spinner}
          activeOpacity={0.5}
          onPress={() => {
            productList[item] = productList[item]-1
            if(productList[item] <= 0){
              delete productList[item]
            }
            setProductList({...productList})
          }}
        > 
          <Text style={styles.textbutton}>-</Text>
        </TouchableOpacity>
          <Text style={{padding:10, color:"black"}}>{productList[item]}</Text>
        <TouchableOpacity
          style={styles.spinner}
          activeOpacity={0.5}
          onPress={() => {
            productList[item] = productList[item]+1
            setProductList({...productList})
          }}
        > 
          <Text style={styles.textbutton}>+</Text>
        </TouchableOpacity>
      </View>
    )
    
  }

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
            title={'Add Stock'}
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

        <View style={{marginBottom:20}}>
            <Text style={{color:"black", fontSize:20, textAlign:"center"}}>
              Unknown Product
            </Text>
        </View>

        <View style={{justifyContent: 'center', flexDirection:"row"}}>
          <TouchableOpacity onPress={() => setVisible(false)}>
            <Text style={[styles.modelbutton, {backgroundColor:"red"}]}>Close</Text>
          </TouchableOpacity>
        </View>

      </ModalPopup>
      <View style={styles.middle}>
        <Scanner Callback={onScanned} State={scanned} />
      </View>
      <View style={styles.botBar}>
        <View style={{flexDirection:"row", justifyContent:"space-between", marginBottom:10}}>
          <Text style={styles.textTitSec}>Detail</Text>
          <TouchableOpacity
            style={styles.next}
            activeOpacity={0.5}
            onPress={() => {
              navigate.saveState({prodlist:productList});
              navigate.to('AddSummary', {productList:productList, productISBNMap:productISBNMap, data:mockdatabase})}
            }>
            <Text style={[styles.textbutton, {}]}>Summary</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.displayDetail}>
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
                    <View style={{flex:1, width:"90%"}}>
                      <Text style={{flex:1, fontWeight:"bold", color: '#000'}}>
                        {productISBNMap[item]}
                      </Text>
                      <Text style={{flex:1, color: '#000', fontSize:13}}>
                        S/N: {item}
                      </Text>
                    </View>

                    <View style={{flex:0.5, alignItems:"center"}}>
                      <Spinner item={item} productList={productList}/>
                    </View>

                </View>
              );
            })}
          </ScrollView>
        </View>
        {scanned ? (
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.5}
            onPress={() => setScanned(false)}
          > 
            <Text style={styles.textbutton}>Tap to Scan</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.5}
            onPress={() => setScanned(true)}
          > 
            <Text style={styles.textbutton}>Stop Scan</Text>
          </TouchableOpacity>
        )}
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
    flex: 1,
    padding: 0,
  },
  botBar: {
    flex: 2,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#ee0000',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 32,
    textAlign: 'center',
    color: "#fff"
  },
  displayDetail: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    borderWidth: 2.5,
    borderRadius: 10,
  },
  textTitSec: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#fff"
  },
  next: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight:10,
    paddingLeft:10,
    borderRadius:10,
    elevation: 3,
    backgroundColor: 'black',
  },
  spinner: {
    alignItems: 'center',
    justifyContent: 'center',
    padding:10,
    borderRadius:10,
    elevation: 3,
    backgroundColor: 'black',
  },
  button: {
    marginTop: 20,
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

export default AddStock;
