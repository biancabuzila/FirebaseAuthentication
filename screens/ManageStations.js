import React from 'react';
import {StyleSheet,Text, View,TextInput,Image,Dimensions, ScrollView, Button, ImageBackground, Pressable,} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
const { width } = Dimensions.get("screen");

const ManageStations = () => {
    return (

      <SafeAreaView style={styles.container}>
      <View style={[styles.headerContainer, styles.containerProps]}>

      <Image
          style={{marginRight: 20 }}
          source={require('../images/Blue-circle.png')}
      />
      <View> 
      <Text style={{ fontSize: 20, fontWeight: "bold", color:"#6B6464", marginBottom: 5 }}>
        Provider account
      </Text>
      <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>
        Provider Name
        </Text>
        </View>

      </View>

      <View style={[styles.mainContainer, styles.containerProps]}>

      <ImageBackground source={require('../images/streets.png')} resizeMode="cover" style={styles.image}>

        <ScrollView style={{ width }}>

          <Pressable style={[styles.button, styles.shadowProp]}>
              <Text style={styles.textButton}>Add Station</Text>

          </Pressable>

          {/* <Pressable style={styles.button}>
          <Image 
            source={require('../images/Logo.png')}
            style={styles.lightning}/>
          </Pressable> */}
          

          <Pressable style={[styles.button, styles.shadowProp]}
                    onPress={() => {navigation.navigate("Manage Stations")}}>
              <Text style={styles.textButton}>Update Station</Text>
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
      backgroundColor: "#182724",
      alignItems: "center",
      justifyContent: "center",
   
    },
   
    headerContainer: {
      backgroundColor: "#182724",
      flex: 0.2,
      flexDirection:'row',
    },
   
    mainContainer: {
      backgroundColor: "#182724",
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
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
      width,
      alignItems: "center",
      justifyContent: "center",
    },
   
    button: {
     alignItems: 'center',
     justifyContent: 'center',
     paddingVertical: 20,
     paddingHorizontal: 5,
     borderRadius: 10,
     elevation: 3,
     backgroundColor: '#182724',
     marginLeft: 55,
     marginRight: 55,
     marginTop: 30,
     
   },
   
   shadowProp: {
     shadowColor: 'black',
     shadowOffset: {width: 0, height: 5},
     shadowOpacity: 0.3,
     shadowRadius: 4,
     elevation: 5,
   },
   
   textButton: {
     fontSize: 14,
     lineHeight: 21,
     fontWeight: 'bold',
     letterSpacing: 0.25,
     color: 'white',
     marginBottom: 5
   },
   
   lightning: {
    height: 100,
   }
});

export default ManageStations;