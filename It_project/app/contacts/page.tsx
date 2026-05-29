// app/contacts/page.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ContactsPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [errors, setErrors] = useState({ name: "", phone: "" });

  // Валидация имени
  const validateName = (name: string): string => {
    if (!name.trim()) return "Имя обязательно";
    if (name.trim().length < 2) return "Имя должно содержать минимум 2 символа";
    if (name.trim().length > 50) return "Имя не может быть длиннее 50 символов";
    const nameRegex = /^[A-Za-zА-Яа-яЁё\s\-]+$/;
    if (!nameRegex.test(name.trim())) {
      return "Имя может содержать только буквы, пробелы и дефисы";
    }
    return "";
  };

  // Валидация телефона (российские номера)
  const validatePhone = (phone: string): string => {
    if (!phone.trim()) return "Номер телефона обязателен";
    const digits = phone.replace(/\D/g, "");
    if (digits.length === 11 && (digits[0] === "7" || digits[0] === "8")) {
      return "";
    }
    if (digits.length === 10) {
      return "";
    }
    return "Введите корректный российский номер (например, +7 999 123-45-67)";
  };

  const handleBlur =
    (field: "name" | "phone") => (e: React.FocusEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const error =
        field === "name" ? validateName(value) : validatePhone(value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    };

  const handleChange =
    (field: "name" | "phone") => (e: React.ChangeEvent<HTMLInputElement>) => {
      // очищаем ошибку поля при начале ввода
      setErrors((prev) => ({ ...prev, [field]: "" }));
      setFormError("");
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;

    // Валидация перед отправкой
    const nameError = validateName(name);
    const phoneError = validatePhone(phone);
    if (nameError || phoneError) {
      setErrors({ name: nameError, phone: phoneError });
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    const data = { name: name.trim(), phone: phone.trim() };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/thank-you");
      } else {
        const errorData = await response.json();
        setFormError(
          errorData.message || "Произошла ошибка. Попробуйте позже.",
        );
      }
    } catch (error) {
      console.error("Ошибка отправки:", error);
      setFormError("Ошибка соединения. Проверьте интернет и попробуйте снова.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-8 md:py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="mb-12 md:mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-copy-primary mb-4">
            Контакты
          </h1>
          <p className="text-lg text-copy-secondary max-w-3xl mx-auto">
            Свяжитесь с нами любым удобным способом. Мы всегда рады помочь с
            вопросами о сотрудничестве, проектах и услугах.
          </p>
        </div>

        {/* Две колонки: контактная информация и форма */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Левая колонка — контактные данные */}
          <div className="space-y-6">
            <div className="bg-surface rounded-xl shadow-md p-6 md:p-8 border border-border">
              <h2 className="text-2xl font-semibold text-copy-primary mb-6">
                Свяжитесь с нами
              </h2>
              <div className="space-y-5">
                {/* Телефон */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cta/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-cta"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-copy-primary">Телефон</h3>
                    <a
                      href="tel:+74951234567"
                      className="text-copy-secondary hover:text-cta transition-colors"
                    >
                      +7 (4842) 77-00-44
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cta/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-cta"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-copy-primary">Email</h3>
                    <a
                      href="mailto:info@itproject.ru"
                      className="text-copy-secondary hover:text-cta transition-colors"
                    >
                      zakaz@lc-kaluga.ru
                    </a>
                  </div>
                </div>

                {/* Адрес */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cta/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-cta"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-copy-primary">Адрес</h3>
                    <p className="text-copy-secondary">
                      г. Калуга, Калужского Ополчения, 2, оф.10
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Дополнительный блок — реквизиты */}
            <div className="bg-surface rounded-xl shadow-md p-6 md:p-8 border border-border">
              <h2 className="text-2xl font-semibold text-copy-primary mb-4">
                Реквизиты
              </h2>
              <div className="space-y-2 text-sm text-copy-secondary">
                <p>
                  <span className="font-medium text-copy-primary">ИНН:</span>{" "}
                  4027121049
                </p>
                <p>
                  <span className="font-medium text-copy-primary">КПП:</span>{" "}
                  402701001
                </p>
                <p>
                  <span className="font-medium text-copy-primary">ОГРН:</span>{" "}
                  1144027003735
                </p>
                <p>
                  <span className="font-medium text-copy-primary">
                    Юридический адрес:
                  </span>{" "}
                  248000, г. Калуга, ул. Гагарина, д.4 офис 302/6
                </p>
              </div>
            </div>
          </div>

          {/* Правая колонка — форма обратной связи */}
          <div className="bg-surface rounded-xl shadow-md p-6 md:p-8 border border-border">
            <h2 className="text-2xl font-semibold text-copy-primary mb-6">
              Отправить заявку
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Поле имени */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-copy-primary mb-1"
                >
                  Ваше имя *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Иван Иванов"
                  className={`w-full px-4 py-2 rounded-lg border bg-surface-alt text-copy-primary focus:outline-none focus:ring-2 focus:ring-cta/50 transition-colors ${
                    errors.name
                      ? "border-red-500 focus:border-red-500"
                      : "border-border focus:border-cta"
                  }`}
                  onBlur={handleBlur("name")}
                  onChange={handleChange("name")}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Поле телефона */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-copy-primary mb-1"
                >
                  Номер телефона *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+7 (999) 123-45-67"
                  className={`w-full px-4 py-2 rounded-lg border bg-surface-alt text-copy-primary focus:outline-none focus:ring-2 focus:ring-cta/50 transition-colors ${
                    errors.phone
                      ? "border-red-500 focus:border-red-500"
                      : "border-border focus:border-cta"
                  }`}
                  onBlur={handleBlur("phone")}
                  onChange={handleChange("phone")}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              {/* Общая ошибка отправки */}
              {formError && (
                <div className="text-red-500 text-sm text-center">
                  {formError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-cta hover:bg-cta-active text-cta-text font-semibold py-3 px-4 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Отправка..." : "Отправить заявку"}
              </button>
            </form>

            <p className="text-xs text-copy-secondary text-center mt-4">
              Нажимая кнопку, вы соглашаетесь с{" "}
              <Link
                href="/privacy"
                className="text-cta hover:text-cta-active underline"
              >
                Политикой конфиденциальности
              </Link>
            </p>
          </div>
        </div>

        {/* Блок с картой */}
        <div className="bg-surface rounded-xl shadow-md overflow-hidden border border-border">
          <div className="p-6 md:p-8 border-b border-border">
            <h2 className="text-2xl font-semibold text-copy-primary">
              Мы на карте
            </h2>
          </div>
          <div className="relative w-full h-80 md:h-96 bg-surface-alt">
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3Ad38957249638937a2df4de81e7b37afd6d7e612048a9bb80c427ae6136802e2e&amp;source=constructor"
              width="100%"
              height="400"
            ></iframe>
          </div>
        </div>

        {/* Блок с социальными сетями */}
      </div>
    </div>
  );
}
