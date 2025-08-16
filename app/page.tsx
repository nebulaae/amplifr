import { Footer } from '@/components/shared/Footer';
import { VacancyList } from '@/components/shared/VacancyList';
import { SidebarTrigger } from '@/components/ui/sidebar';

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className='flex justify-between px-6 mt-4'>
        <SidebarTrigger />
        <a
          href="https://t.me/gorkamanager"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#7C8384] hover:text-blue-600 transition-colors"
        >
          Разместить вакансию
        </a>
      </div>
      <div className="flex-1">
        <VacancyList />
      </div>
      <Footer />
    </div>
  );
};

export default Page;