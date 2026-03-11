'use client';

export function SkeletonLoader() {
  // Criamos um array vazio para renderizar 3 skeletons
  const skeletons = Array.from({ length: 3 });

  return (
    <div className="w-full mt-6 space-y-6">
      {skeletons.map((_, index) => (
        <article key={index} className="border border-[#CCCCCC] rounded-2xl overflow-hidden bg-white shadow-sm animate-pulse">
          {/* Header do Skeleton (simulando o fundo azul) */}
          <header className="bg-gray-200 h-18 p-6 flex items-center justify-between">
            <div className="h-6 bg-gray-300 rounded-md w-1/3"></div>
            <div className="flex gap-6 items-center">
              <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
              <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
            </div>
          </header>

          {/* Conteúdo do Skeleton */}
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center text-[#777777] mb-4">
              <div className="h-5 bg-gray-200 rounded-md w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded-md w-1/5"></div>
            </div>
            
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded-md w-full"></div>
              <div className="h-4 bg-gray-200 rounded-md w-full"></div>
              <div className="h-4 bg-gray-200 rounded-md w-2/3"></div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}