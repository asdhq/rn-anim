
import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { List, ListItem, Card, SearchBar } from "react-native-elements"

class FlatListDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      results:[]
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }



  
  renderHeader = () => {
    return <SearchBar
    round
  //onChangeText={someMethod}
  placeholder='Type Here...' />;
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=15`;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  render() {
    return (
      
         <List
         containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
      <FlatList
         data={this.state.data}
         keyExtractor={item => item.email}
         ListHeaderComponent={this.renderHeader()}
         renderItem={({ item }) => (
          <Card>
          <ListItem
            roundAvatar
            title={`${item.name.first} ${item.name.last}`}
            subtitle={item.email}
            avatar={{ uri: item.picture.thumbnail }}
           // avatarStyle={{ height:70, width:70, borderRadius:70 }}
            containerStyle={{ borderBottomWidth: 0, padding:0 }}
          />
          </Card>
        )}
      />
    </List>
      
    );
  }
}

export default FlatListDemo;