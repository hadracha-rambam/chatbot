import { SearchX } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <span className="empty-state__icon">
        <SearchX size={26} strokeWidth={1.6} aria-hidden="true" />
      </span>
      <strong>{title}</strong>
      <span>{description}</span>
    </div>
  );
}
