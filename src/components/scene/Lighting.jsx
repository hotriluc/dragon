import { useHelper } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect, useRef } from "react";

import * as THREE from "three";

const Lighting = () => {
  const pointLightRef = useRef();
  const directionalLightRef = useRef();

  const { color } = useControls({ color: "#70008c" });

  useHelper(directionalLightRef, THREE.DirectionalLightHelper);

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

      <ambientLight color={color} intensity={0.5} />
    </>
  );
};

export default Lighting;
