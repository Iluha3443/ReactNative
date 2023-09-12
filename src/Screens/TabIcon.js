import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const TabIcon = ({ icon, focused }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.iconWrapper, focused && styles.activeIcon]}>
        <Image source={icon} style={styles.icon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 70,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'transparent', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIcon: {
    backgroundColor: 'orange',
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default TabIcon;
