import { useEffect, useState } from 'react';
import { CloudSun, Droplets, MapPin, Wind } from 'lucide-react';
import { capitolCoordinates } from '../../data/province';

interface CurrentWeather {
  temperature: number;
  weatherCode: number;
  humidity: number;
  windSpeed: number;
}

const weatherDescriptions: Record<number, string> = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Foggy',
  48: 'Icy fog',
  51: 'Light drizzle',
  53: 'Drizzle',
  55: 'Heavy drizzle',
  61: 'Light rain',
  63: 'Rain',
  65: 'Heavy rain',
  71: 'Light snow',
  73: 'Snow',
  75: 'Heavy snow',
  80: 'Light showers',
  81: 'Showers',
  82: 'Heavy showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with hail',
  99: 'Severe thunderstorm',
};

export default function WeatherMap() {
  const [weather, setWeather] = useState<CurrentWeather>();

  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${capitolCoordinates.lat}&longitude=${capitolCoordinates.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&wind_speed_unit=kmh`
    )
      .then(r => r.json())
      .then(data => {
        const current = data?.current;
        if (current?.temperature_2m != null) {
          setWeather({
            temperature: Math.round(current.temperature_2m),
            weatherCode: current.weather_code ?? 0,
            humidity: Math.round(current.relative_humidity_2m ?? 0),
            windSpeed: Math.round(current.wind_speed_10m ?? 0),
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section aria-labelledby="weather-map-heading" className="py-12 md:py-16">
      <div className="portal-container">
        <div className="mb-8">
          <h2
            id="weather-map-heading"
            className="text-xl font-bold tracking-tight text-gray-900"
          >
            Weather &amp; location
          </h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div
            role="region"
            aria-label="Current weather in Boac, Marinduque"
            className="flex flex-col rounded-2xl border border-black/[0.06] bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] transition hover:-translate-y-0.5 hover:shadow-[0_2px_6px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)]"
          >
            <div className="flex items-start gap-6 pb-6">
              <CloudSun
                size={52}
                aria-hidden="true"
                className="shrink-0 text-primary-700 opacity-90"
              />
              <div className="flex-1">
                <div className="text-4xl font-bold tracking-tight text-gray-900">
                  {weather ? `${weather.temperature}°C` : '--°C'}
                </div>
                <div className="mt-1.5 text-[0.9375rem] font-medium text-gray-900">
                  {weather
                    ? (weatherDescriptions[weather.weatherCode] ?? 'Fair')
                    : 'Loading…'}
                </div>
                <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                  <MapPin
                    size={12}
                    aria-hidden="true"
                    className="text-primary-700"
                  />
                  Boac, Marinduque
                </div>
              </div>
            </div>
            <div className="mt-auto flex gap-6 border-t border-black/5 pt-4">
              <span className="inline-flex items-center gap-2 text-sm text-gray-600">
                <Droplets
                  size={16}
                  aria-hidden="true"
                  className="text-primary-700"
                />
                {weather ? `${weather.humidity}%` : '--%'}
              </span>
              <span className="inline-flex items-center gap-2 text-sm text-gray-600">
                <Wind
                  size={16}
                  aria-hidden="true"
                  className="text-primary-700"
                />
                {weather ? `${weather.windSpeed} km/h` : '-- km/h'}
              </span>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=121.70%2C13.30%2C122.15%2C13.62&layer=mapnik&marker=13.4463%2C121.8407"
              title="Map of Marinduque showing the Provincial Capitol in Boac"
              aria-label="OpenStreetMap showing Marinduque with the capitol in Boac marked"
              loading="lazy"
              className="h-64 w-full border-0 lg:h-full lg:min-h-64"
            />
            <p className="flex items-center gap-1.5 px-4 py-3 text-xs text-gray-500">
              <MapPin
                size={13}
                aria-hidden="true"
                className="text-primary-700"
              />
              Provincial Capitol, Boac, Marinduque 4900
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
