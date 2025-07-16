

const VerifyAccount = () => {

return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Check your email
        </h2>
        
        <p className="text-gray-600 mb-6">
          Validate Your Account by entering the six-digit code
        </p>

        <div className="space-y-6">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
              Code
            </label>
            <input
              type="text"
              id="code"
            //   value={code}
            //   onChange={(e) => setCode(e.target.value)}
              placeholder="Enter code"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              maxLength={6}
            />
          </div>

          <button
            
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Continue
          </button>
        </div>

        <div className="mt-6 text-center">
          <span className="text-sm text-gray-600">Didn't get the code? </span>
          <button

            className="text-sm text-blue-600 hover:text-blue-800 font-medium underline focus:outline-none cursor-pointer"
          >
            Resend
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerifyAccount