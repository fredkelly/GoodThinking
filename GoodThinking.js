/**
 * Good Thinking React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS
} = React;

var ThoughtList = require('./ThoughtList');
var ThoughtCompose = require('./ThoughtCompose');

var GoodThinking = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        ref='nav'
        style={styles.container}
        itemWrapperStyle={styles.itemWrapper}
        initialRoute={{
          title: 'Thoughts',
          component: ThoughtList,
          rightButtonTitle: 'Compose',
          onRightButtonPress: this.composeThought
        }}
      />
    );
  },

  composeThought: function() {
    this.refs.nav.push({
      title: 'Compose',
      component: ThoughtCompose,
    });
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // TODO
  itemWrapper: {
  }
});

AppRegistry.registerComponent('GoodThinking', () => GoodThinking);

module.exports = GoodThinking;
