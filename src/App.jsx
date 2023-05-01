import { Canvas, extend } from "@react-three/fiber";
import Overlay from "./components/overlay/Overlay";
import { shaderMaterial } from "@react-three/drei";

import moveShaderFragment from "./shaders/move/fragment.glsl";
import moveShaderVertex from "./shaders/move/vertex.glsl";

const MoveMaterial = shaderMaterial({}, moveShaderVertex, moveShaderFragment);

extend({ MoveMaterial });

const App = () => {
  return (
    <>
      <Overlay />
      <Canvas>
        <mesh>
          <planeGeometry />
          <moveMaterial />
        </mesh>
      </Canvas>
    </>
  );
};

export default App;
