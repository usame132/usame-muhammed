import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getDictionary,
  hasLocale,
  LOCALES,
  type Dictionary,
  type Locale,
} from "./dictionaries";

type Skill = {
  key: string;
  cat: "Engineering" | "Operations" | "Tooling";
  weight: 3 | 4 | 5;
};

const skills: Skill[] = [
  { key: "Dart", cat: "Engineering", weight: 4 },
  { key: "Flutter", cat: "Engineering", weight: 4 },
  { key: "Firebase", cat: "Engineering", weight: 4 },
  { key: "Hive", cat: "Engineering", weight: 3 },
  { key: "State Management", cat: "Engineering", weight: 4 },
  { key: "Architecture Patterns", cat: "Engineering", weight: 3 },
  { key: "GitHub", cat: "Tooling", weight: 4 },
  { key: "CRM Configuration", cat: "Operations", weight: 5 },
  { key: "Workflow Automation", cat: "Operations", weight: 4 },
  { key: "Process Optimization", cat: "Operations", weight: 4 },
  { key: "Incident & Problem Mgmt.", cat: "Operations", weight: 3 },
  { key: "Requirement Analysis", cat: "Operations", weight: 4 },
];

const cvByLocale: Record<Locale, string> = {
  tr: "/usame-cv-tr.pdf",
  en: "/usame-cv-en.pdf",
  ar: "/usame-cv-en.pdf",
};

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <main className="relative z-10 flex flex-col">
      <Nav dict={dict} lang={lang} />
      <Hero dict={dict} />
      <About dict={dict} />
      <Services dict={dict} />
      <Experience dict={dict} />
      <Skills dict={dict} />
      <Languages dict={dict} />
      <Contact dict={dict} />
      <Footer dict={dict} />
    </main>
  );
}

function Nav({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-[rgba(241,235,225,0.7)] border-b border-[var(--line)]">
      <nav className="max-w-6xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between gap-6">
        <Link href={`/${lang}#top`} className="font-display text-xl tracking-wide whitespace-nowrap">
          <span className="text-[var(--accent)]">U</span>
          <span className="text-[var(--foreground)]">·</span>
          <span className="italic">Muhammed</span>
        </Link>
        <ul className="hidden md:flex items-center gap-8 text-sm text-[var(--muted)]">
          <li><a href="#about" className="fancy-link hover:text-[var(--foreground)] transition">{dict.nav.about}</a></li>
          <li><a href="#services" className="fancy-link hover:text-[var(--foreground)] transition">{dict.nav.services}</a></li>
          <li><a href="#experience" className="fancy-link hover:text-[var(--foreground)] transition">{dict.nav.experience}</a></li>
          <li><a href="#skills" className="fancy-link hover:text-[var(--foreground)] transition">{dict.nav.skills}</a></li>
          <li><a href="#contact" className="fancy-link hover:text-[var(--foreground)] transition">{dict.nav.contact}</a></li>
        </ul>
        <div className="flex items-center gap-3">
          <LocaleSwitcher current={lang} />
          <a
            href={cvByLocale[lang]}
            target="_blank"
            rel="noreferrer"
            className="text-xs uppercase tracking-[0.2em] text-[var(--accent)] border border-[var(--line)] px-4 py-2 rounded-full hover:bg-[var(--accent)] hover:text-[var(--background)] transition"
          >
            {dict.nav.cv}
          </a>
        </div>
      </nav>
    </header>
  );
}

