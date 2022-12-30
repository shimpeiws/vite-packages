export function setupCounter(element: HTMLButtonElement) {
  let counter = 0
  const setCounter = (count: number) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(++counter))
  setCounter(0)
}

export function readFile(base64Image: string): boolean {
  console.log("readFile")
  console.log("readFile: input base64Image = ", base64Image)
  return true
}