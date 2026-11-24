/**
 * A side note in a full story: a short line quoted word for word from the
 * paragraph it sits in, set in the margin beside it on wide screens. It
 * repeats the paragraph's own words, so screen readers skip it, and on
 * phones and tablets, where there is no margin, it is hidden.
 */
export function Note({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <span className="sn" aria-hidden="true">
      {children}
      {label && <small>{label}</small>}
    </span>
  );
}
