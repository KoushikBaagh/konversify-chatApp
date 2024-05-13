import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Chatpage from "./pages/Chatpage";
import Roompage from "./pages/Roompage";

// import Button from "@mui/material/Button";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Homepage} />
      <Route exact path="/chats" component={Chatpage} />
      <Route exact path="/room/:roomId" component={Roompage} />
    </div>
  );
}

export default App;
