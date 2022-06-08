import React, { Component } from 'react';
import {Button, StyleSheet, ScrollView, ActivityIndicator, View, FlatList, Text } from 'react-native';
import db from '../database/firebaseDb';
import * as firestore from "firebase/firestore";
import { TouchableOpacity } from 'react-native';

class CreditListScreen extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      userArr: []
    };

  }
  componentDidMount() {
    this.getCollection()
  }
  getCollection = () => {
    const creditArr = [];
    firestore.getDocs(firestore.collection(db, "creditos"))
      .then((docs) => {
        docs.forEach((res) => {
          const { email, valorPrestamo, tipoPrestamo, numeroCuotas, valorCuota,valorDeuda} = res.data();
          creditArr.push({
            key: res.id,
            email,
            valorPrestamo,
            tipoPrestamo,
            numeroCuotas,
            valorCuota,
            valorDeuda
            
          });
        });
        this.setState({
          creditArr,
          isLoading: false,
        });
      });
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="green" />
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={this.state.creditArr}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={{backgroundColor:'#DFE7CC', padding:5,borderRadius:10,marginLeft:'10%',width:'80%',marginTop:5}}
              onPress={() => {
                this.props.navigation.navigate('CreditDetail_Screen', {
                  creditkey: item.key
                });
              }}
              >
              { <Text>{item.key}</Text> }
              
              {<Text style={{color:'#86a8e7',fontWeight:'bold'}}>{item.email}</Text> }
              {<Text style={{color:'#86a8e7',fontWeight:'bold'}}>{item.valorPrestamo}</Text> }
              {<Text style={{color:'#86a8e7',fontWeight:'bold'}}>{item.tipoPrestamo}</Text> }
              {<Text style={{color:'#86a8e7',fontWeight:'bold'}}>{item.numeroCuotas}</Text> }
              {<Text style={{color:'#86a8e7',fontWeight:'bold'}}>{item.valorCuota}</Text> }
              {<Text style={{color:'#86a8e7',fontWeight:'bold'}}>{item.valorDeuda}</Text> }
                           
            </TouchableOpacity>
            
          )}
        />
         <Text>{"\n"}</Text>
        <View style={styles.button}>
          <Button
            title='Simular nuevo crédito'
            onPress={() => this.props.navigation.navigate('AddCreditScreen')} 
            color="#19AC52"
          />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginBottom: 7,
  }
})
export default CreditListScreen;