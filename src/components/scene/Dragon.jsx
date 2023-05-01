import { useEffect, useMemo, useRef } from "react";
import { useGLTF, useAnimations, Mask, useMask } from "@react-three/drei";

import * as THREE from "three";
import { useControls } from "leva";

const Dragon = (props) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/dragon.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // actions["Head Action"].setLoop(THREE.LoopOnce);
    // actions["Legs Action"].setLoop(THREE.LoopOnce);
    // actions["Key.001Action.001"].setLoop(THREE.LoopOnce);
    // actions["Key.002Action"].setLoop(THREE.LoopOnce);
    // void actions["Head Action"].play();
    // void actions["Legs Action"].play();
    // void actions["Key.001Action.001"].play();
    // void actions["Key.002Action"].play();
  }, []);

  const { redMaskColor, blueMaskColor } = useControls("mask", {
    redMaskColor: "red",
    blueMaskColor: "blue",
  });

  const { hairColor, eyesColor, bodyColor } = useControls("dragon", {
    hairColor: "#101010",
    eyesColor: "yellow",
    bodyColor: "#ffffff",
  });

  const stencil = useMask(1);
  const stencil2 = useMask(2);

  // Mesh with this material will have stencil with red color
  const materiaRedMask = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        ...stencil,
      }),
    []
  );

  // Mesh with this material will have stencil with blue color
  const materialBlueMask = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        ...stencil2,
      }),
    []
  );

  // No mask applied to this material
  const materialNoMask = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#101010" }),
    []
  );

  return (
    <group ref={group} {...props} dispose={null}>
      <Mask id={1} colorWrite scale={3} position={[0, 2, 0]}>
        <circleGeometry />
        <meshBasicMaterial color={redMaskColor} />
      </Mask>

      <Mask id={2} colorWrite scale={3} position={[0, 0, 3]}>
        <circleGeometry />
        <meshBasicMaterial color={blueMaskColor} />
      </Mask>
      <group name="Scene">
        <mesh
          name="Head"
          geometry={nodes.Head.geometry}
          material={materialBlueMask}
          position={[0, 0, 1.32]}
          rotation={[0.24, -0.77, 0.17]}
          scale={0.62}
        >
          <mesh
            name="Bottom_Hair001"
            geometry={nodes.Bottom_Hair001.geometry}
            material={materialNoMask}
            material-color={hairColor}
            rotation={[-Math.PI / 2, 0, Math.PI / 2]}
            scale={1.86}
          />
          <mesh
            name="Ears"
            geometry={nodes.Ears.geometry}
            material={materialNoMask}
            position={[-1, -0.05, 0.93]}
            rotation={[-0.17, 0.79, 0]}
            scale={1.61}
          />
          <mesh
            name="Eyes"
            geometry={nodes.Eyes.geometry}
            rotation={[0.3, 0.35, -1.65]}
            scale={0.24}
          >
            <meshStandardMaterial color={eyesColor} />
          </mesh>
          <mesh
            name="Horns001"
            geometry={nodes.Horns001.geometry}
            material={materialNoMask}
            scale={1.86}
          />
          <mesh
            name="Left_Hair001"
            geometry={nodes.Left_Hair001.geometry}
            material={materialNoMask}
            rotation={[-1.51, 1.48, 1.06]}
            scale={1.86}
          />
          <mesh
            name="Mustache"
            geometry={nodes.Mustache.geometry}
            material={materialNoMask}
            rotation={[0.96, 1.19, -1.6]}
            scale={0.61}
          />
          <mesh
            name="Left_Hair"
            geometry={nodes.Left_Hair.geometry}
            material={materialNoMask}
            rotation={[-1.91, 1.23, 0.71]}
            scale={1.6}
          />
          <mesh
            name="Horns"
            geometry={nodes.Horns.geometry}
            material={materialNoMask}
            position={[-1.5, -0.26, -1.47]}
            rotation={[-0.17, 0.79, 0]}
            scale={1.61}
          />
          <mesh
            name="NurbsPath006"
            geometry={nodes.NurbsPath006.geometry}
            material={materialNoMask}
            rotation={[-1.26, 0.99, 0.82]}
            scale={1.6}
          />
          <mesh
            name="Bottom_Hair"
            geometry={nodes.Bottom_Hair.geometry}
            material={materialNoMask}
            rotation={[-1.56, 0, 1.57]}
            scale={1.86}
          />
          <mesh
            name="Right_Hair"
            geometry={nodes.Right_Hair.geometry}
            material={materialNoMask}
            rotation={[2.67, -1.57, 0]}
            scale={1.86}
          />
          <mesh
            name="Right_hair"
            geometry={nodes.Right_hair.geometry}
            material={materialNoMask}
            rotation={[2.67, -1.57, 0]}
            scale={1.86}
          />
          <mesh
            name="Right_Hair001"
            geometry={nodes.Right_Hair001.geometry}
            material={materialNoMask}
            rotation={[2.67, -1.57, 0]}
            scale={1.86}
          />
          <mesh
            name="Top_Hair"
            geometry={nodes.Top_Hair.geometry}
            material={materialNoMask}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
            scale={1.86}
          />
          <mesh
            name="Top_Hair001"
            geometry={nodes.Top_Hair001.geometry}
            material={materialNoMask}
            rotation={[Math.PI / 2, 0.5, -Math.PI / 2]}
            scale={1.86}
          />
        </mesh>
        <mesh
          name="Legs"
          geometry={nodes.Legs.geometry}
          material={materiaRedMask}
          position={[1.96, 0.59, -0.93]}
          rotation={[0.27, -0.58, 0.19]}
        />
        <mesh
          name="Body_Spine"
          castShadow
          geometry={nodes.Body_Spine.geometry}
          morphTargetDictionary={nodes.Body_Spine.morphTargetDictionary}
          morphTargetInfluences={nodes.Body_Spine.morphTargetInfluences}
        >
          <meshStandardMaterial side={THREE.DoubleSide} color={"#101010"} />
        </mesh>
        <mesh
          name="Body"
          geometry={nodes.Body.geometry}
          material={materiaRedMask}
          material-color={bodyColor}
          morphTargetDictionary={nodes.Body.morphTargetDictionary}
          morphTargetInfluences={nodes.Body.morphTargetInfluences}
        />
      </group>
    </group>
  );
};

useGLTF.preload("/dragon.glb");

export default Dragon;
