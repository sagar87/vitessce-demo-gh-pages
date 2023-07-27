import React, { Component, Suspense } from "react";
import { myViewConfig } from "./configs";
const Vitessce = React.lazy(() => import("./VitessceWrapper"));

class Viewer extends Component {
  render() {
    // const sample = this.handleSampleSelect(this.props.sample);
    console.log(this.props.match.params.sample);
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Vitessce
          config={myViewConfig[this.props.match.params.sample]}
          theme="light"
        />
      </Suspense>
    );
  }
}

export default Viewer;
