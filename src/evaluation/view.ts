/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author kyliam Chinea Salcedo
 * @since Mar 24, 2025
 * @description Program that reads JSON data from URL
 *
 *  If you use fetch It produces an error
 *  But when I load the page I Obtain this error:
 *    Access to fetch at  from origin  has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
 *    If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
 *
 * This 0error occurs because of the CORS (Cross-Origin Resource Sharing) policy which is implemented by the server hosting
 * the resource you are trying to access. This policy restricts cross-origin requests made by web browsers, for security reasons.
 *
 * @see {@link
* https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe}
*/

export class MonteCarloView {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private functionInput: HTMLInputElement;
  private xMinInput: HTMLInputElement;
  private xMaxInput: HTMLInputElement;
  private yMaxInput: HTMLInputElement;
  private runButton: HTMLButtonElement;

  private onInput: (funcStr: string, xMin: number, xMax: number, yMax: number) => void = () => {};

  constructor() {
    this.canvas = document.getElementById("graphCanvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d")!;
    this.functionInput = document.getElementById("functionInput") as HTMLInputElement;
    this.xMinInput = document.getElementById("xMin") as HTMLInputElement;
    this.xMaxInput = document.getElementById("xMax") as HTMLInputElement;
    this.yMaxInput = document.getElementById("yMax") as HTMLInputElement;
    this.runButton = document.getElementById("runSimulation") as HTMLButtonElement;

    this.runButton.addEventListener("click", () => {
      const funcStr = this.functionInput.value;
      const xMin = parseFloat(this.xMinInput.value);
      const xMax = parseFloat(this.xMaxInput.value);
      const yMax = parseFloat(this.yMaxInput.value);

      this.onInput(funcStr, xMin, xMax, yMax);
    });
  }

  bindInputHandlers(onInput: (funcStr: string, xMin: number, xMax: number, yMax: number) => void): void {
    this.onInput = onInput;
  }

  public updateCanvas(func: (x: number) => number, xMin: number, xMax: number, yMax: number): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.beginPath();
    this.ctx.moveTo(0, yMax);
    for (let x = xMin; x <= xMax; x += 0.1) {
      let y = func(x);
      let canvasX = (x - xMin) * (this.canvas.width / (xMax - xMin));
      let canvasY = this.canvas.height - (y * (this.canvas.height / yMax));
      this.ctx.lineTo(canvasX, canvasY);
    }
    this.ctx.stroke();
  }

  public displayArea(area: number): void {
    alert(`El área aproximada bajo la curva es: ${area}`);
  }
}
