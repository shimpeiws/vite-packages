import './style.css'
import { readFile } from '../lib/main'
import cv, { Mat, Rect } from "opencv-ts";

cv.onRuntimeInitialized = () => {
  const src = cv.imread("inputCanvas");
  const dst: Mat = new cv.Mat(src.cols, src.rows, cv.CV_8UC4);

  cv.resize(src, dst, new cv.Size(500, 500), 0, 0, cv.INTER_AREA);

  const roiRect: Rect = new cv.Rect(0, 0, 200, 200);

  const roi = dst.roi(roiRect);

  cv.imshow('outputCanvas', roi);
};

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <p>vite library examples</p>
    <input
      type="file"
      id="camera"
      capture="user"
      accept="image/*"
    >
    <div id="image-output"></div>
    <div id="res"></div>
  </div>
`


window.onload = async () => {
  const input = document.querySelector('#camera') as HTMLInputElement;
  input.onchange = async () => {
    const files = input.files;
    if (files) {
      const file = files[0];
      console.info("file", file)
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        // Image Preview
        const imageElement = document.createElement('img');
        imageElement.src = reader.result as string;
        imageElement.width = 400;
        document.getElementById("image-output")?.appendChild(imageElement);

        // Execcute Lib
        const res = await readFile(reader.result as string)

        // Output result
        const pElement = document.createElement('p')
        const node = document.createTextNode(String(res))
        document.getElementById("res")?.appendChild(node)

      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
  };
}