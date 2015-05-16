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
  ListView,
  TouchableHighlight,
} = React;

var ThoughtScreen = require('./ThoughtScreen');

var REQUEST_URL = 'http://localhost:3000/thoughts';

var ThoughtList = React.createClass({

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1.id !== row2.id,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    fetch(REQUEST_URL)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData.thoughts),
        loaded: true,
      });
    })
    .done();
  },

  render: function() {
    if (! this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderThought}
        style={styles.listView}
      />
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading thoughts...
        </Text>
      </View>
    );
  },

  renderThought: function(thought) {
    return (
      <TouchableHighlight style={styles.thought} underlayColor='#cccccc' onPress={() => this.showThought(thought)}>
        <View>
          <Text style={styles.header}>{thought.created_at}</Text>
          <Text style={styles.body}>{thought.body}</Text>
        </View>
      </TouchableHighlight>
    )
  },

  showThought: function(thought) {
    this.props.navigator.push({
      title: thought.created_at,
      component: ThoughtScreen,
      passProps: {thought}
    });
  },

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  thought: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },

  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  body: {
  },

  listView: {
    paddingTop: 20
  },
});

module.exports = ThoughtList;
