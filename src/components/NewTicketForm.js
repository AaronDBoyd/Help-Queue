import React from 'react'
import { v4 } from 'uuid';
import PropTypes from "prop-types";
import ReusableForm from './ReusableForm';
import { formatDistanceToNow } from 'date-fns';
import { useFirestore } from 'react-redux-firebase'


export default function NewTicketForm(props) {

  // function handleNewTicketFormSubmission(event) {
  //   event.preventDefault();
  //   props.onNewTicketCreation({
  //     names: event.target.names.value, 
  //     location: event.target.location.value, 
  //     issue: event.target.issue.value, 
  //     id: v4(),
  //     timeOpen: new Date(),
  //     formattedWaitTime: formatDistanceToNow(new Date(), {
  //       addSuffix: true
  //     })
  //   });
  // }

  const firestore = useFirestore();

  function addTicketToFirestore(event) {
    event.preventDefault();

    props.onNewTicketCreation();

    return firestore.collection('tickets').add(
      {
        names: event.target.names.value,
        location: event.target.location.value,
        issue: event.target.issue.value,
        timeOpen: firestore.FieldValue.serverTimestamp()
      }
    )
  }


  return (
    <React.Fragment>
      <h1>- Submit a Ticket -</h1>
      <ReusableForm 
        // formSubmissionHandler={handleNewTicketFormSubmission}
        formSubmissionHandler={addTicketToFirestore}
        buttonText="Help!" />
    </React.Fragment>
  );
}

NewTicketForm.propTypes = {
  onNewTicketCreation: PropTypes.func
};
