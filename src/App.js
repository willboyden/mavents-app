import React, { useState } from "react";
import MaMap from "./components/maMap";
import { useRoutes, A } from "hookrouter";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./StyleSheets/navBar.css";
import EventFinder from "./components/EventFinder";
import EventCalendar from "./components/eventCalendar";
import Home from "./components/Home";
import Technology from "./components/Technology";
import CommingSoon from "./components/CommingSoon";
import Contact from "./components/Contact";
//import "./main.scss"; // webpack must be configured to do this

export default function App() {
  //1 react hook with method to set data and var to hold data
  const [venue, setVenue] = useState({
    name: "Big Night Live",
    dataSource: "ticketmaster"
  });

  const [dateParam, setDateParam] = useState({});
  const [sidenavWidth, SetSidenavWidth] = useState("250px");
  const [mainMarginLeft, SetMainMrginLeft] = useState("250px");

  function openNav() {
    SetSidenavWidth("250px");
    SetMainMrginLeft("250px");
  }
  function closeNav() {
    SetSidenavWidth("0px");
    SetMainMrginLeft("0px");
  }

  function navClick() {
    console.log("clicked");
    sidenavWidth == "250px" ? closeNav() : openNav();
  }

  const routes = {
    "/": () => <Home />,
    "/eventfinder": () => <EventFinder />,
    "/eventcalendar": () => <EventCalendar venue={venue} />,
    "/venuemap": () => <MaMap />,
    "/technology": () => <Technology />,
    "/contact": () => <Contact />,
    "/comingsoon": () => <CommingSoon />
  };
  const routeResult = useRoutes(routes);
  return (
    <div>
      <div id="mySidenav" className="sidenav" style={{ width: sidenavWidth }}>
        <a className="closebtn" onClick={navClick}>
          &times;
        </a>
        <A href="/">Home</A>
        <A href="/eventfinder">Event Finder</A>
        <A href="/eventcalendar">Event Calendar</A>
        <A href="/venuemap">Venue Map</A>
        <A href="/technology">Technology</A>
        <A href="/contact">Contact</A>
        <A href="/commingsoon">Comming Soon</A>
      </div>

      <div
        id="main"
        className="container"
        style={{ marginLeft: mainMarginLeft }}
      >
        <span style={{ cursor: "pointer" }} onClick={navClick}>
          &#9776;
        </span>
        <div className="row">{routeResult}</div>
      </div>
    </div>
  );
}
