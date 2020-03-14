import React, { useEffect, useState } from "react";
import "../App.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import ReactDOM from "react-dom";

export default function EventCalendar(props) {
  const [venueData, setVenueData] = useState({});
  const [showDetail, setShowDetail] = useState(false);

  const col = x => {
    if (x.dataSource == "ticketmaster") {
      return "RoyalBlue";
    } else if (x.dataSource == "stubhub") {
      return "DarkOrange";
    } else {
      return "purple";
    }
  };

  const EventDetail = ({ event, el }) => {
    const minCost = event.extendedProps.minCost
      ? event.extendedProps.minCost
      : "Missing";
    const maxCost = event.extendedProps.maxCost
      ? event.extendedProps.maxCost
      : "Missing";
    const content = (
      <div>
        <b>{event.title}</b>
        <div>
          Min Cost:<b>{minCost}</b>
          Max Cost:<b>{maxCost}</b>
        </div>
      </div>
    );
    if (showDetail === true) {
      ReactDOM.render(content, el);
    } else {
      //tooltip, for now would rather have events not expand calendar
      // const contentTooltip = (
      //   <div style={{ overflow: "hidden" }}>
      //     <ReactTooltip id={event.id + "toolTip"}>{content}</ReactTooltip>
      //     <div>
      //       <p data-tip={content} data-for={event.id + "toolTip"}>
      //         {event.title}
      //       </p>
      //     </div>
      //   </div>
      // );
      // console.log(el);
      // ReactDOM.render(contentTooltip, el);
    }
    return el;
  };

  const handleDateClick = arg => {
    // alert(arg.dateStr);
    props.onDateClick(arg.dateStr);
  };

  let venueName = () => {
    return props.venue.name ? props.venue.name : "Big Night Live";
  };

  useEffect(() => {
    if (props) {
      // console.log(props);
      fetch(
        `http://52.2.126.232/api/events/${
          props.venue.name ? props.venue.name : "Big Night Live"
        }/`
      )
        .then(async response => response.json())
        .then(async res => {
          setVenueData(
            await res.map((x, i) => ({
              id: x["Event Name"] + i.toString(),
              date: x["Event Date"],
              title: x["Event Name"],
              color: col(x),
              extendedProps: {
                dataSource: x["dataSource"],
                minCost: x["Min Cost"],
                maxCost: x["Max Cost"]
              }
            }))
          );
        });
      // console.log(venueData);
    }
  }, [props, showDetail]); //use effect when there is change to this var

  // const btnText =
  //   showDetail == true ? "Minimize Event Details" : "Show Full Event Details";
  return (
    <div>
      <FullCalendar
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin, interactionPlugin]}
        events={venueData}
        eventRender={EventDetail}
        dateClick={handleDateClick}
        customButtons={{
          btnDetails: {
            text: "Event Details",
            click: () => {
              showDetail === true ? setShowDetail(false) : setShowDetail(true);
              //myCustomButton.text = btnText;
            }
          }
        }}
        header={{
          left: "prev,next today btnDetails",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
        }}
      />
    </div>
  );
}
