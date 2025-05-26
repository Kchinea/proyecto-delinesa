import { HangmanModel } from '../model';

describe('HangmanModel', () => {
  let model: HangmanModel;

  beforeEach(() => {
    model = new HangmanModel(['test']);
  });

  test('should initialize with a random word and 6 attempts', () => {
    expect(model.getAttemptsLeft()).toBe(6);
    expect(typeof model.getWord()).toBe('string');
    expect(model.getWord().length).toBeGreaterThan(0);
  });

  test('guess should accept correct letters', () => {
    expect(model.guess('t')).toBe(true);
    expect(model.getGuessedLetters()).toContain('t');
  });

  test('guess should be case-insensitive', () => {
    expect(model.guess('T')).toBe(true);
    expect(model.getGuessedLetters()).toContain('t');
  });

  test('guess should reject non-letter characters', () => {
    expect(model.guess('1')).toBe(false);
    expect(model.guess('!')).toBe(false);
    expect(model.guess('')).toBe(false);
  });

  test('guess should not decrement attempts on correct guess', () => {
    const attemptsBefore = model.getAttemptsLeft();
    model.guess('t');
    expect(model.getAttemptsLeft()).toBe(attemptsBefore);
  });

  test('guess should decrement attempts on incorrect guess', () => {
    const attemptsBefore = model.getAttemptsLeft();
    model.guess('z');
    expect(model.getAttemptsLeft()).toBe(attemptsBefore - 1);
  });

  test('getRevealedWord should reveal guessed letters', () => {
    model.guess('t');
    expect(model.getRevealedWord()).toBe('t _ _ t');
  });

  test('isWordGuessed should return true if all letters are guessed', () => {
    model.guess('t');
    model.guess('e');
    model.guess('s');
    expect(model.isWordGuessed()).toBe(true);
  });

  test('reset should restart the game', () => {
    model.guess('t');
    model.reset();
    expect(model.getGuessedLetters().length).toBe(0);
    expect(model.getAttemptsLeft()).toBe(6);
    expect(model.getWord().length).toBeGreaterThan(0);
  });

  test('should not allow guessing the same letter twice', () => {
    expect(model.guess('t')).toBe(true);
    expect(model.guess('t')).toBe(false);
  });
});
