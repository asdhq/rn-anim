import React, { Component } from "react";
import { View, Text} from "react-native"

class Tinder extends Component {

  constructor(props) {
    super(props);
  
    this.state = {};
  }

render(){
    return (
      <View style={styles.container}>
          <View
            style={styles.card}
          >
          <Image source= style={styles.cardImage} />
          <View>
              <Text style={styles.textLeft}>Rabbit, 10</Text>
              <Text style={styles.textRight}>1 Connection</Text>
            </View>
          </View>
      </View>
    );
}

}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    borderWidth: 3,
    borderRadius: 3,
    borderColor: '#000',
    width: 300,
    height: 300,
    padding: 10
  },
  cardImage: {
    height: 260,
  },
  textLeft: {
    position: 'absolute',
    left:0,
    top:0
  },
  textRight: {
    position: 'absolute',
    right: 0,
    top: 0
  }
});