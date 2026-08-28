export default function RubiksLoop() {
  return (
    <div className="rubiks-shell">
      <iframe
        className="rubiks-frame"
        src="/cube-renderer"
        title="A Rubik's Cube repeatedly scrambling and solving itself"
        tabIndex={-1}
      />
    </div>
  );
}
