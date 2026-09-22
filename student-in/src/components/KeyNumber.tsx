interface KeyNumberProps {
  value: string;
  label?: string;
  prefix?: string;
}

/** המספר המרכזי של הזכות - גדול, ברור, וקריא נכון בתוך טקסט עברי. */
export function KeyNumber({ value, label, prefix }: KeyNumberProps) {
  return (
    <div className="key-number">
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
        {prefix && <span className="key-number__prefix">{prefix}</span>}
        <span className="key-number__value">{value}</span>
      </div>
      {label && <span className="key-number__label">{label}</span>}
    </div>
  );
}
