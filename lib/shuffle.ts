// ---------------------------------------------------------------------------
// CONTROLEUR (au sens MVC) — logique pure, indépendante de l'affichage.
// ---------------------------------------------------------------------------

/** Mélange Fisher-Yates : retourne un NOUVEAU tableau, ne mute pas l'original. */
export function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export interface ShuffledOptions {
  options: string[];
  correctIndex: number;
}

/**
 * Mélange les options d'une question de quiz et recalcule l'index de la bonne
 * réponse en conséquence, pour que la bonne réponse ne soit jamais toujours
 * au même endroit.
 */
export function shuffleOptions(options: string[], correctIndex: number): ShuffledOptions {
  const withIndex = options.map((text, index) => ({ text, index }));
  const shuffled = shuffle(withIndex);
  return {
    options: shuffled.map((o) => o.text),
    correctIndex: shuffled.findIndex((o) => o.index === correctIndex),
  };
}
