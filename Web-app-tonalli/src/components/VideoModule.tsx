import { useRef, useState, useEffect } from 'react';
import { apiService } from '../services/api';

interface Props {
  moduleId: string;
  videoUrl: string;
  completed: boolean;
  progress: number;
  onComplete: () => void;
}

export function VideoModule({ moduleId, videoUrl, completed, progress, onComplete }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentProgress, setCurrentProgress] = useState(progress);
  const [isCompleted, setIsCompleted] = useState(completed);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = async () => {
      if (!video.duration) return;
      const percent = Math.round((video.currentTime / video.duration) * 100);

      if (percent > currentProgress) {
        setCurrentProgress(percent);

        // Report every 10%
        if (percent % 10 === 0 || percent >= 90) {
          try {
            const result = await apiService.updateVideoProgress(moduleId, percent);
            if (result.completed && !isCompleted) {
              setIsCompleted(true);
              onComplete();
            }
          } catch (err) {
            console.error('Failed to update video progress:', err);
          }
        }
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, [moduleId, currentProgress, isCompleted]);

  if (!videoUrl) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">{'\uD83C\uDFAC'}</div>
        <h3 className="text-white text-xl font-bold mb-2">Video en preparacion</h3>
        <p className="text-gray-400">El video de este modulo estara disponible pronto.</p>
        {!completed && (
          <button
            onClick={async () => {
              await apiService.updateVideoProgress(moduleId, 100);
              onComplete();
            }}
            className="mt-4 bg-purple-500 text-white font-bold py-2 px-6 rounded-xl hover:bg-purple-400"
          >
            Marcar como visto (demo)
          </button>
        )}
      </div>
    );
  }

  return (
    <div>
      <video
        ref={videoRef}
        src={videoUrl}
        controls
        className="w-full rounded-xl bg-black"
        controlsList="nodownload"
      />

      {/* Progress bar */}
      <div className="mt-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-400">Progreso del video</span>
          <span className={`font-bold ${currentProgress >= 90 ? 'text-green-400' : 'text-purple-400'}`}>
            {currentProgress}%
          </span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              currentProgress >= 90 ? 'bg-green-500' : 'bg-purple-500'
            }`}
            style={{ width: `${currentProgress}%` }}
          />
        </div>
        <p className="text-gray-500 text-xs mt-1">
          {currentProgress >= 90
            ? 'Video completado'
            : `Mira al menos el 90% para completar (${90 - currentProgress}% restante)`}
        </p>
      </div>

      {isCompleted && (
        <div className="mt-4 bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
          <span className="text-green-400 font-bold">Modulo completado</span>
        </div>
      )}
    </div>
  );
}
