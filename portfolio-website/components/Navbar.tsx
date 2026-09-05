import Link from "next/link";

const navItems = [
  { label: "projects", href: "/#projects" },
  /*{ label: "services", href: "#services" }, */
  { label: "about", href: "#about" },
  { label: "contact", href: "#contact" },
];

type NavbarProps = {
  className?: string;
};

export default function Navbar({ className }: NavbarProps) {
  return (
    <>
      <header className="blueprint-nav">
        <div className="nav-brand">
          <Link
            href="/"
            className="J-nav__name"
            aria-label="Go to home"
          >
            JG
          </Link>

          <div className="nav-bar-menu">
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
          </div>
        </div>
        {/*
        <button
          type="button"
          className="am-pm-button"
          aria-label="Switch time display"
        >
          <span className="am-pm-default">PM</span>
          <span className="am-pm-hover">AM</span>
        </button>
        */}
      </header>
    </>
  );
}
