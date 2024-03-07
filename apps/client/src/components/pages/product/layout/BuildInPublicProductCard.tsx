import { FallbackAvatar } from '@client/constants/FallbackAvatar';
import { useAuth } from '@client/hooks';
import { Verify } from 'iconsax-react';
import { ProductTracker } from '../context/ProductTracker';

export const BuildInPublicProductCard = () => {
  const { user } = useAuth();
  const { state: product } = ProductTracker.useProductTracker();

  return (
    <div className="w-[400px] h-[300px] bg-white overflow-hidden rounded-xl shadow-lg shadow-gray-400/10">
      <div className="bg-slate-100 h-24" />
      <div className="relative transform -translate-y-[3rem] ml-6">
        <div
          className={`absolute z-10 bg-emerald-50 border-white border-4 rounded-full w-24 h-24 ${'flex items-center justify-center'}`}
        >
          <FallbackAvatar className="w-8 h-8 fill-emerald-500" />
        </div>
        <div className="absolute overflow-hidden transform translate-x-1/2 bg-slate-100 border-white border-4 rounded-full w-24 h-24">
          <img
            className="absolute w-full h-full object-cover"
            alt={`avatar`}
            src={user?.profilePic}
          />
        </div>
      </div>
      <div className="mt-[2rem] text-base p-6">
        <div className="flex items-center space-x-1">
          <h1 className="text-slate-900 font-[700]">
            {product?.productName || 'Your MVP'}
          </h1>
          <Verify
            size={20}
            color="rgb(16,185,129)"
            variant="Bold"
            className="inline-block"
          />
        </div>
        <p className="mt-1.5 text-emerald-400 font-[600] text-[14px]">
          {product?.productMoto || `Revolutionizing the future of work`}
        </p>
        <p className="mt-2">
          {product &&
          'productDescription' in product &&
          product.productDescription?.trim() !== ''
            ? product.productDescription
            : 'Introducing our game-changing MVP - a sleek, intuitive tool revolutionizing task and project management. Boost productivity, enhance collaboration, and stay ahead with this cutting-edge solution. Experience the future of work today!'}
        </p>
      </div>
    </div>
  );
};
