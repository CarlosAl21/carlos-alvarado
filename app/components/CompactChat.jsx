"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./CompactChat.module.css";

export default function CompactChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "bot",
      text: "Hola 👋 ¿Quieres contactarme? Déjame tu email y mensaje.",
    },
  ]);
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);
  // Por defecto mostramos el badge para indicar que es un chat
  // (el usuario puede cambiar esto si prefiere que no aparezca inicialmente)
  const [unread, setUnread] = useState(true); // <-- nuevo estado para badge
  const boxRef = useRef(null);

  useEffect(() => {
    if (open && boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [open, messages]);

  function pushMessage(from, txt) {
    setMessages((s) => [...s, { id: Date.now() + Math.random(), from, text: txt }]);
    // si viene un mensaje del bot y el panel está cerrado -> marcar como no leído
    if (from === "bot" && !open) setUnread(true);
  }

  function validEmail(e) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(e || "").toLowerCase());
  }

  async function send() {
    setStatus(null);
    if (!validEmail(email)) {
      setStatus({ type: "error", text: "Email inválido" });
      return;
    }
    if (!text.trim()) {
      setStatus({ type: "error", text: "Escribe un mensaje" });
      return;
    }

    setSending(true);
    try {
      const resp = await fetch("/Api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message: text.trim() }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data?.error || "Error enviando mensaje");
      // push user message and bot confirmation
      pushMessage("you", text.trim());
      pushMessage("bot", "Mensaje enviado correctamente. Gracias.");
      setText("");
      setStatus({ type: "success", text: "Enviado" });
    } catch (err) {
      pushMessage("bot", "Error al enviar. Intenta nuevamente.");
      setStatus({ type: "error", text: err.message || "Error" });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className={styles.wrapper} aria-live="polite" style={{ position: "fixed" }}>
      {/* Panel se renderiza primero (encima del trigger) para que aparezca hacia arriba */}
      {open && (
        <div className={styles.panel} role="dialog" aria-label="Chat compacto">
          <div className={styles.header}>
            <div className={styles.hLeft}>
              <img
                src="https://avatars.githubusercontent.com/u/108234879?s=400&u=445c9a7bef72f07f514549448544eae06e12a2e2&v=4"
                alt="avatar"
              />
              <div className={styles.title}>Chat</div>
            </div>
            <div className={styles.actions}>
              <button
                className={styles.minBtn}
                onClick={() => setOpen(false)}
                aria-label="Minimizar"
              >
                —
              </button>
            </div>
          </div>

          <div className={styles.messages} ref={boxRef}>
            {messages.map((m) => (
              <div
                key={m.id}
                className={m.from === "you" ? styles.msgYou : styles.msgBot}
              >
                <div className={styles.msgText}>{m.text}</div>
              </div>
            ))}
          </div>

          <div className={styles.formArea}>
            <input
              className={styles.emailInput}
              type="email"
              placeholder="Tu correo (necesario)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Correo electrónico"
            />
            <textarea
              className={styles.textarea}
              placeholder="Escribe tu mensaje..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              aria-label="Mensaje"
            />
            <div className={styles.rowActions}>
              <button
                className={styles.sendBtn}
                onClick={send}
                disabled={sending}
                aria-label="Enviar mensaje"
              >
                {sending ? "Enviando..." : "Enviar"}
              </button>
              {status && (
                <div
                  className={
                    status.type === "error" ? styles.statusErr : styles.statusOk
                  }
                >
                  {status.text}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Trigger siempre en el DOM; toggle al hacer click */}
      <button
        className={styles.trigger}
        onClick={() =>
          setOpen((v) => {
            const next = !v;
            if (next) setUnread(false); // abrir -> limpiar badge
            return next;
          })
        }
        aria-label={open ? "Cerrar chat" : "Abrir chat"}
        style={{ zIndex: 100001 }}
      >
        <img
          src="https://avatars.githubusercontent.com/u/108234879?s=400&u=445c9a7bef72f07f514549448544eae06e12a2e2&v=4"
          alt="avatar"
        />
        {unread && <span className={styles.badge}>1</span>}{/* badge sobre el avatar */}
      </button>
    </div>
  );
}