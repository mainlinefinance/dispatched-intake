import Link from "next/link";
import {
  IconArrowRight,
  IconDollarCircle,
  IconShieldCheck,
  IconTruckBox,
  IconWrench,
} from "./icons";

type Product = {
  label: string;
  title: string;
  copy: string;
  href: string;
  icon: React.ReactNode;
};

const products: Product[] = [
  {
    label: "Repair",
    title: "Truck repair loans",
    copy: "Get back on the road fast.",
    href: "/truck-repair-loans",
    icon: <IconWrench />,
  },
  {
    label: "Cash flow",
    title: "Trucking financing",
    copy: "Working capital, equipment, repair loans, and more.",
    href: "/trucking",
    icon: <IconDollarCircle />,
  },
  {
    label: "Equipment",
    title: "Equipment financing",
    copy: "Finance trucks, trailers, and gear.",
    href: "/equipment-financing",
    icon: <IconTruckBox />,
  },
  {
    label: "Insurance",
    title: "Commercial truck insurance",
    copy: "Compare trucking coverage options.",
    href: "/insurance",
    icon: <IconShieldCheck />,
  },
];

export default function ProductCards() {
  return (
    <section className="product-cards" aria-labelledby="product-cards-title">
      <div className="container">
        <header className="product-cards-header">
          <span className="product-cards-eyebrow">Trucker approved</span>
          <h2 className="product-cards-title" id="product-cards-title">
            Funding for the moments that keep your wheels turning.
          </h2>
          <p className="product-cards-sub">
            Repair, cash flow, equipment and insurance options in one place.
          </p>
        </header>
        <ul className="product-cards-grid">
          {products.map((p) => (
            <li key={p.title} className="product-card">
              <Link
                href={p.href}
                className="product-card-link"
                aria-label={p.title}
              >
                <span className="product-card-icon" aria-hidden="true">
                  {p.icon}
                </span>
                <span className="product-card-label">{p.label}</span>
                <span className="product-card-title">{p.title}</span>
                <span className="product-card-copy">{p.copy}</span>
                <span className="product-card-arrow" aria-hidden="true">
                  <IconArrowRight />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
