import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function Scanner({Callback, State}) {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    let timeInterval = setInterval(()=>{
      let scanner = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      }
      scanner()
    }, 500)

    return () => {clearInterval(timeInterval)}
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    Callback({type, data})
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={State? undefined : handleBarCodeScanned}
          style={styles.scanner}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 100,
    minWidth: 300,
    overflow: 'hidden',
    borderRadius: 0,
  },
  scanner:{
    width:300,
    height:300,
  }
});