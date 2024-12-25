// Fisher-Yates shuffle
export default function shuffler(list: unknown[]) {
  const shuffled = [...list];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const shift = shuffled[i];
    shuffled[i] = shuffled[j]!;
    shuffled[j] = shift;
  }

  return shuffled;
}
