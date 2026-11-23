import type { CSSProperties } from "react";
import { clients } from "@/data/journey";
import { site } from "@/data/site";
import { stack } from "@/data/stack";
import type { Locale } from "@/lib/i18n";
import { messages } from "@/messages";
import { Clock } from "./Clock";
import { CopyEmail } from "./CopyEmail";
import { CompanyLogo, Journey } from "./Journey";
import { LanguageMenu } from "./LanguageMenu";
import { Mark } from "./Mark";
import { PageField } from "./PageField";
import { PrintRows } from "./PrintRows";
import { SectionIndex } from "./SectionIndex";
import { ThemeToggle } from "./ThemeToggle";
import { Tile } from "./Tile";

// The one-page portfolio in one language.
export function Portfolio({ locale }: { locale: Locale }) {
  const m = messages[locale];
  const index = [
    { id: "about", label: m.nav.about },
    { id: "journey", label: m.nav.journey },
    { id: "now", label: m.nav.now },
    { id: "languages", label: m.nav.languages },
    { id: "stack", label: m.nav.stack },
    { id: "contact", label: m.nav.contact },
  ];
  const mailto = `mailto:${site.email}`;
  const [rt, lx] = clients;

  return (
    <>
      <header className="topbar">
        <a className="brand" href="#top" aria-label={site.name}><Mark className="brand-mark" /></a>
        <SectionIndex label={m.nav.label} links={index} />
        <div className="controls">
          <LanguageMenu locale={locale} label={m.controls.language} />
          <ThemeToggle label={m.controls.theme} />
        </div>
      </header>
      <main>
        <div className="page"><div className="column">
          {/* Live clock band: Encarnación local time */}
          <div className="band" aria-label={m.clock.label}>
            <span className="band-tz meta" id="tz">{m.clock.zone}</span>
            <Clock locale={locale} />
          </div>
          <section className="block" id="about" aria-labelledby="name">
            <div className="hero-top">
              <div className="who">
                <Tile className="avatar" loadedClass="has-photo" mono={site.initials} src={site.photo.src} srcSet={site.photo.srcSet} sizes="72px" size={72} ariaHidden />
                <div>
                  <h1 className="name" id="name">{site.name}</h1>
                  <p className="role"><span>{m.hero.role}</span><span aria-hidden="true">·</span><span>{m.hero.country}</span></p>
                </div>
              </div>
            </div>

            <p className="lead">{m.hero.lead}</p>
            <ul className="bullets">
              <li>{m.hero.experience}</li>
              <li>
                {m.hero.clients.before}<a className="tlink" href="#now">{rt.org}</a>{m.hero.clients.between}<a className="tlink" href="#now">{lx.org}</a>{m.hero.clients.after}
              </li>
              <li>{m.hero.focus}</li>
            </ul>

            <p className="status"><span className="live" aria-hidden="true"></span><span>{m.hero.status}</span></p>

            <div className="actions">
              <a className="primary" href={mailto}><svg><use href="#i-mail" /></svg><span>{m.hero.emailMe}</span></a>
              <CopyEmail email={site.email} copy={m.email.copy} copied={m.email.copied} />
            </div>
            <div className="socials">
              <span className="meta">{m.hero.findMe}</span>
              {site.socials.map(s => (
                <a className="chip" href={s.href} target="_blank" rel="noopener" key={s.name}>{`${s.name} `}<svg><use href="#i-arrow" /></svg></a>
              ))}
            </div>
            <div className="today">
              <p className="meta">{m.hero.today}</p>
              {clients.map(c => (
                <a className="today-item" href="#now" key={c.id}>
                  <CompanyLogo logo={c.logo} />
                  <span><b>{c.org}</b><span className="where">{m.clients[c.id].today}</span></span>
                </a>
              ))}
            </div>
          </section>
        </div></div>
        <Journey locale={locale} />
        <div className="page"><div className="column">
          <section className="block" id="stack" aria-labelledby="stack-title">
            <h2 className="block-title" id="stack-title"><span>{m.stack.title}</span></h2>
            <div className="stack">
              {stack.map(({ group, tools }) => (
                <div className="stack-row" key={group}>
                  <span className="meta">{m.stack.groups[group]}</span>
                  <div className="tags">
                    {tools.map(t => (
                      <span className="tag" key={t.name}>
                        {t.icon && <i className="tool-icon" style={{ "--icon": `url(/icons/${t.icon}.svg)` } as CSSProperties} aria-hidden="true"></i>}
                        {t.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="block contact" id="contact" aria-labelledby="contact-title">
            <h2 className="block-title" id="contact-title"><span>{m.contact.title}</span></h2>
            <p>{m.contact.text}</p>
            <div className="actions">
              <a className="chip" href={mailto}><svg><use href="#i-mail" /></svg><span>{site.email}</span></a>
              <CopyEmail email={site.email} copy={m.email.copy} copied={m.email.copied} />
            </div>
          </section>
          <footer className="block footer">
            <span className="meta">{`© ${site.year} ${site.name}`}</span>
            <span className="meta"><span lang="gn">{site.thanks}</span> <span>{m.footer.thanks}</span></span>
          </footer>
        </div></div>
      </main>
      <PageField />
      <PrintRows />
    </>
  );
}

