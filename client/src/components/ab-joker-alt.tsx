'use client';

import '@/app/ab-joker-alt.css';

import { ABJoker } from '@annabelle/shared/core/card';
import { cn } from '@/lib/utils';

export default function ABJokerAlt() {
  const card = new ABJoker();
  const Icon = card.icon;

  return (
    <div className="joker-container noselect">
      <div className="canvas">
        <div id="joker-card">
          <div className="joker-card-content">
            <div className="joker-card-glare"></div>
            <div className="cyber-lines">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p id="prompt">
              <Icon className={cn('h-12 md:h-18', 'w-12 md:w-24')} />
            </p>
            <div className="glowing-elements">
              <div className="glow-1"></div>
              <div className="glow-2"></div>
              <div className="glow-3"></div>
            </div>
            <div className="subtitle">
              <span className="highlight uppercase">Joker</span>
            </div>
            <div className="joker-card-particles">
              <span></span>
              <span></span>
              <span></span> <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="corner-elements">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="scan-line"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
