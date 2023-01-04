import cv, { Mat, Rect } from "opencv-ts";
// import * as ort from 'onnxruntime-node';

// ort.InferenceSession.create('./model.onnx');

cv.onRuntimeInitialized = () => {
  const src = cv.imread("inputCanvas");
  const dst: Mat = new cv.Mat(src.cols, src.rows, cv.CV_8UC4);

  cv.resize(src, dst, new cv.Size(500, 500), 0, 0, cv.INTER_AREA);

  const roiRect: Rect = new cv.Rect(0, 0, 200, 200);

  const roi = dst.roi(roiRect);

  cv.imshow('outputCanvas', roi);
};

export const setupCounter = (element: HTMLButtonElement) => {
  let counter = 0
  const setCounter = (count: number) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(++counter))
  setCounter(0)
}

export const readFile = async (base64Image: string): Promise<boolean> => {
  console.log("readFile")
  console.log("readFile: input base64Image = ", base64Image)
  await new Promise(resolve => setTimeout(resolve, 1000))
  return true
}