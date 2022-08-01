import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import PageOne from './PageOne';
import PageTwo from './PageTwo';
import PageThree from './PageThree';

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false, 
      count: 0
    };
  }

  updateState = () => {
    this.setState(prevState => {
      if (this.state.count === 4) {
        return { count: 0}
      } else {
      return { count: prevState.count + 1}
      }
    }) 
  }

  handleClick = () => {
    this.setState(prevState => ({ formVisibleOnPage: !prevState.formVisibleOnPage
    }));
  }

  // render(){
  //   let currentlyVisibleState = null;
  //   let buttonText = null; 
  //   if (this.state.formVisibleOnPage) {
  //     currentlyVisibleState = <NewTicketForm />
  //     // currentlyVisibleState = <PageOne />
  //     buttonText = "Return to Ticket List";
  //   } else {
  //     currentlyVisibleState = <TicketList />
  //     buttonText = "Add Ticket";
  //   }
  //   return (
  //     <React.Fragment>
  //       {currentlyVisibleState}
  //       <button onClick={this.handleClick}>{buttonText}</button>
  //     </React.Fragment>
  //   )
  // }


  render(){
    let currentlyVisibleState = null;
    let buttonText = null; 
    switch ( this.state.count ) {
      case 0:
        currentlyVisibleState = <TicketList />
        buttonText = "Add Ticket";
        break;
      case 1:
        currentlyVisibleState = <PageOne />
        buttonText = "Okay then, Add Ticket";
        break;
      case 2:
        currentlyVisibleState = <PageTwo />
        buttonText = "Yes";
        break;
      case 3:
        currentlyVisibleState = <PageThree />
        buttonText = "I did";
        break;
      case 4:
        currentlyVisibleState = <NewTicketForm />
        buttonText = "Return to Ticket List";
        break;
        default:
          currentlyVisibleState = <TicketList />
          buttonText = "Add Ticket";
          break;  
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.updateState}>{buttonText}</button>
      </React.Fragment>
    )
  }
}

export default TicketControl;