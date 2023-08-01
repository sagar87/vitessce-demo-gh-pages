import React, { Component, Suspense } from "react";
// import { myViewConfig } from "./configs";

// import { VitessceConfig, hconcat, vconcat } from "vitessce";
// import { DataType as dt } from "vitessce";
// import { FileType as ft } from "vitessce";
// import { ViewType as vt } from "vitessce";
// import { CoordinationType as ct } from "vitessce";
const Vitessce = React.lazy(() => import("./VitessceWrapper"));
class Viewer extends Component {
  createConfig = () => {
    const config = {
      version: "1.0.15",
      name: `${this.props.match.params.sample}`,
      description: "",
      datasets: [
        {
          uid: "A",
          name: `${this.props.match.params.sample}`,
          files: [
            {
              fileType: "anndata.zarr",
              url: `https://s3.embl.de/voehring/bnhl_zarr/${this.props.match.params.sample}.zarr`,
              options: {
                obsEmbedding: [
                  { path: "obsm/X_umap", dims: [0, 1], embeddingType: "UMAP" },
                  { path: "obsm/X_pca", dims: [0, 1], embeddingType: "PCA" },
                  {
                    path: "obsm/X_spatial",
                    dims: [0, 1],
                    embeddingType: "SPATIAL",
                  },
                ],
                obsSets: [
                  { name: "Major", path: "obs/label" },
                  { name: "Subset", path: "obs/sub_1" },
                ],
                obsFeatureMatrix: { path: "X" },
              },
            },
            {
              fileType: "raster.json",
              options: {
                schemaVersion: "0.0.2",
                images: [
                  {
                    name: `${this.props.match.params.sample}`,
                    type: "ome-tiff",
                    url: `https://s3.embl.de/voehring/bnhl/${this.props.match.params.sample}.ome.tiff`,
                  },
                ],
              },
            },
          ],
        },
      ],
      coordinationSpace: {
        dataset: { A: "A" },
        embeddingType: { A: "UMAP", B: "SPATIAL" },
      },
      layout: [
        {
          component: "spatial",
          coordinationScopes: { dataset: "A" },
          x: 0.0,
          y: 0.0,
          w: 6.0,
          h: 6.0,
        },
        {
          component: "layerController",
          coordinationScopes: { dataset: "A" },
          x: 0.0,
          y: 3.0,
          w: 3.0,
          h: 3.0,
        },
        {
          component: "scatterplot",
          coordinationScopes: { dataset: "A", embeddingType: "A" },
          x: 0.0,
          y: 6.0,
          w: 6.0,
          h: 2.0,
        },
        {
          component: "scatterplot",
          coordinationScopes: { dataset: "A", embeddingType: "B" },
          x: 6.0,
          y: 0.0,
          w: 6.0,
          h: 6.0,
        },
        {
          component: "obsSets",
          coordinationScopes: { dataset: "A" },
          x: 3.0,
          y: 3.0,
          w: 3.0,
          h: 3.0,
        },
        {
          component: "featureList",
          coordinationScopes: { dataset: "A" },
          x: 6.0,
          y: 3.0,
          w: 6.0,
          h: 3.0,
        },
        {
          component: "heatmap",
          coordinationScopes: { dataset: "A" },
          x: 6.0,
          y: 6.0,
          w: 6.0,
          h: 2.0,
        },
      ],
      initStrategy: "auto",
    };
    return config;
  };
  // {
  // const config = {
  //   version: "1.0.15",
  //   name: "some",
  //   description: "",
  //   datasets: [
  //     {
  //       uid: "A",
  //       name: "k",
  //       files: [
  //         {
  //           fileType: "anndata.zarr",
  //           url: `http://localhost:9000/${this.props.match.params.sample}.zarr`,
  //           options: {
  //             obsEmbedding: [
  //               { path: "obsm/X_umap", dims: [0, 1], embeddingType: "UMAP" },
  //               { path: "obsm/X_pca", dims: [0, 1], embeddingType: "PCA" },
  //               {
  //                 path: "obsm/X_spatial",
  //                 dims: [1, 0],
  //                 embeddingType: "SPATIAL",
  //               },
  //             ],
  //             obsSets: [{ name: "Gated", path: "obs/label" }],
  //             obsFeatureMatrix: { path: "X" },
  //           },
  //         },
  //         {
  //           fileType: "raster.json",
  //           type: "raster",
  //           options: {
  //             schemaVersion: "0.0.2",
  //             images: [
  //               {
  //                 name: `${this.props.match.params.sample}`,
  //                 type: "ome-tiff",
  //                 url: `https://s3.embl.de/voehring/bnhl/${this.props.match.params.sample}.ome.tiff`, //http://localhost:9000/
  //               },
  //             ],
  //           },
  //         },
  //       ],
  //     },
  //   ],
  //   coordinationSpace: {
  //     spatialImageLayer: {
  //       A: [
  //         {
  //           type: "raster",
  //           index: 1,
  //           visible: true,
  //           colormap: null,
  //           opacity: 1,
  //           domainType: "Min/Max",
  //           transparentColor: null,
  //           renderingMode: "Additive",
  //           use3d: false,
  //           channels: [
  //             {
  //               selection: {
  //                 channel: "DAPI",
  //               },
  //               color: [255, 0, 0],
  //               visible: true,
  //               slider: [20, 255],
  //             },
  //             // {
  //             //   selection: {
  //             //     channel: 1,
  //             //   },
  //             //   color: [255, 0, 0],
  //             //   visible: true,
  //             //   slider: [75, 255],
  //             // },
  //             // {
  //             //   selection: {
  //             //     channel: 2,
  //             //   },
  //             //   color: [255, 0, 0],
  //             //   visible: true,
  //             //   slider: [17, 255],
  //             // },
  //             // {
  //             //   selection: {
  //             //     channel: 3,
  //             //   },
  //             //   color: [255, 0, 0],
  //             //   visible: true,
  //             //   slider: [21, 255],
  //             // },
  //           ],
  //         },
  //       ],
  //     },
  //     dataset: { A: "A" },
  //     embeddingType: { A: "UMAP", B: "SPATIAL" },
  //   },
  //   layout: [
  //     {
  //       component: "spatial",
  //       coordinationScopes: {
  //         dataset: "A",
  //         // spatialImageLayer: "A",
  //       },
  //       x: 0.0,
  //       y: 0.0,
  //       w: 6.0,
  //       h: 4.0,
  //     },
  //     {
  //       component: "layerController",
  //       coordinationScopes: { dataset: "A" }, //spatialImageLayer: "A"
  //       x: 6.0,
  //       y: 0.0,
  //       w: 6.0,
  //       h: 4.0,
  //     },
  //     {
  //       component: "scatterplot",
  //       coordinationScopes: { dataset: "A", embeddingType: "A" },
  //       x: 0.0,
  //       y: 6.0,
  //       w: 6.0,
  //       h: 4.0,
  //     },
  //     {
  //       component: "scatterplot",
  //       coordinationScopes: { dataset: "A", embeddingType: "B" },
  //       x: 0.0,
  //       y: 3.0,
  //       w: 3.0,
  //       h: 4.0,
  //     },
  //     {
  //       component: "obsSets",
  //       coordinationScopes: { dataset: "A" },
  //       x: 3.0,
  //       y: 3.0,
  //       w: 3.0,
  //       h: 4.0,
  //     },
  //     {
  //       component: "featureList",
  //       coordinationScopes: { dataset: "A" },
  //       x: 6.0,
  //       y: 3.0,
  //       w: 6.0,
  //       h: 4.0,
  //     },
  //     {
  //       component: "heatmap",
  //       coordinationScopes: { dataset: "A" },
  //       x: 6.0,
  //       y: 6.0,
  //       w: 6.0,
  //       h: 4.0,
  //     },
  //   ],
  //   initStrategy: "auto",
  // };

