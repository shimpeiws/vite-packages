import file from './assets/octocat.png'

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

export const readAssetFile = async (): Promise<boolean> => {
  console.log("readAssetFile")
  try {
    const res = await fetch(file)
    console.log("res:", res)
    const blob = await res.blob()
    console.log("blob:", blob)
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => {
      console.log("base64:", reader.result)
    };
  } catch(error) {
    console.error(error)
  }
  return true
}