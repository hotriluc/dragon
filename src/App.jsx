import { Canvas, extend } from "@react-three/fiber";
import Overlay from "./components/overlay/Overlay";
import { OrbitControls, SoftShadows } from "@react-three/drei";

import Dragon from "./components/scene/Dragon";
import Lighting from "./components/scene/Lighting";

const App = () => {
  return (
    <>
      <Overlay />
      <Canvas shadows camera={{ position: [-1.5, 2, 15] }}>
        {/* <Perf /> */}

        <OrbitControls />

        <SoftShadows size={60} focus={20} samples={8} />
        <Lighting />
        <Dragon />
      </Canvas>
    </>
  );
};

export default App;
