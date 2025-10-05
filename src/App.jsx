import UseFetch from "./hooks/UseFetch";

function App() {
  const { data, loading, error, refetch } = UseFetch('https://api.escuelajs.co/api/v1/products')

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center text-red-600">
          <h2 className="text-xl font-bold">Error occurred!</h2>
          <p className="mt-2">{error}</p>
          <button 
            onClick={refetch} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Products Gallery
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data && data.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                {product.images && product.images.length > 0 ? (
                  <img 
                    src={product.images[0]} 
                    alt={product.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500">No Image</span>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">
                  {product.title}
                </h3>
                
                <div className="text-sm text-gray-600 mb-3">
                  <p className="font-medium">${product.price}</p>
                  <p className="text-xs text-gray-500 mt-1">800 x 600</p>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">
                  {product.description || "No description available"}
                </p>
                
                <div className="text-xs text-gray-500 space-y-1">
                  <p>Lorem ipsum dolor sit amet.</p>
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione, accusantium!</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;