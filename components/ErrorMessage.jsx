"use client";

export default function ErrorMessage({ error, onRetry }) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="max-w-md mx-auto text-center p-6 bg-red-50 border border-red-200 rounded-lg">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-xl font-semibold text-red-800 mb-2">
          Unable to load weather data
        </h2>
        <p className="text-red-600 mb-4">
          {error || "There was a problem fetching the weather information."}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
