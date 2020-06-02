import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import * as colors from '../colors';

const styles = StyleSheet.create({
  scrollView: {
    alignItems: 'flex-end',
  },
  text: {
    fontFamily: 'Digital-7MonoItalic',
    fontSize: 88,
    color: colors.white,
  },
  invalidText: {
    color: colors.redGiant,
  },
});

export default OutputView = (props) => {
  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={styles.scrollView}
      horizontal={true}
      indicatorStyle="white"
      invertStickyHeaders={true}
      overScrollMode="never"
      ref={(ref) => (scrollView = ref)}
      onContentSizeChange={(contentWidth, contentHeight) => {
        scrollView.scrollToEnd({ animated: false });
      }}
    >
      <Text style={[styles.text, !props.valid && styles.invalidText]}>
        {props.expression}
      </Text>
    </ScrollView>
  );
};
