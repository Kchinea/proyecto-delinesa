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
import { MonteCarloModel } from './model';
import { MonteCarloView } from './view';
// import * as math from 'mathjs';

export class MonteCarloController {
  private view: MonteCarloView;
  private model: MonteCarloModel;
  private randomPoints:number = 10000;

  constructor(view: MonteCarloView, model: MonteCarloModel) {
    this.view = view;
    this.model = model;
    this.view.bindInputHandlers(this.handleInput.bind(this));
  }

  private handleInput(funcStr: string, xMin: number, xMax: number, yMax: number): void {
    let func = (x: number): number => {
      // return math.evaluate(funcStr, { x });
      return 2;
    };

    this.model.setFunc(func);
    this.model.setXMin(xMin);
    this.model.setXMax(xMax);
    this.model.setYMax(yMax);

    let area = this.model.calculateArea(this.randomPoints); 
    this.view.updateCanvas(func, xMin, xMax, yMax);
    this.view.displayArea(area);
  }
}