function LocaleSwitcher({ current }: { current: Locale }) {
  return (
    <div className="flex items-center text-[10px] tracking-[0.3em] uppercase text-[var(--muted)] border border-[var(--line)] rounded-full overflow-hidden">
      {LOCALES.map((l, i) => (
        <span key={l} className="contents">
          {i > 0 && <span className="opacity-30">·</span>}
          <Link
            href={`/${l}`}
            className={`px-3 py-2 transition ${
              current === l
                ? "text-[var(--accent)]"
                : "hover:text-[var(--foreground)]"
            }`}
            aria-current={current === l ? "true" : undefined}
          >
            {l.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  );
}

function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center pt-24 pb-16 px-6 sm:px-10"
    >
      <div
        className="pointer-events-none absolute -top-32 -start-32 w-[520px] h-[520px] rounded-full blur-3xl drift opacity-60"
        style={{ background: "radial-gradient(circle, rgba(194,83,58,0.32), transparent 60%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-[150px] -end-[100px] w-[480px] h-[480px] rounded-full blur-3xl drift opacity-50"
        style={{ background: "radial-gradient(circle, rgba(90,106,78,0.28), transparent 65%)", animationDelay: "-7s" }}
      />

      <div className="relative max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-8">
          <p className="rise rise-d1 text-xs tracking-[0.4em] uppercase text-[var(--accent)]">
            {dict.hero.tag}
          </p>
          <h1 className="rise rise-d2 font-display font-light leading-[0.95] text-balance text-[clamp(3.5rem,9vw,8.5rem)]">
            Usame
            <br />
            <span className="italic text-[var(--accent)]">Muhammed</span>
          </h1>
          <p className="rise rise-d3 text-[var(--muted)] text-lg sm:text-xl max-w-xl leading-relaxed text-balance">
            {dict.hero.tagline}
          </p>
          <div className="rise rise-d4 flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 bg-[var(--accent)] text-[var(--background)] px-6 py-3 rounded-full text-sm tracking-wider uppercase font-medium hover:bg-[var(--accent-soft)] transition"
            >
              {dict.hero.cta}
              <span className="transition group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180">→</span>
            </a>
            <a
              href="https://github.com/usame132"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-[var(--muted)] fancy-link"
            >
              github.com/usame132
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 rise rise-d3 flex justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute -inset-6 border border-[var(--line)] rounded-[2rem] rotate-3" />
            <div className="absolute -inset-3 border border-[var(--accent)]/30 rounded-[1.75rem] -rotate-2" />
            <div className="relative w-[280px] sm:w-[340px] aspect-[4/5] rounded-[1.5rem] overflow-hidden shadow-2xl shadow-[rgba(31,27,22,0.25)]">
              <Image
                src="/usame.jpeg"
                alt="Usame Muhammed"
                fill
                priority
                sizes="(max-width: 640px) 280px, 340px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 inset-x-4 flex items-center justify-between text-xs">
                <span className="font-mono text-[var(--accent)] tracking-widest">{dict.hero.stamp1}</span>
                <span className="font-mono text-[var(--muted)] tracking-widest">{dict.hero.stamp2}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.5em] uppercase text-[var(--muted)] flex flex-col items-center gap-2">
        {dict.hero.scroll}
        <span className="w-px h-12 bg-gradient-to-b from-[var(--accent)] to-transparent" />
      </div>
    </section>
  );
}

function About({ dict }: { dict: Dictionary }) {
  const lead = dict.about.lead;
  const d = dict.about.details;
  return (
    <section id="about" className="relative py-32 px-6 sm:px-10">
      <div className="max-w-5xl mx-auto">
        <SectionTitle index="01" title={dict.section.about} />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          <p className="md:col-span-8 font-display text-3xl sm:text-4xl leading-[1.25] text-balance">
            <span className="text-[var(--muted)]">{lead[0]}</span>
            {lead[1] ? ` ${lead[1]} ` : " "}
            <em className="text-[var(--accent)] not-italic">{lead[2]}</em>{" "}
            {lead[3]}
          </p>
          <div className="md:col-span-4 space-y-6 text-sm text-[var(--muted)] border-s border-[var(--line)] ps-6">
            <Detail label={d.location.label} value={d.location.value} />
            <Detail label={d.education.label} value={d.education.value} />
            <Detail label={d.current.label} value={d.current.value} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] mb-1">{label}</p>
      <p className="text-[var(--foreground)] leading-relaxed">{value}</p>
    </div>
  );
}

function Services({ dict }: { dict: Dictionary }) {
  return (
    <section id="services" className="relative py-32 px-6 sm:px-10">
      <div className="max-w-6xl mx-auto">
        <SectionTitle index="02" title={dict.section.services} />
        <p className="text-[var(--muted)] max-w-2xl mb-16 leading-relaxed">
          {dict.services.intro}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--line)] border border-[var(--line)]">
          {dict.services.items.map((item) => (
            <article
              key={item.kicker}
              className="group relative bg-[var(--background)] p-10 sm:p-12 overflow-hidden hover:bg-[var(--background-soft)]/60 transition"
            >
              <span
                aria-hidden
                className="absolute top-6 end-8 font-mono text-[10px] tracking-[0.4em] text-[var(--muted)]"
              >
                № {item.kicker}
              </span>
              <span
                aria-hidden
                className="absolute -top-4 -start-4 font-display italic text-[8rem] leading-none text-[var(--accent)]/8 select-none"
              >
                {item.kicker}
              </span>
              <div className="relative">
                <h3 className="font-display text-3xl sm:text-4xl mb-4 leading-tight">
                  {item.title}
                </h3>
                <span className="block w-10 h-px bg-[var(--accent)] mb-5 group-hover:w-20 transition-all duration-500" />
                <p className="text-[var(--foreground)]/80 leading-relaxed">
                  {item.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience({ dict }: { dict: Dictionary }) {
  return (
    <section id="experience" className="relative py-32 px-6 sm:px-10 bg-[var(--background-soft)]/40">
      <div className="max-w-5xl mx-auto">
        <SectionTitle index="03" title={dict.section.experience} />
        <ol className="relative space-y-16">
          <span className="absolute start-2 top-2 bottom-2 w-px bg-gradient-to-b from-[var(--accent)] via-[var(--line)] to-transparent" />
          {dict.experience.items.map((exp) => (
            <li key={exp.role} className="relative ps-12">
              <span className="absolute start-0 top-2 w-4 h-4 rounded-full border border-[var(--accent)] bg-[var(--background)]">
                <span className="absolute inset-1 rounded-full bg-[var(--accent)]" />
              </span>
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                <h3 className="font-display text-2xl sm:text-3xl">{exp.role}</h3>
                <span className="font-mono text-xs tracking-widest text-[var(--accent)]">{exp.period}</span>
              </div>
              <p className="text-[var(--muted)] mb-4 italic">{exp.company} · {exp.location}</p>
              <p className="text-[var(--foreground)]/85 leading-relaxed max-w-3xl">{exp.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Skills({ dict }: { dict: Dictionary }) {
  const catColor = (c: Skill["cat"]) =>
    c === "Engineering"
      ? "var(--accent)"
      : c === "Operations"
      ? "var(--secondary)"
      : "var(--foreground)";

  return (
    <section id="skills" className="relative py-32 px-6 sm:px-10 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <SectionTitle index="04" title={dict.section.skills} />
        <p className="text-[var(--muted)] max-w-2xl mb-20 leading-relaxed">
          {dict.skills.intro}
        </p>

        <div className="flex flex-wrap gap-6 mb-16 text-[10px] tracking-[0.3em] uppercase text-[var(--muted)]">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: "var(--accent)" }} />
            {dict.skills.categories.Engineering}
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: "var(--secondary)" }} />
            {dict.skills.categories.Operations}
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: "var(--foreground)" }} />
            {dict.skills.categories.Tooling}
          </span>
        </div>

        <div className="relative">
          <div
            className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent, var(--line) 12%, var(--line) 88%, transparent)",
            }}
          />

          <ul className="flex flex-col gap-10 md:gap-14">
            {skills.map((s, i) => {
              const right = i % 2 === 1;
              const idx = String(i + 1).padStart(2, "0");
              const label = dict.skills.labels[s.key as keyof typeof dict.skills.labels] ?? s.key;
              return (
                <li key={s.key} className="group grid md:grid-cols-2 items-center">
                  <div
                    className={`${
                      right
                        ? "md:col-start-2 md:ps-12 md:text-start md:items-start"
                        : "md:col-start-1 md:pe-12 md:text-end md:items-end"
                    } flex flex-col relative`}
                  >
                    <span
                      aria-hidden
                      className={`hidden md:block absolute top-1/2 h-px w-8 ${
                        right ? "-start-8" : "-end-8"
                      } group-hover:w-12 transition-all duration-500`}
                      style={{ background: catColor(s.cat) }}
                    />

                    <div
                      className={`flex items-baseline gap-4 ${
                        right ? "" : "md:flex-row-reverse"
                      }`}
                    >
                      <span
                        className="font-mono text-xs tracking-[0.3em]"
                        style={{ color: catColor(s.cat) }}
                      >
                        № {idx}
                      </span>
                      <h3 className="font-display text-3xl sm:text-5xl leading-none">
                        {s.cat === "Engineering" ? (
                          <em className="italic">{label}</em>
                        ) : (
                          label
                        )}
                      </h3>
                    </div>

                    <div
                      className={`mt-3 flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-[var(--muted)] ${
                        right ? "" : "md:flex-row-reverse"
                      }`}
                    >
                      <span>{dict.skills.categories[s.cat]}</span>
                      <span className="opacity-30">/</span>
                      <span className="flex gap-[3px]">
                        {Array.from({ length: 5 }).map((_, n) => (
                          <span
                            key={n}
                            className="block w-3 h-[2px]"
                            style={{
                              background:
                                n < s.weight ? catColor(s.cat) : "var(--line)",
                            }}
                          />
                        ))}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="mt-20 text-center font-display italic text-[var(--muted)] text-xl">
          {dict.skills.footer}
        </p>
      </div>
    </section>
  );
}

function Languages({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative py-32 px-6 sm:px-10">
      <div className="max-w-5xl mx-auto">
        <SectionTitle index="05" title={dict.section.languages} />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {dict.languages.items.map((l) => (
            <div
              key={l.name}
              className="group relative border border-[var(--line)] rounded-2xl p-8 hover:border-[var(--accent)] transition overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-[var(--accent)]/10 to-transparent" />
              <div className="relative">
                <p className="font-display text-3xl mb-2">{l.name}</p>
                <p className="text-[var(--accent)] text-sm tracking-widest uppercase mb-4">{l.level}</p>
                <p className="text-[var(--muted)] text-sm">{l.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ dict }: { dict: Dictionary }) {
  return (
    <section id="contact" className="relative py-32 px-6 sm:px-10">
      <div className="max-w-5xl mx-auto text-center">
        <SectionTitle index="06" title={dict.section.contact} centered />
        <p className="font-display text-4xl sm:text-6xl leading-tight text-balance mb-10">
          {dict.contact.headlineA} <br />
          <em className="text-[var(--accent)]">{dict.contact.headlineB}</em>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
          <a
            href="https://wa.me/905343321048"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 bg-[#25D366] text-white px-7 py-3.5 rounded-full text-sm tracking-wider uppercase font-medium hover:bg-[#1ebe5a] transition shadow-lg shadow-[#25D366]/20"
          >
            <WhatsAppIcon />
            {dict.contact.whatsapp}
          </a>
          <a
            href="mailto:ussama14863@gmail.com"
            className="group inline-flex items-center gap-3 border border-[var(--foreground)] text-[var(--foreground)] px-7 py-3.5 rounded-full text-sm tracking-wider uppercase font-medium hover:bg-[var(--foreground)] hover:text-[var(--background)] transition"
          >
            {dict.contact.email}
          </a>
        </div>

        <a
          href="mailto:ussama14863@gmail.com"
          className="inline-block font-display italic text-xl sm:text-2xl text-[var(--muted)] hover:text-[var(--accent)] transition"
        >
          ussama14863@gmail.com
        </a>

        <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-[var(--muted)]">
          <a
            href="https://www.linkedin.com/in/usame-muhammed-b9a18026a/"
            target="_blank"
            rel="noreferrer"
            className="fancy-link hover:text-[var(--foreground)]"
          >
            LinkedIn
          </a>
          <span className="opacity-30">·</span>
          <a
            href="https://github.com/usame132"
            target="_blank"
            rel="noreferrer"
            className="fancy-link hover:text-[var(--foreground)]"
          >
            GitHub
          </a>
          <span className="opacity-30">·</span>
          <a href="tel:+905343321048" className="fancy-link hover:text-[var(--foreground)]" dir="ltr">
            +90 534 332 10 48
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="relative px-6 sm:px-10 py-10 border-t border-[var(--line)]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--muted)] tracking-wider">
        <p>© {new Date().getFullYear()} Usame Muhammed</p>
        <p className="font-mono">
          {dict.footer.tagline} <span className="text-[var(--accent)]">·</span> Kahramanmaraş
        </p>
      </div>
    </footer>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
    >
      <path d="M19.05 4.91A10.04 10.04 0 0 0 12 2C6.5 2 2.04 6.46 2.04 11.96c0 1.76.46 3.47 1.34 4.98L2 22l5.21-1.36a9.94 9.94 0 0 0 4.78 1.22h.01c5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.04-5.16-2.91-7.02zM12 20.13a8.13 8.13 0 0 1-4.14-1.14l-.3-.18-3.09.81.83-3.01-.2-.31a8.16 8.16 0 0 1-1.25-4.34c0-4.51 3.67-8.18 8.18-8.18 2.18 0 4.23.85 5.78 2.4a8.13 8.13 0 0 1 2.4 5.78c0 4.51-3.68 8.17-8.21 8.17zm4.49-6.13c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.79.97-.15.16-.29.18-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.22-1.46-1.36-1.71-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.83-.2-.49-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.23.25-.86.84-.86 2.05 0 1.21.88 2.38 1.01 2.55.12.16 1.74 2.66 4.21 3.73.59.25 1.05.4 1.41.51.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.18-.48-.3z" />
    </svg>
  );
}

function SectionTitle({
  index,
  title,
  centered,
}: {
  index: string;
  title: string;
  centered?: boolean;
}) {
  return (
    <div className={`mb-14 ${centered ? "text-center" : ""}`}>
      <p className="text-xs tracking-[0.4em] uppercase text-[var(--accent)] mb-3">— {index}</p>
      <h2 className="font-display text-5xl sm:text-7xl">{title}</h2>
      <div className={`divider mt-6 ${centered ? "max-w-xs mx-auto" : "max-w-md"}`} />
    </div>
  );
}
