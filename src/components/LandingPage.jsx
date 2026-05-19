"use client";

import { useMemo, useRef, useState } from "react";

const initialForm = {
  name: "",
  phone: "",
  preferredSchedule: "",
  participantCount: "1",
  message: "",
  privacyConsent: false,
};

export default function LandingPage({
  introItems,
  preparationItems,
  schedules,
  workshop,
}) {
  const formRef = useRef(null);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [resultMessage, setResultMessage] = useState("");

  const availableSchedules = useMemo(
    () => schedules.filter((schedule) => schedule.status !== "closed"),
    [schedules],
  );

  function moveToForm(scheduleLabel) {
    setResultMessage("");
    setStatus("idle");
    if (scheduleLabel) {
      setForm((current) => ({
        ...current,
        preferredSchedule: scheduleLabel,
      }));
    }
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function updateField(event) {
    const { name, type, checked, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  async function submitInquiry(event) {
    event.preventDefault();
    setStatus("submitting");
    setResultMessage("");
    setErrors({});

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const payload = await response.json();

      if (!response.ok) {
        setErrors(payload.errors || {});
        setResultMessage(
          payload.message || "문의 접수에 실패했습니다. 잠시 후 다시 시도해 주세요.",
        );
        setStatus("error");
        return;
      }

      setStatus("success");
      setResultMessage("문의가 접수되었습니다. 운영자가 확인 후 연락드립니다.");
      setForm(initialForm);
    } catch (error) {
      setStatus("error");
      setResultMessage("문의 접수에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <main>
      <header className="site-header" aria-label="상단">
        <a className="brand" href="#top" aria-label="첫 화면으로 이동">
          {workshop.brand}
        </a>
        <button className="text-button" type="button" onClick={() => moveToForm()}>
          문의하기
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-content">
          <span className="eyebrow">{workshop.badge}</span>
          <h1>{workshop.title}</h1>
          <p>{workshop.description}</p>
          <dl className="quick-facts" aria-label="워크숍 핵심 정보">
            <div>
              <dt>대상</dt>
              <dd>{workshop.target}</dd>
            </div>
            <div>
              <dt>장소</dt>
              <dd>{workshop.location}</dd>
            </div>
            <div>
              <dt>가격</dt>
              <dd>{workshop.price}</dd>
            </div>
          </dl>
          <button className="primary-button" type="button" onClick={() => moveToForm()}>
            문의하기
          </button>
        </div>
        <figure className="hero-media">
          <img
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80"
            alt="테이블에 모여 노트북으로 실습하는 워크숍 참여자들"
          />
          <figcaption>오프라인 실습 테이블</figcaption>
        </figure>
      </section>

      <section className="section intro-section" aria-labelledby="intro-heading">
        <div className="section-heading">
          <h2 id="intro-heading">워크숍 소개</h2>
          <p>
            짧은 설명보다 직접 해보는 시간을 중심으로 구성했습니다. 결과물을
            만들며 기본 흐름을 익히는 것이 목표입니다.
          </p>
        </div>
        <ol className="intro-list">
          {introItems.map((item, index) => (
            <li key={item}>
              <span aria-hidden="true">{index + 1}</span>
              {item}
            </li>
          ))}
        </ol>
      </section>

      <section className="section" aria-labelledby="schedule-heading">
        <div className="section-heading">
          <h2 id="schedule-heading">일정 안내</h2>
          <p>희망 일정을 문의 폼에서 선택해 주세요. 일정 선택은 예약 확정이 아닙니다.</p>
        </div>
        <div className="schedule-grid">
          {schedules.length === 0 ? (
            <p className="notice">운영자가 일정을 준비 중입니다. 문의는 남길 수 있습니다.</p>
          ) : (
            schedules.map((schedule) => (
              <article className="schedule-card" key={schedule.id}>
                <div className="schedule-card-header">
                  <h3>{schedule.date}</h3>
                  <span className={`status-badge ${schedule.status}`}>
                    {schedule.statusText}
                  </span>
                </div>
                <p className="schedule-time">{schedule.time}</p>
                <p className="schedule-detail">
                  {schedule.capacity} · {schedule.location} · {schedule.price}
                </p>
                {schedule.status === "closed" ? (
                  <p className="subtle">마감된 일정도 문의는 가능하지만 예약 확정은 아닙니다.</p>
                ) : null}
                <button
                  className="secondary-button"
                  type="button"
                  onClick={() => moveToForm(schedule.label)}
                >
                  문의 폼으로 이동
                </button>
              </article>
            ))
          )}
        </div>
      </section>

      <section className="section place-section" aria-labelledby="place-heading">
        <div className="section-heading">
          <h2 id="place-heading">장소 및 참여 안내</h2>
          <p>오프라인 참여에 필요한 주소, 도착 시간, 준비물을 미리 확인해 주세요.</p>
        </div>
        <div className="place-layout">
          <figure className="place-media">
            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80"
              alt="밝은 실습 공간에서 진행되는 소규모 오프라인 수업"
            />
          </figure>
          <div className="place-card">
            <p className="label">상세 주소</p>
            <p className="address">{workshop.address}</p>
            <a className="inline-link" href={workshop.mapUrl} target="_blank" rel="noreferrer">
              외부 지도에서 보기
            </a>
            <ul className="plain-list">
              {preparationItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section form-section" aria-labelledby="form-heading" ref={formRef}>
        <div className="section-heading">
          <h2 id="form-heading">문의 제출</h2>
          <p>아래 내용은 예약 확정이 아니라 운영자가 확인할 문의 접수로 처리됩니다.</p>
        </div>
        <form className="inquiry-form" noValidate onSubmit={submitInquiry}>
          <FieldError id="form-error" message={errors.form} />

          <label>
            이름
            <input
              autoComplete="name"
              aria-describedby={errors.name ? "name-error" : undefined}
              aria-invalid={Boolean(errors.name)}
              name="name"
              onChange={updateField}
              value={form.name}
            />
            <FieldError id="name-error" message={errors.name} />
          </label>

          <label>
            전화번호
            <input
              autoComplete="tel"
              aria-describedby={errors.phone ? "phone-error phone-help" : "phone-help"}
              aria-invalid={Boolean(errors.phone)}
              inputMode="tel"
              name="phone"
              onChange={updateField}
              placeholder="010-1234-5678"
              value={form.phone}
            />
            <span className="help-text" id="phone-help">
              숫자와 하이픈을 사용할 수 있습니다.
            </span>
            <FieldError id="phone-error" message={errors.phone} />
          </label>

          <label>
            희망 일정
            <select
              aria-describedby={errors.preferredSchedule ? "schedule-error" : undefined}
              aria-invalid={Boolean(errors.preferredSchedule)}
              name="preferredSchedule"
              onChange={updateField}
              value={form.preferredSchedule}
            >
              <option value="">희망 일정을 선택해 주세요</option>
              {availableSchedules.map((schedule) => (
                <option key={schedule.id} value={schedule.label}>
                  {schedule.label}
                </option>
              ))}
            </select>
            <FieldError id="schedule-error" message={errors.preferredSchedule} />
          </label>

          <label>
            참여 인원(선택)
            <input
              aria-describedby={errors.participantCount ? "count-error" : undefined}
              aria-invalid={Boolean(errors.participantCount)}
              inputMode="numeric"
              min="1"
              max="20"
              name="participantCount"
              onChange={updateField}
              type="number"
              value={form.participantCount}
            />
            <FieldError id="count-error" message={errors.participantCount} />
          </label>

          <label>
            문의 내용(선택)
            <textarea
              name="message"
              onChange={updateField}
              rows="5"
              value={form.message}
            />
          </label>

          <div className="info-box">
            건강 정보, 주민등록번호, 결제 정보 등 민감한 개인정보는 입력하지 마세요.
          </div>

          <label className="checkbox-label">
            <input
              aria-describedby={errors.privacyConsent ? "privacy-error" : "privacy-help"}
              aria-invalid={Boolean(errors.privacyConsent)}
              checked={form.privacyConsent}
              name="privacyConsent"
              onChange={updateField}
              type="checkbox"
            />
            <span>문의 응대를 위해 이름과 전화번호를 수집하는 데 동의합니다.</span>
          </label>
          <p className="privacy-copy" id="privacy-help">
            수집 목적: 문의 확인과 수동 연락 · 보관 기간: 워크숍 종료 후 필요한 짧은 기간 ·
            삭제 요청: 운영자에게 연락
          </p>
          <FieldError id="privacy-error" message={errors.privacyConsent} />

          <button className="primary-button submit-button" disabled={isSubmitting} type="submit">
            {isSubmitting ? "제출 중" : "문의 제출"}
          </button>

          {resultMessage ? (
            <p
              className={`result-message ${status === "success" ? "success" : "error"}`}
              role="status"
            >
              {resultMessage}
            </p>
          ) : null}
        </form>
      </section>

      <footer className="site-footer">
        <strong>{workshop.brand}</strong>
        <p>
          이 서비스는 문의 접수용입니다. 결제와 예약 확정은 운영자가 별도 연락으로
          안내합니다.
        </p>
      </footer>
    </main>
  );
}

function FieldError({ id, message }) {
  if (!message) {
    return null;
  }

  return (
    <span className="field-error" id={id} role="alert">
      {message}
    </span>
  );
}
