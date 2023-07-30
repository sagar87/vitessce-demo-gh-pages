import React, { Component, Suspense } from "react";

import { VitessceConfig } from "vitessce";

import { FileType as ft } from "vitessce";
import { ViewType as vt } from "vitessce";
const Vitessce = React.lazy(() => import("./VitessceWrapper"));

class Viewer extends Component {
  createConfig = () => {
    const url = `https://s3.embl.de/voehring/bnhl/${this.props.match.params.sample}`;
    console.log(url);
    const vc = new VitessceConfig({
      schemaVersion: "1.0.15",
      name: "My config",
    });
    const dataset = vc.addDataset(this.props.match.params.sample).addFile({
      url: `http://localhost:9000/${this.props.match.params.sample}`,
      fileType: ft.IMAGE_OME_TIFF,
    });
    vc.addView(dataset, vt.SPATIAL, { x: 0, y: 0, w: 9, h: 12 });
    vc.addView(dataset, vt.LAYER_CONTROLLER, {
      x: 9,
      y: 0,
      w: 3,
      h: 8,
    });
    return vc.toJSON();
  };

  render() {
    // const sample = this.handleSampleSelect(this.props.sample);
    console.log(this.props.match.params.sample);
    // const config = myViewConfig[this.props.match.params.sample];
    const config = this.createConfig();
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Vitessce config={config} theme="light" />
      </Suspense>
    );
  }
}

export default Viewer;
