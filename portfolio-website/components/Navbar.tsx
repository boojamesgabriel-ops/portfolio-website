import Link from "next/link";

const navItems = [
  { label: "projects", href: "#projects" },
  { label: "services", href: "#services" },
  { label: "about", href: "#about" },
  { label: "contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <>
      <header className="blueprint-nav">
        <Link 
          href="/"
          className="J-nav__name"
          aria-label="Go to home"
        >
          JG
        </Link>

        <Link
          href="/"
          className="blueprint-nav__name"
          aria-label="Go to home"
        >
          <span className="B-nav">I3</span>
          <span>oo</span>
        </Link>

        <nav
          className="blueprint-nav__menu"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="blueprint-nav__link"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="am-pm-button"
          aria-label="Switch time display"
        >
          <span className="am-pm-default">PM</span>
          <span className="am-pm-hover">AM</span>
        </button>
      </header>
    </>
  );
}
