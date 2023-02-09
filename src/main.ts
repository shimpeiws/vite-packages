import './style.css'
import { readFile, readAssetFile } from '../lib/main'

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
        await readAssetFile()
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