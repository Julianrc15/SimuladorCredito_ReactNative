import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Text } from 'react-native';
import db from '../../database/firebaseDb';
import { collection, addDoc } from "firebase/firestore";
import * as firestore from "firebase/firestore";

class AddUserScreen extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      mobile: '',
      passwd:'',
      isLoading: false
    };
  }
 

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };


  storeUser(){

    if(this.state.name === '' && this.state.email === '' && this.state.mobile === ''){
      alert('Ingresar todos los datos')
     } else {
    
    firestore.getDocs(firestore.collection(db, "users"))
      .then((docs) => {
        docs.forEach((res) => {
          if (res.data().email === this.state.email) {
            this.setState({sw:true})          
          }
        });
        if(this.state.sw){
          alert('Correo en uso por favor utilice otro correo')
          this.setState({sw:false})
        }
        else {
          this.setState({isLoading: true})
          try {
            this.setState({isLoading: false})
            const docRef = addDoc(collection(db, "users"), {
              name: this.state.name,
              email: this.state.email,
              mobile: this.state.mobile,
              passwd:this.state.passwd,
              isLoading: true,
            });
            alert("Usuario agregado correctamente ...");
            this.setState({name:''});
            this.setState({email:''});
            this.setState({mobile:''});
            this.setState({passwd:''});
            this.props.navigation.navigate('UserScreen')
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        }
      });
    }
}
 

  render() {

    return (
      <ScrollView style={styles.container}>
      
        <View style={styles.inputGroup}>
          <TextInput
              multiline={true}
              numberOfLines={2}
              placeholder={'Nombre'}
              value={this.state.name}
              onChangeText={(val) => this.inputValueUpdate(val, 'name')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              multiline={true}
              numberOfLines={2}
              placeholder={'Correo Electrónico'}
              value={this.state.email}
              onChangeText={(val) => this.inputValueUpdate(val, 'email')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              multiline={true}
              numberOfLines={2}
              placeholder={'Nro. de dispositivo móvil'}
              value={this.state.mobile}
              onChangeText={(val) => this.inputValueUpdate(val, 'mobile')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              
              secureTextEntry={true}
              placeholder={'Contraseña'}
              value={this.state.passwd}
              onChangeText={(val) => this.inputValueUpdate(val, 'passwd')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Simular crédito'
            onPress={() => this.storeUser()} 
            color="#19AC52"
          />
        </View>
        <Text>{"\n"}</Text>
        <View style={styles.button}>
          <Button
            title='Consultar créditos'
            onPress={() => this.props.navigation.navigate('UserScreen')} 
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
  inputGroup: {
    flex: 1,
    padding: 5,
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
export default AddUserScreen;