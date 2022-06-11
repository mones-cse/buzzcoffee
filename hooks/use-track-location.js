import { useState } from "react";
import { ACTION_TYPE } from "../context/store-context";

export const useTrackLocation = (dispatch) => {
  const [locationErrorMsg, setLocationErrorMsg] = useState("");
  const [isFindingLocation, setIsFindingLocation] = useState(false);

  const success = (position) => {
    dispatch({
      type: ACTION_TYPE.SET_LAT_LANG,
      payload: position.coords.latitude + "," + position.coords.longitude,
    });
    setLocationErrorMsg("");
    setIsFindingLocation(false);
  };

  const error = (error) => {
    alert(`Sorry, no position available.` + error.message);
    setLocationErrorMsg(error.message.toString());
    setIsFindingLocation(false);
  };
  const handleTrack = () => {
    setIsFindingLocation(true);
    const options = {
      enableHighAccuracy: true,
    };
    navigator.geolocation.watchPosition(success, error, options);
  };

  return {
    handleTrack,
    // latLong,
    locationErrorMsg,
    isFindingLocation,
  };
};
