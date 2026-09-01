"use client";

import { Button } from "@base-ui/react/button";
import { Reveal } from "./reveal";

export function NameHero() {
  return (
    <section className="name-hero">
      <Reveal stagger={0.15}>
        <Button
          ref="https://www.linkedin.com/in/theanjalikamal"
          className="name-hero-pill"
          data-reveal
        >
          Say Hi on Linkedin
        </Button>
        <h1 className="name-hero-name" data-reveal>
          ANJALI
        </h1>
        <p className="name-hero-tagline" data-reveal>
          I DESIGN AND BUILD PRODUCTS THAT
          <br />
          <em>ship, and actually work.</em>
        </p>
        <div className="name-hero-badges" data-reveal>
          <div className="name-hero-badge">
            <span>📍</span>
            <div>
              <strong>BASED IN JABALPUR,</strong>
              <small>INDIA</small>
            </div>
          </div>
          <div className="name-hero-badge">
            <span>💻</span>
            <div>
              <strong>FULL STACK DEV,</strong>
              <small>&amp; Design</small>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
