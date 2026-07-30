export default function DashboardLoading() {
  return (
    <div className="w-full flex flex-col animate-pulse">
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 pt-12 pb-4">
        {/* Review Center Card Skeleton */}
        <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-3xl w-full mb-8" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
           <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Learning Path Header Skeleton */}
              <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mb-4" />
              {/* Path items */}
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 shrink-0" />
                  <div className="h-24 bg-gray-200 dark:bg-gray-800 rounded-2xl w-full" />
                </div>
              ))}
           </div>
           
           <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Sidebar Skeletons */}
              <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-3xl w-full" />
              <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-3xl w-full" />
           </div>
        </div>
      </div>
    </div>
  );
}
