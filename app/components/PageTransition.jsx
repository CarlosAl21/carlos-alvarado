"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./PageTransition.module.css";

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const [display, setDisplay] = useState(children);
  const [stage, setStage] = useState("enter");

  // on path change, animate out -> swap -> animate in
  useEffect(() => {
    setStage("exit");
    const t = setTimeout(() => {
      setDisplay(children);
      setStage("enter");
    }, 320); // sync with CSS duration
    return () => clearTimeout(t);
  }, [pathname, children]);

  return (
    <div className={`${styles.wrap} ${styles[stage]}`} aria-live="polite">
      {display}
    </div>
  );
}