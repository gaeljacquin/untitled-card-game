const OBJECTIVES = [
  {
    id: "over-n-cards",
    label: "Win game with %s cards or more",
    type: "card",
    options: [50],
  },
  {
    id: "over-n-points",
    label: "Win game %s points or more",
    type: "point",
    options: [200],
  },
  {
    id: "claim-n-words",
    label: "Claim %s words that have %s letters or more",
    type: "word",
    options: [],
  },
  {
    id: "no-discard",
    label: "Win game without discarding",
    type: "card",
    options: null,
  },
  {
    id: "no-invalid-words",
    label: "Win game with no invalid words",
    type: "word",
    options: null,
  },
  {
    id: "no-jokers",
    label: "Win game without using jokers",
    type: "card",
    options: null,
  },
];

export default OBJECTIVES;
