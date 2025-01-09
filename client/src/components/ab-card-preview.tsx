import Image from 'next/image';
import { ABCard } from '@annabelle/shared/core/card';
import ABCardComp from '@/components/ab-card';
import { cn } from '@/lib/utils';

type CardFrontProps = {
  card: ABCard;
  className?: string;
  valueNotLabel?: boolean;
};

type CardBackProps = {
  cardBack: string;
  index: number;
  isSelected: boolean;
};

export function CardFrontPreview(props: CardFrontProps) {
  const { card, className, valueNotLabel } = props;

  return (
    <div
      className={cn(
        'relative cursor-pointer preserve-3d',
        'transition-transform duration-500',
        className
      )}
    >
      <ABCardComp card={card} valueNotLabel={valueNotLabel} preview={true} />
    </div>
  );
}

export function CardBackPreview(props: CardBackProps) {
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
        width={128}
        height={128}
        placeholder="blur"
        blurDataURL={'/blur.png'}
        className="rounded-2xl w-full h-48 object-cover"
        style={{ objectFit: 'cover' }}
        priority
      />
    </div>
  );
}
