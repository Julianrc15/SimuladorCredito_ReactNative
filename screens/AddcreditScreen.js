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

  calcular = () =>{
    let  interes
    let caso= this.state.tipoPrestamo

    switch(caso){
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
   
    console.log(caso)
    //calcular deuda 

    let montoDeuda = (((this.state.valorPrestamo)*interes*(this.state.numeroCuotas))+(this.state.valorPrestamo))
    console.log(montoDeuda)
    // this.setState({valorDeuda:(new Intl.NumberFormat('es-CO', { maximumSignificantDigits: 3 }).format(montoDeuda))});
    // this.setState({valorCuota:(new Intl.NumberFormat('es-CO', { maximumSignificantDigits: 3 }).format(montoDeuda/parseFloat(this.numeroCuotas)))})
  } 


  storeUser(){

    if(this.state.email === '' || this.state.valorPrestamo ===''|| this.state.tipoPrestamo ===''|| this.state.numeroCuotas ===''){
      alert('Ingresar todos los datos')
     } 
    else {

        // let  interes
        // switch(this.tipoPrestamo){
        //   case 'vivienda':
        //     interes=1/100
        //   break;
        // case' educacion':
        //    interes=0.5/100
        //   break;
        // case 'vehiculo':
        //     interes=1.5/100
        //   break;
        // }
       
        // //calcular deuda 
    
        // let montoDeuda =(parseFloat(this.valorPrestamo))*interes*parseFloat(this.numeroCuotas)+parseFloat(this.valorPrestamo)
       
        // this.setState({valorDeuda:(new Intl.NumberFormat('es-CO', { maximumSignificantDigits: 3 }).format(montoDeuda))});
        // this.setState({valorCuota:(new Intl.NumberFormat('es-CO', { maximumSignificantDigits: 3 }).format(montoDeuda/parseFloat(this.numeroCuotas)))})
        



            
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
                this.setState({isLoading: false})
                const docRef = addDoc(collection(db, "creditos"), {
                
                email: this.state.email,
                valorPrestamo: this.state.valorPrestamo,
                tipoPrestamo: this.state.tipoPrestamo,
                numeroCuotas:this.state.numeroCuotas,
                valorCuota:this.state.valorCuota,
                valorDeuda:this.state.valorDeuda,
                isLoading: true,
                });
                alert("Usuario agregado correctamente ...");
                
                this.setState({email:''});
                this.setState({valorPrestamo:''});
                this.setState({tipoPrestamo:''});
                this.setState({numeroCuotas:''});
                this.setState({valorCuota:''});
                this.setState({valorDeuda:''});
                this.props.navigation.navigate('CreditListScreen')
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
              placeholder={{
                label: "Seleccione tipo de prestamo",
                value: "",
              }}
              onValueChange={(val) =>
                this.inputValueUpdate(val, "tipoPrestamo")
              }
              items={[
                { label: "Vivienda", value: "vivienda" },
                { label: "Educación", value: "educacion" },
                { label: "Vehiculo", value: "vehiculo" },
              ]}
              value={this.tipoPrestamo}
            />
          </View>
          <View style={styles.textInput}>
            <RNPickerSelect
                placeholder={{
                label: "Seleccione coutas del prestamo",
                value: "",
              }}
              onValueChange={(val) =>this.inputValueUpdate(val, "numeroCuotas")}
              items={[
                { label: "12", value: "12" },
                { label: "24", value: "24" },
                { label: "36", value: "36" },
              ]}
              value={this.numeroCuotas}
            />
          </View>

            
            <TextInput style={styles.textInput} 
            value={this.valorCuota} 
            onChangeText={(val) => this.inputValueUpdate(val, "valorCuota")
            }
            />

            <TextInput style={styles.textInput} value={this.valorDeuda} />

          <View style={styles.button}>
            <Button
              title="guardar datos del crédito"
              onPress={() => this.storeUser()}
              color="#19AC52"
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Calcular crédito"
              onPress={() => this.calcular()}
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