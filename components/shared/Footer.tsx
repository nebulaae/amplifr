import Image from "next/image";

export const Footer = () => {
    return (
        <footer className="w-full bg-gray-50 mt-12 h-96">
            <div className="max-w-7xl mx-auto px-6 py-8 h-full">
                <div className="flex flex-col lg:flex-row items-start justify-center lg:justify-between gap-6 h-full">
                    <div className="flex flex-col justify-between items-center md:items-start h-full my-0 lg:my-6">
                        <div className="flex flex-col flex-wrap py-4">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                Подпишитесь на карьеру в:
                            </h2>
                            <div className="flex flex-row gap-4">
                                <a
                                    href="https://t.me/+A9CJ5T3LWg1hNjM6"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 bg-[#DDFDE9] border border-[#4A8268] rounded-xl"
                                >
                                    Дизайне
                                </a>
                                <a
                                    href="https://t.me/+I_4Nn6VUxVFlNDBi"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 bg-[#FFF7D0] border border-[#FFC63E] rounded-xl"
                                >
                                    Копирайтинг
                                </a>
                                <a
                                    href="https://t.me/+c1l5pfb2i59hMWUy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 bg-[#EFECFF] border border-[#9789D8] rounded-xl"
                                >
                                    Маркетинге
                                </a>
                            </div>
                        </div>
                        <div className="text-2xl my-2">
                            <span className="font-semibold">amplifr</span> © 2025 - ∞
                        </div>
                    </div>

                    <div className="flex flex-col items-center lg:items-start gap-6 h-full my-0 lg:my-6">
                        <h1 className="font-semibold text-xl">Проект Gorka Media</h1>
                        <Image src="/logo.png" alt="logo" width={96} height={96} />
                        <p className="text-sm max-w-[400px]">На сайте amplifr.com могут содержаться упоминания и ссылки на Facebook и Instagram — ресурсы, принадлежащие компании Meta Inc., деятельность которой запрещена в РФ.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};