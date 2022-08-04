import React from "react";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm'
import PageOne from "./PageOne";
import PageTwo from "./PageTwo";
import PageThree from "./PageThree";

class TicketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      count: 0,
      mainTicketList: [],
      selectedTicket: null,
      editing: false
    };
  }

  updateState = () => {
    this.setState((prevState) => {
      if (this.state.count === 4) {
        return { count: 0 };
      } else {
        return { count: prevState.count + 1 };
      }
    });
  };

  handleAddingNewTicketToList = (newTicket) => {
    const newMainTicketList = this.state.mainTicketList.concat(newTicket);
    this.setState({
      mainTicketList: newMainTicketList,
      formVisibleOnPage: false,
      /* count: 0  */
    });
  };

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.state.mainTicketList.filter(ticket => ticket.id === id)[0];
    this.setState({selectedTicket: selectedTicket});
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedTicket: null,
        editing: false
      });
    } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage,
      }));
    }
  };

  handleDeletingTicket = (id) => {
    const newMainTicketList = this.state.mainTicketList.filter(ticket => ticket.id !== id);
    this.setState({
      mainTicketList: newMainTicketList,
      selectedTicket: null
    });
  }

  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({editing: true});
  }

  handleEditingTicketInList = (ticketToEdit) => {
    const editedMainTicketList = this.state.mainTicketList
      .filter(ticket => ticket.id !== this.state.selectedTicket.id)
      .concat(ticketToEdit);
    this.setState({
        mainTicketList: editedMainTicketList,
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
      
    } else if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList}  />;
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = <TicketList ticketList={this.state.mainTicketList} 
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

export default TicketControl;
