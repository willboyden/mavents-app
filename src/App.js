import React, { useState, useEffect } from "react";
import useSwr from "swr";
import MaMap from "./components/maMap";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import EventCalender from "./components/eventCalendar";

//import "./main.scss"; // webpack must be configured to do this

import useFetch, * as getData from "./components/getData";

import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";

const fetcher = (...args) => fetch(...args).then(response => response.json());

export default function App() {
  // const url = "http://localhost:4000/api/cityVenues/";
  // const { data, error } = useSwr(url, { fetcher });
  // const datums = data && !error ? data : [];

  const venueUrl = `http://localhost:4000/api/venueEvents/Big Night Live/ticketmaster`;
  const { caldata, err } = useSwr(venueUrl, { fetcher });
  const datums = caldata && !err ? caldata : [];

  const [venue, setVenue] = useState({
    name: "Big Night Live",
    dataSource: "ticketmaster"
  });

  useEffect(venue => {
    if (venue) {
      //  alert(venue.dataSource);
      //setVenue(venue);
      // return venue;
    }
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-9">
              <h3 id="pageTitle">
                <span id="venueCount"></span>
                Venues with Events Listed in Massachusetts
              </h3>
              <button id="btnResetTblCityCounts">Reset Map</button>
              <button id="btnStubhubFilter">Stub Hub</button>
              <button id="btnTicketMasterFilter">Ticket Master</button>
            </div>
            <div className="col-3"></div>
          </div>

          <div className="row">
            <div className="col-9">
              <MaMap action={venue => setVenue(venue)}></MaMap>
            </div>
            <div className="col-3"></div>
          </div>

          <div className="row">
            <div className="col-9">
              <EventCalender venue={venue} />
            </div>
            <div className="col-3"></div>
          </div>
        </div>
      </div>
    </div>

    // {x}
    // <Map center={[41.98, -71.3824]} zoom={8}>
    //   <TileLayer
    //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //     attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    //   />

    //   {datums
    //     .filter(x => x.latitude && x.longitude)
    //     .map(datum => (
    //       <Marker
    //         key={datum.name}
    //         position={[datum.latitude, datum.longitude]}
    //       />
    //     ))}
    // </Map>
  );
}
