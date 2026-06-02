/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import ParkingSurveyForm from "@/components/ParkingSurveyForm";

export const metadata = {
  title: "Downtown Paonia Parking Survey | Transparent Towns",
  description:
    "A two-minute survey on how parking downtown really works, for the Planning Commission's review of the parking code. Fill it out online, or print it to hand out and scan the QR code to complete it later.",
};

export default function ParkingSurveyPage() {
  return (
    <article className="shell-narrow survey" style={{ paddingTop: "2rem", paddingBottom: "2.5rem" }}>
      <Link className="back no-print" href="/parking">
        ← Parking
      </Link>

      <header className="survey-head">
        <p className="eyebrow">Downtown parking</p>
        <h1
          className="font-display"
          style={{
            fontWeight: 560,
            fontSize: "clamp(1.7rem, 4.4vw, 2.3rem)",
            lineHeight: 1.07,
            letterSpacing: "-0.02em",
            margin: "0 0 0.45rem",
          }}
        >
          Downtown Paonia Parking Survey
        </h1>
        <p className="survey-intro">
          The Planning Commission is reviewing the Town's parking code. This quick survey
          helps us understand how parking downtown really works. It takes about two minutes.
          Thank you.
        </p>
      </header>

      <ParkingSurveyForm />

      <footer className="survey-foot">
        <div className="survey-qr">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/parking/survey-qr.svg"
            alt="QR code that opens this survey at townofpaonia.co/parking/survey"
            width={118}
            height={118}
          />
          <div>
            <p className="survey-qr-cap">
              <strong>Can't fill this out now?</strong> Scan this code to complete the survey
              online, or visit <strong>townofpaonia.co/parking/survey</strong>.
            </p>
            <p className="survey-drop">
              Completed paper surveys can be dropped at Town Hall or returned to any Planning
              Commissioner.
            </p>
          </div>
        </div>
        <p className="sec-aside" style={{ marginTop: "1.1rem" }}>
          Prepared with the parking code proposal submitted by Pete McCarthy. Published by
          Transparent Towns, independent of the Town of Paonia government.
        </p>
      </footer>
    </article>
  );
}
