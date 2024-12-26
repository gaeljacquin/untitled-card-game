import Image from 'next/image';
import { cn } from '@/lib/utils';

type Props = {
  cardBack: string;
  index: number;
  isSelected: boolean;
};

export default function CardBackPreview(props: Props) {
  const { cardBack, index, isSelected } = props;

  return (
    <div
      className={cn(
        'relative aspect-[4/5] rounded-2xl transition-all duration-300',
        'hover:scale-105 hover:shadow-2xl hover:shadow-white/10',
        'transform perspective-1000 cursor-pointer',
        isSelected && 'ring-4 ring-white/50 scale-105 rotate-3'
      )}
    >
      <Image
        src={cardBack}
        alt={'Card back ' + (index + 1)}
        width={500}
        height={500}
        placeholder="blur"
        blurDataURL={'/blur.png'}
        className="rounded-2xl"
      />
    </div>
  );
}
