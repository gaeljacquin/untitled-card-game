export const mainQuestList = [
  {
    id: 'over-n-cards',
    label: 'Collect %s cards or more',
    type: 'card',
    options: [50],
    multiply: false,
  },
  {
    id: 'over-n-points',
    label: 'Score %s points or more',
    type: 'point',
    options: [100, 200],
    multiply: false,
  },
  {
    id: 'claim-words-n-letters',
    label: 'Claim a word containing %s letters or more',
    type: 'word',
    options: [9, 10, 11, 12],
    multiply: true,
  },
  {
    id: 'no-discard',
    label: "Don't discard",
    type: 'card',
    options: null,
    multiply: false,
  },
  {
    id: 'no-invalid-words',
    label: 'No invalid words',
    type: 'word',
    options: null,
    multiply: false,
  },
  // {
  //   id: "no-jokers",
  //   label: "No jokers",
  //   type: "card",
  //   options: null,
  //   multiply: false,
  // },
];

export const numMainQuests = 1;
