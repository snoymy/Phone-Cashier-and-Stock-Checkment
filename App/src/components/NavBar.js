import React from 'react';
import {StyleSheet, View, Button, Text, TouchableOpacity} from 'react-native';

const NavBack = ({navigate, style}) => {
  return (
    <View>
      <TouchableOpacity
        style={{
          marginLeft: 10,
          color: 'white',
        }}
        activeOpacity={0.5}
        onPress={() => navigate.back()}>
        <Text
          style={[{
            fontWeight: 'bold',
            fontSize: 30,
            color: '#000',
          }, style]}>
          {'❮'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const NavButton = ({onPress, style, symbol}) => {
  return (
    <View>
      <TouchableOpacity
        style={{
          color: 'white',
        }}
        activeOpacity={0.5}
        onPress={onPress}>
        <Text
          style={[{
            fontWeight: 'bold',
            fontSize: 30,
            color: '#000',
          }, style]}>
          {symbol}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const NavTitle = ({title, style}) => {
  return (
    <Text style={style}>
     {title} 
    </Text>
  )
}

const NavBar = ({NavSpace, BarStyle, Left, Center, Right}) => {
  if(NavSpace === undefined){
    NavSpace = "10%"
  }
  return (
    <View style={[{flex:1, alignItems:"center", width:"100%", maxHeight:NavSpace, minHeight:60},]}>
        <View style={[styles.container, BarStyle]}>
            <View style={styles.barLeft}>
                {Left !== undefined && <Left/>}
            </View>
            <View style={styles.barCenter}>
                {Center !== undefined && <Center/>}
            </View>
            <View style={styles.barRight}>
                {Right !== undefined && <Right/>}
            </View>
        </View>
    </View>
  );
};

export { NavBar, NavBack, NavTitle, NavButton };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"row",
  },
  barLeft: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: "2%",
  },
  barCenter: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  barRight: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: "2%",
  },
});
