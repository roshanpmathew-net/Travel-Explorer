const Loader = () => {
  return (
    <div className="fixed inset-0 bg-transparent flex flex-col items-center justify-center">
      <img
        src="/images/Logo.png"
        alt="Travel Explorer"
        className="w-28 h-28 animate-[float_3s_ease-in-out_infinite]"
      />

      <h1 className="mt-4 text-2xl font-bold text-blue-700">
        Travel Explorer
      </h1>

      <div className="flex gap-2 mt-6">
        <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></span>
        <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-150"></span>
        <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-300"></span>
      </div>

      <p className="mt-4 text-gray-600">
        Loading your next adventure...
      </p>

      <style>
        {`
          @keyframes float {
            0%,100% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;