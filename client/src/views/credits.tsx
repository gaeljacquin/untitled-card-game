'use client';

import Link from 'next/link';
import _ from '@/components/_';
import AnimatedLogoDynamic from '@/components/animated-logo-dynamic';
import AudioControlsDynamic from '@/components/audio-controls-dynamic';
import SectionCard from '@/components/section-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FlipWords } from '@/components/ui/flip-words';
import { cn } from '@/lib/utils';

export default function Credits() {
  const myTitles = ['Developer', 'Designer'];

  return (
    <>
      <div className="fixed inset-0 bg-center opacity-50 flex items-center justify-center pointer-events-none">
        <span
          className={cn(
            'flex items-center justify-center w-[56rem] h-auto',
            'bg-transparent grayscale'
          )}
        >
          <AnimatedLogoDynamic logo={'game'} loop={false} autoplay={false} />
        </span>
      </div>

      <div className="max-w-4xl mx-auto space-y-8 mt-16">
        <SectionCard title="" className="text-center text-white p-4">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold mb-6">About</h3>
            <p className="text-md mb-8">
              <_ className="text-white" /> is a deck-building and word-building roguelite. Designed
              with card game enthusiasts and wordsmiths in mind, <_ className="text-white" />{' '}
              provides players with endless replayability, simplicity, and depth.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold mb-6">Team</h3>

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

            <p className="text-md mt-8">
              Lofi tracks courtesy of{' '}
              <Link
                href="https://pixabay.com/"
                target="_blank"
                className="hover:underline hover:text-white"
              >
                Pixabay
              </Link>
            </p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <p className="text-center text-white mt-16">Thank you for playing!</p>
          </div>
        </SectionCard>

        <div className="max-w-4xl">
          <AudioControlsDynamic className="space-y-8 flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm rounded-2xl p-4 mt-32" />
        </div>
      </div>
    </>
  );
}
