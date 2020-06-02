import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import * as colors from '../colors';

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
  },
  baseContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: 8,
    borderWidth: 2,
    borderRadius: 8,
  },
  baseText: {
    alignSelf: 'center',
    fontSize: 28,
    fontWeight: '700',
    color: colors.white,
  },
});

export default CalcButton = (props) => {
  return (
    <Touchable
      style={[styles.touchable, props.containerStyle]}
      onPress={props.onPress}
      activeOpacity={0.4}
    >
      <View style={[styles.baseContainer, props.style]}>
        <Text style={[styles.baseText, props.textStyle]}>{props.value}</Text>
      </View>
    </Touchable>
  );
};