  // const url = `https://s3.embl.de/voehring/bnhl/${this.props.match.params.sample}`;
  // console.log(url);
  // console.log(`http://localhost:9000/${this.props.match.params.sample}.zarr`);
  // const vc = new VitessceConfig({
  //   schemaVersion: "1.0.15",
  //   name: "My config",
  // });

  // // const dataset = vc.addDataset("my-visium-dataset").addFile({
  // //   url: "http://localhost:9000/V1_Human_Lymph_Node.zarr",
  // //   dataType: dt.CELLS,
  // //   fileType: ft.ANNDATA_CELLS_ZARR,
  // //   options: {
  // //     mappings: {
  // //       UMAP: {
  // //         key: "obsm/X_umap",
  // //         dims: [0, 1],
  // //       },
  // //       PCA: {
  // //         key: "obsm/X_pca",
  // //         dims: [0, 1],
  // //       },
  // //     },
  // //   },
  // // });
  // // const [ET1, ET2] = vc.addCoordination("embeddingType", "embeddingType");
  // // ET1.setValue("PCA");
  // // ET2.setValue("UMAP");
  // // const pcaPlot = vc.addView(dataset, vt.SCATTERPLOT).useCoordination(ET1);
  // // const umapPlot = vc.addView(dataset, vt.SCATTERPLOT).useCoordination(ET2);
  // // vc.layout(hconcat(pcaPlot, umapPlot));

  // const dataset = vc
  //   .addDataset(this.props.match.params.sample)
  //   .addFile({
  //     url: `http://localhost:9000/${this.props.match.params.sample}.ome.tiff`,
  //     fileType: ft.IMAGE_OME_TIFF,
  //   })
  //   .addFile({
  //     url: `http://localhost:9000/${this.props.match.params.sample}.zarr`,
  //     // dataType: dt.CELLS,
  //     fileType: ft.ANNDATA_ZARR,
  //     // coordinationValues: {
  //     //   obsType: "cell",
  //     //   featureType: "gene",
  //     //   featureValueType: "expression",
  //     //   // embeddingType: "UMAP",
  //     // },
  //     options: {
  //       obsFeatureMatrix: {
  //         path: "X",
  //       },
  //       obsEmbedding: [
  //         {
  //           path: "obsm/X_umap",
  //           embeddingType: "UMAP",
  //           dims: [0, 1],
  //         },
  //       ],
  //       obsSets: [
  //         {
  //           name: "Cell Type",
  //           path: ["obs/label"],
  //         },
  //       ],
  //     },
  //   });

  // const [et1] = vc.addCoordination(ct.EMBEDDING_TYPE);
  // et1.setValue("UMAP");
  // // et2.setValue(100);
  // // et3.setValue(true);
  // // et5.setValue("cell");
  // // console.log(et1, et5);

  // const spatial = vc.addView(dataset, vt.SPATIAL);
  // const spatialControl = vc.addView(dataset, vt.LAYER_CONTROLLER);
  // // vc.addView(dataset, vt.SCATTERPLOT, { mapping: "UMAP" });
  // const umapPlot = vc.addView(dataset, vt.SCATTERPLOT, { mapping: "UMAP" });

  // const obsSet = vc.addView(dataset, vt.OBS_SETS);

  // vc.layout(
  //   vconcat(hconcat(spatial, spatialControl), hconcat(umapPlot, obsSet))
  // );
  // console.log(vc.toJSON());
  // return  vc.toJSON();
  //   return config;
  // };

  render() {
    // const sample = this.handleSampleSelect(this.props.sample);
    // console.log(this.props.match.params);
    // console.log(this.props);
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
