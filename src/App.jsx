import { Map, GoogleApiWrapper, Marker, Polyline } from "google-maps-react";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";


const mapStyles = {
  width: "100%",
  height: "100%",
};

//firebase real-time

// const firebaseConfig = {
//   apiKey: "AIzaSyC-n0tIhPNZ3IqS3ygmKJ9Y80EWHp7yyFM",
//   authDomain: "ambulance-tracking-fc20c.firebaseapp.com",
//   projectId: "ambulance-tracking-fc20c",
//   storageBucket: "ambulance-tracking-fc20c.appspot.com",
//   messagingSenderId: "95510651477",
//   appId: "1:95510651477:web:829569f6e488e0950caadc",
//   measurementId: "G-E9MQ5NXQ2E",
//   databaseURL: "https://ambulance-tracking-fc20c-default-rtdb.asia-southeast1.firebasedatabase.app/",
// };


const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function App(props) {
  const [curLatLng, setCurLatLng] = useState({ lat: 0.0, lng: 0.0 });
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [driverName, setDrivername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [pathCoordinates1, setCoordinates1] = useState([
    { lat : 28.6001927, lng : 77.3717128},
    { lat: 28.5777, lng: 77.3317 },
  ])
  
  const [pathCoordinates2, setCoordinates2] = useState([
    { lat : 28.6001927, lng : 77.3717128 },
    { lat: 29.5777, lng: 77.3317 },
  ])
  
  const [pathCoordinates3, setCoordinates3] = useState([
    { lat : 28.6001927, lng : 77.3717128},
    { lat: 28.5640734811412018, lng: 77.3985864305545 },
  ])

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        // console.log(pos.coords)
        setCoordinates1([ { lat: pos.coords.latitude, lng: pos.coords.longitude } , pathCoordinates1[1]])
        setCoordinates2([ { lat: pos.coords.latitude, lng: pos.coords.longitude } , pathCoordinates2[1]])
        setCoordinates3([ { lat: pos.coords.latitude, lng: pos.coords.longitude } , pathCoordinates3[1]])
        setCurLatLng({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLoading(false);
      });
    }
  }, [loading]);

  wait(5000).then(() => 
  {
    let i = 0.001
  
    var p1Lat = pathCoordinates1[1].lat
    var p2Lat = pathCoordinates2[1].lat
    var p3Lat = pathCoordinates3[1].lat
  
    var p1Lng = pathCoordinates1[1].lng
    var p2Lng = pathCoordinates2[1].lng
    var p3Lng = pathCoordinates3[1].lng
  
    var p1 = { lat: (p1Lat + i), lng: (p1Lng + i) }
    var p2 = { lat: (p2Lat + i), lng: (p2Lng + i) }
    var p3 = { lat: (p3Lat + i), lng: (p3Lng + i) }
  
    setCoordinates1([ { lat : 28.6001927, lng : 77.3717128} , p1])
    setCoordinates2([ { lat : 28.6001927, lng : 77.3717128} , p2])
    setCoordinates3([ { lat : 28.6001927, lng : 77.3717128} , p3])
  });


  return loading ? (
    <div>Loading...</div>
  ) : (
    <>
    <div style={{}}>{name}</div>
    <div style={{}}>{driverName}</div>
    <div style={{}}>{phoneNumber}</div>
    
    <Map google={props.google} style={mapStyles} initialCenter={curLatLng}>
      <Marker />
      <Polyline
        path={pathCoordinates1}
        geodesic={true}
        options={{
            strokeColor: "#ff2527",
            strokeOpacity: 0.75,
            strokeWeight: 2,
        }}
      />
      <Polyline
        path={pathCoordinates2}
        geodesic={true}
        options={{
            strokeColor: "#0000FF",
            strokeOpacity: 0.75,
            strokeWeight: 2,
        }}
      />
      <Polyline
        path={pathCoordinates3}
        geodesic={true}
        options={{
            strokeColor: "#000000",
            strokeOpacity: 0.75,
            strokeWeight: 2,
        }}
      />

        <Marker
        onClick={()=>{
          setName("Ambulance 1")
          setDrivername("Mr Sundar")
          setPhoneNumber("+91-9538762310")
        }}
        icon={{
          url: "https://cdn-icons-png.flaticon.com/512/1834/1834905.png",
          anchor: new google.maps.Point(32, 32),
          scaledSize: new google.maps.Size(64, 64),
        }}
        position={pathCoordinates1[1]}
        />

        <Marker
          onClick={()=>{
            setName("Ambulance 2")
            setDrivername("Mr Ram")
            setPhoneNumber("+91-9538762310")
          }}
          icon={{
            url: "https://cdn-icons-png.flaticon.com/512/1834/1834905.png",
            anchor: new google.maps.Point(32, 32),
            scaledSize: new google.maps.Size(64, 64),
          }}
          position={pathCoordinates2[1]}
        />

        <Marker
          onClick={()=>{
            setName("Ambulance 3")
            setDrivername("Mr Shaam")
            setPhoneNumber("+91-9538762310")
          }}
          icon={{
            url: "https://cdn-icons-png.flaticon.com/512/1834/1834905.png",
            anchor: new google.maps.Point(32, 32),
            scaledSize: new google.maps.Size(64, 64),
          }}
          position={pathCoordinates3[1]}
        />
    </Map>

    </>
    
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCK0y5Dmu-kpFGQ-wvT3i7zDUCd6iyj_n4",
})(App);
