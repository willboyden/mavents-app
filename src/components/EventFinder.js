import React, { useState } from "react";
import MaMap from "./maMap";
import "bootstrap/dist/css/bootstrap.min.css";
import EventCalender from "./eventCalendar";
//import "./main.scss"; // webpack must be configured to do this

export default function EventFinder() {
  //1 react hook with method to set data and var to hold data
  const [venue, setVenue] = useState({
    name: "Big Night Live",
    dataSource: "ticketmaster"
  });

  const [dateParam, setDateParam] = useState({});

  return (
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
          {/* 2 pass "data setter" to child of this component / sibling of component being effected by event  */}
          <MaMap
            action={venue => setVenue(venue)}
            dateClicked={dateParam}
          ></MaMap>
        </div>
        <div className="col-3"></div>
      </div>

      <div className="row">
        <div className="col-9">
          {/* 3 use data in child component */}
          <EventCalender
            venue={venue}
            onDateClick={dateParam => setDateParam(dateParam)}
          />
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
}
