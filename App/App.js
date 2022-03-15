import React, { useState } from 'react';
import {View, Text, Button, SafeAreaView, StyleSheet} from 'react-native';
import {PageStackContainer, PageStack} from './src/components/PageStack';

import Login from './src/pages/Login';
import ForgotPass from './src/pages/ForgotPass';
import Home from './src/pages/Home';
import Profile from './src/pages/Profile';
import Stock from './src/pages/Stock';
import Cashier from './src/pages/Cashier';
import CashierSummary from './src/pages/CashierSummary';
import AddStock from './src/pages/AddStock';
import RemoveStock from './src/pages/RemoveStock';
import OrderStock from './src/pages/OrderStock';
import AddSummary from './src/pages/AddSummary';
import RemoveSummary from './src/pages/RemoveSummary';
import Register from './src/pages/Register';

const App = () => {
  const [authorizeToken, setAuthorizeToken] = useState("")
  console.log("ua", authorizeToken)
  if(authorizeToken === ""){
    return (
      <PageStackContainer>
        <PageStack
          DefaultPage="Login"
          DefaultPageParams={{setAuthorizeToken:setAuthorizeToken}}
          Pages={{
            Login: Login,
            ForgotPass: ForgotPass,
          }}
        />
      </PageStackContainer>
    )
  }
  else{
    return (
      <PageStackContainer>
        <PageStack
          DefaultPage="Home"
          DefaultPageParams={{setAuthorizeToken:setAuthorizeToken}}
          Pages={{
            Home: Home,
            Profile: Profile,
            Stock: Stock,
            Cashier: Cashier,
            CashierSummary: CashierSummary,
            AddStock: AddStock,
            RemoveStock: RemoveStock,
            OrderStock: OrderStock,
            AddSummary: AddSummary, 
            RemoveSummary: RemoveSummary,
            Register: Register,
          }}
        />
      </PageStackContainer>
    );
  }
};

export default App;
