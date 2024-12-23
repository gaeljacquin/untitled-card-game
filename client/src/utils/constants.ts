const cardBacks = ['/red.png', '/yellow.png', '/blue.png'];

const timerMinutes = Array(3)
  .fill(0)
  .map((_, i) => i + 3);

const allConstants = { cardBacks, timerMinutes };

export default allConstants;
