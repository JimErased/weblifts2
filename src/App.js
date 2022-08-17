import logo from './logo.svg';
import './App.css';
import login from './hevy_api.js'
import config from "./config.json";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
          
        </a>
      </header>
    </div>
  );
}

//downloadData(config['x-api-key'], config['auth-token']).then(data => {
//  console.log(data)
//})

export default App;
