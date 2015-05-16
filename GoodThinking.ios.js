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
  TabBarIOS,
} = React;

var REQUEST_URL = 'http://localhost:3000/thoughts';

var GoodThinking = React.createClass({

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1.id !== row2.id,
      }),
      loaded: false,
      selectedTab: 'index'
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
      <TabBarIOS selectedTab={this.state.selectedTab}>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'index'}
          title='Thoughts'
          onPress={() => { this.setState({selectedTab: 'index'}); }
        }>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderThought}
            style={styles.listView}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'compose'}
          title='Compose'
          onPress={() => { this.setState({selectedTab: 'compose'}); }
        }>
          <View>
            <Text>Hello world.</Text>
          </View>
        </TabBarIOS.Item>
      </TabBarIOS>
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
    console.log(thought)
  },

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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

AppRegistry.registerComponent('GoodThinking', () => GoodThinking);
