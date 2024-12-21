import Image from 'next/image';
import { SectionCard } from '@/components/section-card';
import appinfo from '@/utils/appinfo';

export function BasicRules() {
  return (
    <SectionCard title="Basic Rules" description={'Learn the fundamentals of ' + appinfo.title}>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4 text-white">
          <h3 className="text-lg font-semibold">Getting Started</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Each player receives two private cards (hole cards)</li>
            <li>Five community cards are dealt face-up on the table</li>
            <li>Players make the best five-card hand using any combination</li>
            <li>The player with the best hand wins</li>
          </ul>
        </div>
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1542222780-b06f7307d2c5"
            alt="Basic Rules Placeholder"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </SectionCard>
  );
}
