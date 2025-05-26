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


import { HangmanModel } from './model.js';
import { HangmanView } from './view.js';

export class HangmanController {
  constructor(private model: HangmanModel, private view: HangmanView) {}
  /**
  * inicializa la vista
  */
  public init(): void {
    this.view.bindLetterInput(this.handleGuess);
    this.view.bindRestartHandler(this.handleRestart);
    this.updateView();
  }
  /**
   * Comprueba si la letra que se le pasa ofrma parte de la palabra a descubrir
   * @param letter 
   * @returns 
   */
  private handleGuess = (letter: string): void => {
    const valid = this.model.guess(letter);
    if (!valid) return; // Ignora letras ya adivinadas o inválidas
    this.updateView();

    if (this.model.isGameOver()) {
      const message = this.model.isWordGuessed()
        ? '¡Felicidades! Has adivinado la palabra.'
        : `Has perdido. La palabra era: ${this.model.getWord()}`;
      this.view.showEndMessage(message);
    }
  };
  
  /**
   * reinicia tanto el modelo como la vista después de un intento
   */
  private handleRestart = (): void => {
    this.model.reset();
    this.view.clearEndMessage();
    this.updateView();
  };

  /**
   * actualiza la vista 
   */
  private updateView(): void {
    this.view.updateWord(this.model.getRevealedWord());
    this.view.updateAttempts(this.model.getAttemptsLeft());
    this.view.updateGuessedLetters(this.model.getGuessedLetters());
  }
}


