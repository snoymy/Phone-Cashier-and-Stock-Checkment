import React, { useState, useEffect, useRef } from "react";
import { View, Text, BackHandler, Alert, Animated } from "react-native";

const PageStackContainer = (props)=>{
    return (
        <View style={{flex:1}}>
            {props.children}
        </View>
    )
}

let test = {};

const PageStack = ({DefaultPage, Pages, DefaultPageParams})=>{
    const [pageStack, setPageStack] = useState([DefaultPage]);
    const [params, setParams] = useState({...DefaultPageParams});
    const [State, setSavedState] = useState({})
    console.log("def", params)
    console.log("de", pageStack)

    if(pageStack[0] !== DefaultPage){
        setPageStack([DefaultPage])
        return <></>
    }

    useEffect(() => {
        const backAction = () => {
            _back();
            return true;
        };

        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

        return () => backHandler.remove();
    }, [pageStack]);

    const _loadState = (name) => {
        //let state = State[name]
        let state = test[name]
        return state 
    }

    const _unUseState = (name) => {
        //if(State[name] !== undefined){
        //    delete State[name]
        //    setSavedState({...State})
        //}
        if(test[name] !== undefined){
            delete test[name]
        }
    }

    const _saveState = (state) => {
        //setSavedState({...State, ...state})
        test = {...test, ...state}
    }

    const _to = (page, p)=>{
        if(Pages[page] === undefined){
            alert("Page not found")    
            return
        }

        setParams({...DefaultPageParams, ...p})
        setPageStack([...pageStack, page])
    }

    const _back = (p)=>{
        if(pageStack.length > 1){
            pageStack.pop();
            setParams({...DefaultPageParams, ...p})
            setPageStack([...pageStack]);
        }
        else{
            BackHandler.exitApp()
        }
    }

    const _backto = (page)=>{
        const rindex = [...pageStack].reverse().indexOf(page)
        if(rindex < 0){
            alert("Page not found in stack")    
            return
        }
        for(let i = 0; i < rindex; i++){
            pageStack.pop()
        }
        setPageStack([...pageStack])
    }

    const _top = ()=>{
        setPageStack([pageStack[0]])
    }

    const Page = Pages[pageStack[pageStack.length-1]]

    //alert(pageStack)
    const FadeInView = (props) => {
        const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

        useEffect(() => {
            Animated.timing(
                fadeAnim,
                {
                    toValue: 10,
                    duration: 500,
                    useNativeDriver: true,
                }
            ).start();
        }, [fadeAnim])

        return (
            <Animated.View                 // Special animatable View
            style={{
                ...props.style,
                opacity: fadeAnim,         // Bind opacity to animated value
            }}
            >
            {props.children}
            </Animated.View>
        );
    }


    return (
        <FadeInView style={{flex:1}}>
            <Page navigate={{to:_to, back:_back, backto:_backto, top:_top, saveState:_saveState, loadState:_loadState, unUseState:_unUseState, defaultPage:DefaultPage}} params={params}/>
        </FadeInView>
    );
}

export {PageStackContainer, PageStack};