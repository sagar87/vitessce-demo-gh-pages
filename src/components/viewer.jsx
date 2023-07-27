import React, { Component, Suspense } from "react";
import { VitessceConfig } from "vitessce";
import { DataType as dt } from "vitessce";
import { FileType as ft } from "vitessce";
import { ViewType as vt } from "vitessce";
import { myViewConfig } from "./configs";
const Vitessce = React.lazy(() => import("./VitessceWrapper"));

class Viewer extends Component {
  render() {
    // const sample = this.handleSampleSelect(this.props.sample);
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Vitessce config={myViewConfig[this.props.sample]} theme="light" />
      </Suspense>
    );
  }
}

export default Viewer;
