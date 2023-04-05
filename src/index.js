import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter} from 'react-router-dom'
import { StateProvider } from './Context/stateProvider';
import {initialState} from './Context/initialState';
import { store } from './store';
import { Provider } from 'react-redux';
import reducer from './Context/reducer';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
  <StateProvider initialState={initialState} reducer={reducer}>
  <Provider store={store}>
  <App />
  </Provider>
  </StateProvider>
  </BrowserRouter> 
  </React.StrictMode>
);

