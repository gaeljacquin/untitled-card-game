'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import AudioControlsDynamic from '@/components/audio-controls-dynamic';
import BackgroundLogo from '@/components/background-logo';
import Footer from '@/components/footer';
import SectionCard from '@/components/section-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Credits() {
  return (
    <>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <BackgroundLogo />

        <div className="max-w-4xl mx-auto space-y-4 mt-16 relative z-10">
          <SectionCard title="" className="text-center text-white p-1 md:p-4">
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-xl font-semibold mb-6">Credits</h3>

              <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-xl space-y-8 md:space-y-0 md:space-x-12">
                <div className="flex flex-col md:flex-row-2 items-center justify-center space-x-4">
                  <div className="flex flex-col md:flex-row-1 items-center justify-center space-y-1">
                    <Avatar className="text-center h-16 w-16">
                      <AvatarImage src={process.env.profilePic ?? ''} />
                      <AvatarFallback>Profile Picture</AvatarFallback>
                    </Avatar>
                    <h4 className="font-semibold">Developer</h4>
                    <p className="text-center">{process.env.author}</p>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-4">
                  <div className="flex flex-col md:flex-row-1 items-center justify-center space-y-1">
                    <Avatar className="text-center h-16 w-16">
                      <AvatarImage src="/fireworks.jpg" />
                      <AvatarFallback>Fireworks</AvatarFallback>
                    </Avatar>
                    <h4 className="font-semibold">Testers</h4>
                    <p className="text-center">Friends & Family</p>
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
              <p className="text-center text-white mt-8 mb-7">Thank you for playing!</p>
            </div>
          </SectionCard>
        </div>

        <div className="mt-48">
          <Footer />
        </div>
      </motion.div>

      <AudioControlsDynamic />
    </>
  );
}
