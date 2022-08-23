import React from "react";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm'
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import * as a from './../actions';
// import { formatDistanceToNow } from 'date-fns';
import { withFirestore } from 'react-redux-firebase'
// import PageOne from "./PageOne";
// import PageTwo from "./PageTwo";
// import PageThree from "./PageThree";

class TicketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // formVisibleOnPage: false,
      // count: 0,
      selectedTicket: null,
      editing: false
    };
  }

  // componentDidMount() {
  //   this.waitTimeUpdateTimer = setInterval(() =>
  //     this.updateTicketElapsedWaitTime(),
  //   60000
  //   );
  // }

  // componentWillUnmount(){
  //   clearInterval(this.waitTimeUpdateTimer);
  // }

  // updateTicketElapsedWaitTime = () => {
  //   // const { dispatch } = this.props;
  //   Object.values(this.props.firestore).forEach(ticket => {
  //       const newFormattedWaitTime = formatDistanceToNow(ticket.timeOpen, {
  //         addSuffix: true
  //       });

  //       this.props.firestore.update({collection: 'tickets', doc: ticket.id }, newFormattedWaitTime)
  //     // const action = a.updateTime(ticket.id, newFormattedWaitTime);
  //     // dispatch(action);
  //   });
  // }

  // updateState = () => {
  //   this.setState((prevState) => {
  //     if (this.state.count === 4) {
  //       return { count: 0 };
  //     } else {
  //       return { count: prevState.count + 1 };
  //     }
  //   });
  // };

  handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = this.props;
    
    // const action = a.addTicket(newTicket);
    // dispatch(action);

    const action2 = a.toggleForm();
    dispatch(action2);
  };

  handleChangingSelectedTicket = (id) => {
    this.props.firestore.get({collection: 'tickets', doc: id}).then((ticket) => {
      const firestoreTicket = {
        names: ticket.get("names"),
        location: ticket.get("location"),
        issue: ticket.get("issue"),
        id: ticket.id
      }
      this.setState({selectedTicket: firestoreTicket });
    });
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        // formVisibleOnPage: false,
        selectedTicket: null,
        editing: false
      });
    } else {
      const { dispatch } = this.props;
      const action = a.toggleForm();
      dispatch(action);
    }
  };

  handleDeletingTicket = (id) => {
    this.props.firestore.delete({collection: 'tickets', doc: id});
    this.setState({selectedTicket: null});
  }

  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({editing: true});
  }

  handleEditingTicketInList = () => {
    this.setState({
      editing: false,
      selectedTicket: null
    });
  }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null; 


    if (this.state.editing ) {      
      currentlyVisibleState = <EditTicketForm ticket = {this.state.selectedTicket} 
                                        onEditTicket = {this.handleEditingTicketInList} />
      buttonText = "Return to Ticket List";
    } else if (this.state.selectedTicket != null) {
      currentlyVisibleState = <TicketDetail ticket = {this.state.selectedTicket} 
                                  onClickingDelete = {this.handleDeletingTicket}
                                  onClickingEdit = {this.handleEditClick} />
      buttonText = "Return to Ticket List";
      
    } else if (this.props.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList}  />;
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = <TicketList /*ticketList={this.props.mainTicketList}*/ 
                                  onTicketSelection={this.handleChangingSelectedTicket} />;
      buttonText = "Add Ticket";
    }

    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }

  // render(){
  //   let currentlyVisibleState = null;
  //   let buttonText = null;
  //   switch ( this.state.count ) {
  //     case 0:
  //       currentlyVisibleState = <TicketList ticketList={this.state.mainTicketList} />
  //       buttonText = "Add Ticket";
  //       break;
  //     case 1:
  //       currentlyVisibleState = <PageOne />
  //       buttonText = "Okay then, Add Ticket";
  //       break;
  //     case 2:
  //       currentlyVisibleState = <PageTwo />
  //       buttonText = "Yes";
  //       break;
  //     case 3:
  //       currentlyVisibleState = <PageThree />
  //       buttonText = "I did";
  //       break;
  //     case 4:
  //       currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />
  //       buttonText = "Return to Ticket List";
  //       break;
  //       default:
  //         currentlyVisibleState = <TicketList ticketList={this.state.mainTicketList} />
  //         buttonText = "Add Ticket";
  //         break;
  //   }
  //   return (
  //     <React.Fragment>
  //       {currentlyVisibleState}
  //       <button onClick={this.updateState}>{buttonText}</button>
  //     </React.Fragment>
  //   )
  // }
}

TicketControl.propTypes = {
  // mainTicketList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    // mainTicketList: state.mainTicketList,
    formVisibleOnPage: state.formVisibleOnPage
  }
}

TicketControl = connect(mapStateToProps)(TicketControl);

export default withFirestore(TicketControl);
