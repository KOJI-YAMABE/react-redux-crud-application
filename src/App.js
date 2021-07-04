import React from "react";
import propTypes from 'prop-types';

const App = () => {
  const profiles = [
    {name: "Koji",  age: 10},
    {name: "Hanako",  age: 33},
    {name: "Sato", age: 20}
  ]
  return (
    <div>
      {
        profiles.map((profile, index) => {
          return <User name={profile.name}  age={profile.age} key={index} />
        })
      }
    </div>
  )
}

const User  = (props) => {
  return <div>Hi, I am {props.name}, and {props.age} years old! </div> 
}

User.propTypes = {
  name: propTypes.string,
  age: propTypes.number.isRequired
}

// class App extends Component () {
//   render() {
//     return (
//     <React.Fragment>
//       <label htmlFor="bar">bar</label>
//        <input type="text" onChange={() => {console.log("I am Koji.")}} />
//     </React.Fragment>
//     )
//   }
// }

export default App;
