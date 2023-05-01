import { Canvas, extend } from "@react-three/fiber";
import Overlay from "./components/overlay/Overlay";
import {
  Center,
  OrbitControls,
  ScrollControls,
  shaderMaterial,
} from "@react-three/drei";

import moveShaderFragment from "./shaders/move/fragment.glsl";
import moveShaderVertex from "./shaders/move/vertex.glsl";
import Dragon from "./components/scene/Dragon";
import { Perf } from "r3f-perf";

const MoveMaterial = shaderMaterial({}, moveShaderVertex, moveShaderFragment);

extend({ MoveMaterial });

const App = () => {
  return (
    <>
      <Overlay />
      <Canvas camera={{ position: [-5.5, 1.5, 9] }}>
        {/* <Perf /> */}
        <OrbitControls />
        <ambientLight />
        <directionalLight />
        <Dragon />
      </Canvas>
    </>
  );
};

export default App;
