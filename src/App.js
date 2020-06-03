import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, StatusBar } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import Gradient from './backgrounds/Gradient';
import CalcButton from './buttons/CalcButton';
import OutputView from './views/OutputView';
import { isNumber } from './util/util';
import * as math from './util/math';
import * as colors from './colors';

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  numberPad: {
    flex: 1,
    padding: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    height: '14.5%',
  },
  output: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'stretch',
    margin: 16,
    marginTop: 32,
    padding: 8,
    height: '13.5%',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: colors.sunsetOrange,
  },
  outputBar: {
    position: 'absolute',
    height: 2,
    width: '100%',
    bottom: 10,
    right: 8,
    backgroundColor: colors.sunriseYellow,
  },
  topContainer: {
    borderColor: colors.redGiant,
  },
  numpadContainer: {
    backgroundColor: colors.deepBlue,
    borderColor: colors.electricBlue,
  },
  operatorContainer: {
    backgroundColor: colors.magenta,
    borderColor: colors.neonPink,
  },
  operatorText: {
    fontSize: 32,
  },
});

const baseExpr = '0';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expression: baseExpr,
      negative: false,
      valid: true,
      cleared: true,
    };
  }

  /* Evaluate current expression, also check if expression is valid. */
  _evalExpr = () => {
    if (!this.state.cleared) {
      this.setState((prevState) => {
        let expr = math.evalExpr(prevState.expression);
        const valid = !isNaN(expr) && expr !== Infinity;
        if (valid) {
          expr = Math.round(10000 * expr) / 10000; // Round to 4 decimal places
        }
        const result = valid ? expr.toString() : prevState.expression;
        return {
          expression: result,
          valid: valid,
        };
      });
    }
  };

  /* Toggles between positive and negative. */
  _toggleSign = () => {
    this.setState((prevState) => {
      let expr = prevState.expression;
      if (prevState.negative) {
        expr = expr.substring(1);
      } else {
        expr = '-' + expr;
      }
      return {
        expression: expr,
        negative: !prevState.negative,
        cleared: false,
      };
    });
  };

  /* Add value to expression. */
  _addInput = (value) => {
    const isNum = isNumber(value);
    this.setState((prevState) => {
      const { cleared } = prevState;
      const expression =
        cleared && isNum ? value : (prevState.expression += value);
      return {
        expression,
        cleared: false,
      };
    });
  };

  _deleteCharacter = () => {
    this.setState((prevState) => {
      let newExpr = prevState.expression;
      let len = newExpr.length;
      if (len > 1) {
        newExpr = newExpr.substring(0, len - 1);
        return {
          expression: newExpr,
        };
      }
    });
  };

  _clearExpression = () => {
    this.setState({
      expression: baseExpr,
      negative: false,
      valid: true,
      cleared: true,
    });
  };

  _evalPercent = () => {
    if (!this.state.cleared) {
      this.setState((prevState) => {
        const expr = math.evalExpr(prevState.expression);
        const valid = !isNaN(expr);
        const result = valid ? expr / 100 : prevState.expression;
        return {
          expression: result,
          valid: valid,
        };
      });
    }
  };

  _renderOutput = () => {
    return (
      <Touchable
        style={styles.output}
        onPress={this._deleteCharacter}
        activeOpacity={1}
      >
        <>
          <View style={styles.outputBar} />
          <OutputView
            expression={this.state.expression}
            valid={this.state.valid}
          />
        </>
      </Touchable>
    );
  };

  _renderNumpad = () => {
    return (
      <View style={styles.numberPad}>
        <View style={styles.inputRow}>
          <CalcButton
            style={styles.topContainer}
            value={'CE'}
            onPress={this._clearExpression}
          />
          <CalcButton
            style={styles.topContainer}
            value={'+/-'}
            onPress={this._toggleSign}
          />
          <CalcButton
            style={styles.topContainer}
            value={'%'}
            onPress={this._evalPercent}
          />
          <CalcButton
            style={styles.operatorContainer}
            textStyle={styles.operatorText}
            value={'/'}
            onPress={() => this._addInput('/')}
          />
        </View>
        <View style={styles.inputRow}>
          <CalcButton
            style={styles.numpadContainer}
            value={'7'}
            onPress={() => this._addInput('7')}
          />
          <CalcButton
            style={styles.numpadContainer}
            value={'8'}
            onPress={() => this._addInput('8')}
          />
          <CalcButton
            style={styles.numpadContainer}
            value={'9'}
            onPress={() => this._addInput('9')}
          />
          <CalcButton
            style={styles.operatorContainer}
            textStyle={styles.operatorText}
            value={'*'}
            onPress={() => this._addInput('*')}
          />
        </View>
        <View style={styles.inputRow}>
          <CalcButton
            style={styles.numpadContainer}
            value={'4'}
            onPress={() => this._addInput('4')}
          />
          <CalcButton
            style={styles.numpadContainer}
            value={'5'}
            onPress={() => this._addInput('5')}
          />
          <CalcButton
            style={styles.numpadContainer}
            value={'6'}
            onPress={() => this._addInput('6')}
          />
          <CalcButton
            style={styles.operatorContainer}
            textStyle={styles.operatorText}
            value={'-'}
            onPress={() => this._addInput('-')}
          />
        </View>
        <View style={styles.inputRow}>
          <CalcButton
            style={styles.numpadContainer}
            value={'1'}
            onPress={() => this._addInput('1')}
          />
          <CalcButton
            style={styles.numpadContainer}
            value={'2'}
            onPress={() => this._addInput('2')}
          />
          <CalcButton
            style={styles.numpadContainer}
            value={'3'}
            onPress={() => this._addInput('3')}
          />
          <CalcButton
            style={styles.operatorContainer}
            textStyle={styles.operatorText}
            value={'+'}
            onPress={() => this._addInput('+')}
          />
        </View>
        <View style={styles.inputRow}>
          <CalcButton
            style={styles.numpadContainer}
            containerStyle={{ flex: 2 }}
            value={'0'}
            onPress={() => this._addInput('0')}
          />
          <CalcButton
            style={styles.numpadContainer}
            value={'.'}
            onPress={() => this._addInput('.')}
          />
          <CalcButton
            style={styles.operatorContainer}
            textStyle={styles.operatorText}
            value={'='}
            onPress={this._evalExpr}
          />
        </View>
      </View>
    );
  };

  render() {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <Gradient>
          <SafeAreaView style={styles.safeAreaView}>
            {this._renderOutput()}
            {this._renderNumpad()}
          </SafeAreaView>
        </Gradient>
      </>
    );
  }
}
