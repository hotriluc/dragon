import { Canvas } from "@react-three/fiber";
import Overlay from "./components/overlay/Overlay";
import { OrbitControls, SoftShadows } from "@react-three/drei";

import Dragon from "./components/scene/Dragon";
import Lighting from "./components/scene/Lighting";

const App = () => {
  return (
    <>
      <Overlay />
      <Canvas shadows camera={{ position: [-1.5, 2.5, 12] }}>
        <OrbitControls zoomSpeed={0.5} />

        <SoftShadows size={60} focus={20} samples={8} />
        <Lighting />
        <Dragon />
      </Canvas>
    </>
  );
};

export default App;
