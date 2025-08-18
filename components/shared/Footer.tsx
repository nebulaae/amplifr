import Image from "next/image";

export const Footer = () => {
    return (
        <footer className="w-full bg-neutral-50 mt-32 h-96">
            <div className="max-w-7xl mx-auto p-8 py-16 h-full">
                <div className="flex flex-col md:flex-row items-center justify-center lg:justify-between h-full">
                    <div className="flex flex-col justify-between items-center md:items-start h-full py-6 md:py-0 gap-6">
                        <div className="flex flex-col flex-wrap gap-4">
                            <h2 className="text-center md:text-start text-lg md:text-xl font-semibold text-gray-900">
                                Подпишитесь на карьеру в:
                            </h2>
                            <div className="flex flex-wrap flex-row gap-2 md:4">
                                <a
                                    href="https://t.me/+A9CJ5T3LWg1hNjM6"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center px-4 py-2 bg-[#DDFDE9] border border-[#4A8268] rounded-xl"
                                >
                                    Дизайне
                                </a>
                                <a
                                    href="https://t.me/+I_4Nn6VUxVFlNDBi"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center px-4 py-2 bg-[#FFF7D0] border border-[#FFC63E] rounded-xl"
                                >
                                    Копирайтинг
                                </a>
                                <a
                                    href="https://t.me/+c1l5pfb2i59hMWUy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center px-4 py-2 bg-[#EFECFF] border border-[#9789D8] rounded-xl"
                                >
                                    Маркетинге
                                </a>
                            </div>
                        </div>
                        <div className="text-2xl">
                            <span className="font-semibold">amplifr</span> © 2025 - ∞
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-between lg:items-start gap-6 h-full py-6 md:py-0">
                        <h1 className="font-semibold text-lg md:text-xl">Проект Gorka Media</h1>
                        <Image src="/logo.png" alt="logo" width={96} height={96} />
                        <p className="text-center md:text-start text-sm max-w-[400px]">На сайте amplifr.com могут содержаться упоминания и ссылки на Facebook и Instagram — ресурсы, принадлежащие компании Meta Inc., деятельность которой запрещена в РФ.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};