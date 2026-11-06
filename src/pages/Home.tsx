import HeroV2 from '../components/home/HeroV2';
import ServicesGrid from '../components/home/ServicesGrid';
import StatsCards from '../components/home/StatsCards';
import Municipalities from '../components/home/Municipalities';
import WeatherMap from '../components/home/WeatherMap';
import HistorySection from '../components/home/HistorySection';
import UpdatesSection from '../components/home/UpdatesSection';
import Leadership from '../components/home/Leadership';
import Hotlines from '../components/home/Hotlines';
import ContactCards from '../components/home/ContactCards';
import AboutMarinduque from '../components/home/AboutMarinduque';
import SEO from '../components/SEO';

export default function Home() {
  return (
    <>
      <SEO
        title="Home"
        description="Find Marinduque public services, explore its six municipalities, and look up emergency hotlines and public records."
        keywords="Marinduque, province, government services, MIMAROPA, Boac, Moryonan, Moriones Lenten Rites"
      />
      <HeroV2 />
      <ServicesGrid />
      <StatsCards />
      <Municipalities />
      <WeatherMap />
      <HistorySection />
      <UpdatesSection />
      <Leadership />
      <Hotlines />
      <ContactCards />
      <AboutMarinduque />
    </>
  );
}
