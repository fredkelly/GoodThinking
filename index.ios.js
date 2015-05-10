/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} = React;

var REQUEST_URL = 'http://localhost:3000/thoughts';

var GoodThinking = React.createClass({

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
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
    if (!this.state.loaded) {
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
      <View style={styles.thought}>
        <Text style={styles.header}>{thought.created_at}</Text>
        <Text style={styles.body}>{thought.body}</Text>
      </View>
    )
  }

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  thought: {
    flex: 1
  },

  header: {
    fontSize: 20,
    marginBottom: 8
  },

  body: {
  },

  listView: {
    paddingTop: 20
  }
});

AppRegistry.registerComponent('GoodThinking', () => GoodThinking);
