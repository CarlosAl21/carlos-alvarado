"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./chatWidget.module.css";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, from: "bot", text: "Hola 👋 ¿En qué puedo ayudarte?" },
  ]);
  const [text, setText] = useState("");
  const boxRef = useRef(null);

  useEffect(() => {
    if (open && boxRef.current) {
      // scroll to bottom when opened or new message
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  }, [open, messages]);

  function send() {
    if (!text.trim()) return;
    const m = { id: Date.now(), from: "you", text: text.trim() };
    setMessages((s) => [...s, m]);
    setText("");
    // mock reply
    setTimeout(() => {
      setMessages((s) => [
        ...s,
        { id: Date.now() + 1, from: "bot", text: "Gracias — lo reviso y te respondo pronto." },
      ]);
    }, 700);
  }

  return (
    <div className={styles.wrapper} aria-live="polite">
      {!open && (
        <button
          className={styles.pill}
          onClick={() => setOpen(true)}
          title="Abrir chat"
        >
          <img src="https://avatars.fastly.steamstatic.com/6130db294e1a9b984df986d9af90a9c794138a69_full.jpg" alt="avatar" />
          <span className={styles.pillLabel}>Chat</span>
        </button>
      )}

      {open && (
        <div className={styles.panel}>
          <div className={styles.header}>
            <div className={styles.hLeft}>
              <img src="https://avatars.fastly.steamstatic.com/6130db294e1a9b984df986d9af90a9c794138a69_full.jpg" alt="avatar" />
              <div>
                <div className={styles.name}>G4TO</div>
                <div className={styles.status}>En línea</div>
              </div>
            </div>
            <div className={styles.hRight}>
              <button className={styles.iconBtn} onClick={() => setOpen(false)} aria-label="Cerrar">✕</button>
            </div>
          </div>

          <div className={styles.messages} ref={boxRef}>
            {messages.map((m) => (
              <div key={m.id} className={m.from === "you" ? styles.msgYou : styles.msgBot}>
                <div className={styles.msgText}>{m.text}</div>
              </div>
            ))}
          </div>

          <div className={styles.inputRow}>
            <input
              className={styles.input}
              placeholder="Escribe un mensaje..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") send(); }}
            />
            <button className={styles.sendBtn} onClick={send} aria-label="Enviar">Enviar</button>
          </div>
        </div>
      )}
    </div>
  );
}
