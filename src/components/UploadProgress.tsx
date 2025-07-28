export default function UploadProgress({
  progress = 100,
}: {
  progress: number;
}) {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-white fixed z-100">
      <div className="flex flex-col items-center gap-4 w-full max-w-xl">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-purple-300 border-t-purple-600 rounded-full animate-spin" />
            <span className="text-purple-700 font-medium">Uploading PDF</span>
          </div>
          <span className="text-purple-700 font-semibold">{progress}%</span>
        </div>

        <div className="w-full bg-purple-200 rounded-full h-2">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
