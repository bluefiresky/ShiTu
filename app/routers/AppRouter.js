/**
 * @flow
 * Created by Rabbit on 2018/4/12.
 */

import React from 'react';

import { StackNavigator, TabBarBottom, createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import { System } from '../utils/index';
import { CustomIcon, Theme } from '../components/index';

import { ShiTu } from '../pages/ShiTu/index';
import { News, Welfare, BuDeJie, BuDeJieDetail } from '../pages/News/News';
import { Main } from '../pages/Main/index';
import WebView from '../pages/WebView/index';
import { Login } from '../pages/Login';
import { Register } from '../pages/Login/Register';

// import StackViewStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator';
import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';
import { View } from 'react-native';

const MyTab = createBottomTabNavigator(
  {
    ShiTu: {
      screen: ShiTu,
      navigationOptions: () => TabOptions('识兔', 'ShiTu')
    },
    News: {
      screen: News,
      navigationOptions: () => TabOptions('干货', 'News')
    },
    Main: {
      screen: Main,
      navigationOptions: () => TabOptions('我的', 'Main')
    }
  },
  {
    initialRouteName: 'ShiTu',
    backBehavior: 'none',
    tabBarOptions: {
      tabStyle: {
        marginTop: 10
        // height: 49,
      },
      style: {},
      safeAreaInset: {
        bottom: 'always',
        top: 'never'
      },
      showLabel: false
    }
  }
);

MyTab.navigationOptions = ({ navigation }) => {
  const routes = navigation.state.routes;

  const params = routes ? routes[navigation.state.index].params : null;

  const headerTitle = params ? params.title : '';

  const headerTitleStyle = {
    fontSize: System.iOS ? 23 : 20,
    color: 'white',
    flex: 1,
    textAlign: 'center',
    paddingTop: System.Android ? 17 : null
  };
  const headerBackTitle = null;
  const headerTintColor = 'white';
  const headerStyle = {
    backgroundColor: Theme.navColor,
    shadowColor: 'transparent',
    shadowOpacity: 0,
    borderBottomWidth: 0,
    borderBottomColor: 'transparent',
    elevation: 0
  };

  // 识兔这里的导航都是手动控制的，所以这里设置为null就可以隐藏了。
  const header = null;

  return {
    headerTitle,
    headerStyle,
    headerTitleStyle,
    headerBackTitle,
    headerTintColor,
    header
  };
};

export const AppRouter = createStackNavigator(
  {
    MyTab: {
      screen: MyTab
    },
    BuDeJie: {
      screen: BuDeJie
    },
    BuDeJieDetail: {
      screen: BuDeJieDetail
    },
    WebView: {
      screen: WebView
    },
    Login: {
      screen: Login
    },
    Register: {
      screen: Register
    }
  },
  {
    // 快速定制导航条，新版识兔中所有的导航都是重写的，所以这里会将全部的导航置空
    navigationOptions: () => ({
      header: null,
      gesturesEnabled: true
    }),
    // headerMode: 'screen',
    transitionConfig: () => ({
      screenInterpolator: StackViewStyleInterpolator.forHorizontal
    })
    // headerTransitionPreset: 'fade-in-place',
    // headerMode: 'float',
    // mode: 'modal'
  }
);

const TabOptions = (tabBarTitle, tabBarIconName) => {
  const title = tabBarTitle;
  const tabBarIcon = ({ tintColor, focused }: { tintColor?: string, focused: boolean }) => {
    const color = focused ? Theme.tabBarColor : '#aaa';
    return (
      <View style={{ marginTop: 3 }}>
        <CustomIcon name={tabBarIconName} size={35} color={color} />
      </View>
    );
  };
  const tabBarVisible = true;
  return { title, tabBarVisible, tabBarIcon };
};
