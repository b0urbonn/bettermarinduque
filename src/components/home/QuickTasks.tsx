import { ArrowRight, FileText, Landmark, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

const tasks = [
  {
    key: 'emergency',
    to: '/#hotlines',
    Icon: Phone,
    tile: 'bg-secondary-50 text-secondary-600 shadow-[inset_0_0_0_1px_var(--color-secondary-100)]',
  },
  { key: 'town', to: '/municipalities', Icon: MapPin, tile: '' },
  { key: 'offices', to: '/government', Icon: Landmark, tile: '' },
  {
    key: 'funds',
    to: '/transparency',
    Icon: FileText,
    tile: 'bg-accent-50 text-accent-700 shadow-[inset_0_0_0_1px_var(--color-accent-100)]',
  },
];

export default function QuickTasks() {
  const { t, i18n } = useTranslation();

  return (
    <section
      aria-labelledby="quick-tasks-heading"
      lang={i18n.resolvedLanguage}
      className="portal-container relative z-10 -mt-14 sm:-mt-16"
    >
      <h2 id="quick-tasks-heading" className="sr-only">
        {t('quickTasks.heading')}
      </h2>
      <ul className="grid gap-3 rounded-3xl border border-gray-200 bg-white p-3 shadow-[0_24px_60px_-28px_rgb(11_26_61/0.45)] sm:grid-cols-2 lg:grid-cols-4">
        {tasks.map(({ key, to, Icon, tile }) => (
          <li key={key}>
            <Link
              to={to}
              className="group flex h-full items-center gap-3.5 rounded-2xl p-3.5 transition-colors duration-150 hover:bg-gray-50"
            >
              <span className={`icon-tile size-12 rounded-2xl ${tile}`}>
                <Icon size={22} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-gray-900 group-hover:text-primary-800">
                  {t(`quickTasks.${key}.title`)}
                </span>
                <span className="mt-0.5 block text-sm leading-snug text-gray-600">
                  {t(`quickTasks.${key}.description`)}
                </span>
              </span>
              <ArrowRight
                size={17}
                aria-hidden="true"
                className="shrink-0 text-gray-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-primary-700"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
