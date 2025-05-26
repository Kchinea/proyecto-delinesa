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
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Kyliam Chinea Salcedo
 * @since Apr 2025
 * @description Vista del juego del Ahorcado, gestionada completamente con DOM y canvas.
 */

export class HangmanView {
  private body: HTMLBodyElement;
  private gameSection: HTMLDivElement;
  private canvas: HTMLCanvasElement;
  private input: HTMLInputElement;
  private button: HTMLButtonElement;
  private wordDisplay: HTMLParagraphElement;
  private feedbackDisplay: HTMLParagraphElement;
  private attemptsDisplay: HTMLParagraphElement;
  private guessedLettersDisplay: HTMLParagraphElement;
  private endMessageDisplay: HTMLParagraphElement;
  private restartButton: HTMLButtonElement;
  private lives: number;

  constructor() {
    this.body = document.body as HTMLBodyElement;
    this.gameSection = this.createElement('section', 'section') as HTMLDivElement;

    const container = this.createElement('div', 'container') as HTMLDivElement;
    const card = this.createElement('div', 'card') as HTMLDivElement;
    const cardContent = this.createElement('div', 'card-content') as HTMLDivElement;

    const columns = this.createElement('div', 'columns') as HTMLDivElement;

    const leftColumn = this.createElement('div', 'column is-half has-text-centered') as HTMLDivElement;
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'hangman-canvas';
    this.canvas.width = 300;
    this.canvas.height = 300;
    this.canvas.style.border = '1px solid #ccc';
    leftColumn.appendChild(this.canvas);

    const rightColumn = this.createElement('div', 'column is-half') as HTMLDivElement;

    this.wordDisplay = this.createElement('p', 'title is-4') as HTMLParagraphElement;
    this.wordDisplay.id = 'word-display';
    this.wordDisplay.textContent = '_ _ _ _ _';

    const inputField = this.createElement('div', 'field has-addons') as HTMLDivElement;
    const inputControl = this.createElement('div', 'control is-expanded') as HTMLDivElement;
    const buttonControl = this.createElement('div', 'control') as HTMLDivElement;

    this.input = document.createElement('input');
    this.input.className = 'input';
    this.input.maxLength = 1;
    this.input.placeholder = 'Introduce una letra';
    this.input.id = 'letter-input';

    this.button = document.createElement('button');
    this.button.className = 'button is-primary';
    this.button.id = 'guess-button';
    this.button.textContent = 'Adivinar';

    inputControl.appendChild(this.input);
    buttonControl.appendChild(this.button);
    inputField.appendChild(inputControl);
    inputField.appendChild(buttonControl);

    this.feedbackDisplay = this.createElement('p', 'has-text-info mt-4') as HTMLParagraphElement;
    this.feedbackDisplay.id = 'feedback';

    this.attemptsDisplay = this.createElement('p', 'mt-2 has-text-grey') as HTMLParagraphElement;
    this.guessedLettersDisplay = this.createElement('p', 'mt-2 has-text-grey-light') as HTMLParagraphElement;

    this.endMessageDisplay = this.createElement('p', 'has-text-weight-bold has-text-danger mt-4') as HTMLParagraphElement;

    this.restartButton = this.createElement('button', 'button is-warning mt-4') as HTMLButtonElement;
    this.restartButton.textContent = 'Reiniciar juego';

    rightColumn.appendChild(this.wordDisplay);
    rightColumn.appendChild(inputField);
    rightColumn.appendChild(this.feedbackDisplay);
    rightColumn.appendChild(this.attemptsDisplay);
    rightColumn.appendChild(this.guessedLettersDisplay);
    rightColumn.appendChild(this.endMessageDisplay);
    rightColumn.appendChild(this.restartButton);

    columns.appendChild(leftColumn);
    columns.appendChild(rightColumn);
    cardContent.appendChild(columns);
    card.appendChild(cardContent);
    container.appendChild(card);
    this.gameSection.appendChild(container);
    this.body.appendChild(this.gameSection);
    this.lives = 6;
  }
  /**
   * llama al handler una vez se pulsa el boton
   * @param handler 
   */
  public bindLetterInput(handler: (letter: string) => void): void {
    this.button.addEventListener('click', () => {
      const letter = this.input.value.trim().toLowerCase();
      if (letter) {
        handler(letter);
        this.input.value = '';
        this.input.focus();
      }
    });
  }

  public bindRestartHandler(handler: () => void): void {
    this.restartButton.addEventListener('click', handler);
  }

  public updateWord(displayedWord: string): void {
    this.wordDisplay.textContent = displayedWord;
  }

  public updateAttempts(attempts: number): void {
    this.attemptsDisplay.textContent = `Intentos restantes: ${attempts}`;
    this.drawHangman(this.lives - attempts);
  }

  public updateGuessedLetters(letters: string[]): void {
    this.guessedLettersDisplay.textContent = `Letras usadas: ${letters.join(', ')}`;
  }

  public showFeedback(message: string, isError: boolean = false): void {
    this.feedbackDisplay.textContent = message;
    this.feedbackDisplay.className = isError ? 'has-text-danger mt-4' : 'has-text-info mt-4';
  }

  public showEndMessage(message: string): void {
    this.endMessageDisplay.textContent = message;
  }

  public clearEndMessage(): void {
    this.endMessageDisplay.textContent = '';
  }

  /**
   * dibuja el canvas según el número de errores cometidos
   * @param mistakes 
   * @returns 
   */
  public drawHangman(mistakes: number): void {
    const context = this.canvas.getContext('2d');
    if (!context) return;
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    context.lineWidth = 3;
    context.strokeStyle = '#333';

    context.strokeRect(20, 250, 200, 10);
    context.strokeRect(60, 50, 10, 200);
    context.strokeRect(60, 50, 100, 10);
    context.strokeRect(160, 50, 2, 30);
    if (mistakes >= 1) context.beginPath(), context.arc(160, 95, 15, 0, Math.PI * 2), context.stroke();
    if (mistakes >= 2) context.beginPath(), context.moveTo(160, 110), context.lineTo(160, 170), context.stroke();
    if (mistakes >= 3) context.beginPath(), context.moveTo(160, 120), context.lineTo(140, 150), context.stroke();
    if (mistakes >= 4) context.beginPath(), context.moveTo(160, 120), context.lineTo(180, 150), context.stroke();
    if (mistakes >= 5) context.beginPath(), context.moveTo(160, 170), context.lineTo(140, 200), context.stroke();
    if (mistakes >= 6) context.beginPath(), context.moveTo(160, 170), context.lineTo(180, 200), context.stroke();
  }

  private createElement(tag: string, className?: string): HTMLElement {
    const element = document.createElement(tag);
    if (className) element.className = className;
    return element;
  }
}
