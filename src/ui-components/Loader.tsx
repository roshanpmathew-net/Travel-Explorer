const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-blue-600 animate-bounce" />
        <div className="w-3 h-3 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.2s]" />
        <div className="w-3 h-3 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.4s]" />
      </div>
    </div>
  );
};

export default Loader;