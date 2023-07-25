import React, { Suspense } from "react";
const Vitessce = React.lazy(() => import("./VitessceWrapper"));

export default function Viewer(props) {
  const { config } = props;
  //   console.log(config);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Vitessce config={config} theme="light" />
    </Suspense>
  );
  
}
