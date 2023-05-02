import { useHelper } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect, useRef } from "react";

import * as THREE from "three";

const Lighting = () => {
  const pointLightRef = useRef();
  const directionalLightRef = useRef();

  useHelper(directionalLightRef, THREE.DirectionalLightHelper);
  useHelper(pointLightRef, THREE.PointLightHelper);

  return (
    <>
      <directionalLight
        ref={directionalLightRef}
        castShadow
        position={[4, 0, 1]}
        shadow-mapSize={2048}
        shadow-camera-top={15}
        shadow-camera-right={15}
        shadow-camera-bottom={-15}
        shadow-camera-left={-15}
      ></directionalLight>

      <ambientLight color={"#70008c"} intensity={0.5} />
    </>
  );
};

export default Lighting;
