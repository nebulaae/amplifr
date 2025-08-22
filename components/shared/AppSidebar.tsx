'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useFilters } from '@/app/providers/FiltersProvider';
import { Search, Filter, X } from 'lucide-react';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarHeader,
} from "@/components/ui/sidebar";

const employmentTypes = ['Удаленно', 'Гибрид', 'Офис'];

const salaryRanges = [
    { value: '10000-50000', label: '10 000 - 50 000 ₽' },
    { value: '50000-100000', label: '50 000 - 100 000 ₽' },
    { value: '100000-150000', label: '100 000 - 150 000 ₽' },
    { value: '150000-200000', label: '150 000 - 200 000 ₽' }
];

const freshnessOptions = [
    { value: 'today', label: 'Сегодня' },
    { value: '3days', label: 'За 3 дня' },
    { value: 'week', label: 'За неделю' }
];

const spheres = [
    'Менеджмент', 'Маркетинг', 'Реклама и PR', 'HR', 'Креатив', 'Дизайн',
    'Продажи', 'IT', 'Клиентский сервис и поддержка', 'Финансы', 'SMM', 'Копирайтинг', 'Другое'
];

export function AppSidebar() {
    const { filters, setFilters, updateFilter } = useFilters();
    const [searchInput, setSearchInput] = useState(filters.search);

    const handleCheckboxChange = (value: string, category: 'type' | 'experience' | 'sphere' | 'salary' | 'freshness') => {
        const current = filters[category] || [];
        const newValues = current.includes(value)
            ? current.filter(v => v !== value)
            : [...current, value];

        updateFilter(category, newValues);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateFilter('search', searchInput);
    };

    const clearAllFilters = () => {
        setFilters({ type: [], experience: [], sphere: [], salary: [], freshness: [], search: '' });
        setSearchInput('');
    };

    const hasActiveFilters = filters.type.length > 0 || filters.experience.length > 0 ||
        filters.sphere.length > 0 || filters.salary?.length > 0 || filters.freshness?.length > 0 || filters.search.length > 0;

    return (
        <Sidebar className='bg-none border-none'>
            <SidebarHeader className="-mt-2 p-6">
                <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold text-[#5D6567]">amplifr &#10095;&#10095; teams</h2>
                </div>
            </SidebarHeader>

            <SidebarContent className="p-4">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-4">
                            {/* Clear All Button */}
                            <div className="flex justify-between items-center">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={clearAllFilters}
                                    disabled={!hasActiveFilters}
                                    className="text-sky-600 hover:text-sky-700 hover:bg-sky-50 disabled:text-gray-400 p-2"
                                >
                                    Сбросить все
                                </Button>
                            </div>

                            {/* Employment Type Filter */}
                            <div className="space-y-3">
                                <SidebarGroupLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    Тип занятости
                                    {filters.type.length > 0 && (
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                                            {filters.type.length}
                                        </span>
                                    )}
                                </SidebarGroupLabel>
                                <div className="space-y-2">
                                    {employmentTypes.map(item => (
                                        <div key={item} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md transition-colors">
                                            <Checkbox
                                                id={`type-${item}`}
                                                checked={filters.type.includes(item)}
                                                onCheckedChange={() => handleCheckboxChange(item, 'type')}
                                                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                            />
                                            <Label
                                                htmlFor={`type-${item}`}
                                                className="text-sm text-gray-700 cursor-pointer flex-1"
                                            >
                                                {item}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Sphere Filter */}
                            <div className="space-y-3">
                                <SidebarGroupLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    Сфера деятельности
                                    {filters.sphere.length > 0 && (
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                                            {filters.sphere.length}
                                        </span>
                                    )}
                                </SidebarGroupLabel>
                                <div className="space-y-2 h-full">
                                    {spheres.map(item => (
                                        <div key={item} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md transition-colors">
                                            <Checkbox
                                                id={`sphere-${item}`}
                                                checked={filters.sphere.includes(item)}
                                                onCheckedChange={() => handleCheckboxChange(item, 'sphere')}
                                                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                            />
                                            <Label
                                                htmlFor={`sphere-${item}`}
                                                className="text-sm text-gray-700 cursor-pointer flex-1"
                                            >
                                                {item}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Salary Range Filter */}
                            <div className="space-y-3">
                                <SidebarGroupLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    Зарплата
                                    {filters.salary?.length > 0 && (
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                                            {filters.salary.length}
                                        </span>
                                    )}
                                </SidebarGroupLabel>
                                <div className="space-y-2">
                                    {salaryRanges.map(item => (
                                        <div key={item.value} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md transition-colors">
                                            <Checkbox
                                                id={`salary-${item.value}`}
                                                checked={filters.salary?.includes(item.value) || false}
                                                onCheckedChange={() => handleCheckboxChange(item.value, 'salary')}
                                                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                            />
                                            <Label
                                                htmlFor={`salary-${item.value}`}
                                                className="text-sm text-gray-700 cursor-pointer flex-1"
                                            >
                                                {item.label}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Freshness Filter */}
                            <div className="space-y-3">
                                <SidebarGroupLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    Свежесть
                                    {filters.freshness?.length > 0 && (
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                                            {filters.freshness.length}
                                        </span>
                                    )}
                                </SidebarGroupLabel>
                                <div className="space-y-2">
                                    {freshnessOptions.map(item => (
                                        <div key={item.value} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md transition-colors">
                                            <Checkbox
                                                id={`freshness-${item.value}`}
                                                checked={filters.freshness?.includes(item.value) || false}
                                                onCheckedChange={() => handleCheckboxChange(item.value, 'freshness')}
                                                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                            />
                                            <Label
                                                htmlFor={`freshness-${item.value}`}
                                                className="text-sm text-gray-700 cursor-pointer flex-1"
                                            >
                                                {item.label}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}