import { useHelper } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect, useRef } from "react";

import * as THREE from "three";

const Lighting = () => {
  const pointLightRef = useRef();
  const directionalLightRef = useRef();

  const { color } = useControls({ color: "white" });

  useHelper(directionalLightRef, THREE.DirectionalLightHelper);

  return (
    <>
      <directionalLight
        ref={directionalLightRef}
        castShadow
        position={[4, 0, 5]}
        shadow-mapSize={2048}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      ></directionalLight>

      <ambientLight color="purple" intensity={0.5} />
    </>
  );
};

export default Lighting;
