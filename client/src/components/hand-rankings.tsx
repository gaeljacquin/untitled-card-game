import Image from 'next/image';
import SectionCard from '@/components/section-card';
import appinfo from '@/utils/appinfo';

export function HandRankings() {
  const rankings = [
    { name: 'Royal Flush', description: 'A, K, Q, J, 10 of the same suit' },
    { name: 'Straight Flush', description: 'Five consecutive cards of the same suit' },
    { name: 'Four of a Kind', description: 'Four cards of the same rank' },
    { name: 'Full House', description: 'Three of a kind plus a pair' },
    { name: 'Flush', description: 'Any five cards of the same suit' },
  ];

  return (
    <SectionCard
      title="Hand Rankings"
      description={'From highest to lowest, these are the winning ' + appinfo.title + ' hands'}
    >
      <div className="grid md:grid-cols-2 gap-8 text-white">
        <div className="space-y-6">
          {rankings.map((rank) => (
            <div key={rank.name} className="space-y-1">
              <h4 className="font-semibold text-lg">{rank.name}</h4>
              <p className="">{rank.description}</p>
            </div>
          ))}
        </div>
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
          <Image
            src="/fireworks.jpg"
            alt="Hand Rankings Placeholder"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </SectionCard>
  );
}
