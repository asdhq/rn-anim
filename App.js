
import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, PanResponder, Animated, Dimensions} from "react-native";
import { List, ListItem, Card, SearchBar } from "react-native-elements"

const SCREEN_WIDTH = Dimensions.get('window').width;

class ChatList extends Component {

  static defaultProps = {
    onScrollUp: () => {},
    onScrollDown: () => {}
  }

  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({

      onStartShouldSetPanResponder: () => true,

      onPanResponderMove: (event, gesture) => {
            
        position.setValue({ y: gesture.dy});
         Animated.timing(this.state.position, {

      toValue: {x:0, y: this.state.position.y},
      duration: 250
    }).start(() => this.onScroll());
      },
    });

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      results:[],
      panResponder,
      position,
      index: 2
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({ index: 2 });
    }
  }

  onScroll(){


   this.setState({ index: this.state.index + 1 });
  }

  
  renderHeader = () => {
    return <SearchBar
    round
  //onChangeText={someMethod}
  placeholder='Type Here...' />;
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=10`;
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

  getCardStyle() {
    const { position } = this.state;
    

    return {
      ...position.getLayout(),
      transform: [{ translateY: position.y }]
    };
  }

  renderList(item, i) {
    
          if(i===this.state.index){
          return( 

            <Animated.View style={[this.getCardStyle(),{ zIndex:99}]}
                {...this.state.panResponder.panHandlers}>
       <Card 
                    containerStyle={{borderColor: 'transparent'}}>
                    <ListItem
                      roundAvatar
                      title={`${item.name.first} ${item.name.last}`}
                      subtitle={item.email}
                      avatar={{ uri: item.picture.thumbnail }}
                     // avatarStyle={{ height:70, width:70, borderRadius:70 }}
                      containerStyle={{ borderBottomWidth: 0, padding:0 }}
                    />
      </Card>
            </Animated.View> )
        }

        return (<Animated.View

                style={[{ zIndex: 5 }]}>
       <Card 
                    containerStyle={{borderColor: 'transparent'}}>
                    <ListItem
                      roundAvatar
                      title={`${item.name.first} ${item.name.last}`}
                      subtitle={item.email}
                      avatar={{ uri: item.picture.thumbnail }}
                     // avatarStyle={{ height:70, width:70, borderRadius:70 }}
                      containerStyle={{ borderBottomWidth: 0, padding:0 }}
                    />
      </Card>
            </Animated.View> 



          )

        
  }

  render() {
    return (
     
         <List
         containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
     
      <FlatList
         data={this.state.data}
         keyExtractor={item => item.email}
         ListHeaderComponent={this.renderHeader()}
         renderItem={({item, index}) => this.renderList(item ,index)}
        
      />
    </List>
    
    );
  }
}

const styles = StyleSheet.create({

      cardStyle: {
    position: 'absolute',
   // width: SCREEN_WIDTH
  }
})

export default ChatList;