export default function Experience() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-24 bg-background">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* Первая строка: 25 */}
          <div className="mb-1 sm:mb-2">
            <span className="text-7xl sm:text-8xl md:text-9xl font-semibold text-grape">
              25
            </span>
          </div>

          {/* Вторая строка: лет проектирования */}
          <div className="mb-4 sm:mb-6">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-copy-primary">
              лет проектирования
            </h2>
          </div>

          {/* Третья строка: объединенный текст */}
          <div className="mb-4 sm:mb-6">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-copy-primary leading-relaxed max-w-3xl mx-auto">
              Компания АйТи-проект занимается проектированием на протяжении
              многих лет. Наша команда способна воплотить в жизнь любую, даже
              самую не стандартную, задачу.
            </p>
          </div>

          {/* Четвертая строка (меньший шрифт): Прочтите и посмотрите... */}
          <div>
            <p className="text-sm sm:text-base md:text-lg text-copy-secondary inline-block border-l-4 border-grape pl-3 sm:pl-4">
              Прочтите и посмотрите на наши выполненные работы
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
