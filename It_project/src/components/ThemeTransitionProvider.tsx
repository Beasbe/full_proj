'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { ReactNode } from 'react'

interface ThemeTransitionProviderProps {
    children: ReactNode;
}

export default function ThemeTransitionProvider({ children }: ThemeTransitionProviderProps) {
    const { theme } = useTheme();

    useEffect(() => {
        // Добавляем глобальные стили для View Transitions
        const styleId = 'view-transition-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            /* Улучшенные анимации для View Transitions */
            @keyframes theme-fade-in {
                from { 
                    opacity: 0;
                    transform: scale(0.98);
                }
                to { 
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            @keyframes theme-fade-out {
                from { 
                    opacity: 1;
                    transform: scale(1);
                }
                to { 
                    opacity: 0;
                    transform: scale(1.02);
                }
            }
            
            /* Плавные переходы для всех элементов */
            body, 
            .theme-transition {
                transition: background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1),
                            color 0.5s cubic-bezier(0.4, 0, 0.2, 1),
                            border-color 0.5s cubic-bezier(0.4, 0, 0.2, 1),
                            box-shadow 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            }
        `;

        document.head.appendChild(style);

        return () => {
            const styleEl = document.getElementById(styleId);
            if (styleEl) {
                styleEl.remove();
            }
        };
    }, [theme]);

    return <div className="theme-transition">{children}</div>;
}