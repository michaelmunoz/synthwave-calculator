import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as colors from '../colors';

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default function Gradient(props) {
  return (
    <LinearGradient
      style={styles.background}
      colors={[colors.nightSky, colors.deepPurple, colors.violet]}
      locations={[0, 0.45, 0.85]}
      useAngle={true}
      angle={195}
      angleCenter={{ x: 0.5, y: 0.5 }}
    >
      {props.children}
    </LinearGradient>
  );
}
