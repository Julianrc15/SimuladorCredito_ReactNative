import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Text,Image } from 'react-native';
import db from '../database/firebaseDb';
import { collection, addDoc } from "firebase/firestore";
import * as firestore from "firebase/firestore";
import RNPickerSelect from 'react-native-picker-select'



class AddcreditScreen extends Component {
  constructor() {
    super();
    this.state = {
      
      email: '',
      valorPrestamo: '',
      tipoPrestamo:'',
      numeroCuotas:'',
      valorCuota:0,
      valorDeuda:0,
      isLoading: false
    };
  }
 

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  
  limpiar(){
    this.setState({email:''});
    this.setState({valorPrestamo:''});
    this.setState({tipoPrestamo:''});
    this.setState({numeroCuotas:''});
    this.setState({valorCuota:''});
    this.setState({valorDeuda:''});
    }


  storeUser(){

    if(this.state.email === '' || this.state.valorPrestamo ===''|| this.state.tipoPrestamo ===''|| this.state.numeroCuotas ===''){
      alert('Ingresar todos los datos')
     } else if(this.state.valorPrestamo >= 1000000 && this.state.valorPrestamo <= 1000000000){
      firestore.getDocs(firestore.collection(db, "creditos"))
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
            let  interes
      switch(this.state.tipoPrestamo){
        case 'vivienda':
          interes=1/100
        break;
      case' educacion':
         interes=0.5/100
        break;
      case 'vehiculo':
          interes=1.5/100
        break;
      }
     
      //calcular deuda 
  
      let montoDeuda =(parseFloat(this.state.valorPrestamo))*interes*parseFloat(this.state.numeroCuotas)+parseFloat(this.state.valorPrestamo)
     
      let valorDeuda=new Intl.NumberFormat('es-CO', { maximumSignificantDigits: 3 }).format(montoDeuda);
      let valorCuota=new Intl.NumberFormat('es-CO', { maximumSignificantDigits: 3 }).format(montoDeuda/parseFloat(this.state.numeroCuotas))

              this.setState({isLoading: false})
              const docRef = addDoc(collection(db, "creditos"), {
              
              email: this.state.email,
              valorPrestamo: this.state.valorPrestamo,
              tipoPrestamo: this.state.tipoPrestamo,
              numeroCuotas:this.state.numeroCuotas,
              valorCuota:valorCuota,
              valorDeuda:valorDeuda,

              isLoading: true,
              });
             alert("Crédito agregado correctamente ...");
              
                this.setState({email:this.state.email});
                this.setState({valorPrestamo:this.state.valorPrestamo});
                this.setState({tipoPrestamo:this.state.tipoPrestamo});
                this.setState({numeroCuotas:this.state.numeroCuotas});
                this.setState({valorCuota:valorCuota});
                this.setState({valorDeuda:valorDeuda});
              
            
          } catch (e) {
              console.error("Error adding document: ", e);
          }
          }
      });
     }
    else {   
      alert('El prestamo debe estar entre 1.000.000 y 100.000.000')         
        
    }
}

render() {

    return (
      <ScrollView style={styles.container}>
        <View style={styles.containerProps}>
          <View>
            <Image
              style={styles.Image}
              source={require("../images/credito2.jpg")}
            />
          </View>

          <View style={styles.textInput}>
            <TextInput
              multiline={true}
              numberOfLines={2}
              placeholder={"Correo Electrónico"}
              value={this.state.email}
              onChangeText={(val) => this.inputValueUpdate(val, "email")}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              multiline={true}
              numberOfLines={2}
              placeholder={"Valor solicitado"}
              value={this.state.valorPrestamo}
              onChangeText={(val) =>
                this.inputValueUpdate(val, "valorPrestamo")
              }
            />
          </View>
          <View style={styles.textInput}>
            <RNPickerSelect
              
              onValueChange={(val) =>
                this.inputValueUpdate(val, "tipoPrestamo")
              }
              items={[
                {
                  label: "Seleccione tipo de prestamo",
                  value: "",
                },
                { label: "Vivienda", value: "vivienda" },
                { label: "Educación", value: "educacion" },
                { label: "Libre inversión", value: "libreInversion" },
              ]}
              value={this.state.tipoPrestamo}
            />
          </View>
          <View style={styles.textInput}>
            <RNPickerSelect
              
              onValueChange={(val) =>this.inputValueUpdate(val, "numeroCuotas")}
              items={[
                {
                  label: "Seleccione coutas del prestamo",
                  value: "",
                },
                { label: "12", value: "12" },
                { label: "24", value: "24" },
                { label: "36", value: "36" },
              ]}
              value={this.state.numeroCuotas}
            />
          </View>

            
            <TextInput 
            style={styles.textInput} 
            disabled={true}
            value={this.state.valorCuota} 
            onChangeText={(val) => this.state.inputValueUpdate(val, "valorCuota")
            }
            />

            <TextInput 
              style={styles.textInput}
              disabled={true}
              value={this.state.valorDeuda}
              onChangeText={(val) => this.state.inputValueUpdate(val, "valorDeuda")}
              />

          <View style={styles.button}>
            <Button
              title="guardar datos del crédito"
              onPress={() => this.storeUser()}
              color="#19AC52"
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Limpiar Campos"
              onPress={() => this.limpiar()}
              color="#19AC52"
            />
          </View>
          <Text>{"\n"}</Text>
          <View style={styles.button}>
            <Button
              title="Consultar créditos"
              onPress={() => this.props.navigation.navigate("CreditListScreen")}
              color="#19AC52"
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    
  },
  containerProps: {
    flexDirection:'colunm', /*Por defecto*/
    flex: 1,
    backgroundColor: '#86a8e7',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
    },
    fontSize:{
      fontSize: 19,
      // fontWeight: 'bold',
      color: 'white',
      marginBottom:3
    },
  textInput:{
    backgroundColor: '#d6d6d6',
    color: '#010101',
    height: 40,
    padding: 5,
    marginBottom: 15,
    width: 400,
    borderRadius: 4,
    
  },
  TouchableOpacity:{
    height:40, 
    width:400, 
    backgroundColor:'#00c9b7',
    alignItems:'center',
    justifyContent:'center'
  },
  Image:{
    height:250,
    width:400,
    resizeMode:'stretch', 
    borderRadius:20,
    marginBottom:10,
    marginTop:15
  },
  picker:{
    height:60, 
    width:400, 
    alignItems:'center',
    justifyContent:'center',
    marginBottom:10,
  },
  button: {
    marginBottom: 7,
  }
})
export default AddcreditScreen;