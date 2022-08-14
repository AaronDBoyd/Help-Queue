import React from "react";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm'
import { connect } from 'react-redux';
import PropTypes from "prop-types";
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
    const { id, names, location, issue } = newTicket;
    const action = {
      type: 'ADD_TICKET',
      id: id, 
      names: names,
      location: location,
      issue: issue,
    }
    dispatch(action);

    const action2 = {
      type: 'TOGGLE_FORM' 
    }
    dispatch(action2);
  };

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.props.mainTicketList[id];
    this.setState({selectedTicket: selectedTicket});
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
      const action = {
        type: 'TOGGLE_FORM'
      }
      dispatch(action);
    }
  };

  handleDeletingTicket = (id) => {
    const { dispatch } = this.props;
    const action = {
      type: 'DELETE_TICKET',
      id: id
    }
    dispatch(action);

    this.setState({selectedTicket: null});
  }

  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({editing: true});
  }

  handleEditingTicketInList = (ticketToEdit) => {
    const { dispatch } = this.props;
    const { id, names, location, issue } = ticketToEdit;
    const action = {
      type: 'ADD_TICKET',
      id: id,
      names: names,
      location: location,
      issue: issue,
    }
    dispatch(action);

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
      currentlyVisibleState = <TicketList ticketList={this.props.mainTicketList} 
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
  mainTicketList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    mainTicketList: state.mainTicketList,
    formVisibleOnPage: state.formVisibleOnPage
  }
}

TicketControl = connect(mapStateToProps)(TicketControl);

export default TicketControl;
