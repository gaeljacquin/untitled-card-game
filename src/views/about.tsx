'use client';

import Link from 'next/link';
import { Code, Coffee, Palette } from 'lucide-react';
import AnimatedLogoDynamic from '@/components/animated-logo-dynamic';
import ReturnMainMenu from '@/components/return-main-menu';
import { PageTransition } from '@/components/ui/page-transition';

export default function About() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900 text-white">
        <ReturnMainMenu />

        <div className="container mx-auto p-2">
          <div className="w-64 h-64 mx-auto">
            <AnimatedLogoDynamic logo={'game'} loop={false} />
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 -mt-32">
          <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold mb-8 text-center text-indigo-300">About</h2>
            <p className="text-lg mb-8 leading-relaxed text-indigo-100">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus doloribus
              dignissimos nemo nihil accusantium tenetur aliquam adipisci praesentium velit
              exercitationem assumenda fuga quisquam sint excepturi facilis esse officiis, in
              suscipit.
            </p>

            <div className="flex flex-col items-center justify-center">
              <h3 className="text-2xl font-semibold mb-6 text-indigo-300">Team</h3>

              <div className="flex flex-row items-center justify-center w-full max-w-xl space-x-6">
                <div className="flex items-center space-x-4">
                  <Palette className="text-indigo-300" />
                  <div>
                    <h4 className="font-semibold">Design</h4>
                    <p className="text-indigo-200">{process.env.author}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Code className="text-indigo-300" />
                  <div>
                    <h4 className="font-semibold">Programming</h4>
                    <p className="text-indigo-200">{process.env.author}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Coffee className="text-indigo-300" />
                  <div>
                    <h4 className="font-semibold">Playtests</h4>
                    <p className="text-indigo-200">Friends & Family</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="container mx-auto px-4 py-8 text-center text-indigo-300">
          <p>
            © 2024{' '}
            <Link
              href={process.env.linktree ?? ''}
              target="_blank"
              className="hover:underline hover:text-white"
            >
              {process.env.author}
            </Link>
            . All rights reserved.
          </p>
        </footer>
      </div>
    </PageTransition>
  );
}
