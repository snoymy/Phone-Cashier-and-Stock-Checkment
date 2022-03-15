import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { NavBar } from '../components/NavBar';

const NavTitle = ({navigate, params}) => {
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        borderRadius: 100,
        alignItems: 'center',
        minWidth: '100%',
        minHeight: '100%',
      }}
      activeOpacity={0.5}
      onPress={() => navigate.to('Profile', params)}>
      <View
        style={{
          minWidth: '100%',
          minHeight: '100%',
          marginTop:-50,
          alignItems: 'center',
        }}>
        <Image
          source={require('../../assets/profile-icon.png')}
          style={styles.profileImage}
        />
        <Text
          style={{
            fontWeight: 'bold',
            marginTop: 20,
            fontSize: 30,
            color: 'white',
          }}>
          Profile
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Home = ({navigate, params}) => {
  return (
    <View style={styles.container}>
      <NavBar
        NavSpace={'40%'}
        BarStyle={{
          borderRadius: 20,
          marginTop: 50,
          maxHeight: '100%',
          maxWidth: '95%',
          backgroundColor: '#ee0000',
          borderBottomWidth: 2,
          borderColor: '#990000',
        }}
        Center={() => <NavTitle navigate={navigate} params={params}/>}
      />
      <View
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          marginTop: 0,
        }}>
        <TouchableOpacity
          style={styles.menuButton}
          activeOpacity={0.5}
          onPress={() => navigate.to('Stock')}>
          <Image
            source={require('../../assets/stock-icon.png')}
            style={styles.menuButtonImage}
          />
          <Text style={styles.menuText}>Stock Mode</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          activeOpacity={0.5}
          onPress={() => navigate.to('Cashier')}>
          <Image
            source={require('../../assets/cashier-icon.png')}
            style={styles.menuButtonImage}
          />
          <Text style={styles.menuText}>Cashier Mode</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: '#f4f4f4',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white',
  },
  menuButton: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '95%',
    padding: 20,
    margin: 10,
    borderRadius: 5,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: '#aaa',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuText: {
    fontWeight: 'bold',
    fontSize: 25,
    paddingRight: 10,
    textAlign: 'right',
    justifyContent: 'center',
    color: 'black',
  },
  menuButtonImage: {
    height: 100,
    width: 100,
  },
  profileImage: {
    height: 130,
    width: 130,
    backgroundColor: 'white',
    borderRadius: 100,
  },
});
