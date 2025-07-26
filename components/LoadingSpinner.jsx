"use client";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="mt-4 text-center text-gray-600">
          Loading weather data...
        </div>
      </div>
    </div>
  );
}
