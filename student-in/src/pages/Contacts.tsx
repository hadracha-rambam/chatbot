import { Link as LinkIcon, Mail, MessageCircle, Phone, type LucideIcon } from 'lucide-react';
import { Icon } from '../components/Icon';
import { Notice } from '../components/Notice';
import { CONTACTS, CONTACT_PLACEHOLDER } from '../data/contacts';
import type { ContactChannel } from '../data/types';

const CHANNEL_ICON: Record<ContactChannel['type'], LucideIcon> = {
  phone: Phone,
  email: Mail,
  whatsapp: MessageCircle,
  link: LinkIcon,
};

export function Contacts() {
  return (
    <div className="fade-in">
      <header className="page-intro">
        <h1 className="page-intro__title">למי פונים?</h1>
        <p className="page-intro__subtitle">
          כשצריכים עזרה אמיתית - אלה הכתובות ברמב״ם.
        </p>
      </header>

      <div className="stack">
        {CONTACTS.map((contact) => (
          <section key={contact.id} className="card contact-card" data-tone={contact.tone}>
            <span className="contact-card__icon">
              <Icon name={contact.icon} size={22} />
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h2 className="contact-card__title">{contact.title}</h2>
              <p className="contact-card__desc">{contact.description}</p>
              <ul className="contact-card__channels">
                {contact.channels.map((channel) => {
                  const ChannelIcon = CHANNEL_ICON[channel.type];
                  return (
                    <li key={channel.type + channel.label} className="channel">
                      <ChannelIcon size={14} strokeWidth={2} aria-hidden="true" />
                      {channel.label}
                      {channel.value ? `: ${channel.value}` : ' · יעודכן כאן'}
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        ))}
      </div>

      <div style={{ marginTop: '20px' }}>
        <Notice tone="grey" icon="info">
          {CONTACT_PLACEHOLDER}. אנחנו משלימים כאן את פרטי הקשר המלאים ברמב״ם, ובינתיים אפשר
          לפנות למשאבי אנוש.
        </Notice>
      </div>
    </div>
  );
}
