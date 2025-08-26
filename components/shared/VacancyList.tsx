'use client'

import Image from 'next/image';

import { Button } from '../ui/button';
import { Loader2, Briefcase, ChevronDown, ChevronUp } from 'lucide-react';
import { useVacancies, Vacancy } from '@/hooks/useVacancies';
import { useFilters } from '@/app/providers/FiltersProvider';
import { useEffect, useRef, useCallback, useState } from 'react';

export const VacancyList = () => {
    const observerRef = useRef<HTMLDivElement>(null);
    const { filters } = useFilters();
    const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useVacancies(filters);
    const [expandedVacancies, setExpandedVacancies] = useState<Set<number>>(new Set());

    // Infinite scroll implementation
    const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
        const [target] = entries;
        if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    useEffect(() => {
        const element = observerRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(handleObserver, {
            threshold: 0.1,
        });

        observer.observe(element);
        return () => observer.unobserve(element);
    }, [handleObserver]);

    const allVacancies = data?.pages.flatMap(page => page.vacancies) || [];

    const toggleExpanded = (vacancyId: number) => {
        setExpandedVacancies(prev => {
            const newSet = new Set(prev);
            if (newSet.has(vacancyId)) {
                newSet.delete(vacancyId);
            } else {
                newSet.add(vacancyId);
            }
            return newSet;
        });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center w-screen lg:w-[86vw] h-full py-20">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    <p className="text-gray-600">Загружаем вакансии...</p>
                </div>
            </div>
        );
    }

    if (allVacancies.length === 0) {
        return (
            <div className="flex items-center justify-center w-screen lg:w-[86vw] h-full py-20">
                <div className="text-center max-w-md">
                    <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                        <Briefcase className="h-full w-full" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Вакансии не найдены
                    </h3>
                    <p className="text-gray-600">
                        Попробуйте изменить параметры поиска или фильтры
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
                {allVacancies.map((vacancy: Vacancy) => {
                    const isExpanded = expandedVacancies.has(vacancy.id);
                    let text = vacancy.text;

                    // Extract hashtags (employment + salary only)
                    const hashtagsMatch = text.match(/#(удаленно|офис|гибрид|от[^\s]+)/gi) || [];
                    const hashtags = hashtagsMatch.map((tag, i) => (
                        <span
                            key={i}
                            className="px-2 py-1 text-xs bg-white border border-[#B3C9F8] text-blue-500 rounded-full"
                        >
                            {tag}
                        </span>
                    ));

                    // Extract salary (support "З/П", "Зп", "Зарплата")
                    let salaryMatch = text.match(/__\s*(З[\/]?П|Зп|Зарплата)[^_]*__/i);
                    let salary = "";
                    if (salaryMatch) {
                        salary = salaryMatch[0].replace(/__/g, "").trim();
                    }

                    // Remove position duplicate from text if it matches vacancy.position
                    if (vacancy.position) {
                        const escapedPos = vacancy.position.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

                        // Covers "**Копирайтер**", "Копирайтер", or with newline after
                        const positionRegex = new RegExp(
                            `^(\\*\\*\\s*)?${escapedPos}(\\s*\\*\\*)?\\s*\\n?`,
                            "i"
                        );

                        text = text.replace(positionRegex, "");
                    }

                    // Clean salary from text (so it won't duplicate in body)
                    text = text.replace(/__\s*(З[\/]?П|Зп|Зарплата)[^_]*__\s*/i, "");

                    // Remove hashtags, formatting, and add spacing
                    text = text.replace(/Откликнуться[\s\S]*/i, '');
                    text = text.replace(/#\S+/g, '');
                    text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
                    text = text.replace(/\n{2,}/g, '<br/><br/>');
                    text = text.replace(/\n/g, '<br/>');
                    text = text.replace(/\*/g, '');

                    // Format date
                    const date = new Date(vacancy.createdAt);
                    const formatted = date.toLocaleDateString("ru-RU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    }).replace(" г.", "");

                    return (
                        <div
                            key={vacancy.id}
                            className="flex flex-col gap-4 border border-gray-200 p-4 sm:p-6 rounded-2xl bg-slate-50 h-full"
                        >
                            {/* Header: salary instead of position */}
                            {/* Header with position and salary */}
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                                <div className="flex-1">
                                    {vacancy.position && (
                                        <h3 className="text-xl font-semibold text-gray-900 mb-1 line-clamp-2">
                                            {vacancy.position}
                                        </h3>
                                    )}
                                </div>

                                {/* Hashtags (working already) */}
                                <div className="flex flex-wrap gap-1 max-w-64">
                                    {hashtags.slice(0, 3)}
                                </div>
                            </div>

                            {/* Main content */}
                            <div className="flex-1">
                                <div className="border-l-4 border-[#B3C9F8] bg-white rounded-r-xl">
                                    <div className="border border-[#B3C9F8] border-l-0 rounded-r-2xl p-4">
                                        <div className='flex justify-end items-center'>
                                            <span className='pt-1 text-2xl font-bold text-sky-500 bg-sky-100 px-2.5 rounded-full'>
                                                ❜❜
                                            </span>
                                        </div>
                                        {salary && (
                                            <p className="text-sm font-semibold mb-6 w-[90%]">
                                                {salary}
                                            </p>
                                        )}
                                        <div
                                            className={`-mt-0 sm:-mt-4 text-base sm:text-sm text-gray-700 max-w-none w-[95%] ${isExpanded ? '' : 'line-clamp-16'}`}
                                            dangerouslySetInnerHTML={{ __html: text }}
                                        />
                                        {text.length > 300 && (
                                            <button
                                                onClick={() => toggleExpanded(vacancy.id)}
                                                className="mt-2 flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                                            >
                                                {isExpanded ? (
                                                    <>
                                                        <ChevronUp className="h-4 w-4" />
                                                        Свернуть
                                                    </>
                                                ) : (
                                                    <>
                                                        <ChevronDown className="h-4 w-4" />
                                                        Читать полностью
                                                    </>
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                    <time className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
                                        {formatted}
                                    </time>

                                    <a href={vacancy.url} target="_blank" rel="noopener noreferrer">
                                        <Button className="rounded-xl">
                                            Откликнуться
                                            <Image
                                                src="/telegram-icon.png"
                                                alt="Telegram"
                                                width={18}
                                                height={18}
                                                className="ml-2"
                                            />
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Loading indicator for pagination */}
            {
                isFetchingNextPage && (
                    <div className="flex justify-center py-8">
                        <div className="flex items-center gap-2">
                            <Loader2 className="h-5 w-5 animate-spin text-[#B3C9F8]" />
                            <span className="text-sm text-gray-600">Загружаем еще вакансии...</span>
                        </div>
                    </div>
                )
            }

            {/* Observer element for infinite scroll */}
            <div
                ref={observerRef}
                className="h-10 flex items-center justify-center"
            >
                {hasNextPage && !isFetchingNextPage && (
                    <Button
                        variant="outline"
                        onClick={() => fetchNextPage()}
                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                    >
                        Загрузить еще
                    </Button>
                )}
            </div>

            {/* End message */}
            {
                !hasNextPage && allVacancies.length > 0 && (
                    <div className="text-center py-8 text-gray-500">
                        <p>Вы просмотрели все доступные вакансии</p>
                    </div>
                )
            }
        </div >
    );
};