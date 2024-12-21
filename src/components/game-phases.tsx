import Image from 'next/image';
import { SectionCard } from '@/components/section-card';
import appinfo from '@/utils/appinfo';

export function GamePhases() {
  const phases = [
    {
      name: 'Phase One',
      description: 'Lorem ipsum 1 2 3 4 5 6 7',
    },
    {
      name: 'Phase Two',
      description: 'Lorem ipsum 1 2 3 4 5 6 7',
    },
    {
      name: 'Phase Three',
      description: 'Lorem ipsum 1 2 3 4 5 6 7',
    },
    {
      name: 'Phase Four',
      description: 'Lorem ipsum 1 2 3 4 5 6 7',
    },
    {
      name: 'Phase Five',
      description: 'Lorem ipsum 1 2 3 4 5 6 7',
    },
  ];

  return (
    <SectionCard title="Game Phases" description={'The game phases of ' + appinfo.title}>
      <div className="grid md:grid-cols-2 gap-8 text-white">
        <div className="space-y-6 text-white">
          {phases.map((phase, index) => (
            <div key={phase.name} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                <span className="text-amber-200 font-semibold">{index + 1}</span>
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-lg">{phase.name}</h4>
                <p className="">{phase.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1624543591069-0ed958c0c3e7"
            alt="Basic Rules Placeholder"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </SectionCard>
  );
}
