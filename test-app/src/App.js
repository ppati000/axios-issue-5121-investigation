import './App.css';
import axios from "axios";
import {useState, useEffect} from 'react';

const sendRequestAxios = async (signal: AbortSignal) => {
  return axios("http://localhost:4000", {
    signal,
    headers: {
      "X-Custom-Header": "Foo"
    }
  });
}

const sendRequestFetch = async (signal: AbortSignal) => {
  return fetch("http://localhost:4000", {
    method: "GET",
    signal,
    headers: {
      "X-Custom-Header": "Foo"
    }
  });
}

function App() {
  const [requestStatus, setRequestStatus] = useState("not started");
  const [ctrl] = useState(new AbortController());

  useEffect( () => {
    async function request() {
      setRequestStatus("started");
      await sendRequestAxios(ctrl.signal)
        .then(() => {
          setRequestStatus("success");
        })
        .catch(err => {
          setRequestStatus("error: " + err.message);
        })
    }
    request();
  }, [ctrl]);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Request status: {requestStatus}
        </p>
        <button style={{backgroundColor: 'lightgray', width: 100, height: 60, fontSize: 13, borderRadius: 4}} onClick={() => ctrl.abort()}>Abort Request</button>
      </header>
    </div>
  );
}

export default App;
