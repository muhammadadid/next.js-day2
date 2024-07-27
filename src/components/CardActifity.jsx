import { useRouter } from "next/router";

const CardActifity = ({ activity }) => {
  const router = useRouter();
  const toggleClick = () => {
    router.push(`/actifity/${activity?.id}`);
  };
  const formatToIDR = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };
  return (
    <div 
    onClick={toggleClick}
    className="max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
      <div className="relative w-full h-64 pb-8">
        <img
          src={activity?.imageUrls}
          alt={activity?.title}
          layout="fill"
          objectFit="cover"
          width={340}
          height={300}
          className="transition duration-300 ease-in-out hover:scale-110"
         />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {activity?.title}
        </h2>
        <p className="text-lg text-gray-600">{formatToIDR(activity?.price)}</p>
        <div className="flex items-center mt-4">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.197 3.674a1 1 0 00.95.69h3.862c.969 0 1.371 1.24.588 1.81l-3.124 2.27a1 1 0 00-.364 1.118l1.197 3.674c.3.921-.755 1.688-1.54 1.118l-3.124-2.27a1 1 0 00-1.176 0l-3.124 2.27c-.785.57-1.84-.197-1.54-1.118l1.197-3.674a1 1 0 00-.364-1.118L2.903 9.101c-.783-.57-.381-1.81.588-1.81h3.862a1 1 0 00.95-.69l1.197-3.674z" />
            </svg>
            <svg
              className="w-5 h-5 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.197 3.674a1 1 0 00.95.69h3.862c.969 0 1.371 1.24.588 1.81l-3.124 2.27a1 1 0 00-.364 1.118l1.197 3.674c.3.921-.755 1.688-1.54 1.118l-3.124-2.27a1 1 0 00-1.176 0l-3.124 2.27c-.785.57-1.84-.197-1.54-1.118l1.197-3.674a1 1 0 00-.364-1.118L2.903 9.101c-.783-.57-.381-1.81.588-1.81h3.862a1 1 0 00.95-.69l1.197-3.674z" />
            </svg>
            <svg
              className="w-5 h-5 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.197 3.674a1 1 0 00.95.69h3.862c.969 0 1.371 1.24.588 1.81l-3.124 2.27a1 1 0 00-.364 1.118l1.197 3.674c.3.921-.755 1.688-1.54 1.118l-3.124-2.27a1 1 0 00-1.176 0l-3.124 2.27c-.785.57-1.84-.197-1.54-1.118l1.197-3.674a1 1 0 00-.364-1.118L2.903 9.101c-.783-.57-.381-1.81.588-1.81h3.862a1 1 0 00.95-.69l1.197-3.674z" />
            </svg>
            <svg
              className="w-5 h-5 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.197 3.674a1 1 0 00.95.69h3.862c.969 0 1.371 1.24.588 1.81l-3.124 2.27a1 1 0 00-.364 1.118l1.197 3.674c.3.921-.755 1.688-1.54 1.118l-3.124-2.27a1 1 0 00-1.176 0l-3.124 2.27c-.785.57-1.84-.197-1.54-1.118l1.197-3.674a1 1 0 00-.364-1.118L2.903 9.101c-.783-.57-.381-1.81.588-1.81h3.862a1 1 0 00.95-.69l1.197-3.674z" />
            </svg>
            <svg
              className="w-5 h-5 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.197 3.674a1 1 0 00.95.69h3.862c.969 0 1.371 1.24.588 1.81l-3.124 2.27a1 1 0 00-.364 1.118l1.197 3.674c.3.921-.755 1.688-1.54 1.118l-3.124-2.27a1 1 0 00-1.176 0l-3.124 2.27c-.785.57-1.84-.197-1.54-1.118l1.197-3.674a1 1 0 00-.364-1.118L2.903 9.101c-.783-.57-.381-1.81.588-1.81h3.862a1 1 0 00.95-.69l1.197-3.674z" />
            </svg>
          </div>
          <span className="ml-2 text-lg text-gray-600">({activity?.total_reviews})</span>
        </div>
      </div>
    </div>
  );
};
export default CardActifity;
