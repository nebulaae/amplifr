import { Footer } from '@/components/shared/Footer';
import { VacancyList } from '@/components/shared/VacancyList';
import { Navbar } from '@/components/shared/Navbar';

const Page = () => {

  return (
    <div className="flex flex-col h-full">
      <Navbar />
      <div className="flex-1 mt-16">
        <VacancyList />
      </div>
      <Footer />
    </div>
  );
};

export default Page;