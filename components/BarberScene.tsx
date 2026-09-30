"use client";

import {
  Canvas,
  useFrame,
  useThree,
} from "@react-three/fiber";

import {
  Environment,
  useGLTF,
} from "@react-three/drei";

import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
} from "react";

import * as THREE from "three";

type BarberSceneProps = {
  scrollProgress: React.MutableRefObject<number>;
};

// ======================================================
// DESKTOP
// ======================================================

const DESKTOP = {
  size: 1.6,

  x: 2.65,
  y: -0.35,
  z: -0.8,

  rotationZ: -0.68,
};

// ======================================================
// MOBILE
// ======================================================

const MOBILE = {
  // Mantemos grande o suficiente para fazer
  // parte da composição do NØVA.
  size: 1.05,

  x: 0.9,
  y: -0.15,
  z: -1,

  rotationZ: -0.68,
};

const NORMALIZED_MODEL_SIZE = 4;

// ======================================================
// TESOURA
// ======================================================

function Scissors({
  scrollProgress,
}: BarberSceneProps) {
  const animationRef =
    useRef<THREE.Group>(null);

  const { scene } = useGLTF(
    "/models/barber-scissors.glb"
  );

  const { size: viewportSize } =
    useThree();

  const isMobile =
    viewportSize.width < 768;

  const config =
    isMobile
      ? MOBILE
      : DESKTOP;

  // ====================================================
  // CLONE
  // ====================================================

  const model = useMemo(() => {
    const cloned =
      scene.clone(true);

    cloned.position.set(
      0,
      0,
      0
    );

    cloned.rotation.set(
      0,
      0,
      0
    );

    cloned.scale.set(
      1,
      1,
      1
    );

    cloned.traverse((child) => {
      if (
        !(
          child instanceof
          THREE.Mesh
        )
      ) {
        return;
      }

      child.castShadow = true;
      child.receiveShadow = true;

      const original =
        child.material;

      const materials =
        Array.isArray(original)
          ? original
          : [original];

      const clonedMaterials =
        materials.map(
          (material) => {
            if (
              material instanceof
              THREE.MeshStandardMaterial
            ) {
              const mat =
                material.clone();

              mat.color.set(
                "#25272b"
              );

              mat.metalness = 1;
              mat.roughness = 0.28;
              mat.envMapIntensity = 0.9;
              mat.needsUpdate = true;

              return mat;
            }

            return material;
          }
        );

      child.material =
        Array.isArray(original)
          ? clonedMaterials
          : clonedMaterials[0];
    });

    cloned.updateMatrixWorld(
      true
    );

    return cloned;
  }, [scene]);

  // ====================================================
  // NORMALIZAÇÃO
  // ====================================================

  const normalization =
    useMemo(() => {
      model.updateMatrixWorld(
        true
      );

      const box =
        new THREE.Box3().setFromObject(
          model
        );

      const size =
        new THREE.Vector3();

      const center =
        new THREE.Vector3();

      box.getSize(size);
      box.getCenter(center);

      const maxDimension =
        Math.max(
          size.x,
          size.y,
          size.z
        ) || 1;

      return {
        center,

        scale:
          NORMALIZED_MODEL_SIZE /
          maxDimension,
      };
    }, [model]);

  // ====================================================
  // RESET
  // ====================================================

  useEffect(() => {
    const group =
      animationRef.current;

    if (!group) return;

    group.position.set(
      config.x,
      config.y,
      config.z
    );

    group.rotation.set(
      0,
      0,
      config.rotationZ
    );

    group.scale.setScalar(1);
  }, [
    config.x,
    config.y,
    config.z,
    config.rotationZ,
  ]);

  // ====================================================
  // ANIMAÇÃO
  // ====================================================

  useFrame((state) => {
    const group =
      animationRef.current;

    if (!group) return;

    const progress =
      THREE.MathUtils.clamp(
        scrollProgress.current ?? 0,
        0,
        1
      );

    // ==================================================
    // POSIÇÃO FINAL
    // ==================================================

    const endX =
      isMobile
        ? -0.3
        : 0.2;

    const endY =
      isMobile
        ? 0.08
        : 0.15;

    const endZ =
      isMobile
        ? 0.05
        : 0.45;

    const targetX =
      THREE.MathUtils.lerp(
        config.x,
        endX,
        progress
      );

    const targetY =
      THREE.MathUtils.lerp(
        config.y,
        endY,
        progress
      );

    const targetZ =
      THREE.MathUtils.lerp(
        config.z,
        endZ,
        progress
      );

    group.position.x =
      THREE.MathUtils.lerp(
        group.position.x,
        targetX,
        0.07
      );

    group.position.y =
      THREE.MathUtils.lerp(
        group.position.y,
        targetY,
        0.07
      );

    group.position.z =
      THREE.MathUtils.lerp(
        group.position.z,
        targetZ,
        0.07
      );

    // ==================================================
    // ROTAÇÃO
    // ==================================================

    const finalRotation =
      isMobile
        ? 0.48
        : 0.75;

    const targetRotation =
      THREE.MathUtils.lerp(
        config.rotationZ,
        finalRotation,
        progress
      );

    group.rotation.z =
      THREE.MathUtils.lerp(
        group.rotation.z,
        targetRotation,
        0.055
      );

    // ==================================================
    // MOUSE — SOMENTE DESKTOP
    // ==================================================

    if (!isMobile) {
      group.rotation.x =
        THREE.MathUtils.lerp(
          group.rotation.x,
          state.pointer.y * -0.035,
          0.035
        );

      group.rotation.y =
        THREE.MathUtils.lerp(
          group.rotation.y,
          state.pointer.x * 0.05,
          0.035
        );
    } else {
      group.rotation.x =
        THREE.MathUtils.lerp(
          group.rotation.x,
          0,
          0.05
        );

      group.rotation.y =
        THREE.MathUtils.lerp(
          group.rotation.y,
          0,
          0.05
        );
    }

    // ==================================================
    // ESCALA
    // A tesoura também vem em direção à tela.
    // ==================================================

    const finalScale =
      isMobile
        ? 1.16
        : 1.12;

    const targetScale =
      THREE.MathUtils.lerp(
        1,
        finalScale,
        progress
      );

    const smoothScale =
      THREE.MathUtils.lerp(
        group.scale.x,
        targetScale,
        0.055
      );

    group.scale.setScalar(
      smoothScale
    );
  });

  return (
    <group
      ref={animationRef}
      position={[
        config.x,
        config.y,
        config.z,
      ]}
      rotation={[
        0,
        0,
        config.rotationZ,
      ]}
    >
      {/* TAMANHO */}

      <group
        scale={config.size}
      >
        {/* NORMALIZAÇÃO */}

        <group
          scale={
            normalization.scale
          }
        >
          {/* CENTRALIZAÇÃO */}

          <group
            position={[
              -normalization.center.x,
              -normalization.center.y,
              -normalization.center.z,
            ]}
          >
            <primitive
              object={model}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

// ======================================================
// CENA
// ======================================================

export default function BarberScene({
  scrollProgress,
}: BarberSceneProps) {
  return (
    <div
      className="
        pointer-events-none

        absolute
        inset-0
        z-[1]

        h-full
        w-full
        max-w-full

        overflow-hidden
      "
    >
      <Canvas
        className="
          !block
          !h-full
          !w-full
        "
        camera={{
          position: [
            0,
            0,
            7,
          ],

          fov: 43,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,

          powerPreference:
            "high-performance",
        }}
      >
        <ambientLight
          intensity={0.1}
        />

        <directionalLight
          position={[
            5,
            6,
            6,
          ]}
          intensity={3.4}
          color="#ffffff"
        />

        <pointLight
          position={[
            -4,
            2,
            4,
          ]}
          intensity={5}
          color="#6688ff"
        />

        <pointLight
          position={[
            5,
            0,
            5,
          ]}
          intensity={5}
          color="#ffffff"
        />

        <pointLight
          position={[
            2,
            -4,
            3,
          ]}
          intensity={2}
          color="#5f78ff"
        />

        <spotLight
          position={[
            1,
            7,
            5,
          ]}
          intensity={4}
          angle={0.5}
          penumbra={1}
          color="#ffffff"
        />

        <Suspense
          fallback={null}
        >
          <Environment
            preset="studio"
            environmentIntensity={
              0.5
            }
          />

          <Scissors
            scrollProgress={
              scrollProgress
            }
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(
  "/models/barber-scissors.glb"
);