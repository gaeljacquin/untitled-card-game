import { ABCard } from '@annabelle/shared/core/card';
import { ABCardFaceUp } from '@/components/ab-card';
import { cn } from '@/lib/utils';

type Props = {
  card: ABCard;
  className?: string;
  valueNotLabel?: boolean;
};

export default function CardFrontPreview(props: Props) {
  const { card, className, valueNotLabel } = props;

  return (
    <div
      className={cn(
        'relative cursor-pointer preserve-3d',
        'transition-transform duration-500',
        className
      )}
    >
      <ABCardFaceUp card={card} valueNotLabel={valueNotLabel} preview={true} />
    </div>
  );
}
