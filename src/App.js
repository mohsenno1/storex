
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import * as stores from './shared/Stores'
import { observer, Provider, inject } from 'mobx-react';
import { createAppContainer, NavigationActions, StackActions } from "react-navigation";
import AppNavigator from './shared/Routes'
import { observable, reaction } from 'mobx';
import Splash from './screens/landing-signup/Splash';



@inject()
@observer
export default class App extends Component {
  _navigator

  constructor(props) {
    super(props)
    // reaction(() => [stores.auth.isAuthenticated, stores.auth.isAnonymous],
    //   () => {
    //     let nav = this._navigator.state.nav
    //     let currentRoute = nav.routes[nav.index]
    //     let navParams = currentRoute.params
    //     if (navParams && navParams.returnPage) {
    //       this.reset(navParams.returnPage, navParams.returnParams)
    //     }
    //     else this.reset('VideoPage')
    //   }, {
    //     equals: (prev, next) => {
    //       // console.log('prev: ' + prev)
    //       // console.log('next: ' + next)
    //       if (prev[0] !== next[0])
    //         return false
    //       if (prev[1] !== next[1] && prev[0])
    //         return false
    //       return true
    //     }
    //   })
  }

  async componentDidMount() {
    await stores.auth.loadApp();
  }

  setTopLevelNavigator(navigatorRef) {
    this._navigator = navigatorRef;
  }

  navigate(routeName, params) {
    this._navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      })
    );
  }

  reset(routeName, params) {
    let actions = [NavigationActions.navigate({ routeName: 'VideoPage' })]
    if (routeName !== 'VideoPage')
      actions.push(NavigationActions.navigate({ routeName: routeName, params: params }))
    this._navigator.dispatch(
      StackActions.reset({
        index: actions.length - 1,
        actions: actions
      })
    );
  }

  render() {
    if(stores.auth.isAppLoading)
      return <Splash />
    
    const AppContainer = createAppContainer(AppNavigator());
    return (
      <Provider {...stores} >
          <AppContainer ref={navigatorRef => { this.setTopLevelNavigator(navigatorRef); }} />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
