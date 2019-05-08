import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Menu from './components/Menu';

/* REDUX STORE */
import { Provider } from 'react-redux';
import store from './store';
/* REDUX STORE */


class App extends Component {
  constructor(props) {
    super(props);
    console.log("Inside App");
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Menu />
          </div>
        </BrowserRouter>
      </Provider>

    );
  }
}
export default App;
