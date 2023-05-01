import { Canvas, extend } from "@react-three/fiber";
import Overlay from "./components/overlay/Overlay";
import {
  Center,
  OrbitControls,
  ScrollControls,
  SoftShadows,
  shaderMaterial,
} from "@react-three/drei";

import Dragon from "./components/scene/Dragon";
import { Perf } from "r3f-perf";
import Lighting from "./components/scene/Lighting";

const App = () => {
  return (
    <>
      <Overlay />
      <Canvas camera={{ position: [-5.5, 1.5, 9] }}>
        {/* <Perf /> */}
        <OrbitControls />

        {/* <SoftShadows size={100} focus={20} samples={8} /> */}
        <Lighting />

        <Dragon />
      </Canvas>
    </>
  );
};

export default App;
