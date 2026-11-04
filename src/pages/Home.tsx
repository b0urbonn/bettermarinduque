import Hero from '../components/sections/Hero';
import QuickTasks from '../components/home/QuickTasks';
import ServicesSection from '../components/home/ServicesSection';
import AboutMarinduque from '../components/home/AboutMarinduque';
import AboutBetterMarinduque from '../components/home/AboutBetterMarinduque';
import Municipalities from '../components/home/Municipalities';
import GovernmentActivitySection from '../components/home/GovernmentActivitySection';
import Hotlines from '../components/home/Hotlines';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  return (
    <>
      <SEO
        title="Home"
        description="BetterMarinduque is a community portal for local service guides, government offices, municipal contacts, and emergency hotlines."
        keywords="Marinduque, province, government services, MIMAROPA, Boac, Moryonan, Moriones Lenten Rites, Heart of the Philippines"
      />
      <main className="flex-grow">
        <Hero />
        <QuickTasks />
        <ServicesSection />
        <AboutMarinduque />
        <Municipalities />
        <GovernmentActivitySection />
        <AboutBetterMarinduque />
        <Hotlines />
      </main>
    </>
  );
};

export default Home;
