import useSWR from "swr";
import React, { useState } from "react";
import { Map, Marker, Popup, TileLayer, Circle } from "react-leaflet";

// import { Icon, Circle } from "leaflet";

export default function MaMap(props) {
  const fetcher = (...args) => fetch(...args).then(response => response.json());
  const domain = "http://localhost:4000/api/";
  const { data, error } = useSWR(domain + "cityVenues/", fetcher);

  const [activeVenue, setActiveVenue] = useState({
    name: "Big Night Live",
    dataSource: "multi"
  });

  const datums = data && !error ? data : [];
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <Map center={[41.98, -71.3824]} zoom={8}>
      <TileLayer
        url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        minZoom={1}
        maxZoom={18}
        id="mapbox/streets-v11"
        accessToken="pk.eyJ1Ijoid2lsbGJveWRlbiIsImEiOiJjazVvdzA4cmEwMDVxM21xbzNiNGxyMGRvIn0.wZFONFwh4vNyRCjkViUg4w"
      />

      {datums
        .filter(x => x.latitude != null && x.longitude != null)
        .map((datum, i) => (
          <Marker
            key={i}
            position={{ lat: datum.latitude, lng: datum.longitude }}
            onMouseOver={e => {
              e.target.openPopup();
            }}
            onMouseOut={e => {
              e.target.closePopup();
            }}
            onClick={() => {
              props.action(datum);
            }}
          >
            <Circle
              key={datum.name}
              center={[datum.latitude, datum.longitude]}
              fillColor={() => {
                if (datum.dataSource == "ticketmaster") {
                  return "RoyalBlue";
                } else if (datum.dataSource == "stubhub") {
                  return "DarkOrange";
                } else {
                  return "purple";
                }
              }}
              color={() => {
                if (datum.dataSource == "ticketmaster") {
                  return "RoyalBlue";
                } else if (datum.dataSource == "stubhub") {
                  return "DarkOrange";
                } else {
                  return "purple";
                }
              }}
              radius={500}
              fillOpacity={0.5}
            />
            <Popup>
              <span>
                {datum.name}
                <br />
                {datum.dataSource}
                <br />
              </span>
            </Popup>
          </Marker>
        ))}
    </Map>
  );
}
