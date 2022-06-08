import React, { Component } from 'react';
import {Button, StyleSheet, Text, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import db from '../database/firebaseDb';
import * as firestore from "firebase/firestore";



class CreditDetail_Screen extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      valorPrestamo: '',
      tipoPrestamo:'',
      numeroCuotas:'',
      valorCuota:0,
      valorDeuda:0,
      isLoading: true
    };
  }

  componentDidMount() {
    firestore.getDocs(firestore.collection(db, "creditos"))
      .then((docs) => {
        docs.forEach((res) => {
          if (res.id === this.props.route.params.creditkey) {
            this.setState({
              
              email: res.data().email,
              valorPrestamo: res.data().valorPrestamo,
              tipoPrestamo: res.data().tipoPrestamo,
              numeroCuotas: res.data().numeroCuotas,
              valorCuota:res.data().valorCuota,
              valorDeuda: res.data().valorDeuda,

            })
          }
        });
      });
  }
  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  
  render() {
    return (
      <ScrollView style={styles.container}>
        
        
        <View style={styles.inputGroup}>
          <TextInput
            placeholder={'Correo Electrónico'}
            value={this.state.email}
            onChangeText={(val) => this.inputValueUpdate(val, 'email')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder={'Valor del prestamo'}
            value={this.state.valorPrestamo}
            onChangeText={(val) => this.inputValueUpdate(val, 'valorPrestamo')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder={'Tipo de prestamo'}
            value={this.state.tipoPrestamo}
            onChangeText={(val) => this.inputValueUpdate(val, 'tipoPrestamo')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder={'Número de cuotas'}
            value={this.state.numeroCuotas}
            onChangeText={(val) => this.inputValueUpdate(val, 'numeroCuotas')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder={'Valor cuota mensual'}
            value={this.state.valorCuota}
            onChangeText={(val) => this.inputValueUpdate(val, 'valorCuota')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder={'Valor total de la deuda'}
            value={this.state.valorDeuda}
            onChangeText={(val) => this.inputValueUpdate(val, 'valorDeuda')}
          />
        </View>
       

        <Text>{"\n"}</Text>
        <View style={styles.button}>
          <Button
            title='Consultar nuevo crédito'
            onPress={() => this.props.navigation.navigate('AddcreditScreen')} 
            color="#19AC52"
            padding="20 20 30 20"
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
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
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
export default CreditDetail_Screen;

