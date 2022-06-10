import { useState } from "react";

export const useTrackLocation = () => {
  const [latLong, setLatLong] = useState("");
  const [locationErrorMsg, setLocationErrorMsg] = useState("");
  const [isFindingLocation, setIsFindingLocation] = useState(false);

  const success = (position) => {
    console.log(position.coords.latitude, position.coords.longitude);
    setLatLong(position.coords.latitude + "," + position.coords.longitude);
    setLocationErrorMsg("");
    setIsFindingLocation(false);
  };

  const error = (error) => {
    alert(`Sorry, no position available.` + error.message);
    setLocationErrorMsg(error.message.toString());
    setIsFindingLocation(false);
  };
  const handleTrack = () => {
    console.log("handle Track called");
    setIsFindingLocation(true);
    const options = {
      enableHighAccuracy: true,
      // maximumAge: 30000,
      // timeout: 27000,
    };
    navigator.geolocation.watchPosition(success, error, options);
  };

  return {
    handleTrack,
    latLong,
    locationErrorMsg,
    isFindingLocation,
  };
};
