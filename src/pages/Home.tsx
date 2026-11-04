import Hero from '../components/sections/Hero';
import QuickTasks from '../components/home/QuickTasks';
import ServicesSection from '../components/home/ServicesSection';
import AboutMarinduque from '../components/home/AboutMarinduque';
import Municipalities from '../components/home/Municipalities';
import GovernmentActivitySection from '../components/home/GovernmentActivitySection';
import Hotlines from '../components/home/Hotlines';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  return (
    <>
      <SEO
        title="Home"
        description="A community-run portal for the Province of Marinduque — the Heart of the Philippines. Find provincial services, offices, and information in one place."
        keywords="Marinduque, province, government services, MIMAROPA, Boac, Moryonan, Moriones Lenten Rites, Heart of the Philippines"
      />
      <main className="flex-grow">
        <Hero />
        <QuickTasks />
        <ServicesSection />
        <AboutMarinduque />
        <Municipalities />
        <GovernmentActivitySection />
        <Hotlines />
      </main>
    </>
  );
};

export default Home;
