import React from 'react';
import Link from 'next/link';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { NextButton, PrevButton, usePrevNextButtons } from '@/components/carousel-arrow-buttons';
import { DotButton, useDotButton } from '@/components/carousel-dot-button';

type CarouselItem = {
  id: number;
  title: string;
  description: string;
  slug: string;
};

type PropType = {
  slides: CarouselItem[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);

  return (
    <section className="embla">
      <div className="embla__viewport text-white text-sm" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((item, index) => (
            <div className="embla__slide border border-2 border-gray-300 rounded-md" key={index}>
              <div className="embla__slide__number bg-amber-950/30">
                <Link href={`/${item.slug}`}>{item.title}</Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton className="bg-white" onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton className="bg-white" onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
