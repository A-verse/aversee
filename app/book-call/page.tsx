"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Globe2,
  MessageSquare,
  Phone,
} from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { BehindTheCurtains, ContactFooter } from "@/components/home-sections";

type Tab = "call" | "message";

const meetingTimes = [
  "5:00pm",
  "5:30pm",
  "6:00pm",
  "6:30pm",
  "7:00pm",
  "7:30pm",
  "8:00pm",
  "8:30pm",
  "9:00pm",
];

const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export default function BookCallPage() {
  const [activeTab, setActiveTab] = useState<Tab>("call");
  const [selectedDay, setSelectedDay] = useState(14);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [monthOffset, setMonthOffset] = useState(0);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const calendar = useMemo(() => {
    const date = new Date(2026, 8 + monthOffset, 1);

    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return {
      year,
      month,
      firstDay,
      daysInMonth,
      label: date.toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      }),
    };
  }, [monthOffset]);

  const calendarDays = useMemo(() => {
    const days: Array<number | null> = [];

    for (let i = 0; i < calendar.firstDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= calendar.daysInMonth; day++) {
      days.push(day);
    }

    return days;
  }, [calendar]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setForm({
        name: "",
        email: "",
        message: "",
      });

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <SiteShell>
      <main className="book-call-page">
        {/* HERO */}
        <section className="book-call-hero">
          <div className="book-call-hero-content">
            <p className="book-call-eyebrow">
              SCHEDULE / CONNECT / COLLABORATE
            </p>

            <h1 className="book-call-title">
              <span>BOOK A</span>
              <span className="muted">CALL</span>
              <span>WITH ME</span>
            </h1>
          </div>

          <div className="book-call-avatar">
            <Image
              src="images/avatar.jpg"
              alt="Avatar"
              fill
              priority
              sizes="(max-width: 768px) 240px, 390px"
              className="book-call-avatar-image"
            />
          </div>
        </section>

        {/* TABS */}
        <div className="book-call-tabs">
          <button
            type="button"
            className={`book-call-tab ${activeTab === "call" ? "active" : ""}`}
            onClick={() => setActiveTab("call")}
          >
            <Phone size={25} strokeWidth={2} />
            <span>Book a Call</span>
          </button>

          <button
            type="button"
            className={`book-call-tab ${
              activeTab === "message" ? "active" : ""
            }`}
            onClick={() => setActiveTab("message")}
          >
            <MessageSquare size={25} strokeWidth={2} />
            <span>Send a Message</span>
          </button>
        </div>

        {/* CALL */}
        {activeTab === "call" && (
          <section className="scheduler-section">
            <button type="button" className="meeting-select">
              <span>30 Min Meeting</span>
              <ChevronDown size={18} />
            </button>

            <div className="scheduler">
              {/* LEFT INFO */}
              <aside className="scheduler-info">
                <div className="scheduler-profile">
                  <div className="scheduler-avatar">
                    <Image src="/images/avatar.jpg" alt="" fill sizes="40px" />
                  </div>

                  <span>Parth Sharma</span>
                </div>

                <h2>Quick Call</h2>

                <p>
                  A dedicated half-hour consultation to discuss your product,
                  business or startup and help you make better product, design
                  and technical decisions.
                </p>

                <div className="scheduler-meta">
                  <div>
                    <Clock3 size={19} />
                    <span>30m</span>
                  </div>

                  <div>
                    <span className="meet-icon">●</span>
                    <span>Google Meet</span>
                  </div>

                  <div>
                    <Globe2 size={19} />
                    <span>Asia/Kolkata</span>
                    <ChevronDown size={16} />
                  </div>
                </div>
              </aside>

              {/* CALENDAR */}
              <div className="scheduler-calendar">
                <div className="calendar-header">
                  <h3>
                    {calendar.label.split(" ")[0]} <span>{calendar.year}</span>
                  </h3>

                  <div className="calendar-arrows">
                    <button
                      type="button"
                      aria-label="Previous month"
                      onClick={() => setMonthOffset((current) => current - 1)}
                    >
                      <ChevronLeft size={18} />
                    </button>

                    <button
                      type="button"
                      aria-label="Next month"
                      onClick={() => setMonthOffset((current) => current + 1)}
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>

                <div className="calendar-grid weekdays">
                  {weekdays.map((day) => (
                    <span key={day}>{day}</span>
                  ))}
                </div>

                <div className="calendar-grid">
                  {calendarDays.map((day, index) => {
                    if (!day) {
                      return <span key={`empty-${index}`} />;
                    }

                    const isSelected = day === selectedDay;

                    /*
                     * Keep the visual treatment close to the reference:
                     * current available dates are shown as selectable blocks.
                     */
                    const isAvailable =
                      monthOffset === 0 && day >= 14 && day <= 30;

                    return (
                      <button
                        key={day}
                        type="button"
                        disabled={!isAvailable}
                        className={[
                          "calendar-day",
                          isAvailable ? "available" : "",
                          isSelected ? "selected" : "",
                        ].join(" ")}
                        onClick={() => {
                          setSelectedDay(day);
                          setSelectedTime(null);
                        }}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* TIME SLOTS */}
              <aside className="time-slots">
                <div className="time-header">
                  <strong>Mon {selectedDay}th</strong>

                  <div className="time-format">
                    <button type="button" className="selected">
                      12h
                    </button>
                    <button type="button">24h</button>
                  </div>
                </div>

                <div className="time-list">
                  {meetingTimes.map((time) => (
                    <button
                      key={time}
                      type="button"
                      className={`time-slot ${
                        selectedTime === time ? "selected" : ""
                      }`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </aside>
            </div>
          </section>
        )}

        {/* MESSAGE */}
        {activeTab === "message" && (
          <section className="message-section">
            <div className="message-heading">
              <h2>Send me a message</h2>
              <p>
                Have a question or want to work together? Drop me a message!
              </p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor="name">
                  Name <span>(optional)</span>
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                />
              </div>

              <div className="form-field">
                <label htmlFor="email">
                  Email <b>*</b>
                </label>

                <input
                  id="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                />
              </div>

              <div className="form-field">
                <div className="message-label-row">
                  <label htmlFor="message">
                    Message <b>*</b>
                  </label>

                  <span>{form.message.length}/1000</span>
                </div>

                <textarea
                  id="message"
                  required
                  maxLength={1000}
                  placeholder="What would you like to discuss?"
                  value={form.message}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      message: event.target.value,
                    }))
                  }
                />
              </div>

              <button
                type="submit"
                className="send-message-button"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>

              {status === "success" && (
                <p className="form-status success">
                  Message sent successfully.
                </p>
              )}

              {status === "error" && (
                <p className="form-status error">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </section>
        )}

        <Link href="/" className="back-home">
          <ArrowLeft size={16} />
          Back home
        </Link>

        <BehindTheCurtains />
        <ContactFooter />
      </main>

      <style jsx global>{`
        .book-call-page {
          min-height: 100vh;
          background: #000;
          color: #f5f5f5;
          overflow: hidden;
        }

        /* ---------------- HERO ---------------- */

        .book-call-hero {
          position: relative;
          min-height: 610px;
          max-width: 1500px;
          margin: 0 auto;
          padding: 115px 42px 70px;
          display: flex;
          align-items: center;
        }

        .book-call-hero-content {
          position: relative;
          z-index: 2;
        }

        .book-call-eyebrow {
          margin: 0 0 34px;
          font-size: 16px;
          line-height: 1;
          letter-spacing: 0.32em;
          color: #a2a2a2;
          font-weight: 500;
        }

        .book-call-title {
          display: flex;
          flex-direction: column;
          margin: 0;
          font-size: clamp(76px, 7vw, 132px);
          line-height: 0.76;
          letter-spacing: -0.065em;
          font-weight: 900;
          text-transform: uppercase;
        }

        .book-call-title span {
          display: block;
        }

        .book-call-title .muted {
          color: #525252;
        }

        .book-call-avatar {
          position: absolute;
          width: 385px;
          height: 385px;
          right: 95px;
          top: 145px;
          overflow: hidden;
          border: 2px solid #262626;
          border-radius: 50%;
          background: #111;
        }

        .book-call-avatar-image {
          object-fit: cover;
        }

        /* ---------------- TABS ---------------- */

        .book-call-tabs {
          position: relative;
          z-index: 5;
          display: flex;
          justify-content: center;
          gap: 18px;
          margin: -10px auto 72px;
        }

        .book-call-tab {
          width: 282px;
          height: 74px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 17px;
          border: 1px solid #242424;
          border-radius: 15px;
          background: #0b0b0b;
          color: #f4f4f4;
          font-size: 19px;
          font-weight: 700;
          cursor: pointer;
          transition:
            background 180ms ease,
            color 180ms ease,
            transform 180ms ease;
        }

        .book-call-tab:hover {
          transform: translateY(-2px);
          background: #151515;
        }

        .book-call-tab.active {
          color: #050505;
          background: #fff;
          border-color: #fff;
        }

        /* ---------------- SCHEDULER ---------------- */

        .scheduler-section {
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 20px 100px;
        }

        .meeting-select {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          min-width: 185px;
          height: 46px;
          margin: 0 auto 19px;
          padding: 0 20px;
          border: 1px solid #292929;
          border-radius: 10px;
          background: #0d0d0d;
          color: #f5f5f5;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
        }

        .scheduler {
          display: grid;
          grid-template-columns: 288px 1fr 285px;
          min-height: 540px;
          overflow: hidden;
          border: 1px solid #252525;
          border-radius: 20px;
          background: #171717;
        }

        .scheduler-info {
          padding: 30px 28px;
          border-right: 1px solid #282828;
        }

        .scheduler-profile {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 17px;
          color: #aaa;
          font-size: 15px;
          font-weight: 600;
        }

        .scheduler-avatar {
          position: relative;
          width: 30px;
          height: 30px;
          overflow: hidden;
          border-radius: 50%;
        }

        .scheduler-avatar img {
          object-fit: cover;
        }

        .scheduler-info h2 {
          margin: 0 0 13px;
          font-size: 25px;
          line-height: 1;
          font-weight: 700;
        }

        .scheduler-info > p {
          margin: 0;
          color: #c5c5c5;
          font-size: 17px;
          line-height: 1.42;
        }

        .scheduler-meta {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-top: 39px;
          color: #cfcfcf;
          font-size: 16px;
          font-weight: 600;
        }

        .scheduler-meta div {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .meet-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          color: #4285f4;
          font-size: 12px;
        }

        .scheduler-calendar {
          padding: 27px 29px;
        }

        .calendar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 26px;
        }

        .calendar-header h3 {
          margin: 0;
          font-size: 20px;
          font-weight: 700;
        }

        .calendar-header h3 span {
          color: #8e8e8e;
          font-weight: 500;
        }

        .calendar-arrows {
          display: flex;
          gap: 10px;
        }

        .calendar-arrows button {
          width: 28px;
          height: 28px;
          border: 0;
          background: transparent;
          color: #777;
          cursor: pointer;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 5px;
        }

        .weekdays {
          margin-bottom: 12px;
        }

        .weekdays span {
          padding: 0 0 4px;
          color: #e5e5e5;
          font-size: 13px;
          font-weight: 700;
          text-align: center;
          letter-spacing: 0.04em;
        }

        .calendar-day {
          height: 60px;
          border: 0;
          border-radius: 10px;
          background: transparent;
          color: #aaa;
          font-size: 16px;
          cursor: default;
        }

        .calendar-day.available {
          background: #414141;
          color: #f5f5f5;
          font-weight: 700;
          cursor: pointer;
        }

        .calendar-day.available:hover {
          background: #505050;
        }

        .calendar-day.selected {
          background: #fff;
          color: #111;
        }

        .time-slots {
          padding: 27px 24px;
          border-left: 1px solid #282828;
        }

        .time-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 14px;
        }

        .time-header strong {
          font-size: 18px;
        }

        .time-format {
          display: flex;
          padding: 3px;
          border-radius: 10px;
          background: #252525;
        }

        .time-format button {
          min-width: 42px;
          height: 31px;
          border: 0;
          border-radius: 8px;
          background: transparent;
          color: #aaa;
          font-weight: 600;
          cursor: pointer;
        }

        .time-format button.selected {
          background: #111;
          color: #fff;
        }

        .time-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-height: 465px;
          overflow-y: auto;
          padding-right: 1px;
        }

        .time-slot {
          flex: 0 0 auto;
          height: 43px;
          border: 1px solid #393939;
          border-radius: 11px;
          background: #101010;
          color: #d6d6d6;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: 160ms ease;
        }

        .time-slot:hover,
        .time-slot.selected {
          border-color: #fff;
          background: #fff;
          color: #000;
        }

        /* ---------------- MESSAGE ---------------- */

        .message-section {
          width: min(807px, calc(100% - 40px));
          margin: 0 auto;
          padding: 0 0 100px;
        }

        .message-heading {
          text-align: center;
          margin-bottom: 42px;
        }

        .message-heading h2 {
          margin: 0 0 13px;
          font-size: 28px;
          letter-spacing: -0.03em;
          font-weight: 800;
        }

        .message-heading p {
          margin: 0;
          color: #aaa;
          font-size: 18px;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 31px;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 11px;
        }

        .form-field label,
        .message-label-row label {
          color: #d6d6d6;
          font-size: 15px;
          font-weight: 600;
        }

        .form-field label span {
          color: #888;
          font-weight: 400;
        }

        .form-field label b,
        .message-label-row label b {
          color: #f87171;
        }

        .form-field input,
        .form-field textarea {
          width: 100%;
          border: 1px solid #292929;
          border-radius: 15px;
          outline: none;
          background: #0d0d0d;
          color: #f5f5f5;
          font-family: inherit;
          font-size: 17px;
          transition: border-color 160ms ease;
          box-sizing: border-box;
        }

        .form-field input {
          height: 59px;
          padding: 0 20px;
        }

        .form-field textarea {
          min-height: 175px;
          resize: vertical;
          padding: 18px 20px;
        }

        .form-field input::placeholder,
        .form-field textarea::placeholder {
          color: #555;
        }

        .form-field input:focus,
        .form-field textarea:focus {
          border-color: #555;
        }

        .message-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .message-label-row > span {
          color: #888;
          font-size: 13px;
        }

        .send-message-button {
          align-self: flex-start;
          height: 54px;
          padding: 0 28px;
          border: 0;
          border-radius: 12px;
          background: #fff;
          color: #000;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
        }

        .send-message-button:disabled {
          opacity: 0.55;
          cursor: wait;
        }

        .form-status {
          margin: -15px 0 0;
          font-size: 14px;
        }

        .form-status.success {
          color: #65d99a;
        }

        .form-status.error {
          color: #f87171;
        }

        /* ---------------- FOOTER ---------------- */

        .back-home {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          width: fit-content;
          margin: 0 auto 80px;
          color: #777;
          font-size: 14px;
          text-decoration: none;
          transition: color 160ms ease;
        }

        .back-home:hover {
          color: #fff;
        }

        /* ---------------- MOBILE ---------------- */

        @media (max-width: 1100px) {
          .book-call-avatar {
            right: 45px;
            width: 310px;
            height: 310px;
          }

          .scheduler {
            grid-template-columns: 250px 1fr;
          }

          .time-slots {
            grid-column: 1 / -1;
            border-top: 1px solid #282828;
            border-left: 0;
          }

          .time-list {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            max-height: none;
          }
        }

        @media (max-width: 768px) {
          .book-call-hero {
            min-height: 520px;
            padding: 100px 24px 50px;
            align-items: flex-start;
          }

          .book-call-eyebrow {
            font-size: 11px;
            letter-spacing: 0.22em;
          }

          .book-call-title {
            font-size: clamp(58px, 15vw, 100px);
          }

          .book-call-avatar {
            width: 190px;
            height: 190px;
            right: 20px;
            top: 315px;
          }

          .book-call-tabs {
            gap: 10px;
            margin: -5px 20px 50px;
          }

          .book-call-tab {
            width: 50%;
            height: 62px;
            font-size: 15px;
            gap: 9px;
          }

          .book-call-tab svg {
            width: 20px;
            height: 20px;
          }

          .scheduler-section {
            padding-inline: 14px;
          }

          .scheduler {
            display: block;
          }

          .scheduler-info {
            border-right: 0;
            border-bottom: 1px solid #282828;
          }

          .scheduler-calendar {
            padding: 25px 16px;
          }

          .calendar-day {
            height: 48px;
          }

          .time-slots {
            padding: 24px 16px;
          }

          .time-list {
            grid-template-columns: repeat(2, 1fr);
          }

          .message-section {
            width: calc(100% - 32px);
          }

          .message-heading h2 {
            font-size: 25px;
          }

          .message-heading p {
            font-size: 15px;
          }
        }

        @media (max-width: 480px) {
          .book-call-hero {
            min-height: 500px;
          }

          .book-call-avatar {
            width: 160px;
            height: 160px;
            top: 325px;
          }

          .book-call-title {
            font-size: 58px;
          }

          .book-call-tab {
            font-size: 13px;
          }

          .scheduler-profile {
            font-size: 14px;
          }

          .scheduler-info > p {
            font-size: 15px;
          }

          .time-list {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </SiteShell>
  );
}
