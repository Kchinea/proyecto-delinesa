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
 * 
 */
export class HangmanModel {
  private word: string;
  private guessedLetters: Set<string>;
  private maxAttempts: number;
  private attemptsLeft: number;

  constructor(private wordList: string[] = ['typescript', 'javascript', 'bulma', 'ahorcado', 'kyliam', 'universidad']) {
    this.word = this.chooseRandomWord();
    this.guessedLetters = new Set();
    this.maxAttempts = 6;
    this.attemptsLeft = this.maxAttempts;
  }
  /**
   * Escoge una palabra random de las seleccionadas
   */
  private chooseRandomWord(): string {
    const index = Math.floor(Math.random() * this.wordList.length);
    return this.wordList[index].toLowerCase();
  }
  /**
   * comprueba si la letra aparece en la palabra seleccionada
   * @param letter 
   * @returns 
   */
  public guess(letter: string): boolean {
    letter = letter.toLowerCase();
    if (!/^[a-zñ]$/.test(letter) || this.guessedLetters.has(letter)) return false;

    this.guessedLetters.add(letter);
    if (!this.word.includes(letter)) {
      this.attemptsLeft--;
    }
    return true;
  }
  
  /**
   * devuelve la palabra oculta con las letras desconocidas como _
   * @returns la palabra oculta
   */
  public getRevealedWord(): string {
    return this.word.split('').map(letter =>
      this.guessedLetters.has(letter) ? letter : '_'
    ).join(' ');
  }

  public getAttemptsLeft(): number {
    return this.attemptsLeft;
  }

  public isGameOver(): boolean {
    return this.attemptsLeft <= 0 || this.isWordGuessed();
  }

  public isWordGuessed(): boolean {
    return this.word.split('').every(letter => this.guessedLetters.has(letter));
  }

  public getWord(): string {
    return this.word;
  }

  public getGuessedLetters(): string[] {
    return Array.from(this.guessedLetters);
  }

  /**
   * Selecciona una palabra random y limpia los atributos que se usan
   */
  public reset(): void {
    this.word = this.chooseRandomWord();
    this.guessedLetters.clear();
    this.attemptsLeft = this.maxAttempts;
  }
}
