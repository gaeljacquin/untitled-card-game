import { Card } from '@annabelle/shared/src/core/card';
import { cn } from '@/lib/utils';
import { ABCardFaceUp } from './ab-card';

type Props = {
  card: Card;
  className?: string;
};

export default function CardFrontPreview(props: Props) {
  const { card, className } = props;

  return (
    <div
      className={cn(
        'relative cursor-pointer preserve-3d',
        'transition-transform duration-500',
        className
      )}
    >
      <ABCardFaceUp {...card} preview={true} />
    </div>
  );
}
