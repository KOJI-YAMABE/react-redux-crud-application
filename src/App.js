import React, {Component} from "react";

class App extends Component () {
  render() {
    return (
    <React.Fragment>
      <label htmlFor="bar">bar</label>
       <input type="text" onChange={() => {console.log("I am Koji.")}} />
    </React.Fragment>
    )
  }
}


// function App() { 
//   return React.createElement(
//     "h1",
//     null,
//     "Hello world!!"
//   );
// }

export default App;
