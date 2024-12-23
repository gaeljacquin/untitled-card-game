import { PlayingCard } from '@/components/playing-card';
import { SectionCard } from '@/components/section-card';

export default function PlayingField() {
  return (
    <SectionCard title="" className="w-fit h-full mt-7 rounded-3xl">
      <div className="p-4 sm:p-8 flex flex-wrap gap-4 sm:gap-8 items-center justify-center">
        <PlayingCard value="A" suit="♠" letter="J" />
        <PlayingCard value="K" suit="♥" letter="Q" />
        <PlayingCard value="Q" suit="♦" letter="K" />
        <PlayingCard value="J" suit="♣" letter="A" />
        <PlayingCard value="10" suit="♠" letter="B" />
        <PlayingCard value="9" suit="♥" letter="C" />
        <PlayingCard value="8" suit="♦" letter="D" />
        <PlayingCard value="7" suit="♣" letter="E" />
        <PlayingCard value="6" suit="♠" letter="F" />
        <PlayingCard value="5" suit="♥" letter="G" />
        <PlayingCard value="4" suit="♦" letter="H" />
        <PlayingCard value="3" suit="♣" letter="I" />
        <PlayingCard value="2" suit="♠" letter="L" />
      </div>
    </SectionCard>
  );
}
