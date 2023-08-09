import React, { useRef } from "react";
import {
  ArcRotateCamera,
  Vector3,
  Color3,
  HemisphericLight,
  MeshBuilder,
  Vector4,
  StandardMaterial,
  Texture,
} from "@babylonjs/core";
import SceneComponent from "./SceneComponent"; // uses above component in same directory
import "./styles.css";

let box;

var faceUV = new Array(6);
var columns = 6; // 6 columns
var rows = 1; // 1 row
//set all faces to same
for (var i = 0; i < 6; i++) {
  faceUV[i] = new Vector4(i / columns, 0, (i + 1) / columns, 1 / rows);
}
const Cuboid = ({ imageURL }) => {
  const onSceneReady = (scene) => {
    // This creates and positions a free camera (non-mesh)
    var camera = new ArcRotateCamera(
      "Camera",
      (3 * Math.PI) / 4,
      Math.PI / 4,
      4,
      new Vector3.Zero(),
      scene
    );

    // This targets the camera to scene origin
    camera.setTarget(Vector3.Zero());

    const canvas = scene.getEngine().getRenderingCanvas();

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new HemisphericLight("light", new Vector3(1, 1, 1), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 1;

    // Our built-in 'box' shape.
    box = MeshBuilder.CreateBox(
      "box",
      { height: 2, width: 1.5, depth: 0.5 },
      scene
    );
    const mat = new StandardMaterial("mat", scene);
    const texture = new Texture(imageURL, scene);
    mat.diffuseTexture = texture;

    box.material = mat;
  };

  /**
   * Will run on every frame render.  We are spinning the box on y-axis.
   */
  const onRender = (scene) => {
    if (box !== undefined) {
      var deltaTimeInMillis = scene.getEngine().getDeltaTime();

      const rpm = 10;
      box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
    }
  };

  const cuboidStyle = {
    height: "500px",
    width: "500ppx",
  };

  return (
    <div style={cuboidStyle}>
      <SceneComponent
        antialias
        onSceneReady={onSceneReady}
        onRender={onRender}
        id="my-canvas"
      ></SceneComponent>
    </div>
  );
};

export default Cuboid;
