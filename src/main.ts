import './style.css'
import { readFile, readAssetFile } from '../lib/main'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <p>vite library examples</p>
    <h2>Video</h2>
    <div>
        <video id="video"></video>
    </div>
    <h2>Captured</h2>
    <canvas id="picture" width="300" height="200"></canvas>
    <h2>Result</h2>
    <p id="res"></p>
  </div>
`


window.onload = async () => {
  await readAssetFile()
  
  const video = document.getElementById("video") as HTMLVideoElement
  const canvas = document.getElementById("picture") as HTMLCanvasElement

  // カメラ取得
  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  }).then(async (stream) => {
    // Canvasの設定
    const { width, height } = stream.getTracks()[0].getSettings();
    canvas.setAttribute("width", width?.toString() || "300")
    canvas.setAttribute("height", height?.toString() || "200")
    const ctx = canvas.getContext('2d');

    // カメラ起動
    video.srcObject = stream;
    video.play()

    while (true) {
      // 3000msecごとにループ
      await new Promise(resolve => setTimeout(resolve, 3000))
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      }
      const image = canvas.toDataURL('image/jpeg');

      // Execute Lib
      const res = await readFile(image as string)

      // Output result
      // const node = document.createTextNode(String(res))
      const resArea = document.getElementById("res") as HTMLElement
      resArea.innerHTML = String(res)
    }
  }).catch(e => {
    console.log(e)
  })
}