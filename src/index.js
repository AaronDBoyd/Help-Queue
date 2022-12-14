import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
// import reducer from './reducers/ticket-list-reducer';
import rootReducer from './reducers/index';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import firebase from "./firebase";

const store = createStore(rootReducer);

// store.subscribe(() => 
//   console.log(store.getState())
// );


const rrfProps = {
  firebase,
  config: {
        userProfile: "users"
    },
  dispatch: store.dispatch,
  createFirestoreInstance
}

// ReactDOM.render(
//   <Provider store={store}>
//     <ReactReduxFirebaseProvider {...rrfProps}>
//       <App />
//     </ReactReduxFirebaseProvider>
//   </Provider>,
//   document.getElementById('root')
// )

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  // document.getElementById('root')
)


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
// );




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
