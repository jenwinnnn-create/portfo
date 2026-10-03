/* Lightweight ambient background.
   Deliberately non-interactive: no mouse listeners, canvas, or per-frame work.
   The background uses two very slow CSS-only color fields and a quiet grid. */
export default function Aurora() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="aurora-blob aurora-1" />
      <div className="aurora-blob aurora-2" />
      <div className="grid-base absolute inset-0" />
    </div>
  );
}
