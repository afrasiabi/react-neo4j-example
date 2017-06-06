
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';

class App extends React.Component{
    render(){
        return(
            <Header prop="authName"/>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);