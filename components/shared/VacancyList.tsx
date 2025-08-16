'use client'

import { useVacancies, Vacancy } from '@/hooks/useVacancies';
import { Button } from '../ui/button';
import { useFilters } from '@/app/providers/FiltersProvider';
import { useEffect, useRef, useCallback, useState } from 'react';
import Image from 'next/image';
import { Loader2, MapPin, DollarSign, Briefcase, Calendar, ChevronDown, ChevronUp } from 'lucide-react';

export const VacancyList = () => {
    const { filters } = useFilters();
    const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useVacancies(filters);
    const observerRef = useRef<HTMLDivElement>(null);
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
            <div className="flex items-center justify-center min-h-96">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    <p className="text-gray-600">Загружаем вакансии...</p>
                </div>
            </div>
        );
    }

    if (allVacancies.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-96">
                <div className="text-center">
                    <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                        <Briefcase className="h-full w-full" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Вакансии не найдены</h3>
                    <p className="text-gray-600">Попробуйте изменить параметры поиска или фильтры</p>
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

                    // Extract hashtags
                    const hashtagsMatch = text.match(/#\S+/g) || [];
                    const hashtags = hashtagsMatch.map((tag, i) => (
                        <span
                            key={i}
                            className="px-2 py-1 text-xs bg-blue-50 border border-blue-200 text-blue-700 rounded-full"
                        >
                            {tag}
                        </span>
                    ));

                    // Clean text
                    text = text.replace(/Откликнуться[\s\S]*/i, '');
                    text = text.replace(/#\S+/g, '');
                    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                    text = text.replace(/\n+/g, '<br/>');
                    text = text.replace(/__.*?__\s*/i, '');
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
                            className="flex flex-col h-full gap-4 border border-gray-200 hover:border-blue-300 px-6 py-6 rounded-2xl bg-white hover:shadow-lg transition-all duration-200"
                        >
                            {/* Header with position and employment type */}
                            <div className="flex justify-between items-start gap-4">
                                <div className="flex-1">
                                    {vacancy.position && (
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                                            {vacancy.position}
                                        </h3>
                                    )}

                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {vacancy.employmentType && (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-green-50 text-green-700 rounded-full">
                                                <MapPin className="h-3 w-3" />
                                                {vacancy.employmentType}
                                            </span>
                                        )}
                                        {vacancy.salary && (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-yellow-50 text-yellow-700 rounded-full">
                                                <DollarSign className="h-3 w-3" />
                                                {vacancy.salary}
                                            </span>
                                        )}
                                        {vacancy.sphere && (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-purple-50 text-purple-700 rounded-full">
                                                <Briefcase className="h-3 w-3" />
                                                {vacancy.sphere}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Hashtags */}
                                <div className="flex flex-wrap gap-1 max-w-48">
                                    {hashtags.slice(0, 3)}
                                    {hashtags.length > 3 && (
                                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                                            +{hashtags.length - 3}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Main content */}
                            <div className="flex-1">
                                <div className="border-l-4 border-blue-200 bg-gray-50 rounded-r-xl">
                                    <div className="p-4">
                                        <div
                                            className={`text-sm text-gray-700 max-w-none ${isExpanded ? '' : 'line-clamp-6'}`}
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
                            </div>

                            {/* Footer */}
                            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                <time className="flex items-center gap-1 text-sm text-gray-500">
                                    <Calendar className="h-4 w-4" />
                                    {formatted}
                                </time>

                                <a href={vacancy.url} target="_blank" rel="noopener noreferrer">
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
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
                    );
                })}
            </div>

            {/* Loading indicator for pagination */}
            {isFetchingNextPage && (
                <div className="flex justify-center py-8">
                    <div className="flex items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                        <span className="text-sm text-gray-600">Загружаем еще вакансии...</span>
                    </div>
                </div>
            )}

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
            {!hasNextPage && allVacancies.length > 0 && (
                <div className="text-center py-8 text-gray-500">
                    <p>Вы просмотрели все доступные вакансии</p>
                </div>
            )}
        </div>
    );
};