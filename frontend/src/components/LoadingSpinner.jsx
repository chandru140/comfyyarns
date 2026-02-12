const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-baby-pink-200 border-t-baby-pink-500 rounded-full animate-spin"></div>
        <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-baby-pink-600 font-medium whitespace-nowrap">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
