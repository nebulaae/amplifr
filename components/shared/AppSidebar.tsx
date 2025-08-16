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
const experiences = ['Меньше года', '1-3 года', 'От 5 лет'];
const spheres = [
    'Менеджмент', 'Маркетинг', 'Реклама и PR', 'HR', 'Креатив', 'Дизайн',
    'Продажи', 'IT', 'Клиентский сервис и поддержка', 'Финансы', 'SMM', 'Копирайтинг', 'Другое'
];

export function AppSidebar() {
    const { filters, setFilters, updateFilter } = useFilters();
    const [searchInput, setSearchInput] = useState(filters.search);

    const handleCheckboxChange = (value: string, category: 'type' | 'experience' | 'sphere') => {
        const current = filters[category];
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
        setFilters({ type: [], experience: [], sphere: [], search: '' });
        setSearchInput('');
    };

    const hasActiveFilters = filters.type.length > 0 || filters.experience.length > 0 ||
        filters.sphere.length > 0 || filters.search.length > 0;

    return (
        <Sidebar>
            <SidebarHeader className="border-b border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Amplifr teams</h2>
                </div>

                {/* Search Bar */}
                <form onSubmit={handleSearchSubmit} className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Поиск вакансий..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {searchInput && (
                        <button
                            type="button"
                            onClick={() => setSearchInput('')}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </form>
            </SidebarHeader>

            <SidebarContent className="p-6">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-6">
                            {/* Clear All Button */}
                            <div className="flex justify-between items-center">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={clearAllFilters}
                                    disabled={!hasActiveFilters}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50 disabled:text-gray-400"
                                >
                                    Сбросить все
                                </Button>
                                {hasActiveFilters && (
                                    <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                                        Активны
                                    </span>
                                )}
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

                            {/* Experience Filter */}
                            <div className="space-y-3">
                                <SidebarGroupLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    Опыт работы
                                    {filters.experience.length > 0 && (
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                                            {filters.experience.length}
                                        </span>
                                    )}
                                </SidebarGroupLabel>
                                <div className="space-y-2">
                                    {experiences.map(item => (
                                        <div key={item} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md transition-colors">
                                            <Checkbox
                                                id={`exp-${item}`}
                                                checked={filters.experience.includes(item)}
                                                onCheckedChange={() => handleCheckboxChange(item, 'experience')}
                                                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                            />
                                            <Label
                                                htmlFor={`exp-${item}`}
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
                                <div className="space-y-2 max-h-64 overflow-y-auto">
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
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}