import React, { Component, Suspense } from "react";

import { VitessceConfig, hconcat, vconcat } from "vitessce";
import { DataType as dt } from "vitessce";
import { FileType as ft } from "vitessce";
import { ViewType as vt } from "vitessce";
const Vitessce = React.lazy(() => import("./VitessceWrapper"));

class Viewer extends Component {
  createConfig = () => {
    const url = `https://s3.embl.de/voehring/bnhl/${this.props.match.params.sample}`;
    console.log(url);
    console.log(`http://localhost:9000/${this.props.match.params.sample}.zarr`);
    const vc = new VitessceConfig({
      schemaVersion: "1.0.15",
      name: "My config",
    });

    // const dataset = vc.addDataset("my-visium-dataset").addFile({
    //   url: "http://localhost:9000/V1_Human_Lymph_Node.zarr",
    //   dataType: dt.CELLS,
    //   fileType: ft.ANNDATA_CELLS_ZARR,
    //   options: {
    //     mappings: {
    //       UMAP: {
    //         key: "obsm/X_umap",
    //         dims: [0, 1],
    //       },
    //       PCA: {
    //         key: "obsm/X_pca",
    //         dims: [0, 1],
    //       },
    //     },
    //   },
    // });
    // const [ET1, ET2] = vc.addCoordination("embeddingType", "embeddingType");
    // ET1.setValue("PCA");
    // ET2.setValue("UMAP");
    // const pcaPlot = vc.addView(dataset, vt.SCATTERPLOT).useCoordination(ET1);
    // const umapPlot = vc.addView(dataset, vt.SCATTERPLOT).useCoordination(ET2);
    // vc.layout(hconcat(pcaPlot, umapPlot));

    const dataset = vc.addDataset(this.props.match.params.sample).addFile({
      url: `http://localhost:9000/${this.props.match.params.sample}.ome.tiff`,
      fileType: ft.IMAGE_OME_TIFF,
    });

    const anndata = vc
      .addDataset(`${this.props.match.params.sample}.zarr`)
      .addFile({
        url: `http://localhost:9000/${this.props.match.params.sample}.zarr`,
        dataType: dt.CELLS,
        fileType: ft.ANNDATA_CELLS_ZARR,
        // coordinationValues: { obsType: "cell", embeddingType: "UMAP" },
        options: {
          mappings: {
            UMAP: {
              key: "obsm/X_umap",
              dims: [0, 1],
            },
          },
        },
      });

    const [et1] = vc.addCoordination("embeddingType");
    et1.setValue("UMAP");

    const spatial = vc.addView(dataset, vt.SPATIAL, { x: 0, y: 0, w: 9, h: 9 });
    const spatialControl = vc.addView(dataset, vt.LAYER_CONTROLLER, {
      x: 9,
      y: 0,
      w: 3,
      h: 8,
    });
    // vc.addView(dataset, vt.SCATTERPLOT, { mapping: "UMAP" });
    const umapPlot = vc.addView(anndata, vt.SCATTERPLOT, { mapping: "UMAP" });
    vc.layout(vconcat(hconcat(spatial, spatialControl), umapPlot));
    // console.log(vc.toJSON());
    return vc.toJSON();
  };

  render() {
    // const sample = this.handleSampleSelect(this.props.sample);
    console.log(this.props.match.params);
    console.log(this.props);
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
