const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Joi = require("joi");
const firestore = require('firebase-admin/firestore');

const app = admin.initializeApp();
const db = admin.firestore(app);
const auth = admin.auth(app);

exports.insertProfile = functions
  .region("europe-west1")
  .https.onCall(async (data, context) => {
    let uid = context.auth.uid;

    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "You must be authenticated to use this function"
      );
    }

    let querySnapshot = await db
      .collection("userdata")
      .where("username", "==", data.username)
      .get();
    if (querySnapshot.size > 0) {
      let profile = querySnapshot.docs[0].data();
      if (querySnapshot.size > 0 && profile["uid"] != uid)
        return { status: 1, message: "Username already exists" };
    }

    const username = data.username;
    const lastName = data.lastName;
    const firstName = data.firstName;
    const phone = data.phone;
    const country = data.country; 

    if (!username.match("^[a-zA-Z0-9]+$"))
      return {
        status: 3,
        message: "Username can only contain letters and numbers",
      };
    if (!phone.match("^[0-9]+$"))
      return { status: 3, message: "Phone number can only contain numbers" };
    if (!firstName.match("^([a-zA-Z '-]){2,30}$"))
      return { status: 4, message: "First name can only contain letters" };
    if (!lastName.match("^([a-zA-Z '-]){2,30}$"))
      return { status: 5, message: "Last name can only contain letters" };

    let status, message;

    db.collection("userdata")
      .doc(uid)
      .set({
        uid: uid,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        country: data.country
    }).then(()=>{
        status=0;
    }).catch(error=>{
        status=6; message = error;
    });

    if(status) return{status:status,message:message};
    else return {status:0, uid: uid};

});



exports.getProfileData = functions.region("europe-west1").https.onCall(async(data, context)=>{
    
    let uid= context.auth.uid;
    if(!context.auth){
        throw new functions.https.HttpsError('unauthenticated','You must be authenticated to use this function');
    }
    let querySnapshot = await db.collection("userdata").doc(uid).get();
    return { result: querySnapshot.data() };
  });

exports.deleteAccount = functions
  .region("europe-west1")
  .https.onCall(async (data, context) => {
    let uid = context.auth.uid;
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "You must be authenticated to use this function"
      );
    }
    await db.collection("userdata").doc(uid).delete();
    auth.deleteUser(uid);
  });

exports.helloWorld = functions
  .region("europe-west1")
  .https.onCall(async (data, context) => {
    return { result: "Hello World" };
  });

exports.getAllStations = functions.region("europe-west1").https.onCall(async(data, context)=>{
    let querySnapshot = await db.collection('chargingstations').get();

    return ({result:querySnapshot.docs});

});

exports.getAllStationsForSpecificUser = functions.region("europe-west1").https.onCall(async(data, context)=>{
  let querySnapshot = await db.collection('chargingstations').where("userID", "==", context.auth.uid).get();
  let stations = [];

  querySnapshot.forEach(doc => {
    stations.push({id: doc.id, ...doc.data()})
  });
  return ({result:stations});
});

const validateObject = (object, data) => {
  const valid = object.validate(data);
  if (valid.error !== undefined) throw new Error(valid.error);
  return true;
};

/**
 * Usage:
 * 
createStation(
  {
    price: 1.17,
    services: ["coffee", "bathroom"],
    type: "normal",
    coordinate: {
      latitude: 47.1749681,
      longitude: 27.580027,
    },
  },
  ""
);
 */
exports.createStation = functions
  .region("europe-west1")
  .https.onCall(async (data, context) => {
    try {
      validateObject(
        Joi.object({
          name: Joi.string().required(),
          price: Joi.number().required(),
          services: Joi.array().items(Joi.string()).required(),
          type: Joi.number().valid(22, 43, 55).required(),
          coordinates: Joi.object({
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
          }).required(),
        }),
        data
      );
      data.price = parseFloat(data.price);
      data.type = parseInt(data.type);
      data.coordinates = new firestore.GeoPoint(data.coordinates.latitude, data.coordinates.longitude);
      data.userID = context.auth.uid;
      console.log('Create station',data);
      let querySnapshot = await db.collection("chargingstations").add(data);

      return {
        result: querySnapshot.id,
        message: "Station created successfully",
      };
    } catch (e) {
      return { result: null, error: true, message: e.message };
    }
  });

/**
 * 
 * Usage:
 deleteStation({
    id: "2aRsYg1YEeQFjr7G6i2K",
 }, '')
 */

exports.updateStation = functions
.region("europe-west1")
.https.onCall(async (data, context) => {
  try {
    validateObject(Joi.object({
      id: Joi.string().required(),
      name: Joi.string(),
      price: Joi.number(),
      services: Joi.array().items(Joi.string()),
      type: Joi.number().valid(22, 43, 55),
      coordinates: Joi.object({
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
      }),
    }), data);
    let querySnapshot = await db.collection("chargingstations").doc(data.id).get()
    if(querySnapshot.data().userID != context.auth.uid){
      return {result:null, error:true, message:"You are not the owner of this station"}
    }
    data.price = parseFloat(data.price);
    data.type = parseInt(data.type); 
    data.userID = context.auth.uid;
    data.coordinates = new firestore.GeoPoint(data.coordinates.latitude, data.coordinates.longitude);

    await db.collection("chargingstations").doc(data.id).update(data);
  } catch(e) {
    console.error(e);
    return {result: null,error: true, message: 'Failed to update this charging station. Error: '+e.message};
  }

  return {result: null, error: false, message: `Successfully modified station with id ${data.id}`}
})

exports.deleteStationByIDForSpecificUser = functions
  .region("europe-west1")
  .https.onCall(async (data, context) => {
      try{
        validateObject(Joi.object({
            id: Joi.string().required(),
        }), data);
        const resp = await db.collection("chargingstations").doc(data.id).delete();
        
        return { result: null, message: `Successfully deleted station with id '${data.id}'` };

      } catch (e) {
        return { result: null, error: true, message: e.message };
      }
  });

// exports.getStation = functions
//   .region("europe-west1")
//   .https.onCall(async (data, context) => {
//     // let querySnapshot = await db.collection('chargingstations').doc(data.id).delete();

//     return {
//       result: querySnapshot.id,
//       message: "Station deleted successfully",
//     };
//   });
// });


exports.getStationData = functions.region("europe-west1").https.onCall(async(data, context)=>{
    let stationID = data.stationID;
    
    let querySnapshot = await db.collection('chargingstations').doc(stationID).get();
    return ({result:(querySnapshot.data())});
});
