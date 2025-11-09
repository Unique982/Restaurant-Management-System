"use client";

interface LoadingOverlayProps {
  loading: boolean;
}

export default function LoadingOverlay({ loading }: LoadingOverlayProps) {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-white flex flex-col justify-center items-center z-50">
      {/* Website icon */}
      <img
        src="/apple-touch-icon.png"
        alt="Website Icon"
        className="w-16 h-16 mb-4 animate-bounce"
      />

      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-orange-500 rounded-full animate-bounce delay-0"></div>
        <div className="w-4 h-4 bg-orange-500 rounded-full animate-bounce delay-150"></div>
        <div className="w-4 h-4 bg-orange-500 rounded-full animate-bounce delay-300"></div>
      </div>
      {/* <p className="mt-4 text-gray-600 font-medium">Loading...</p> */}
      <p className="mt-4 text-gray-600 font-medium">🍴The 90’s Restaurant...</p>
    </div>
  );
}
