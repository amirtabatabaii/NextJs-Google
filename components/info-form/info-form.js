import { useState, useEffect } from "react";
import Notification from "../ui/notification";

import classes from "../info-form/info-form.module.scss";
import GoogleMapDetail from "../GoogleMapDetail/google-map-detail";

const InfoForm = () => {
  const [enteredLongitude, setEnteredLongitude] = useState("38.453698");
  const [enteredLatitude, setEnteredLatitude] = useState("27.176647");
  const [enteredRadius, setEnteredRadius] = useState("500");
  const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', 'error'
  const [requestError, setRequestError] = useState();

  const [mapData, setMapData] = useState();

  async function sendMapData(MapDetails) {
    const req = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${enteredLatitude}%2C${enteredLongitude}&radius=${enteredRadius}&type=&keyword=&key=AIzaSyDtjQncAf_Ihom15Qdh2u482drjKzPsAC4`,
      //"https://run.mocky.io/v3/86016dda-4ab2-4149-9395-3c29b243ed55",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        mode: "no-cors",
      }
    );
    const newData = await req.json();

    //////////////////////////////////////////

    const response = await fetch("/api/map", {
      method: "POST",
      // body: JSON.stringify(...MapDetails, { data: newData }),
      body: JSON.stringify({
        latitude: enteredLatitude,
        longitude: enteredLongitude,
        radius: enteredRadius,
        data: newData.results,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.message === "Record find in MongoDB!") {
      setMapData(data.results);
    } else {
      setMapData(data.results);
    }

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }
  }

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  async function sendDetailHandler(event) {
    event.preventDefault();

    // add client-side validation

    setRequestStatus("pending");

    try {
      await sendMapData({
        latitude: enteredLatitude,
        longitude: enteredLongitude,
        radius: enteredRadius,
      });

      setRequestStatus("success");
      setEnteredLatitude("");
      setEnteredLongitude("");
      setEnteredRadius("");
      // setMapData("");
    } catch (error) {
      setRequestError(error.message);
      setRequestStatus("error");
    }
  }

  let notification;

  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "Sending data...",
      message: "Your data is on its way!",
    };
  }

  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Success!",
      message: "Data sent successfully!",
    };
  }

  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "Error!",
      message: requestError,
    };
  }

  return (
    <section className={classes["form-box"]}>
      <h2>Your Longitude, Latitude, Radius : </h2>
      <form className={classes.form} onSubmit={sendDetailHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor='longitude'>Longitude</label>
            <input
              type='number'
              id='longitude'
              required
              step='0.000001'
              value={enteredLongitude}
              onChange={(event) => setEnteredLongitude(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor='name'>Latitude</label>
            <input
              type='number'
              id='latitude'
              required
              step='0.000001'
              value={enteredLatitude}
              onChange={(event) => setEnteredLatitude(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor='name'>Radius (meter)</label>
            <input
              type='number'
              id='radius'
              required
              step='0.001'
              value={enteredRadius}
              onChange={(event) => setEnteredRadius(event.target.value)}
            />
          </div>
        </div>

        <div className={classes.actions}>
          <button>Find Place</button>
        </div>
      </form>
      {mapData?.data.length > 0 && <GoogleMapDetail mapData={mapData} />}
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
};

export default InfoForm;
