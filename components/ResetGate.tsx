export function ResetGate() {
  return (
    <form action="/api/logout" method="post">
      <button
        type="submit"
        className="text-gold/80 transition-colors hover:text-gold"
      >
        Reset gate
      </button>
    </form>
  );
}
