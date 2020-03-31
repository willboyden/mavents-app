import React, { useState, useEffect, useContext } from "react";
import MaMap from "./components/maMap";
import { useRoutes, A, useRedirect } from "hookrouter";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./StyleSheets/navBar.css";
import EventFinder from "./components/EventFinder";
import EventCalendar from "./components/eventCalendar";
import Home from "./components/Home";
import Technology from "./components/Technology";
import CommingSoon from "./components/CommingSoon";
import Contact from "./components/Contact";
import PivotTableUI from "./components/PivotTableWithUI";
import PrivacyPolicy from "./components/PrivacyPolicy";
import { DataProvider } from "./components/DataContext";
import { UserProvider } from "./components/UserContext";
import PivotTableWrapper from "./components/PivotTableWrapper";
//import "./main.scss"; // webpack must be configured to do this

import StoreFetchDataParallel from "./components/FetchDataParallel";
import PivotTableWithUI from "./components/PivotTableWithUI";

export default function App() {
  const [dateParam, setDateParam] = useState({});
  const [sidenavWidth, SetSidenavWidth] = useState("250px");
  const [mainMarginLeft, SetMainMrginLeft] = useState("250px");
  const user = { name: "Tania", loggedIn: true };
  //TestC();

  //1 react hook with method to set data and var to hold data
  const [venue, setVenue] = useState({
    name: "Big Night Live",
    dataSource: "ticketmaster"
  });
  const data = async () => await StoreFetchDataParallel(urls);
  //console.log(data);

  //  console.log(data);
  const routes = {
    "/": () => <Home />,
    "/eventfinder": () => <EventFinder />,
    "/exploredata": () => (
      <PivotTableWrapper
        data={data}
        pivotState={{
          mode: "demo",
          filename: "Event Data Explorer",
          // textarea: 'Sample Dataset: Tips',
          pivotState: {
            data: data,
            // rows: ['Payer Gender'],
            //  cols: ['Party Size'],
            //  aggregatorName: 'Sum over Sum',
            //   vals: ['Tip', 'Total Bill'],
            rendererName: "Grouped Column Chart",
            // sorters: {
            //   Meal: sortAs(['Lunch', 'Dinner']),
            //   'Day of Week': sortAs(['Thursday', 'Friday', 'Saturday', 'Sunday']),
            // },
            plotlyOptions: { width: 900, height: 500 },
            plotlyConfig: {},
            tableOptions: {
              clickCallback: function(e, value, filters, pivotData) {
                var names = [];
                pivotData.forEachMatchingRecord(filters, function(record) {
                  names.push(record.Meal);
                });
                alert(names.join("\n"));
              }
            }
          }
        }}
      />
    ),
    "/eventcalendar": () => <EventCalendar venue={venue} />,
    "/venuemap": () => <MaMap />,
    "/technology": () => <Technology />,
    "/contact": () => <Contact />,
    "/comingsoon": () => <CommingSoon />,
    "/privacypolicy": () => <PrivacyPolicy />,
    "/*": () => <PrivacyPolicy />
  };

  require("dotenv").config();
  //StoreFetchDataParallel(urls);
  //
  var urls = [
    {
      urlpath: process.env.domain + "/api/tblstubhubvenue/",
      varname: "tblstubhubvenue"
    },
    {
      urlpath: process.env.domain + "/api/tblnewticketmastervenueevent/",
      varname: "tblnewticketmastervenueevent"
    },
    {
      urlpath: process.env.domain + "/api/tblstubhubcity/",
      varname: "tblstubhubcity"
    },
    {
      urlpath: process.env.domain + "/api/tblticketmastervenue/",
      varname: "tblticketmastervenue"
    },
    {
      urlpath: process.env.domain + "/api/tblnewstubhubvenueevent/",
      varname: "tblnewstubhubvenueevent"
    }
  ];
  //const x = StoreFetchDataParallel(urls);

  //x.then(y => console.log(y));

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

  const routeResult = useRoutes(routes);

  function setTablePivotState() {
    return {
      mode: "demo",
      filename: "Event Data Explorer",
      // textarea: 'Sample Dataset: Tips',
      pivotState: {
        data: { data },
        // rows: ['Payer Gender'],
        //  cols: ['Party Size'],
        //  aggregatorName: 'Sum over Sum',
        //   vals: ['Tip', 'Total Bill'],
        rendererName: "Grouped Column Chart",
        // sorters: {
        //   Meal: sortAs(['Lunch', 'Dinner']),
        //   'Day of Week': sortAs(['Thursday', 'Friday', 'Saturday', 'Sunday']),
        // },
        plotlyOptions: { width: 900, height: 500 },
        plotlyConfig: {},
        tableOptions: {
          clickCallback: function(e, value, filters, pivotData) {
            var names = [];
            pivotData.forEachMatchingRecord(filters, function(record) {
              names.push(record.Meal);
            });
            alert(names.join("\n"));
          }
        }
      }
    };
  }

  // console.log(data ? data : null);
  return (
    <DataProvider value={data}>
      <UserProvider value={user}>
        <div id="heyo">
          {/* <div>{data ? data : null}</div> */}
          <div
            id="mySidenav"
            className="sidenav"
            style={{ width: sidenavWidth }}
          >
            <a className="closebtn" onClick={navClick}>
              &times;
            </a>
            <A href="/">Home</A>
            <A href="/eventfinder">Event Finder</A>
            <A href="/exploredata">Explore Data</A>
            <A href="/eventcalendar">Event Calendar</A>
            <A href="/venuemap">Venue Map</A>
            <A href="/technology">Technology</A>
            <A href="/contact">Contact</A>
            <A href="/commingsoon">Comming Soon</A>
            <A href="/privacypolicy">Privacy Policy</A>
          </div>
          <div
            id="main"
            className="container"
            style={{
              marginLeft: mainMarginLeft
            }}
          >
            <span style={{ cursor: "pointer" }} onClick={navClick}>
              &#9776;
            </span>
            <div className="row">{routeResult}</div>
          </div>
        </div>
      </UserProvider>
    </DataProvider>
  );
}
