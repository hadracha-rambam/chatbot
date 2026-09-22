import { Search as SearchIcon, X } from 'lucide-react';
import { useId } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label: string;
  autoFocus?: boolean;
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'חיפוש: חופשה, מבחן, מחלה, שכר...',
  label,
  autoFocus = false,
}: SearchBarProps) {
  const inputId = useId();

  return (
    <div className="search">
      <SearchIcon className="search__icon" size={20} strokeWidth={2} aria-hidden="true" />
      <label className="sr-only" htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        className="search__input"
        type="search"
        inputMode="search"
        autoComplete="off"
        dir="rtl"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        autoFocus={autoFocus}
      />
      {value.length > 0 && (
        <button type="button" className="search__clear" onClick={() => onChange('')}>
          <X size={16} strokeWidth={2.4} aria-hidden="true" />
          <span className="sr-only">ניקוי החיפוש</span>
        </button>
      )}
    </div>
  );
}
