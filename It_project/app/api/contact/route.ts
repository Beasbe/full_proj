// app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Валидация имени
function validateName(name: string): { valid: boolean; message?: string } {
  const trimmed = name.trim();
  if (!trimmed) return { valid: false, message: "Имя обязательно" };
  if (trimmed.length < 2)
    return { valid: false, message: "Имя должно содержать минимум 2 символа" };
  if (trimmed.length > 50)
    return { valid: false, message: "Имя не может быть длиннее 50 символов" };
  const nameRegex = /^[A-Za-zА-Яа-яЁё\s\-]+$/;
  if (!nameRegex.test(trimmed)) {
    return {
      valid: false,
      message: "Имя может содержать только буквы, пробелы и дефисы",
    };
  }
  return { valid: true };
}

// Валидация телефона и нормализация
function validateAndNormalizePhone(phone: string): {
  valid: boolean;
  normalized?: string;
  message?: string;
} {
  const digits = phone.replace(/\D/g, "");
  let normalized = "";

  if (digits.length === 11 && (digits[0] === "7" || digits[0] === "8")) {
    // +7XXXXXXXXXX или 8XXXXXXXXXX -> 7XXXXXXXXXX
    normalized = "7" + digits.slice(1);
  } else if (digits.length === 10) {
    // 10 цифр без кода -> добавляем 7
    normalized = "7" + digits;
  } else {
    return { valid: false, message: "Некорректный российский номер телефона" };
  }

  // Дополнительно можно проверить, что номер не начинается на недопустимые коды (например, 700)
  // Здесь просто возвращаем нормализованный номер
  return { valid: true, normalized };
}

export async function POST(request: Request) {
  try {
    const { name, phone } = await request.json();

    // Валидация имени
    const nameCheck = validateName(name);
    if (!nameCheck.valid) {
      return NextResponse.json({ message: nameCheck.message }, { status: 400 });
    }

    // Валидация телефона
    const phoneCheck = validateAndNormalizePhone(phone);
    if (!phoneCheck.valid) {
      return NextResponse.json(
        { message: phoneCheck.message },
        { status: 400 },
      );
    }

    const cleanName = name.trim();
    const cleanPhone = phoneCheck.normalized; // например, 79991234567

    // Настройка транспортера (как в предыдущем примере)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"Сайт" <${process.env.SMTP_FROM}>`,
      to: process.env.TO_EMAIL,
      subject: `Новая заявка с сайта от ${name}`,
      text: `Имя: ${name}\nТелефон: ${phone}`,
      html: `
        <h2>Новая заявка с сайта</h2>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">Сообщение отправлено через контактную форму сайта</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Заявка отправлена" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 });
  }
}
