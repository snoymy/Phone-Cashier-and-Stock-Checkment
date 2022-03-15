import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import { NavBar, NavButton } from '../components/NavBar';

const Profile = ({navigate, params}) => {
  const onLogout = () => {
    params.setAuthorizeToken("")
  }

  return (
    <View style={{flex: 1}}>
      <NavBar
        BarStyle={{maxWidth: '100%', backgroundColor: '#f4f4f4'}}
        Left={() => <NavButton style={{color:"#bbb", marginLeft:5, paddingLeft:5, paddingRight:5}} onPress={()=>navigate.back()} symbol={"❮"}/>}
      />
      <View style={[styles.container, {alignItems: 'center'}]}>
        <Image
          source={require('../../assets/profile-icon.png')}
          style={styles.profileImage}
        />
        <View
          style={{
            backgroundColor: '#fff',
            width: '85%',
            padding: 20,
            margin: 10,
            borderRadius: 5,
            borderRadius: 5,
            borderBottomWidth: 2,
            borderRightWidth: 2,
            borderColor: '#ddd',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black', fontSize: 15}}>Store Name</Text>
          <Text style={{color: 'black', fontSize: 30}}>Store</Text>
        </View>

        <View
          style={{
            backgroundColor: '#fff',
            width: '85%',
            padding: 20,
            margin: 10,
            borderRadius: 5,
            borderRadius: 5,
            borderBottomWidth: 2,
            borderRightWidth: 2,
            borderColor: '#ddd',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black', fontSize: 15}}>About</Text>
          <Text style={{color: 'black', fontSize: 15}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </View>

        <TouchableOpacity
          style={{
            width: '40%',
            padding: 10,
            borderRadius: 20,
            backgroundColor: '#ee0000',
            alignItems: 'center',
          }}
          activeOpacity={0.5}
          onPress={() => onLogout()}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: '#f4f4f4',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#bbb',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 23,
    color: 'white',
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 20,
  },
  menuButton: {
    flexDirection: 'row',
    backgroundColor: '#ddd',
    width: '60%',
    padding: 30,
    margin: 10,
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuText: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingRight: 10,
    textAlign: 'right',
    justifyContent: 'center',
  },
  menuButtonImage: {
    height: 100,
    width: 100,
  },
  profileImage: {
    height: 100,
    width: 100,
    backgroundColor: 'white',
    borderRadius: 100,
  },
});
