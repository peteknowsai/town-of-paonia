export default function SiteFooter() {
  return (
    <footer className="site-foot">
      <div className="shell site-foot-inner">
        <p className="foot-notice">
          <span className="dot" aria-hidden>●</span>&nbsp; Published by{" "}
          <strong>Transparent Towns</strong>, an independent civic project. This is{" "}
          <strong>not the official Town of Paonia website</strong>. The Town&apos;s
          official site is{" "}
          <a href="https://townofpaonia.colorado.gov">townofpaonia.colorado.gov</a>.
        </p>
        <p style={{ margin: 0, maxWidth: "62ch" }}>
          A demonstration of what a useful town website could do for residents: track
          meetings, simplify records, and make it easy to ask questions of your
          government.
        </p>
      </div>
    </footer>
  );
}
