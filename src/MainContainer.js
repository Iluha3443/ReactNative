import TabIcon from './Screens/TabIcon';
import { Home } from './Screens/Home/Home';
import { ProfileScreen } from './Screens/ProfileScreen/ProfileScreen';
import { PostsScreen } from './Screens/PostsScreen/PostsScreen';
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import ImageHome from "./Screens/Image/user.png"
import ImagePost from "./Screens/Image/grid.jpg"
import ImageProf from "./Screens/Image/Union.png"

const homeName = "Home";
const profile = "ProfileScreen";
const post = "PostsScreen";

const Tab = createBottomTabNavigator();

export function MainContainer() {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName =  ImageHome;
          } else if (rn === profile) {
            iconName =  ImageProf;
          } else if (rn === post) {
            iconName =  ImagePost;
          }

          return <TabIcon icon={iconName} focused={focused} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'grey',
        labelStyle: { paddingBottom: 10, fontSize: 10 },
        style: { padding: 10, height: 70 }
      }}>
      <Tab.Screen name={homeName} component={Home} />
      <Tab.Screen name={profile} component={ProfileScreen} />
      <Tab.Screen name={post} component={PostsScreen} />
    </Tab.Navigator>
  );
}
