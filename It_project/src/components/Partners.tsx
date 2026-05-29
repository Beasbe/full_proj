'use client'
import { useState, useEffect } from 'react';

const Partners = () => {
    const companies = [
        "TechCorp Solutions",
        "InnovateCo Group",
        "Future Systems Inc",
        "Digital Solutions Pro",
        "Web Masters Team",
        "Cloud Network Tech",
        "Data Flow Systems",
        "Secure Soft Corp",
        "App Craft Studio",
        "Code Lab Experts",
        "Pixel Perfect Design",
        "Net Vantage LLC",
        "Byte Works Int.",
        "Meta Logic Systems",
        "Swift Stack Dev",
        "Cyber Core Security"
    ];

    const [visibleCount, setVisibleCount] = useState(8);
    const [isExpanded, setIsExpanded] = useState(false);

    // Определяем сколько показывать в зависимости от ширины экрана
    useEffect(() => {
        const updateVisibleCount = () => {
            if (window.innerWidth < 640) {
                setVisibleCount(4);
            } else if (window.innerWidth < 1024) {
                setVisibleCount(6);
            } else {
                setVisibleCount(8);
            }
        };

        updateVisibleCount();
        window.addEventListener('resize', updateVisibleCount);

        return () => {
            window.removeEventListener('resize', updateVisibleCount);
        };
    }, []);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const companiesToShow = isExpanded ? companies : companies.slice(0, visibleCount);

    return (
        <section className="py-12 md:py-20 bg-card border-t border-primary-default w-full">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-2xl md:text-4xl font-bold mb-4 text-copy-primary">
                        Наши партнеры
                    </h2>
                    <p className="text-copy-secondary text-sm md:text-base max-w-2xl mx-auto">
                        Сотрудничаем с ведущими компаниями отрасли
                    </p>
                </div>

                {/* Сетка партнеров */}
                <div className="
                    grid grid-cols-1 sm:grid-cols-2
                    lg:grid-cols-3 xl:grid-cols-4
                    gap-4 md:gap-6
                    mx-auto max-w-6xl
                ">
                    {companiesToShow.map((company, index) => (
                        <div
                            key={index}
                            className="
                                group relative
                                h-full min-h-[120px] md:min-h-[140px]
                                transition-all duration-300
                            "
                        >
                            <div className="
                                absolute inset-0
                                bg-background
                                dark:bg-card
                                rounded-xl md:rounded-2xl
                                border-default border-border
                                group-hover:border-cta
                                group-hover:border-default
                                group-hover:shadow-xl
                                group-hover:-translate-y-1
                                transition-all duration-500
                                p-4 md:p-6
                                flex items-center justify-center
                                text-center
                                h-full
                            ">
                                {/* Название компании */}
                                <div className="w-full">
                                    <h3 className="
                                        font-medium md:font-semibold
                                        text-copy-primary
                                        text-sm md:text-base
                                        line-clamp-3
                                        leading-snug
                                        px-1
                                        group-hover:text-cta
                                        transition-colors duration-300
                                    ">
                                        {company}
                                    </h3>
                                    <div className="
                                        mt-3
                                        h-0.5 w-12 mx-auto
                                        bg-gradient-to-r from-transparent via-cta/50 to-transparent
                                        opacity-0 group-hover:opacity-100
                                        transition-all duration-500
                                    " />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Кнопка "Показать еще/Скрыть" если компаний больше чем visibleCount */}
                {companies.length > visibleCount && (
                    <div className="text-center mt-10 md:mt-14">
                        <button
                            onClick={toggleExpand}
                            className="
                                inline-flex items-center justify-center
                                px-6 md:px-8 py-3 md:py-4
                                rounded-full
                                bg-cta
                                text-cta-text font-medium
                                hover:bg-cta-active
                                active:scale-95
                                transition-all duration-300
                                shadow-lg hover:shadow-xl
                                text-sm md:text-base
                                min-w-[160px]
                            "
                        >
                            <span>
                                {isExpanded ? 'Скрыть' : 'Показать все'}
                            </span>
                            <svg
                                className={`
                                    ml-2 w-5 h-5
                                    transition-transform duration-300
                                    ${isExpanded ? 'rotate-180' : ''}
                                `}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>

                        <p className="
                            mt-4 text-sm text-copy-secondary
                            opacity-0 animate-fadeIn
                        ">
                            {isExpanded
                                ? `${companies.length} компаний`
                                : `${visibleCount} из ${companies.length} компаний`
                            }
                        </p>
                    </div>
                )}

                {/* Индикаторы для мобилки */}
                <div className="
                    flex justify-center gap-2 mt-8
                    md:hidden
                ">
                    {Array.from({
                        length: Math.ceil(companies.length / visibleCount)
                    }).map((_, idx) => (
                        <div
                            key={idx}
                            className={`
                                w-2 h-2 rounded-full
                                transition-all duration-300
                                ${idx === 0 ? 'bg-cta w-4' : 'bg-border'}
                            `}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Partners;