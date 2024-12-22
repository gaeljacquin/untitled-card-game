'use client';

import AnimatedLogoDynamic from '@/components/animated-logo-dynamic';
import { SectionCard } from '@/components/section-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FlipWords } from '@/components/ui/flip-words';

export default function About() {
  const myTitles = ['Developer', 'Designer'];

  return (
    <div className="max-w-4xl mx-auto space-y-8 mt-16">
      <SectionCard title="About" className="text-center text-white p-4">
        <div className="flex flex-col items-center justify-center -mt-12 -mb-10">
          <span className="w-64 h-64">
            <AnimatedLogoDynamic logo={'game'} loop={false} />
          </span>
        </div>
        <p className="text-lg mb-8 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus doloribus dignissimos
          nemo nihil accusantium tenetur aliquam adipisci praesentium velit exercitationem assumenda
          fuga quisquam sint excepturi facilis esse officiis, in suscipit.
        </p>

        <div className="flex flex-col items-center justify-center">
          <h3 className="text-2xl font-semibold mb-6">Team</h3>

          <div className="flex flex-row items-center justify-center w-full max-w-xl space-x-12">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={process.env.profilePic ?? ''} />
                <AvatarFallback>Profile Picture</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">
                  <FlipWords words={myTitles} className="text-white" />
                </h4>
                <p>{process.env.author}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/fireworks.jpg" />
                <AvatarFallback>Fireworks</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">Playtesters</h4>
                <p>Friends & Family</p>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
