import { useEffect, useState } from 'react';
import { Calendar, Clock, Thermometer, TrendingUp } from 'lucide-react';
import { capitolCoordinates } from '../../data/province';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function manilaTime() {
  return new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' })
  );
}

export default function InfoBar() {
  const [rate, setRate] = useState('1 USD = ₱ --');
  const [temp, setTemp] = useState('--°C');
  const [now, setNow] = useState(manilaTime);

  const dateStr = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
  const hour = now.getHours();
  const minute = now.getMinutes();
  const timeStr = `${hour % 12 || 12}:${minute < 10 ? '0' + minute : minute} ${
    hour >= 12 ? 'PM' : 'AM'
  }`;

  useEffect(() => {
    const interval = setInterval(() => setNow(manilaTime()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/USD')
      .then(r => r.json())
      .then(data => {
        if (data?.rates?.PHP) setRate(`1 USD = ₱ ${data.rates.PHP.toFixed(2)}`);
      })
      .catch(() => {});

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${capitolCoordinates.lat}&longitude=${capitolCoordinates.lon}&current_weather=true`
    )
      .then(r => r.json())
      .then(data => {
        if (data?.current_weather?.temperature != null) {
          setTemp(`${Math.round(data.current_weather.temperature)}°C`);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div
      role="complementary"
      aria-label="Real-time information"
      className="bg-primary-950 py-1.5 text-[0.6875rem] tracking-[0.01em] text-white"
    >
      <div className="portal-container">
        <div
          aria-live="polite"
          aria-atomic="false"
          className="flex flex-wrap items-center justify-end gap-4 max-lg:justify-center max-md:flex-nowrap max-md:gap-0"
        >
          <div
            className="inline-flex items-center gap-1.5 text-white max-md:gap-1 max-md:whitespace-nowrap"
            aria-label="Exchange rates"
          >
            <TrendingUp
              size={12}
              aria-hidden="true"
              className="text-[#ffff00]"
            />
            <span className="inline-block min-w-24 text-left">{rate}</span>
          </div>
          <div
            className="inline-flex items-center gap-1.5 border-l border-white/15 pl-4 text-white max-md:gap-1 max-md:pl-2 max-md:ml-2 max-md:whitespace-nowrap"
            aria-label="Current weather in Boac"
          >
            <Thermometer
              size={12}
              aria-hidden="true"
              className="text-[#ffff00]"
            />
            <span>Boac</span>
            <span>{temp}</span>
          </div>
          <div
            className="inline-flex items-center gap-1.5 border-l border-white/15 pl-4 text-white max-md:gap-1 max-md:pl-2 max-md:ml-2 max-md:whitespace-nowrap"
            aria-label="Philippine date and time"
          >
            <Calendar size={12} aria-hidden="true" className="text-[#ffff00]" />
            <span>{dateStr}</span>
            <span aria-hidden="true" className="mx-0.5 text-[0.5rem]">
              •
            </span>
            <Clock size={12} aria-hidden="true" className="text-[#ffff00]" />
            <span className="font-medium tabular-nums">{timeStr}</span>
            <span className="text-[0.625rem] tracking-wider uppercase">
              PHT
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
