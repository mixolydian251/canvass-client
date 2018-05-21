import React from 'react';

export const AppContext = React.createContext();

export class AppProvider extends React.Component{

  state = {
    username: undefined
  };

  render(){
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}