import { useEffect, useMemo, useRef } from "react";
import { useGLTF, useAnimations, Mask, useMask } from "@react-three/drei";

import * as THREE from "three";
import { subclip } from "three/src/animation/AnimationUtils";

const Dragon = (props) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/dragon.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions["Head Action"].setLoop(THREE.LoopOnce);
    actions["Legs Action"].setLoop(THREE.LoopOnce);
    actions["Key.001Action.001"].setLoop(THREE.LoopOnce);
    actions["Key.002Action"].setLoop(THREE.LoopOnce);

    void actions["Head Action"].play();
    void actions["Legs Action"].play();

    void actions["Key.001Action.001"].play();
    void actions["Key.002Action"].play();
  }, []);

  const stencil = useMask(1);
  const stencil2 = useMask(2);
  const materialMask = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        ...stencil,
      }),
    []
  );
  const materialMask2 = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        ...stencil2,
      }),
    []
  );

  return (
    <group ref={group} {...props} dispose={null}>
      <Mask id={1} colorWrite scale={5} position={[0, 0, 0]}>
        <planeGeometry />
        <meshBasicMaterial color={"red"} />
      </Mask>

      <Mask id={2} colorWrite scale={5} position={[0, 0, 2]}>
        <planeGeometry />
        <meshBasicMaterial color={"blue"} />
      </Mask>
      <group name="Scene">
        <mesh
          name="Head"
          geometry={nodes.Head.geometry}
          material={materialMask2}
          position={[0, 0, 1.32]}
          rotation={[0.24, -0.77, 0.17]}
          scale={0.62}
        >
          <mesh
            name="Bottom_Hair001"
            geometry={nodes.Bottom_Hair001.geometry}
            material={nodes.Bottom_Hair001.material}
            rotation={[-Math.PI / 2, 0, Math.PI / 2]}
            scale={1.86}
          />
          <mesh
            name="Ears"
            geometry={nodes.Ears.geometry}
            material={nodes.Ears.material}
            position={[-1, -0.05, 0.93]}
            rotation={[-0.17, 0.79, 0]}
            scale={1.61}
          />
          <mesh
            name="Eyes"
            geometry={nodes.Eyes.geometry}
            material={nodes.Eyes.material}
            rotation={[0.3, 0.35, -1.65]}
            scale={0.24}
          />
          <mesh
            name="Horns001"
            geometry={nodes.Horns001.geometry}
            material={nodes.Horns001.material}
            scale={1.86}
          />
          <mesh
            name="Left_Hair001"
            geometry={nodes.Left_Hair001.geometry}
            material={nodes.Left_Hair001.material}
            rotation={[-1.51, 1.48, 1.06]}
            scale={1.86}
          />
          <mesh
            name="Mustache"
            geometry={nodes.Mustache.geometry}
            material={nodes.Mustache.material}
            rotation={[0.96, 1.19, -1.6]}
            scale={0.61}
          />
          <mesh
            name="Left_Hair"
            geometry={nodes.Left_Hair.geometry}
            material={nodes.Left_Hair.material}
            rotation={[-1.91, 1.23, 0.71]}
            scale={1.6}
          />
          <mesh
            name="Horns"
            geometry={nodes.Horns.geometry}
            material={nodes.Horns.material}
            position={[-1.5, -0.26, -1.47]}
            rotation={[-0.17, 0.79, 0]}
            scale={1.61}
          />
          <mesh
            name="NurbsPath006"
            geometry={nodes.NurbsPath006.geometry}
            material={nodes.NurbsPath006.material}
            rotation={[-1.26, 0.99, 0.82]}
            scale={1.6}
          />
          <mesh
            name="Bottom_Hair"
            geometry={nodes.Bottom_Hair.geometry}
            material={nodes.Bottom_Hair.material}
            rotation={[-1.56, 0, 1.57]}
            scale={1.86}
          />
          <mesh
            name="Right_Hair"
            geometry={nodes.Right_Hair.geometry}
            material={nodes.Right_Hair.material}
            rotation={[2.67, -1.57, 0]}
            scale={1.86}
          />
          <mesh
            name="Right_hair"
            geometry={nodes.Right_hair.geometry}
            material={nodes.Right_hair.material}
            rotation={[2.67, -1.57, 0]}
            scale={1.86}
          />
          <mesh
            name="Right_Hair001"
            geometry={nodes.Right_Hair001.geometry}
            material={nodes.Right_Hair001.material}
            rotation={[2.67, -1.57, 0]}
            scale={1.86}
          />
          <mesh
            name="Top_Hair"
            geometry={nodes.Top_Hair.geometry}
            material={nodes.Top_Hair.material}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
            scale={1.86}
          />
          <mesh
            name="Top_Hair001"
            geometry={nodes.Top_Hair001.geometry}
            material={nodes.Top_Hair001.material}
            rotation={[Math.PI / 2, 0.5, -Math.PI / 2]}
            scale={1.86}
          />
        </mesh>
        <mesh
          name="Legs"
          geometry={nodes.Legs.geometry}
          material={materialMask}
          position={[1.96, 0.59, -0.93]}
          rotation={[0.27, -0.58, 0.19]}
        />
        <mesh
          name="Body_Spine"
          geometry={nodes.Body_Spine.geometry}
          morphTargetDictionary={nodes.Body_Spine.morphTargetDictionary}
          morphTargetInfluences={nodes.Body_Spine.morphTargetInfluences}
        >
          <meshStandardMaterial side={THREE.DoubleSide} />
        </mesh>
        <mesh
          name="Body"
          geometry={nodes.Body.geometry}
          material={materialMask}
          morphTargetDictionary={nodes.Body.morphTargetDictionary}
          morphTargetInfluences={nodes.Body.morphTargetInfluences}
        />
      </group>
    </group>
  );
};

useGLTF.preload("/dragon.glb");

export default Dragon;
