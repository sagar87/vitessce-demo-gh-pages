import React from "react";
import { Vitessce } from "vitessce";
import Movies from "./components/movies";
import Counters from "./components/counters";
import { myViewConfig } from "./my-view-config";

export default function App() {
  return (
    <main role="main" className="container-fluid">
      <h1>Hello World</h1>
      <Counters />
      <Movies />
      {/* <Vitessce config={myViewConfig} theme="light" /> */}
    </main>
  );
}
