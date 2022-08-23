import React from 'react'
import PropTypes from "prop-types";
// import { formatDistanceToNow } from 'date-fns';

export default function Ticket(props) {

  // const formattedWaitTime = formatDistanceToNow(props.timeOpen, {
  //   addSuffix: true
  // });
  
  return (
    <React.Fragment>
      <div onClick = {() => props.whenTicketClicked(props.id)}>
        <h3>{props.location} - {props.names}</h3>
        <p><em>{props.issue}</em></p>
        {/* <p><em>{formattedWaitTime.toString()}</em></p> */}
        {/* <p><em>{props.timeOpen}</em></p> */}
        <hr/>
      </div>
    </React.Fragment>
  )
}

Ticket.propTypes = {
  names: PropTypes.string,
  location: PropTypes.string,
  issue: PropTypes.string,
  id: PropTypes.string, 
  whenTicketClicked: PropTypes.func,
  formattedWaitTime: PropTypes.string
};
