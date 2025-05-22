const NewsLetter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4 mt-24 pb-14 px-4">
      <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
        Stay in the Loop with Fresh Bakes!
      </h1>
      <p className="text-sm md:text-lg text-gray-500 max-w-xl">
        Join our mailing list for exclusive treats, tasty deals, and early access to new delights.
      </p>
      <form className="flex flex-col sm:flex-row items-center gap-3 mt-6 w-full max-w-2xl">
        <input
          type="email"
          required
          placeholder="Your email address"
          className="w-full px-4 py-3 rounded-md border border-gray-300 text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-primary hover:bg-primary-dull transition-all text-white font-medium rounded-md w-full sm:w-auto"
        >
          Subscribe Now
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
