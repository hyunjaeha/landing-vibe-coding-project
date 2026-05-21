"use client";

import { useMemo, useRef, useState } from "react";
import { introItems, schedules, workshop } from "@/lib/workshop-data";

const initialForm = {
  name: "",
  phone: "",
  preferredSchedule: schedules[0]?.id ?? "",
  participantCount: "",
  message: "",
  privacyConsent: false
};

export default function LandingPage() {
  const formRef = useRef(null);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const selectedSchedule = useMemo(
    () => schedules.find((schedule) => schedule.id === form.preferredSchedule),
    [form.preferredSchedule]
  );

  function scrollToForm(scheduleId) {
    if (scheduleId) {
      setForm((current) => ({ ...current, preferredSchedule: scheduleId }));
    }

    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function updateField(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value
    }));
    setErrors((current) => ({ ...current, [name]: undefined, form: undefined }));
  }

  async function submitInquiry(event) {
    event.preventDefault();
    setStatus({ type: "loading", message: "문의 접수 중입니다." });
    setErrors({});

    const response = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const result = await response.json();

    if (!response.ok) {
      setErrors(result.errors ?? { form: result.message });
      setStatus({
        type: "error",
        message: result.message ?? "문의 접수에 실패했습니다. 잠시 후 다시 시도해 주세요."
      });
      return;
    }

    setStatus({ type: "success", message: result.message });
    setForm(initialForm);
  }

  return (
    <main id="top">
      <Header onCta={() => scrollToForm()} />
      <section className="hero section">
        <div className="hero__copy">
          <p className="badge">{workshop.badge}</p>
          <h1>{workshop.title}</h1>
          <p className="lead">{workshop.description}</p>
          <button className="button button--primary" type="button" onClick={() => scrollToForm()}>
            문의하기
          </button>
        </div>
        <figure className="hero__image">
          <img
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80"
            alt="테이블에 둘러앉아 노트북과 노트를 보며 대화하는 워크숍 참여자들"
          />
          <figcaption>소규모로 대화하며 정리하는 오프라인 워크숍</figcaption>
        </figure>
      </section>

      <section className="section intro" id="intro" aria-labelledby="intro-title">
        <div className="section__heading">
          <h2 id="intro-title">워크숍 소개</h2>
          <p>{workshop.target}</p>
        </div>
        <div className="intro__grid">
          {introItems.map((item, index) => (
            <article className="info-card" key={item}>
              <span className="number-badge">{index + 1}</span>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="schedule" aria-labelledby="schedule-title">
        <div className="section__heading">
          <h2 id="schedule-title">일정 안내</h2>
          <p>문의 접수는 예약 확정이 아닙니다. 운영자가 확인 후 참여 가능 여부를 개별 연락드립니다.</p>
        </div>
        <div className="schedule-grid">
          {schedules.map((schedule) => (
            <article className="schedule-card" key={schedule.id}>
              <div className="schedule-card__top">
                <h3>{schedule.label}</h3>
                <span className={`status-pill status-pill--${schedule.status}`}>
                  {schedule.statusText}
                </span>
              </div>
              <p>{schedule.time}</p>
              <p>
                {schedule.capacity} · {schedule.location}
              </p>
              <p>{schedule.price}</p>
              <button
                className="button button--secondary"
                type="button"
                onClick={() => scrollToForm(schedule.id)}
              >
                문의 폼으로 이동
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="section location" id="location" aria-labelledby="location-title">
        <div className="location__copy">
          <h2 id="location-title">장소 및 참여 안내</h2>
          <div className="info-card">
            <strong>{workshop.location.name}</strong>
            <p>{workshop.location.address}</p>
            <p>{workshop.location.mapText}</p>
            <p>{workshop.location.notice}</p>
          </div>
        </div>
        <figure className="location__image">
          <img
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80"
            alt="밝은 회의실에서 워크숍을 준비하는 테이블"
          />
          <figcaption>상세 위치는 접수 확인 후 안내합니다.</figcaption>
        </figure>
      </section>

      <section className="section inquiry" id="inquiry" ref={formRef} aria-labelledby="inquiry-title">
        <div className="form-helper">
          <h2 id="inquiry-title">문의 제출</h2>
          <p>궁금한 점이나 참여 희망 일정을 남기면 운영자가 확인 후 개별 연락드립니다.</p>
          <p className="privacy-note">
            건강 정보, 주민등록번호, 결제 정보 같은 민감한 개인정보는 입력하지 마세요.
          </p>
        </div>

        <form className="inquiry-form" onSubmit={submitInquiry} noValidate>
          <Field label="이름" id="name" error={errors.name}>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={updateField}
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
          </Field>

          <Field label="전화번호" id="phone" error={errors.phone} helper="숫자와 하이픈을 사용할 수 있습니다.">
            <input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={updateField}
              inputMode="tel"
              autoComplete="tel"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : "phone-helper"}
            />
          </Field>

          <Field label="희망 일정" id="preferredSchedule" error={errors.preferredSchedule}>
            <select
              id="preferredSchedule"
              name="preferredSchedule"
              value={form.preferredSchedule}
              onChange={updateField}
              aria-invalid={Boolean(errors.preferredSchedule)}
              aria-describedby={errors.preferredSchedule ? "preferredSchedule-error" : undefined}
            >
              {schedules.map((schedule) => (
                <option key={schedule.id} value={schedule.id}>
                  {schedule.label} · {schedule.statusText}
                </option>
              ))}
            </select>
          </Field>

          <Field label="참여 인원(선택)" id="participantCount" error={errors.participantCount}>
            <input
              id="participantCount"
              name="participantCount"
              value={form.participantCount}
              onChange={updateField}
              inputMode="numeric"
              min="1"
              max="8"
              type="number"
              aria-invalid={Boolean(errors.participantCount)}
              aria-describedby={errors.participantCount ? "participantCount-error" : undefined}
            />
          </Field>

          <Field
            label="문의 내용(선택)"
            id="message"
            helper="민감한 개인정보는 입력하지 말고, 참여 가능 여부나 준비물 질문만 남겨 주세요."
          >
            <textarea id="message" name="message" value={form.message} onChange={updateField} rows="4" />
          </Field>

          <div className="consent">
            <input
              id="privacyConsent"
              name="privacyConsent"
              checked={form.privacyConsent}
              onChange={updateField}
              type="checkbox"
              aria-invalid={Boolean(errors.privacyConsent)}
              aria-describedby={errors.privacyConsent ? "privacyConsent-error" : undefined}
            />
            <label htmlFor="privacyConsent">
              문의 응답을 위해 이름과 전화번호를 수집하는 데 동의합니다.
            </label>
          </div>
          {errors.privacyConsent ? (
            <p className="field-error" id="privacyConsent-error">
              {errors.privacyConsent}
            </p>
          ) : null}

          {selectedSchedule?.status === "closed" ? (
            <p className="notice" role="note">
              선택한 일정은 마감 상태입니다. 문의는 가능하지만 예약 확정으로 처리되지 않습니다.
            </p>
          ) : null}

          {errors.form ? (
            <p className="form-message form-message--error" role="alert">
              {errors.form}
            </p>
          ) : null}
          {status.type === "success" ? (
            <p className="form-message form-message--success" role="status">
              {status.message}
            </p>
          ) : null}
          {status.type === "error" && !errors.form ? (
            <p className="form-message form-message--error" role="alert">
              {status.message}
            </p>
          ) : null}

          <button className="button button--primary" type="submit" disabled={status.type === "loading"}>
            {status.type === "loading" ? "문의 제출 중" : "문의 제출"}
          </button>
        </form>
      </section>

      <footer className="footer">
        <h2>개인정보 및 범위 안내</h2>
        <p>
          수집 목적은 워크숍 문의 확인과 개별 연락입니다. 보관 기간은 워크숍 종료 후 운영자가
          정한 최소 기간으로 제한하며, 삭제 요청은 운영자 연락 채널로 접수합니다. 결제와 예약
          확정은 별도 연락으로만 진행합니다.
        </p>
      </footer>
    </main>
  );
}

function Header({ onCta }) {
  return (
    <header className="site-header">
      <a className="site-logo" href="#top" aria-label="작은 워크숍 홈">
        작은 워크숍
      </a>
      <nav aria-label="주요 섹션">
        <a href="#intro">소개</a>
        <a href="#schedule">일정</a>
        <a href="#location">장소</a>
      </nav>
      <button className="button button--header" type="button" onClick={onCta}>
        문의하기
      </button>
    </header>
  );
}

function Field({ label, id, error, helper, children }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      {helper ? (
        <p className="field-helper" id={`${id}-helper`}>
          {helper}
        </p>
      ) : null}
      {error ? (
        <p className="field-error" id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
