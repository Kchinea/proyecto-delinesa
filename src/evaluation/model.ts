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
export class MonteCarloModel {
  private func: (x: number) => number = () => 0;
  private xMin: number | undefined;
  private xMax: number | undefined;
  private yMax: number | undefined;

  constructor() {
  }

  public setFunc(func: (x: number) => number): void {
    this.func = func;
  }

  public setXMin(xMin: number): void {
    this.xMin = xMin;
  }

  public setXMax(xMax: number): void {
    this.xMax = xMax;
  }

  public setYMax(yMax: number): void {
    this.yMax = yMax;
  }

  public calculateArea(iterations: number): number {
    if (this.func === undefined || this.xMin === undefined || this.xMax === undefined || this.yMax === undefined) {
      throw new Error("Faltan valores en el modelo para realizar el cálculo.");
    }

    let inside = 0;

    for (let i = 0; i < iterations; i++) {
      let x = Math.random() * (this.xMax - this.xMin) + this.xMin;
      let y = Math.random() * this.yMax;
      let fx = this.func(x);
      if (y <= fx) {
        inside++;
      }
    }

    return (inside / iterations) * (this.xMax - this.xMin) * this.yMax;
  }
}
