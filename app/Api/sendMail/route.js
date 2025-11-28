import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email, message } = await req.json();

    // validaciones básicas
    if (!email || !message) {
      return new Response(JSON.stringify({ error: "Faltan campos: email y/o message" }), { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase())) {
      return new Response(JSON.stringify({ error: "Email inválido" }), { status: 400 });
    }

    // variables de entorno
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL } = process.env;
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_EMAIL) {
      return new Response(
        JSON.stringify({ error: "SMTP no configurado. Añade SMTP_HOST, SMTP_USER, SMTP_PASS, CONTACT_EMAIL en .env" }),
        { status: 501 }
      );
    }

    // decide secure según puerto
    const portNum = Number(SMTP_PORT || 587);
    const secure = portNum === 465;

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: portNum,
      secure,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      tls: {
        // en algunos entornos (desarrollo) puede requerirse false
        rejectUnauthorized: false,
      },
    });

    // verifica conexión/credenciales antes de enviar
    try {
      await transporter.verify();
    } catch (verifyErr) {
      console.error("SMTP verify error:", verifyErr);
      return new Response(JSON.stringify({ error: `Error conectando al SMTP: ${verifyErr.message}` }), { status: 502 });
    }

    // enviar correo
    try {
      await transporter.sendMail({
        from: `"Web Contact" <${SMTP_USER}>`,
        to: CONTACT_EMAIL,
        subject: `Mensaje desde web — ${email}`,
        text: `Remitente: ${email}\n\n${message}`,
        html: `<p><strong>Remitente:</strong> ${email}</p><p>${message.replace(/\n/g, "<br/>")}</p>`,
      });
    } catch (sendErr) {
      console.error("SMTP sendMail error:", sendErr);
      return new Response(JSON.stringify({ error: `Error enviando mail: ${sendErr.message}` }), { status: 502 });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    // En desarrollo imprimimos el stack en consola y devolvemos el mensaje
    console.error("Unexpected API error in sendMail:", err);
    return new Response(JSON.stringify({ error: err?.message || "Error inesperado" }), { status: 500 });
  }
}