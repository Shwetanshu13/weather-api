const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export class WeatherService {
    static async getCurrentWeather(lat, lon) {
        if (!API_KEY) {
            throw new Error('OpenWeather API key is not configured');
        }

        try {
            const response = await fetch(
                `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
            );

            if (!response.ok) {
                throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Weather fetch error:', error);
            throw new Error(
                error.message || 'Failed to fetch weather data'
            );
        }
    }

    static async getCurrentWeatherByCity(cityName) {
        if (!API_KEY) {
            throw new Error('OpenWeather API key is not configured');
        }

        try {
            const response = await fetch(
                `${BASE_URL}/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`
            );

            if (!response.ok) {
                throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Weather fetch error:', error);
            throw new Error(
                error.message || 'Failed to fetch weather data'
            );
        }
    }

    static getUserLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported by this browser'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    });
                },
                (error) => {
                    let errorMessage = 'Unable to retrieve location';
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            errorMessage = 'Location access denied by user';
                            break;
                        case error.POSITION_UNAVAILABLE:
                            errorMessage = 'Location information unavailable';
                            break;
                        case error.TIMEOUT:
                            errorMessage = 'Location request timed out';
                            break;
                    }
                    reject(new Error(errorMessage));
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 300000 // 5 minutes
                }
            );
        });
    }
}
