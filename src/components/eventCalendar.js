import React, { Component, useEffect, useState, useRef } from "react";
import "../App.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
//import useFetch from "./getData";
//import "."; // webpack must be configured to do this

// hooks.js

//export { useFetch };

export default function EventCalendar(props) {
  const [venueData, setVenueData] = useState({});

  const col = x => {
    if (x.dataSource == "ticketmaster") {
      return "RoyalBlue";
    } else if (x.dataSource == "stubhub") {
      return "DarkOrange";
    } else {
      return "purple";
    }
  };
  useEffect(() => {
    if (props) {
      // console.log(props);
      fetch(`http://localhost:4000/api/events/${props.venue.name}/`)
        .then(response => response.json())
        .then(res => {
          //console.log(res);
          setVenueData(
            res.map((x, i) => ({
              id: x["Event Name"] + i.toString(),
              date: x["Event Date"],
              title: x["Event Name"],
              color: col(x)
            }))
          );
        });
      // console.log(venueData);
    }
  }, [props]);

  return (
    <FullCalendar
      defaultView="dayGridMonth"
      plugins={[dayGridPlugin]}
      events={venueData}
      header={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
      }}
    />
  );
}
