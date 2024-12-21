import { Coins } from 'lucide-react';
import { SectionCard } from '@/components/section-card';
import appinfo from '@/utils/appinfo';

export function OtherRules() {
  const actions = [
    {
      name: 'Rule One',
      description: 'Lorem ipsum 1 2 3 4 5 6 7',
    },
    {
      name: 'Rule Two',
      description: 'Lorem ipsum 1 2 3 4 5 6 7',
    },
    {
      name: 'Rule Three',
      description: 'Lorem ipsum 1 2 3 4 5 6 7',
    },
    {
      name: 'Rule Four',
      description: 'Lorem ipsum 1 2 3 4 5 6 7',
    },
    {
      name: 'Rule Five',
      description: 'Lorem ipsum 1 2 3 4 5 6 7',
    },
  ];

  return (
    <SectionCard title="Other Rules" description={'Understanding ' + appinfo.title + ' actions'}>
      <div className="grid md:grid-cols-2 gap-8 text-white">
        <div className="space-y-6">
          {actions.map((action) => (
            <div key={action.name} className="flex items-start gap-3">
              <Coins className="w-5 h-5 mt-1 text-amber-200" />
              <div>
                <h4 className="font-semibold">{action.name}</h4>
                <p className="text-sm">{action.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-amber-950/30 rounded-lg p-6">
          <h4 className="font-semibold mb-4">Tips</h4>
          <ul className="list-disc list-inside space-y-3 text-sm">
            <li>Lorem ipsum 1 2 3 4 5 6 7 8 9 abcdef</li>
            <li>Lorem ipsum 1 2 3 4 5 6 7 8 9 abcdef</li>
            <li>Lorem ipsum 1 2 3 4 5 6 7 8 9 abcdef</li>
            <li>Lorem ipsum 1 2 3 4 5 6 7 8 9 abcdef</li>
            <li>Lorem ipsum 1 2 3 4 5 6 7 8 9 abcdef</li>
          </ul>
        </div>
      </div>
    </SectionCard>
  );
}
