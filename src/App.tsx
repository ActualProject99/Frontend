import React from "react";
import logo from "./logo.svg";
import "./App.css";
if (process.env.NODE_ENV === "production") {
  console.log = function no_console() {};
  console.warn = function no_console() {};
}
function App() {
  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
}

export default App;
