import Link from "next/link";
import {
  IconArrowRight,
  IconDollarCircle,
  IconShieldCheck,
  IconTruckBox,
  IconWrench,
} from "./icons";

type Product = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  ariaLabel: string;
};

const products: Product[] = [
  {
    title: "Truck repair loans",
    description:
      "Get back on the road fast with flexible repair financing.",
    href: "/apply?product=repair",
    icon: <IconWrench />,
    ariaLabel: "Truck repair loans",
  },
  {
    title: "Working capital",
    description:
      "Cover fuel, payroll, and daily expenses with quick funding.",
    href: "/apply?product=working-capital",
    icon: <IconDollarCircle />,
    ariaLabel: "Working capital",
  },
  {
    title: "Equipment financing",
    description: "Finance trucks, trailers, and gear to grow your fleet.",
    href: "/apply?product=equipment",
    icon: <IconTruckBox />,
    ariaLabel: "Equipment financing",
  },
  {
    title: "Commercial truck insurance",
    description: "Compare trucking insurance quotes in minutes.",
    href: "/insurance",
    icon: <IconShieldCheck />,
    ariaLabel: "Commercial truck insurance",
  },
];

export default function ProductCards() {
  return (
    <section className="product-cards" aria-label="What we fund">
      <div className="container">
        <ul className="product-cards-grid">
          {products.map((p) => (
            <li key={p.title} className="product-card">
              <Link
                href={p.href}
                className="product-card-link"
                aria-label={p.ariaLabel}
              >
                <span className="product-card-icon" aria-hidden="true">
                  {p.icon}
                </span>
                <span className="product-card-body">
                  <span className="product-card-title">{p.title}</span>
                  <span className="product-card-desc">{p.description}</span>
                </span>
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
