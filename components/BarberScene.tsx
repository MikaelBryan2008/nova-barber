"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type BarberSceneProps = {
  scrollProgress: React.MutableRefObject<number>;
};

const DESKTOP = {
  size: 0.9,
  x: 2.45,
  y: 0.75,
  z: -1.15,
  rotationZ: -0.82,
};

const MOBILE = {
  size: 0.34,
  x: 0.62,
  y: 0.95,
  z: -1.7,
  rotationZ: -0.78,
};

const NORMALIZED_MODEL_SIZE = 4;

function smoothStep(value: number) {
  return value * value * (3 - 2 * value);
}

function phase(
  progress: number,
  start: number,
  end: number
) {
  return THREE.MathUtils.clamp(
    (progress - start) / (end - start),
    0,
    1
  );
}

function Scissors({
  scrollProgress,
}: BarberSceneProps) {
  const animationRef = useRef<THREE.Group>(null);

  const { scene } = useGLTF(
    "/models/barber-scissors.glb"
  );

  const { size: viewportSize } = useThree();

  const isMobile = viewportSize.width < 768;
  const config = isMobile ? MOBILE : DESKTOP;

  const model = useMemo(() => {
    const cloned = scene.clone(true);

    cloned.position.set(0, 0, 0);
    cloned.rotation.set(0, 0, 0);
    cloned.scale.set(1, 1, 1);

    cloned.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) {
        return;
      }

      child.castShadow = true;
      child.receiveShadow = true;

      const original = child.material;

      const materials = Array.isArray(original)
        ? original
        : [original];

      const clonedMaterials = materials.map(
        (material) => {
          if (
            material instanceof
            THREE.MeshStandardMaterial
          ) {
            const mat = material.clone();

            mat.color.set("#d3d6dc");
            mat.metalness = 1;
            mat.roughness = 0.16;
            mat.envMapIntensity = 1.55;
            mat.needsUpdate = true;

            return mat;
          }

          return material;
        }
      );

      child.material = Array.isArray(original)
        ? clonedMaterials
        : clonedMaterials[0];
    });

    cloned.updateMatrixWorld(true);

    return cloned;
  }, [scene]);

  const normalization = useMemo(() => {
    model.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(
      model
    );

    const size = new THREE.Vector3();
    const center = new THREE.Vector3();

    box.getSize(size);
    box.getCenter(center);

    const maxDimension =
      Math.max(size.x, size.y, size.z) || 1;

    return {
      center,
      scale:
        NORMALIZED_MODEL_SIZE / maxDimension,
    };
  }, [model]);

  useEffect(() => {
    const group = animationRef.current;

    if (!group) {
      return;
    }

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

  useFrame((state) => {
    const group = animationRef.current;

    if (!group) {
      return;
    }

    const progress = THREE.MathUtils.clamp(
      scrollProgress.current ?? 0,
      0,
      1
    );

    /*
      FASES

      0.00 - 0.25:
      tesoura integrada à composição.

      0.25 - 0.62:
      movimento principal de corte.

      0.62 - 0.84:
      tesoura se afasta.

      0.84 - 1.00:
      aproximação final da câmera.
    */

    const cutProgress = smoothStep(
      phase(progress, 0.22, 0.62)
    );

    const exitProgress = smoothStep(
      phase(progress, 0.62, 0.84)
    );

    const finalProgress = smoothStep(
      phase(progress, 0.84, 1)
    );

    const cutEndX = isMobile ? -0.95 : -2.85;
    const cutEndY = isMobile ? -0.15 : -0.8;
    const cutEndZ = isMobile ? -0.05 : 0.3;

    let targetX = THREE.MathUtils.lerp(
      config.x,
      cutEndX,
      cutProgress
    );

    let targetY = THREE.MathUtils.lerp(
      config.y,
      cutEndY,
      cutProgress
    );

    let targetZ = THREE.MathUtils.lerp(
      config.z,
      cutEndZ,
      cutProgress
    );

    const exitX = isMobile ? -1.35 : -4.4;
    const exitY = isMobile ? -0.85 : -1.65;
    const exitZ = isMobile ? -0.8 : -0.9;

    targetX = THREE.MathUtils.lerp(
      targetX,
      exitX,
      exitProgress
    );

    targetY = THREE.MathUtils.lerp(
      targetY,
      exitY,
      exitProgress
    );

    targetZ = THREE.MathUtils.lerp(
      targetZ,
      exitZ,
      exitProgress
    );

    /*
      No último momento a tesoura volta
      em direção à câmera.
    */

    const finalX = isMobile ? 0.35 : 1.2;
    const finalY = isMobile ? 0.05 : 0.2;
    const finalZ = isMobile ? 1.7 : 3.1;

    targetX = THREE.MathUtils.lerp(
      targetX,
      finalX,
      finalProgress
    );

    targetY = THREE.MathUtils.lerp(
      targetY,
      finalY,
      finalProgress
    );

    targetZ = THREE.MathUtils.lerp(
      targetZ,
      finalZ,
      finalProgress
    );

    group.position.x = THREE.MathUtils.lerp(
      group.position.x,
      targetX,
      0.08
    );

    group.position.y = THREE.MathUtils.lerp(
      group.position.y,
      targetY,
      0.08
    );

    group.position.z = THREE.MathUtils.lerp(
      group.position.z,
      targetZ,
      0.08
    );

    /*
      ROTAÇÃO

      Durante o corte, a tesoura segue
      a diagonal visual da máscara.
    */

    const cutRotation = isMobile
      ? 0.45
      : 0.72;

    let targetRotationZ =
      THREE.MathUtils.lerp(
        config.rotationZ,
        cutRotation,
        cutProgress
      );

    targetRotationZ =
      THREE.MathUtils.lerp(
        targetRotationZ,
        isMobile ? 0.8 : 1.15,
        finalProgress
      );

    group.rotation.z =
      THREE.MathUtils.lerp(
        group.rotation.z,
        targetRotationZ,
        0.075
      );

    /*
      PARALLAX DO MOUSE

      Só existe no desktop e perde força
      quando a animação principal começa.
    */

    if (!isMobile) {
      const pointerInfluence =
        1 - cutProgress;

      const pointerRotationX =
        state.pointer.y *
        -0.04 *
        pointerInfluence;

      const pointerRotationY =
        state.pointer.x *
        0.055 *
        pointerInfluence;

      group.rotation.x =
        THREE.MathUtils.lerp(
          group.rotation.x,
          pointerRotationX +
            finalProgress * 0.18,
          0.05
        );

      group.rotation.y =
        THREE.MathUtils.lerp(
          group.rotation.y,
          pointerRotationY +
            finalProgress * 0.38,
          0.05
        );
    } else {
      group.rotation.x =
        THREE.MathUtils.lerp(
          group.rotation.x,
          finalProgress * 0.12,
          0.05
        );

      group.rotation.y =
        THREE.MathUtils.lerp(
          group.rotation.y,
          finalProgress * 0.22,
          0.05
        );
    }

    /*
      ESCALA

      Pequena no começo.
      Cresce levemente no corte.
      Fica enorme só no fechamento.
    */

    const cutScale =
      THREE.MathUtils.lerp(
        1,
        isMobile ? 1.08 : 1.16,
        cutProgress
      );

    const finalScale =
      THREE.MathUtils.lerp(
        cutScale,
        isMobile ? 1.9 : 3.15,
        finalProgress
      );

    const smoothScale =
      THREE.MathUtils.lerp(
        group.scale.x,
        finalScale,
        0.07
      );

    group.scale.setScalar(smoothScale);

    /*
      Movimento orgânico muito sutil
      apenas enquanto a Hero está parada.
    */

    if (progress < 0.2) {
      const floatAmount = isMobile
        ? 0.006
        : 0.01;

      group.position.y +=
        Math.sin(
          state.clock.elapsedTime * 0.7
        ) * floatAmount;
    }
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
      <group scale={config.size}>
        <group scale={normalization.scale}>
          <group
            position={[
              -normalization.center.x,
              -normalization.center.y,
              -normalization.center.z,
            ]}
          >
            <primitive object={model} />
          </group>
        </group>
      </group>
    </group>
  );
}

export default function BarberScene({
  scrollProgress,
}: BarberSceneProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-[16] h-full w-full overflow-hidden">
      <Canvas
        className="!block !h-full !w-full"
        camera={{
          position: [0, 0, 7],
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
        <ambientLight intensity={0.13} />

        <directionalLight
          position={[5, 6, 6]}
          intensity={4.2}
          color="#ffffff"
        />

        <pointLight
          position={[-4, 2, 4]}
          intensity={2.4}
          color="#aebdff"
        />

        <pointLight
          position={[5, 0, 5]}
          intensity={5.4}
          color="#ffffff"
        />

        <pointLight
          position={[2, -4, 3]}
          intensity={1.4}
          color="#758bff"
        />

        <spotLight
          position={[1, 7, 5]}
          intensity={4.8}
          angle={0.5}
          penumbra={1}
          color="#ffffff"
        />

        <Suspense fallback={null}>
          <Environment
            preset="studio"
            environmentIntensity={0.72}
          />

          <Scissors
            scrollProgress={scrollProgress}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(
  "/models/barber-scissors.glb"
);
