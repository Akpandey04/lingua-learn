export default function LessonLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 p-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-12">
        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-xl" />
        <div className="w-48 h-4 bg-gray-200 dark:bg-gray-800 rounded-full" />
        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-xl" />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full gap-8">
        <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-3xl w-full" />
        
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
          <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
          <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
          <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
        </div>
      </div>
      
      {/* Footer Skeleton */}
      <div className="w-full h-24 mt-auto border-t border-gray-200 dark:border-gray-800 flex items-center justify-between pt-6">
        <div className="w-24 h-12 bg-gray-200 dark:bg-gray-800 rounded-xl" />
        <div className="w-32 h-12 bg-gray-200 dark:bg-gray-800 rounded-xl" />
      </div>
    </div>
  );
}
