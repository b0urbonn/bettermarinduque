import Hero, { ProvinceFacts } from '../components/sections/Hero';
import QuickTasks from '../components/home/QuickTasks';
import AboutMarinduque from '../components/home/AboutMarinduque';
import Municipalities from '../components/home/Municipalities';
import Hotlines from '../components/home/Hotlines';
import SEO from '../components/SEO';

export default function Home() {
  return (
    <>
      <SEO
        title="Home"
        description="Find Marinduque public services, explore its six municipalities, and look up emergency hotlines and public records."
        keywords="Marinduque, province, government services, MIMAROPA, Boac, Moryonan, Moriones Lenten Rites"
      />
      <Hero />
      <QuickTasks />
      <Municipalities />
      <Hotlines />
      <ProvinceFacts />
      <AboutMarinduque />
    </>
  );
}
