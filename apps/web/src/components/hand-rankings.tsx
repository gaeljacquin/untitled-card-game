export default function HandRankings() {
  const hands = [
    {
      rank: 1,
      name: 'Royal Flush',
      description: 'A, K, Q, J, 10 all of the same suit.',
      example: 'A♠ K♠ Q♠ J♠ 10♠',
    },
    {
      rank: 2,
      name: 'Straight Flush',
      description: 'Five consecutive cards of the same suit.',
      example: '9♥ 8♥ 7♥ 6♥ 5♥',
    },
    {
      rank: 3,
      name: 'Four of a Kind',
      description: 'Four cards of the same rank plus one side card (kicker).',
      example: 'K♣ K♦ K♥ K♠ 9♦',
    },
    {
      rank: 4,
      name: 'Full House',
      description: 'Three of a kind plus a pair.',
      example: 'Q♣ Q♦ Q♥ 8♠ 8♣',
    },
    {
      rank: 5,
      name: 'Flush',
      description: 'Any five cards of the same suit, not consecutive.',
      example: 'A♦ J♦ 9♦ 6♦ 3♦',
    },
    {
      rank: 6,
      name: 'Straight',
      description: 'Five consecutive cards of mixed suits.',
      example: '10♣ 9♦ 8♠ 7♥ 6♣',
    },
    {
      rank: 7,
      name: 'Three of a Kind',
      description: 'Three cards of the same rank plus two unrelated side cards.',
      example: '7♣ 7♦ 7♥ K♠ 2♣',
    },
    {
      rank: 8,
      name: 'Two Pair',
      description: 'Two different pairs plus a kicker.',
      example: 'J♣ J♦ 4♠ 4♥ A♣',
    },
    {
      rank: 9,
      name: 'One Pair',
      description: 'Two cards of the same rank plus three unrelated side cards.',
      example: '10♠ 10♥ Q♣ 7♦ 3♠',
    },
    {
      rank: 10,
      name: 'High Card',
      description: 'When you have none of the above — highest card wins.',
      example: 'A♣ J♦ 8♠ 6♥ 2♦',
    },
  ];

  const colorizeCards = (example: string) => {
    return example.split(' ').map((card, i) => {
      const hasRedSuit = /[♥♦]/.test(card);
      const colorClass = hasRedSuit ? 'text-rose-700' : 'text-sky-700';
      return (
        <span key={i} className={`${colorClass} font-mono mr-1`}>
          {card}
        </span>
      );
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-lg font-semibold mb-4 underline">Texas Hold&apos;em - Hand Rankings</h1>

      <div className="overflow-x-auto bg-white rounded-2xl shadow p-2">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="text-left text-sm text-gray-700">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Hand</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Example</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {hands.map((h) => (
              <tr key={h.rank} className="hover:bg-gray-50">
                <td className="px-4 py-3 align-top w-12 font-mono">{h.rank}</td>
                <td className="px-4 py-3 font-medium">{h.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{h.description}</td>
                <td className="px-4 py-3 font-mono">{colorizeCards(h.example)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
