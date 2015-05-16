/**
 * Good Thinking React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View
} = React;

var ThoughtCompose = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.body}>ThoughtCompose</Text>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
  },
  body: {
    fontSize: 20,
    margin: 10,
  }
});

module.exports = ThoughtCompose;
