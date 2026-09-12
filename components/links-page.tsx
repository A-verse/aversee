import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SiteShell } from "./site-shell";
import { BehindTheCurtains, ContactFooter } from "./home-sections";
import styles from "./links-page.module.css";

const links = [
  {
    number: "01",
    label: "GITHUB",
    handle: "@A-verse",
    href: "https://github.com/A-verse",
  },
  {
    number: "02",
    label: "X",
    handle: "",
    href: "https://x.com/",
  },
  {
    number: "03",
    label: "LINKEDIN",
    handle: "theanjalikamal",
    href: "https://linkedin.com/in/theanjalikamal",
  },
  {
    number: "04",
    label: "LEETCODE",
    handle: "@A-verse",
    href: "https://leetcode.com/u/A-verse/",
  },
  {
    number: "05",
    label: "INSTAGRAM",
    handle: "@anjalikamal31",
    href: "https://instagram.com/anjalikamal31",
  },
  {
    number: "06",
    label: "EMAIL",
    handle: "anjalikamal3105@gmail.com",
    href: "mailto:anjalikamal3105@gmail.com",
  },
];

export function LinksPage() {
  return (
    <SiteShell>
      <main className={styles.page}>
        {/* HERO */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>CONNECT / FOLLOW / CHAT</p>

            <h1 className={styles.title}>
              <span>MY</span>
              <span className={styles.titleMuted}>DIGITAL</span>
              <span>PRESENCE</span>
            </h1>
          </div>

          <div className={styles.avatar}>
            <Image
              src="/images/avatar.jpg"
              alt="Parth Sharma"
              fill
              priority
              sizes="390px"
              className={styles.avatarImage}
            />
          </div>
        </section>

        {/* DIVIDER */}
        <div className={styles.divider} />

        {/* LINKS */}
        <section className={styles.linksList}>
          {links.map((link) => {
            const isEmail = link.href.startsWith("mailto:");

            return (
              <a
                key={link.number}
                href={link.href}
                target={isEmail ? undefined : "_blank"}
                rel={isEmail ? undefined : "noopener noreferrer"}
                className={styles.link}
              >
                <span className={styles.number}>{link.number}</span>

                <div className={styles.label}>
                  <span>{link.label}</span>

                  {link.handle && <small>{link.handle}</small>}
                </div>

                <div className={styles.action}>
                  <span className={styles.visit}>VISIT</span>

                  <span className={styles.arrow}>
                    <ArrowUpRight size={27} strokeWidth={1.8} />
                  </span>
                </div>
              </a>
            );
          })}
        </section>

        {/* EXISTING SITE SECTIONS */}
        <BehindTheCurtains />
        <ContactFooter />
      </main>
    </SiteShell>
  );
}
