import React, { Component } from "react";
import { Vitessce } from "vitessce";
import { VitessceConfig } from "vitessce";
import { DataType as dt } from "vitessce";
import { FileType as ft } from "vitessce";
import { ViewType as vt } from "vitessce";

import Movies from "./components/movies";
import Counters from "./components/counters";
import NavBar from "./components/navbar";
import { myViewConfig } from "./my-view-config";
import Viewer from "./components/viewer";
import ListGroup from "./components/listGroup";

class App extends Component {
  state = {
    samples: [],
    config: {},
  };
  componentDidMount() {
    const vc = new VitessceConfig({
      schemaVersion: "1.0.15",
      name: "My config",
    });
    const dataset = vc.addDataset("166_1_C4_CLL_pyramid.ome.tiff").addFile({
      url: "http://localhost:9000/" + "166_1_C4_CLL_pyramid.ome.tiff",
      fileType: ft.IMAGE_OME_TIFF,
    });
    const v1 = vc.addView(dataset, vt.SPATIAL, { w: 12 });

    console.log(vc.toJSON());

    this.setState({
      samples: [
        "166_1_I1_LK_pyramid.ome.tiff",
        "166_4_I2_KL.ome.tif",
        "166_1_C4_CLL_pyramid.ome.tiff",
      ],
      config: vc.toJSON(),
    });
  }
  handleSampleSelect = (sample) => {
    // const config = { ...this.state.config };
    // config.datasets[0].files[0].url = "http://localhost:9000/" + sample;
    // console.log("handle Sample select", sample);
    // console.log(config);

    const vc = new VitessceConfig({
      schemaVersion: "1.0.15",
      name: "My config",
    });
    const dataset = vc.addDataset(sample).addFile({
      url: "http://localhost:9000/" + sample,
      fileType: ft.IMAGE_OME_TIFF,
    });
    const v1 = vc.addView(dataset, vt.SPATIAL, { w: 12 });

    this.setState({ selectedSample: sample, config: vc.toJSON() });
  };
  handleConfigChange = (data) => {
    // console.log("this config change", data);
  };

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main role="main" className="container-fluid">
          {/* <Counters /> */}
          {/* <Movies /> */}
          <div className="row">
            <nav className="col-md-0 d-none d-md-block bg-light sidebar">
              <div className="sidebar-sticky">
                <ListGroup
                  items={this.state.samples}
                  selectedItem={this.state.selectedItem}
                  onItemSelect={this.handleSampleSelect}
                />
              </div>
            </nav>
            <div className="col">
              {/* <Viewer config={this.state.config} theme="light" /> */}

              {/* <Vitessce
                onConfigChange={this.handleConfigChange}
                config={this.state.config}
                theme="light"
                debug={true}
              /> */}
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
