import React from 'react';
import {StyleSheet,Text, View,TextInput,Image,Dimensions, ScrollView, Button, ImageBackground, Pressable,} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
const { width } = Dimensions.get("screen");

const ManageStations = ({navigation}) => {
    return (

      <SafeAreaView style={styles.container}>

        
              <View style={[styles.headerContainer, styles.containerProps]}>

                <View style={{ flexDirection: 'row',    alignItems: 'center', justifyContent: 'center'}}>
                  <Image
                    style={{marginRight: 10 }}
                    source={require('../images/Blue-circle.png')}
                  />
                  <View> 
                    <Text style={{ fontSize: 20, fontWeight: "bold", color:"white" }}>
                      Provider account
                    </Text>
                  </View>      
                        
                        
                </View>

                
              <View style={{marginBottom:5}}>

              <Pressable style={[styles.button1, styles.shadowProp]}>
                  <Text style={styles.textButton1}
                  onPress={() => {navigation.navigate("Edit Station")}}>
                  Add Station
                  </Text>

                </Pressable>
              </View>

                
              </View>

      

      <View style={[styles.mainContainer, styles.containerProps]}>

      <ImageBackground source={require('../images/streets.png')} resizeMode="cover" style={styles.image}>

        <ScrollView style={{ width }}>


          <Pressable style={[styles.button, styles.shadowProp]}
                     onPress={() => {navigation.navigate("Edit Station")}}>
              <View style ={styles.inline}>
                <Text style={styles.textButton}>Station Name:</Text>
                <Text style={styles.textDetails}>  ZittyMall </Text>
                

              </View>
              
              <View style ={styles.inline}>
                <Text style={styles.textButton}>Type:</Text>
                <Text style={styles.textDetails}>  ... </Text>
              </View>
              
          </Pressable>

          <Pressable style={[styles.button, styles.shadowProp]}
                     onPress={() => {navigation.navigate("Edit Station")}}>
              <View style ={styles.inline}>
                <Text style={styles.textButton}>Station Name:</Text>
                <Text style={styles.textDetails}>  PalasMall </Text>

              </View>
              
              <View style ={styles.inline}>
                <Text style={styles.textButton}>Type:</Text>
                <Text style={styles.textDetails}>  ... </Text>
              </View>
              
          </Pressable>

        </ScrollView>
      </ImageBackground>


      </View>
</SafeAreaView>
    )
};

const styles = StyleSheet.create({
    mainView: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  
    container: {
      flex: 1,
      backgroundColor: "#0A1613",
      alignItems: "center",
      justifyContent: "center",
   
    },
   
    mainContainer: {
      backgroundColor: "#0A1613",
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },

    headerContainer: {
      width,
      flex: 0.2,
      borderRadius: 40,
      paddingTop: 30,
      paddingBottom: 30,
    },
   
    image: {
     flex: 1,
     justifyContent: "center"
   },
   
    footerContainer: {
      backgroundColor: "#16a085",
      flex: 0.1,
    },
   
    containerProps: {
      marginLeft: 10,
      alignItems: "center",
      justifyContent: "center",
    },


    //buttons
   
    button: {
     paddingVertical: 20,
     paddingHorizontal: 20,
     borderRadius: 10,
     elevation: 3,
     backgroundColor: '#182724',
     marginLeft: 55,
     marginRight: 55,
     marginTop: 30,
     
   },

   textButton: {
     fontSize: 18,
     lineHeight: 21,
     fontWeight: 'bold',
     letterSpacing: 0.25,
     color: 'white',
   },

   textDetails: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#00FFDA',
  },

   inline: {
    flexDirection:'row',
    flex: 0.2,
   },

   button1: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 25,
    backgroundColor: '#3B9683',
    marginTop: 10,
    paddingHorizontal: 15
  },

  textButton1: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    marginBottom: 5
  },

   
   shadowProp: {
     shadowColor: 'black',
     shadowOffset: {width: 0, height: 5},
     shadowOpacity: 0.3,
     shadowRadius: 4,
     elevation: 5,
   },
   

   
   lightning: {
    height: 100,
   }
});

export default ManageStations;