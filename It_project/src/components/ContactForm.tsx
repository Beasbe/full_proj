"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ContactForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(""); // общая ошибка отправки
  const [errors, setErrors] = useState({ name: "", phone: "" });

  // Функция валидации имени
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

  // Функция валидации телефона (российские номера)
  const validatePhone = (phone: string): string => {
    if (!phone.trim()) return "Номер телефона обязателен";
    // Удаляем все кроме цифр
    const digits = phone.replace(/\D/g, "");
    if (digits.length === 11 && (digits[0] === "7" || digits[0] === "8")) {
      // 11 цифр: 7 или 8 + 10 цифр
      return "";
    }
    if (digits.length === 10) {
      // 10 цифр без кода страны
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
    <section className="py-12 md:py-16 bg-background transition-theme">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="w-full lg:w-3/4">
            {/* Верхний текст */}
            <div className="mb-8 lg:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-copy-primary leading-tight transition-colors duration-300">
                Получите подробную консультацию
                <br />
                и пробный расчёт по вашему
                <br />
                проекту
              </h2>

              {/* Линия разделитель */}
              <div className="w-24 h-1 bg-cta mt-6 mb-8 lg:mb-12 transition-colors duration-300" />

              {/* Нижний текст */}
              <div>
                <p className="text-xl sm:text-2xl md:text-3xl text-copy-secondary leading-relaxed transition-colors duration-300">
                  Заполните контактную форму и специалист нашей компании
                  свяжется с вами
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/4">
            <div className="bg-card border border-default border-border shadow-md p-6 md:p-8 rounded-xl transition-theme">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Поле имени */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-copy-secondary mb-1"
                  >
                    Имя
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Ваше имя"
                    className={`w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/50 transition-colors text-copy-primary placeholder:text-copy-secondary/50 ${
                      errors.name
                        ? "border-red-500"
                        : "border-border focus:border-cta"
                    }`}
                    onBlur={handleBlur("name")}
                    onChange={handleChange("name")}
                    required
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                {/* Поле телефона */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-copy-secondary mb-1"
                  >
                    Номер телефона
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="+7 (999) 999-99-99"
                    className={`w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/50 transition-colors text-copy-primary placeholder:text-copy-secondary/50 ${
                      errors.phone
                        ? "border-red-500"
                        : "border-border focus:border-cta"
                    }`}
                    onBlur={handleBlur("phone")}
                    onChange={handleChange("phone")}
                    required
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
                  className="w-full bg-cta hover:bg-cta-active text-cta-text font-semibold py-3 px-4 rounded-lg transition-colors duration-300 mt-2 disabled:opacity-50"
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
        </div>
      </div>
    </section>
  );
}
