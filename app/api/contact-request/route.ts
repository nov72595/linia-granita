import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const RECEIVER_EMAIL = "liniyagranita@gmail.com";

type ContactPayload = {
  name?: string;
  phone?: string;
  channel?: string;
  comment?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    const name = (body.name || "").trim();
    const phone = (body.phone || "").trim();
    const channel = (body.channel || "").trim();
    const comment = (body.comment || "").trim();

    if (!name || !phone) {
      return NextResponse.json({ ok: false, error: "Имя и телефон обязательны." }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || "465");
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpFrom = process.env.SMTP_FROM || smtpUser || RECEIVER_EMAIL;

    if (!smtpHost || !smtpUser || !smtpPass) {
      return NextResponse.json(
        { ok: false, error: "Почта не настроена на сервере. Заполните SMTP переменные окружения." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const subject = `Новая заявка с сайта: ${name}`;
    const text = [
      "Новая заявка с сайта Линия Гранита",
      "",
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      `Предпочтительный канал: ${channel || "-"}`,
      `Комментарий: ${comment || "-"}`,
    ].join("\n");

    const html = `
      <h2>Новая заявка с сайта Линия Гранита</h2>
      <p><strong>Имя:</strong> ${escapeHtml(name)}</p>
      <p><strong>Телефон:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Предпочтительный канал:</strong> ${escapeHtml(channel || "-")}</p>
      <p><strong>Комментарий:</strong><br/>${escapeHtml(comment || "-").replace(/\n/g, "<br/>")}</p>
    `;

    await transporter.sendMail({
      from: smtpFrom,
      to: RECEIVER_EMAIL,
      subject,
      text,
      html,
      replyTo: smtpFrom,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Не удалось отправить заявку." }, { status: 500 });
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
