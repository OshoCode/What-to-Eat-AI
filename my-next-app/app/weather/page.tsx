import { WeatherData } from './types';

async function getWeatherData(): Promise<WeatherData> {
  const res = await fetch(`/api/weather?city=Bangkok`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch weather');
  return res.json();
}

export default async function WeatherPage() {
  const weather = await getWeatherData();

  return (
    <div>
      <h1>Current Weather in Bangkok: {weather.current.temp_c}°C</h1>
      <p>Condition: {weather.current.condition.text}</p>
      <img src={weather.current.condition.icon} alt={weather.current.condition.text} />
    </div>
  );
}
