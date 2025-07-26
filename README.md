# Climate Controller 🌤️

A beautiful and responsive weather dashboard built with Next.js and Tailwind CSS.

## Features

- 🎨 Beautiful, responsive weather cards with gradients
- 🔍 Search weather by city name
- 📍 Get weather for current location
- 🌡️ Detailed weather information including temperature, humidity, wind, and more
- ⏰ Sunrise and sunset times
- 🌧️ Precipitation data
- 💨 Wind speed and direction
- ☁️ Cloud coverage and visibility
- 📱 Mobile-friendly design

## Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd climate-controller
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   - Copy `.env.example` to `.env.local`
   - Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
   - Replace `your_api_key_here` with your actual API key

4. **Run the development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## API Key Setup

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate an API key
4. Add it to your `.env.local` file:
   ```
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_actual_api_key_here
   ```

## Project Structure

```
├── app/
│   ├── globals.css      # Global styles
│   ├── layout.jsx       # Root layout
│   └── page.jsx         # Main weather page
├── components/
│   ├── WeatherCard.jsx      # Main weather display component
│   ├── LoadingSpinner.jsx   # Loading state component
│   ├── ErrorMessage.jsx     # Error handling component
│   ├── LocationSearch.jsx   # City search component
│   └── WeatherService.js    # API service layer
└── public/              # Static assets
```

## Technologies Used

- **Next.js 15** - React framework
- **React 19** - UI library
- **Tailwind CSS 4** - Styling
- **OpenWeatherMap API** - Weather data
- **Geolocation API** - Current location detection

## Features in Detail

### Weather Data Display

- Current temperature with "feels like" temperature
- Weather condition with icon
- Min/max temperatures
- Humidity percentage
- Wind speed and direction
- Atmospheric pressure
- Visibility distance
- Cloud coverage
- Sunrise/sunset times
- Precipitation data (when available)

### Location Features

- Search by city name
- Auto-detect current location using browser geolocation
- Display coordinates

### User Experience

- Loading states with spinners
- Error handling with retry options
- Responsive design for all screen sizes
- Beautiful gradient backgrounds
- Intuitive icons and emojis

## Sample Data

The app initially loads with sample weather data from Turin, Italy to demonstrate the UI. You can search for any city or use your current location to get live weather data.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
