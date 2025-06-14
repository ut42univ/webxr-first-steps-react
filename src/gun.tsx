/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Quaternion, Vector3 } from "three";
import {
  useXRControllerButtonEvent,
  useXRInputSourceStateContext,
} from "@react-three/xr";

import { PositionalAudio as PAudio } from "three";
import { PositionalAudio } from "@react-three/drei";
import { useRef } from "react";

import { useBulletStore } from "./bullets";
import { useGLTF } from "@react-three/drei";

export const Gun = () => {
  const state = useXRInputSourceStateContext("controller");
  const { scene } = useGLTF("assets/blaster.glb");
  const bulletPrototype = scene.getObjectByName("bullet")!;
  const gamepad = state.inputSource.gamepad;

  useXRControllerButtonEvent(state, "xr-standard-trigger", (state) => {
    if (state === "pressed") {
      useBulletStore
        .getState()
        .addBullet(
          bulletPrototype.getWorldPosition(new Vector3()),
          bulletPrototype.getWorldQuaternion(new Quaternion())
        );
    }
  });
  const soundRef = useRef<PAudio>(null);

  useXRControllerButtonEvent(state, "xr-standard-trigger", (state) => {
    if (state === "pressed") {
      // ... existing code
      const laserSound = soundRef.current!;
      if (laserSound.isPlaying) laserSound.stop();
      laserSound.play();
      gamepad.hapticActuators[0]?.pulse(0.6, 100);
    }
  });

  return (
    <>
      <primitive object={scene} />
      <PositionalAudio ref={soundRef} url="assets/laser.ogg" loop={false} />
    </>
  );
};

useGLTF.preload("assets/blaster.glb");
