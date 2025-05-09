export const createArrayCanvas = (cant : number, width : number, height: number) : HTMLCanvasElement[] => { 
    return Array.from({length: cant}, ()=>{
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      return canvas;
})}

export const drawCanvas = (canvas : HTMLCanvasElement, text : string) => {
    const ctx = canvas.getContext("2d");
    if(!ctx) return;

    ctx.fillStyle = "#fef";
    ctx.fillRect(0,0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "20px sans-serif";
    ctx.fillText(text, 0 , 0)
  }