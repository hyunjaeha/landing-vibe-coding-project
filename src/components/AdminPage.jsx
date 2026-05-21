"use client";

import { useEffect, useState } from "react";
import { operatingChecklist, schedules } from "@/lib/workshop-data";

export default function AdminPage() {
  const [accessKey, setAccessKey] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const [inquiries, setInquiries] = useState([]);
  const [listState, setListState] = useState({ type: "idle", message: "" });

  async function login(event) {
    event.preventDefault();
    setLoginMessage("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ accessKey })
    });

    const result = await readJsonResponse(response);

    if (!response.ok) {
      setLoginMessage(result.message ?? "관리자 접근 값이 올바르지 않습니다.");
      setIsAuthed(false);
      return;
    }

    setIsAuthed(true);
    setAccessKey("");
  }

  async function loadInquiries() {
    setListState({ type: "loading", message: "문의 목록을 불러오는 중입니다." });

    const response = await fetch("/api/admin/inquiries", {
      credentials: "same-origin"
    });
    const result = await readJsonResponse(response);

    if (!response.ok) {
      setListState({
        type: "error",
        message: result.message ?? "문의 목록을 불러오지 못했습니다."
      });
      setInquiries([]);
      return;
    }

    setInquiries(result.inquiries ?? []);
    setListState({ type: "success", message: "" });
  }

  useEffect(() => {
    if (isAuthed) {
      loadInquiries();
    }
  }, [isAuthed]);

  return (
    <main className="admin-page">
      <section className="admin-hero">
        <p className="badge">관리자</p>
        <h1>문의 접수 확인</h1>
        <p>단일 관리자 접근 보호 뒤에서 문의 목록과 정적 운영 체크리스트만 확인합니다.</p>
      </section>

      {!isAuthed ? (
        <section className="admin-panel" aria-labelledby="admin-login-title">
          <h2 id="admin-login-title">관리자 접근</h2>
          <form className="admin-login" onSubmit={login}>
            <label htmlFor="accessKey">접근 값</label>
            <input
              id="accessKey"
              name="accessKey"
              type="password"
              value={accessKey}
              onChange={(event) => setAccessKey(event.target.value)}
              autoComplete="current-password"
            />
            {loginMessage ? (
              <p className="field-error" role="alert">
                {loginMessage}
              </p>
            ) : null}
            <button className="button button--primary" type="submit">
              문의 목록 보기
            </button>
          </form>
        </section>
      ) : (
        <>
          <section className="admin-panel" aria-labelledby="inquiry-list-title">
            <div className="admin-panel__header">
              <div>
                <h2 id="inquiry-list-title">문의 목록</h2>
                <p>최신 문의 50건을 표시합니다.</p>
              </div>
              <button className="button button--secondary" type="button" onClick={loadInquiries}>
                새로고침
              </button>
            </div>

            {listState.type === "loading" ? <p role="status">{listState.message}</p> : null}
            {listState.type === "error" ? (
              <p className="form-message form-message--error" role="alert">
                {listState.message}
              </p>
            ) : null}
            {listState.type === "success" && inquiries.length === 0 ? (
              <p className="empty-state">아직 접수된 문의가 없습니다.</p>
            ) : null}

            {inquiries.length > 0 ? (
              <div className="inquiry-list">
                {inquiries.map((inquiry) => (
                  <article className="inquiry-card" key={inquiry.id}>
                    <div>
                      <h3>{inquiry.name}</h3>
                      <p>{formatSchedule(inquiry.preferred_schedule)}</p>
                    </div>
                    <dl>
                      <div>
                        <dt>전화번호</dt>
                        <dd>{inquiry.phone}</dd>
                      </div>
                      <div>
                        <dt>참여 인원</dt>
                        <dd>{inquiry.participant_count ? `${inquiry.participant_count}명` : "미입력"}</dd>
                      </div>
                      <div>
                        <dt>접수 시간</dt>
                        <dd>{formatDate(inquiry.created_at)}</dd>
                      </div>
                      <div>
                        <dt>문의 내용</dt>
                        <dd>{inquiry.message || "문의 내용 없음"}</dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>
            ) : null}
          </section>

          <section className="admin-panel" aria-labelledby="checklist-title">
            <h2 id="checklist-title">정적 운영 체크리스트</h2>
            <div className="checklist-grid">
              {operatingChecklist.map((group) => (
                <article className="checklist-card" key={group.group}>
                  <h3>{group.group}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}

function formatSchedule(id) {
  const schedule = schedules.find((item) => item.id === id);
  return schedule ? `${schedule.label} · ${schedule.statusText}` : id;
}

async function readJsonResponse(response) {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return {
    message: "서버 응답 형식이 올바르지 않습니다. 잠시 후 다시 시도해 주세요."
  };
}

function formatDate(value) {
  if (!value) {
    return "시간 없음";
  }

  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}
