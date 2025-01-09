import { ReactNode } from 'react';

type Props = {
  classNameTitle?: string;
  content: () => ReactNode;
};

export default function HowToPlay(props: Props) {
  const { content } = props;

  return (
    <>
      <div className="flex items-center justify-center gap-2 mb-4">
        <h2 className="text-md text-center font-semibold">How to Play</h2>
      </div>
      {content()}
    </>
  );
}
