/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import mqtt from 'rn-mqtt'
import Toast from 'react-native-simple-toast';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
var mqttIPs = {        
  public : 'mqtt://broker.thecryptovault.com:1883'  
}
var rec_marketsummeries_topic = {
  general : 'presence/7kvhq5sf8uf52yimz6lhnk25yhmwp5im/rec-marketsummeries/',
  
}
var symboltopic ={
  rec   : 'presence/7kvhq5sf8uf52yimz6lhnk25yhmwp5im/rec-symbols'
}
var  ordertoic = {
  rec : 'presence/7kvhq5sf8uf52yimz6lhnk25yhmwp5im/test/#',
  trans : 'presence/7kvhq5sf8uf52yimz6lhnk25yhmwp5im/test/'
}
var mqttcredential = {
  username: "7kvhq5sf8uf52yimz6lhnk25yhmwp5im",
  password: "49orbg0gj4caqz16v2bk6dxb2pbkrjy1"
};

const mqttclient  = mqtt.connect(mqttIPs.public, mqttcredential);

// alert(JSON.stringify(mqttclient.options))

type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props)
    this.state = {
      topic : 'test topic'
    }
    this.initmqtt = this.initmqtt.bind(this);
    this.initmqtt();
    this.pulbishtest();
  }
  initmqtt(){
    var that = this;

    mqttclient.on('connect', function () { 
      mqttclient.subscribe(symboltopic.rec);
      mqttclient.subscribe(ordertoic.rec);
      // mqttclient.subscribe(`${rec_marketsummeries_topic.general}#`);   
      Toast.show('connected'); 
    });
    mqttclient.on('error',function(err){
      console.log('mqtt error',err);
      Toast.show('error'); 
    });
    mqttclient.on('offline',function(){
      console.log('mqtt offline');
      Toast.show('offline'); 
    });
    mqttclient.on('close',function(){
      console.log('mqtt close'); 
      Toast.show('close');   
    });
    mqttclient.on('message', function (topic, message) {    
      // Toast.show(topic)  
      that.setState({
         topic : (message.toString())
      })
    });
  }
  pulbishtest(){
    setInterval(() => {
      mqttclient.publish(ordertoic.trans + '1',`test ${new Date().toISOString()}`,mqttcredential);
    },1000)
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native Mqtt Text!
        </Text>
        <Text style={styles.instructions}>
          When received message from brokder we can see alert
        </Text>
        <Text style={styles.instructions}>
          {this.state.topic}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
