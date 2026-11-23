import { chapters, proverb, spoken, stamps, type Badge, type Chapter, type Client, type Education, type Job, type Logo, type Period, type Tag } from "@/data/journey";
import { site } from "@/data/site";
import { localeInfo, type Locale } from "@/lib/i18n";
import { messages, type Messages } from "@/messages";
import { JourneyStage } from "./JourneyStage";
import { Tile } from "./Tile";

// The career as chapters beside the pinned globe (JourneyStage). Everything here renders on the server.
export function Journey({ locale }: { locale: Locale }) {
  const m = messages[locale];
  const period = (p: Period) => formatPeriod(p, locale, m.dates.present);
  return (
    <JourneyStage>
      {chapters.map(ch => {
        const copy = m.chapters[ch.step];
        return (
          <section className="chapter block" id={ch.id} data-step={ch.step} key={ch.id}>
            <p className="meta chapter-meta">{copy.meta}</p>
            <h2 className="chapter-title">{copy.title}</h2>
            {"text" in copy && <p className="chapter-text">{copy.text}</p>}
            <ChapterBody chapter={ch} m={m} period={period} />
          </section>
        );
      })}
    </JourneyStage>
  );
}

type Format = (p: Period) => string;

function ChapterBody({ chapter, m, period }: { chapter: Chapter; m: Messages; period: Format }) {
  switch (chapter.kind) {
    case "rows":
      return (
        <div className="rows">
          {chapter.rows.map(row => (row.kind === "education" ? <EducationRow row={row} m={m} key={row.id} /> : <JobRow row={row} m={m} period={period} key={row.id} />))}
        </div>
      );
    case "now":
      return <Now chapter={chapter} m={m} period={period} />;
    case "world":
      return <World m={m} />;
  }
}

function EducationRow({ row, m }: { row: Education; m: Messages }) {
  const t = m.education[row.id];
  return (
    <div className="row">
      <CompanyLogo logo={row.logo} lazy />
      <div>
        <div className="row-head"><span className="org">{row.org}</span></div>
        <div className="title-line">{t.title}</div>
        <div className="when"><span className="meta">{`${row.years[0]} — ${row.years[1]}`}</span><span className="where">{t.place}</span></div>
      </div>
    </div>
  );
}

// A past role: the summary row expands in place to bullets and tags
function JobRow({ row, m, period }: { row: Job; m: Messages; period: Format }) {
  const t = m.jobs[row.id];
  return (
    <details className="xrow">
      <summary className="row-sum">
        <CompanyLogo logo={row.logo} lazy />
        <div>
          <div className="row-head"><span className="org">{row.org}</span><Badges badges={row.badges} m={m} /></div>
          <div className="title-line">{t.title}</div>
          <div className="when"><span className="meta">{period(row.period)}</span><svg className="chev"><use href="#i-chev" /></svg><span className="where">{t.place}</span></div>
        </div>
      </summary>
      <div className="detail">
        <ul className="bullets">
          {t.bullets.map(b => <li key={b}>{b}</li>)}
        </ul>
        <Tags tags={row.tags} m={m} />
      </div>
    </details>
  );
}

function Now({ chapter, m, period }: { chapter: Extract<Chapter, { kind: "now" }>; m: Messages; period: Format }) {
  return (
    <div className="now">
      <div className="now-head">
        <div className="logo is-accent">{site.initials}</div>
        <div>
          <div className="row-head"><span className="org">{m.independent.org}</span><Badges badges={chapter.badges} m={m} /></div>
          <div className="title-line">{m.independent.title}</div>
          <div className="when"><span className="meta">{period(chapter.period)}</span><span className="live" aria-hidden="true"></span></div>
        </div>
      </div>
      <p className="meta client-label">{m.independent.clients}</p>
      <div className="clients">
        {chapter.clients.map(c => <ClientRow client={c} m={m} period={period} key={c.id} />)}
      </div>
    </div>
  );
}

function ClientRow({ client, m, period }: { client: Client; m: Messages; period: Format }) {
  const t = m.clients[client.id];
  return (
    <div className="row">
      <CompanyLogo logo={client.logo} lazy />
      <div>
        <div className="row-head"><span className="org">{client.org}</span></div>
        <div className="title-line">{t.title}</div>
        <div className="when">
          <span className="meta">{client.period === "ongoing" ? m.dates.ongoing : period(client.period)}</span>
          <span className="where">{t.place}</span>
          <a className="tlink" href={client.link.href} target="_blank" rel="noopener">{client.link.label}</a>
        </div>
        <div className="detail">
          <p>{t.description}</p>
          <Tags tags={client.tags} m={m} />
        </div>
      </div>
    </div>
  );
}

function World({ m }: { m: Messages }) {
  const w = m.world;
  return (
    <>
      <ul className="langs">
        {spoken.map(s => (
          <li className="lang" key={s.lang}>
            <b lang={s.lang}>
              {/* eslint-disable-next-line @next/next/no-img-element -- 20x15 SVG flag */}
              <img className="flag" src={`/flags/${s.flag}.svg`} alt="" width={20} height={15} />
              {"note" in s ? <>{`${s.name} `}<span className="meta">{s.note}</span></> : s.name}
            </b>
            <span className="meta">{w.levels[s.level]}</span>
          </li>
        ))}
      </ul>
      <blockquote className="quote">
        <p lang="gn">{proverb}</p>
        <p>{w.quote}</p>
      </blockquote>
      <div className="travel">
        <div className="travel-head">
          <span className="meta passport-label"><svg aria-hidden="true"><use href="#i-passport" /></svg><span>{w.passport}</span></span>
          <span className="meta">{w.count}</span>
        </div>
        <div className="stamps">
          {stamps.map(s => (
            <div className={s.home ? "stamp is-home" : "stamp"} key={s.code}><span className="dot">{s.code}</span><small>{w.places[s.code]}</small></div>
          ))}
        </div>
        <div className="legend-row meta">
          <span><i className="key is-home"></i><span>{w.lived}</span></span>
          <span><i className="key"></i><span>{w.visited}</span></span>
        </div>
      </div>
    </>
  );
}

function Badges({ badges, m }: { badges: readonly Badge[]; m: Messages }) {
  return badges.map(b => <span className="badge" key={b}>{m.badges[b]}</span>);
}

function Tags({ tags, m }: { tags: readonly Tag[]; m: Messages }) {
  return (
    <div className="tags">
      {tags.map(tag => {
        const text = typeof tag === "string" ? tag : m.tags[tag.word];
        return <span className="tag" key={text}>{text}</span>;
      })}
    </div>
  );
}

// The logo file on a tile, or the monogram when there is none (or it fails to load)
export function CompanyLogo({ logo, lazy }: { logo: Logo; lazy?: boolean }) {
  if (!logo.src) return <div className="logo">{logo.mono}</div>;
  return <Tile className={logo.full ? "logo is-full" : "logo"} loadedClass="has-img" mono={logo.mono} src={logo.src} size={40} lazy={lazy} />;
}

// "Jul 2023 — Present", months in the page's language, formatted at build time
function formatPeriod({ from, to }: Period, locale: Locale, present: string) {
  const month = new Intl.DateTimeFormat(localeInfo[locale].intl, { month: "short", year: "numeric", timeZone: "UTC" });
  const f = (ym: string) => month.format(new Date(`${ym}-02T00:00:00Z`));
  return `${f(from)} — ${to === "present" ? present : f(to)}`;
}
