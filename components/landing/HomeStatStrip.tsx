import { IconClock, IconDollarCircle, IconShieldCheck } from "./icons";

type Stat = {
  icon: React.ReactNode;
  amt: string;
  label: string;
};

const stats: Stat[] = [
  {
    icon: <IconDollarCircle size={22} />,
    amt: "$25K–$250K",
    label: "Loan range",
  },
  {
    icon: <IconClock size={22} />,
    amt: "24–48 hrs",
    label: "Typical time to funds",
  },
  {
    icon: <IconShieldCheck size={22} />,
    amt: "Soft-pull first",
    label: "No impact on credit",
  },
];

export default function HomeStatStrip() {
  return (
    <section className="home-stat-strip" aria-label="At a glance">
      <div className="container">
        <ul className="home-stat-strip-grid">
          {stats.map((s) => (
            <li key={s.label} className="home-stat-item">
              <span className="home-stat-icon" aria-hidden="true">
                {s.icon}
              </span>
              <span className="home-stat-amt">{s.amt}</span>
              <span className="home-stat-label">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
