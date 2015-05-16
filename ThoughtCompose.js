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
  View,
  TouchableHighlight
} = React;

var t = require('tcomb-form-native');
var Form = t.form.Form;

var Thought = t.struct({
  body: t.Str
});

var options = {
  fields: {
    body: {
      label: 'Thought',
      placeholder: 'What are you thinking?',
      multiline: true,
    }
  }
};

var ThoughtCompose = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Form
          ref='form'
          type={Thought}
          options={options}
        />
        <TouchableHighlight style={styles.button} onPress={this.onPress}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
    );
  },

  onPress: function() {
    console.log(this.refs.form.getValue());
  },

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    padding: 20
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

module.exports = ThoughtCompose;
