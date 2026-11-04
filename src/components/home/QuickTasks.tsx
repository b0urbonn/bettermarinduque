import { ArrowRight, FileText, Landmark, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

const tasks = [
  { key: 'emergency', to: '/#hotlines', Icon: Phone },
  { key: 'town', to: '/#municipalities', Icon: MapPin },
  { key: 'offices', to: '/government', Icon: Landmark },
  { key: 'funds', to: '/transparency', Icon: FileText },
];

export default function QuickTasks() {
  const { t, i18n } = useTranslation();

  return (
    <section
      aria-labelledby="quick-tasks-heading"
      lang={i18n.resolvedLanguage}
      className="portal-container py-7 sm:py-9"
    >
      <h2 id="quick-tasks-heading" className="text-xl font-bold tracking-tight">
        {t('quickTasks.heading')}
      </h2>
      <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {tasks.map(({ key, to, Icon }) => (
          <li key={key}>
            <Link
              to={to}
              className="group flex h-full items-center gap-3 rounded-md border border-gray-300 bg-white p-3.5 hover:border-primary-500 hover:bg-primary-50 motion-safe:transition-colors motion-safe:duration-150"
            >
              <Icon
                size={22}
                aria-hidden="true"
                className={
                  key === 'emergency'
                    ? 'shrink-0 text-secondary-600'
                    : 'shrink-0 text-primary-700'
                }
              />
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-primary-900 group-hover:underline">
                  {t(`quickTasks.${key}.title`)}
                </span>
                <span className="mt-0.5 block text-sm leading-snug text-gray-700">
                  {t(`quickTasks.${key}.description`)}
                </span>
              </span>
              <ArrowRight
                size={17}
                aria-hidden="true"
                className="shrink-0 text-gray-700"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
