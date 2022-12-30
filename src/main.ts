import './style.css'
import { readFile } from '../lib/main'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <p>vite library examples</p>
    <input
      type="file"
      id="camera"
      capture="user"
      accept="image/*"
    >
  </div>
`


window.onload = function () {
  const input = document.querySelector('#camera') as HTMLInputElement;
  input.onchange = function () {
    const files = input.files;
    if (files) {
      const file = files[0];
      console.info("file", file)
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        readFile(reader.result as string)
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
  };
}