"use client";

import { useState } from "react";

export default function AdminPage({ operationsChecklist }) {
  const [accessKey, setAccessKey] = useState("");
  const [authState, setAuthState] = useState("idle");
  const [listState, setListState] = useState("idle");
  const [message, setMessage] = useState("");
  const [inquiries, setInquiries] = useState([]);

  async function login(event) {
    event.preventDefault();
    setAuthState("loading");
    setMessage("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessKey }),
      });
      const payload = await response.json();

      if (!response.ok) {
        setAuthState("error");
        setMessage(payload.message || "접근 권한이 없습니다.");
        return;
      }

      setAuthState("success");
      setMessage("접근이 확인되었습니다.");
      await loadInquiries();
    } catch (error) {
      setAuthState("error");
      setMessage("관리자 접근 확인에 실패했습니다.");
    }
  }

  async function loadInquiries() {
    setListState("loading");

    try {
      const response = await fetch("/api/admin/inquiries");
      const payload = await response.json();

      if (!response.ok) {
        setListState("error");
        setMessage(payload.message || "문의 목록을 불러오지 못했습니다.");
        return;
      }

      setInquiries(payload.inquiries || []);
      setListState("success");
    } catch (error) {
      setListState("error");
      setMessage("문의 목록을 불러오지 못했습니다.");
    }
  }

  const canViewList = authState === "success";

  return (
    <main className="admin-shell">
      <section className="admin-hero">
        <a className="inline-link" href="/">
          공개 랜딩으로 이동
        </a>
        <h1>관리자 문의 목록</h1>
        <p>접수된 문의를 확인하고 운영 체크리스트를 참고하는 최소 관리자 화면입니다.</p>
      </section>

      <section className="admin-panel" aria-labelledby="admin-login-heading">
        <h2 id="admin-login-heading">관리자 접근</h2>
        <form className="admin-login" onSubmit={login}>
          <label>
            접근 키
            <input
              autoComplete="off"
              name="accessKey"
              onChange={(event) => setAccessKey(event.target.value)}
              type="password"
              value={accessKey}
            />
          </label>
          <button className="primary-button" disabled={authState === "loading"} type="submit">
            {authState === "loading" ? "확인 중" : "문의 목록 보기"}
          </button>
        </form>
        {message ? (
          <p
            className={`result-message ${authState === "success" ? "success" : "error"}`}
            role="status"
          >
            {message}
          </p>
        ) : null}
      </section>

      {canViewList ? (
        <section className="admin-panel" aria-labelledby="inquiries-heading">
          <div className="admin-panel-header">
            <h2 id="inquiries-heading">접수된 문의</h2>
            <button className="secondary-button compact" type="button" onClick={loadInquiries}>
              새로고침
            </button>
          </div>

          {listState === "loading" ? <p className="notice">문의 목록을 불러오는 중입니다.</p> : null}
          {listState === "error" ? (
            <p className="notice error">문의 목록을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.</p>
          ) : null}
          {listState === "success" && inquiries.length === 0 ? (
            <p className="notice">아직 접수된 문의가 없습니다.</p>
          ) : null}
          {inquiries.length > 0 ? (
            <div className="inquiry-list">
              {inquiries.map((inquiry) => (
                <article className="inquiry-item" key={inquiry.id}>
                  <div>
                    <h3>{inquiry.name}</h3>
                    <p>{inquiry.phone}</p>
                  </div>
                  <dl>
                    <div>
                      <dt>희망 일정</dt>
                      <dd>{inquiry.preferredSchedule}</dd>
                    </div>
                    <div>
                      <dt>참여 인원</dt>
                      <dd>{inquiry.participantCount ? `${inquiry.participantCount}명` : "미입력"}</dd>
                    </div>
                    <div>
                      <dt>문의 내용</dt>
                      <dd>{inquiry.message || "문의 내용 없음"}</dd>
                    </div>
                    <div>
                      <dt>접수 시간</dt>
                      <dd>{formatDate(inquiry.createdAt)}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          ) : null}
        </section>
      ) : null}

      <section className="admin-panel" aria-labelledby="checklist-heading">
        <h2 id="checklist-heading">정적 운영 체크리스트</h2>
        <p className="subtle">체크 상태는 저장하지 않습니다. 실제 처리는 운영자가 별도 메모로 관리합니다.</p>
        <div className="checklist-grid">
          {operationsChecklist.map((group) => (
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
    </main>
  );
}

function formatDate(value) {
  if (!value) {
    return "접수 시간 없음";
  }

  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
