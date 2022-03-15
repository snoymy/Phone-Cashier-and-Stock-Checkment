import React from 'react';
import {StyleSheet, View, Button, Text, TouchableOpacity, Image} from 'react-native';

const MenuIcon = ({elementCount, icon, iconColor, text, textColor, iconSize, callback})=>{
    textColor = textColor === undefined? "black" : textColor
    iconSize = iconSize === undefined? 100 : iconSize
    return (
        <View style={[styles.barCenter]}>
            <TouchableOpacity 
                style={{alignItems:"center", }}
                activeOpacity={0.5}
                onPress={callback}
            >
                <View style={{minWidth:"100%", alignItems:"center"}}>
                    <Image
                        source={icon}
                        style={{width:20*iconSize/100, height:20*iconSize/100, tintColor:iconColor}}
                    />
                    {
                        typeof(text) === "string" && <Text style={[styles.iconText, {color:textColor, fontSize:13 ,textAlign:"center"}]}>{text}</Text>
                    }
                </View>
            </TouchableOpacity> 
        </View>
    )
}

const IconBar = ({style, elements}) => {
  return (
    <View style={[styles.container, style]}>
        {
            Array.isArray(elements) && elements.map((item, index)=>{
                return <MenuIcon key={index} elementCount={elements.length} icon={item.icon} iconColor={item.iconColor} iconSize={item.iconSize} text={item.text} textColor={item.textColor} callback={item.callback}/> 
            })
        }
    </View>
  );
};

export default IconBar

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"row",
    maxHeight:"8%"
  },
  barCenter: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconText:{
    color: "black"
  }
});
