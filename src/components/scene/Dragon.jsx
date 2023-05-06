import { useEffect, useMemo, useRef } from "react";
import {
  useGLTF,
  useAnimations,
  Mask,
  useMask,
  shaderMaterial,
} from "@react-three/drei";

import * as THREE from "three";
import { useControls } from "leva";

import moonVertexShader from "../../shaders/moon/vertex.glsl";
import moonFragmentShader from "../../shaders/moon/fragment.glsl";
import { extend, useFrame } from "@react-three/fiber";
import { subclip } from "three/src/animation/AnimationUtils";
import { lerp } from "three/src/math/MathUtils";

const MoonMaterial = shaderMaterial(
  {
    uTime: 0.0,
    uBaseColor: new THREE.Color("#ff3145"),
    uMixColor: new THREE.Color("blue"),
  },
  moonVertexShader,
  moonFragmentShader
);
extend({ MoonMaterial });

const Dragon = (props) => {
  const group = useRef();
  const { nodes, animations } = useGLTF("/dragon.glb");
  const { actions } = useAnimations(animations, group);

  const redMaskRef = useRef();
  const blueMaskRef = useRef();
  const redMoonMaterialRef = useRef();
  const blueMoonMaterialRef = useRef();

  useFrame((state, delta) => {
    const et = state.clock.getElapsedTime();

    redMoonMaterialRef.current.uTime = et;
    blueMoonMaterialRef.current.uTime = et;

    redMaskRef.current.scale.x = lerp(redMaskRef.current.scale.x, 3.0, 0.02);
    redMaskRef.current.scale.y = lerp(redMaskRef.current.scale.y, 3.0, 0.02);

    blueMaskRef.current.scale.x = lerp(blueMaskRef.current.scale.x, 3.0, 0.02);
    blueMaskRef.current.scale.y = lerp(blueMaskRef.current.scale.y, 3.0, 0.02);
  });

  useEffect(() => {
    actions["Head Action"].setLoop(THREE.LoopOnce);
    actions["Legs Action"].setLoop(THREE.LoopOnce);
    actions["Key.001Action.001"].setLoop(THREE.LoopOnce);
    actions["Key.002Action"].setLoop(THREE.LoopOnce);

    // Subclip to stop animations bellow on specific frame
    const spineClip = subclip(
      actions["Key.001Action.001"]._clip,
      "spineClip",
      0,
      300
    );

    console.log(spineClip);
    actions["Key.001Action.001"]._clip = spineClip;

    const bodyClip = subclip(
      actions["Key.002Action"]._clip,
      "bodyClip",
      0,
      300
    );
    actions["Key.002Action"]._clip = bodyClip;

    void actions["Head Action"].play();
    void actions["Legs Action"].play();
    void actions["Key.001Action.001"].play();
    void actions["Key.002Action"].play();
  }, []);

  const stencil = useMask(1);
  const stencil2 = useMask(2);

  // Mesh with this material will be masked with stencil of red color
  const materiaRedMask = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        ...stencil,
      }),
    []
  );

  // Mesh with this material will be masked with stencil of blue color
  const materialBlueMask = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        ...stencil2,
      }),
    []
  );

  // No mask applied to this material
  const materialNoMask = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#ffffff" }),
    []
  );

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Masks red and blue 
        we apply custom material to our geometry
      */}
      <Mask ref={redMaskRef} id={1} colorWrite scale={0} position={[0, 2, 0]}>
        <circleGeometry />
        <moonMaterial ref={redMoonMaterialRef} />
      </Mask>

      <Mask
        ref={blueMaskRef}
        rotation={[0, 0, Math.PI]}
        id={2}
        colorWrite
        scale={0}
        position={[0, 0, 3]}
      >
        <circleGeometry />
        <moonMaterial
          ref={blueMoonMaterialRef}
          uBaseColor={"#00c6ff"}
          uMixColor={"magenta"}
        />
      </Mask>

      {/* Dragoon */}
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
            <moonMaterial uMixColor={"#00c6ff"} />
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
          castShadow
          receiveShadow
          name="Body_Spine"
          geometry={nodes.Body_Spine.geometry}
          morphTargetDictionary={nodes.Body_Spine.morphTargetDictionary}
          morphTargetInfluences={nodes.Body_Spine.morphTargetInfluences}
        >
          <meshStandardMaterial side={THREE.DoubleSide} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          name="Body"
          geometry={nodes.Body.geometry}
          material={materiaRedMask}
          morphTargetDictionary={nodes.Body.morphTargetDictionary}
          morphTargetInfluences={nodes.Body.morphTargetInfluences}
        />
      </group>
    </group>
  );
};

useGLTF.preload("/dragon.glb");

export default Dragon;
