import type { ReactNode } from 'react';
import { Icon } from './Icon';
import type { IconName, Tone } from '../data/types';

interface NoticeProps {
  title?: string;
  children: ReactNode;
  tone?: Tone;
  icon?: IconName;
}

/** הערה מודגשת - "חשוב לדעת", "איך זה עובד ברמב״ם" וכדומה. */
export function Notice({ title, children, tone = 'orange', icon = 'info' }: NoticeProps) {
  return (
    <div className="notice" data-tone={tone}>
      <span className="notice__icon">
        <Icon name={icon} size={19} />
      </span>
      <p>
        {title && <strong className="notice__title">{title}</strong>}
        {children}
      </p>
    </div>
  );
}
