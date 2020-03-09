import React, { useState } from "react";
import MaMap from "./components/maMap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import EventCalender from "./components/eventCalendar";

//import "./main.scss"; // webpack must be configured to do this

export default function App() {
  const [venue, setVenue] = useState({
    name: "Big Night Live",
    dataSource: "ticketmaster"
  });

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
  );
}
