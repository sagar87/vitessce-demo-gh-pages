import React, { Component, Suspense } from "react";
import { VitessceConfig } from "vitessce";
import { DataType as dt } from "vitessce";
import { FileType as ft } from "vitessce";
import { ViewType as vt } from "vitessce";
const Vitessce = React.lazy(() => import("./VitessceWrapper"));

class Viewer extends Component {
  state = {
    config: {},
  };

  componentDidMount() {
    const vc = new VitessceConfig({
      schemaVersion: "1.0.15",
      name: "My config",
    });
    const dataset = vc.addDataset(this.props.sample).addFile({
      url: "http://localhost:9000/" + this.props.sample,
      fileType: ft.IMAGE_OME_TIFF,
    });
    const v1 = vc.addView(dataset, vt.SPATIAL, { w: 12 });

    this.setState({ config: vc.toJSON() });
  }

  handleSampleSelect = (sample) => {
    const vc = new VitessceConfig({
      schemaVersion: "1.0.15",
      name: "My config",
    });
    const dataset = vc.addDataset(this.props.sample).addFile({
      url: "http://localhost:9000/" + this.props.sample,
      fileType: ft.IMAGE_OME_TIFF,
    });
    const v1 = vc.addView(dataset, vt.SPATIAL, { w: 12 });

    this.setState({ config: vc.toJSON() });
  };

  render() {
    // const sample = this.handleSampleSelect(this.props.sample);
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Vitessce config={this.state.config} theme="light" />
      </Suspense>
    );
  }
}

export default Viewer;
