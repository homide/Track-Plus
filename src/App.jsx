import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { useEffect, useState } from "react";

const mapStyles = {
  width: "100%",
  height: "100%",
};

const ambulancePositions = [
  {
    name: "AM1",
    position: { lat: 28.5741, lng: 77.3538 },
  },
  {
    name: "AM2",
    position: { lat: 28.5777, lng: 77.3317 },
  },
  {
    name: "AM3",
    position: { lat: 28.5640734811412018, lng: 77.3985864305545 },
  },
  {
    name: "AM4",
    position: { lat: 28.5640734811412018, lng: 77.3985864305545 },
  },
];

const carData = [
  
]

function App(props) {
  const [curLatLng, setCurLatLng] = useState({ lat: 0.0, lng: 0.0 });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        // console.log(pos.coords)
        setCurLatLng({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLoading(false);
      });
    }
  }, [curLatLng, loading]);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <Map google={props.google} style={mapStyles} initialCenter={curLatLng}>
      <Marker />
      {ambulancePositions?.map((ap) => (
        <Marker
          name={ap.name}
          // icon={{
          //   url: "https://cdn-icons-png.flaticon.com/512/1834/1834905.png",
          //   anchor: new google.maps.Point(32, 32),
          //   scaledSize: new google.maps.Size(64, 64),
          // }}
          position={ap.position}
        />
      ))}
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCK0y5Dmu-kpFGQ-wvT3i7zDUCd6iyj_n4",
})(App);
