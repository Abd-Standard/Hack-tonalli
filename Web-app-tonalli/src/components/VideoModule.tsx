import { useRef, useState, useEffect } from 'react';
import { apiService } from '../services/api';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: any;
  }
}

interface Props {
  moduleId: string;
  videoUrl: string;
  completed: boolean;
  progress: number;
  onComplete: () => void;
}

function extractYouTubeId(url: string): string | null {
  // https://www.youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/[?&]v=([^&#]+)/);
  if (watchMatch) return watchMatch[1];

  // https://youtu.be/VIDEO_ID
  const shortMatch = url.match(/youtu\.be\/([^?&#]+)/);
  if (shortMatch) return shortMatch[1];

  // https://www.youtube.com/embed/VIDEO_ID
  const embedMatch = url.match(/\/embed\/([^?&#]+)/);
  if (embedMatch) return embedMatch[1];

  return null;
}

function isYouTubeUrl(url: string): boolean {
  return url.includes('youtube.com') || url.includes('youtu.be');
}

export function VideoModule({ moduleId, videoUrl, completed, progress, onComplete }: Props) {
  // Native video refs
  const videoRef = useRef<HTMLVideoElement>(null);

  // YouTube refs
  const ytContainerRef = useRef<HTMLDivElement>(null);
  const ytPlayerRef = useRef<any>(null);
  const ytIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const ytMaxWatchedRef = useRef<number>(0);

  // Native video refs
  const maxWatchedRef = useRef<number>(0);
  const skipWarningTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [currentProgress, setCurrentProgress] = useState(progress);
  const [isCompleted, setIsCompleted] = useState(completed);
  const [skipWarning, setSkipWarning] = useState(false);

  const isYT = videoUrl ? isYouTubeUrl(videoUrl) : false;

  // Shared progress reporting helper
  const reportedMilestones = useRef<Set<number>>(new Set());

  const reportProgress = async (percent: number) => {
    const milestone = Math.floor(percent / 10) * 10;
    const shouldReport =
      (percent % 10 === 0 && !reportedMilestones.current.has(milestone)) ||
      (percent >= 90 && !reportedMilestones.current.has(90));

    if (shouldReport) {
      const key = percent >= 90 ? 90 : milestone;
      reportedMilestones.current.add(key);
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
  };

  const showSkipWarning = () => {
    if (skipWarningTimer.current) clearTimeout(skipWarningTimer.current);
    setSkipWarning(true);
    skipWarningTimer.current = setTimeout(() => setSkipWarning(false), 2500);
  };

  // ── YouTube IFrame API setup ──────────────────────────────────────────────
  useEffect(() => {
    if (!isYT || !videoUrl) return;

    const videoId = extractYouTubeId(videoUrl);
    if (!videoId) return;

    const initPlayer = () => {
      if (!ytContainerRef.current) return;
      ytMaxWatchedRef.current = 0; // reset; set properly on ready

      ytPlayerRef.current = new window.YT.Player(ytContainerRef.current, {
        videoId,
        playerVars: {
          controls: 1,
          rel: 0,
          modestbranding: 1,
          start: 0,
        },
        events: {
          onReady: (event: any) => {
            const player = event.target;
            const duration = player.getDuration();
            const startSeconds = (progress / 100) * duration;
            ytMaxWatchedRef.current = startSeconds;
            if (startSeconds > 0) {
              player.seekTo(startSeconds, true);
            }

            // Poll every second
            ytIntervalRef.current = setInterval(() => {
              if (!ytPlayerRef.current) return;
              const p = ytPlayerRef.current;
              const state = p.getPlayerState?.();
              // Only poll when playing (state === 1)
              if (state !== 1) return;

              const current: number = p.getCurrentTime();
              const dur: number = p.getDuration();
              if (!dur) return;

              if (current > ytMaxWatchedRef.current + 1.5) {
                p.seekTo(ytMaxWatchedRef.current, true);
                showSkipWarning();
              } else {
                ytMaxWatchedRef.current = Math.max(ytMaxWatchedRef.current, current);
                const percent = Math.round((ytMaxWatchedRef.current / dur) * 100);
                if (percent > currentProgress) {
                  setCurrentProgress(percent);
                  reportProgress(percent);
                }
              }
            }, 1000);
          },
          onStateChange: (event: any) => {
            // When playing resumes after a seek, verify position
            if (event.data === 1) {
              const player = event.target;
              const current: number = player.getCurrentTime();
              if (current > ytMaxWatchedRef.current + 1.5) {
                player.seekTo(ytMaxWatchedRef.current, true);
                showSkipWarning();
              }
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      // Load the API script if not already present
      if (!document.getElementById('yt-iframe-api')) {
        const tag = document.createElement('script');
        tag.id = 'yt-iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
      }
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (ytIntervalRef.current) clearInterval(ytIntervalRef.current);
      if (skipWarningTimer.current) clearTimeout(skipWarningTimer.current);
      if (ytPlayerRef.current) {
        try { ytPlayerRef.current.destroy(); } catch (_) {}
        ytPlayerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoUrl, isYT]);

  // ── Native video event setup ──────────────────────────────────────────────
  useEffect(() => {
    if (isYT) return;
    const video = videoRef.current;
    if (!video) return;

    const handleMetadata = () => {
      maxWatchedRef.current = (progress / 100) * video.duration;
    };

    const handleTimeUpdate = async () => {
      if (!video.duration) return;
      if (video.currentTime > maxWatchedRef.current) {
        maxWatchedRef.current = video.currentTime;
      }
      const percent = Math.round((maxWatchedRef.current / video.duration) * 100);
      if (percent > currentProgress) {
        setCurrentProgress(percent);
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

    const handleSeeking = () => {
      if (!video.duration) return;
      const allowedTime = maxWatchedRef.current + 1;
      if (video.currentTime > allowedTime) {
        video.currentTime = maxWatchedRef.current;
        showSkipWarning();
      }
    };

    video.addEventListener('loadedmetadata', handleMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('seeking', handleSeeking);

    return () => {
      video.removeEventListener('loadedmetadata', handleMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('seeking', handleSeeking);
      if (skipWarningTimer.current) clearTimeout(skipWarningTimer.current);
    };
  }, [moduleId, currentProgress, isCompleted, progress, isYT]);

  // ── No video fallback ─────────────────────────────────────────────────────
  if (!videoUrl) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 24px' }}>
        <div style={{ fontSize: '4rem', marginBottom: 16 }}>🎬</div>
        <h3 style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: 8 }}>Video en preparación</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: 20 }}>El video de este módulo estará disponible pronto.</p>
        {!completed && (
          <button
            onClick={async () => {
              await apiService.updateVideoProgress(moduleId, 100);
              onComplete();
            }}
            style={{ background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 24px', fontWeight: 700, cursor: 'pointer' }}
          >
            Marcar como visto (demo)
          </button>
        )}
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div>
      {/* Skip warning overlay */}
      {skipWarning && (
        <div style={{
          position: 'fixed', top: 80, left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(233,30,140,0.95)', color: '#fff', borderRadius: 12,
          padding: '12px 24px', fontWeight: 700, fontSize: '0.9rem',
          zIndex: 9999, boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          ⛔ No puedes adelantar el video — debes verlo completo
        </div>
      )}

      {/* Video notice */}
      <div style={{
        background: 'rgba(245,166,35,0.08)', border: '1px solid rgba(245,166,35,0.2)',
        borderRadius: 10, padding: '10px 16px', marginBottom: 14,
        display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', color: '#F5A623',
      }}>
        🔒 Debes ver el video completo — no se permite adelantar
      </div>

      <div style={{ position: 'relative' }}>
        {isYT ? (
          /* YouTube embed target — the IFrame API replaces this div */
          <div
            ref={ytContainerRef}
            style={{ width: '100%', aspectRatio: '16/9', borderRadius: 12, overflow: 'hidden', background: '#000' }}
          />
        ) : (
          <video
            ref={videoRef}
            src={videoUrl}
            controls
            style={{ width: '100%', borderRadius: 12, background: '#000', display: 'block' }}
            controlsList="nodownload noremoteplayback"
            onContextMenu={(e) => e.preventDefault()}
            disablePictureInPicture
          />
        )}
      </div>

      {/* Progress bar */}
      <div style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: 6 }}>
          <span style={{ color: 'var(--text-muted)' }}>Progreso del video</span>
          <span style={{ fontWeight: 700, color: currentProgress >= 90 ? '#00D4AA' : 'var(--primary)' }}>
            {currentProgress}%
          </span>
        </div>
        <div style={{ height: 8, background: 'var(--bg-overlay)', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 8, transition: 'width 0.4s ease',
            width: `${currentProgress}%`,
            background: currentProgress >= 90
              ? 'linear-gradient(90deg, #00D4AA, #0DFFC6)'
              : 'linear-gradient(90deg, #E91E8C, #F5A623)',
          }} />
        </div>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 6 }}>
          {isCompleted
            ? '✓ Video completado'
            : currentProgress >= 90
              ? '✓ Video completado — puedes continuar'
              : `Mira al menos el 90% para continuar (${90 - currentProgress}% restante)`}
        </p>
      </div>

      {isCompleted && (
        <div style={{
          marginTop: 16, background: 'rgba(0,212,170,0.08)', border: '1px solid rgba(0,212,170,0.25)',
          borderRadius: 12, padding: '14px 20px', textAlign: 'center',
          color: '#00D4AA', fontWeight: 700,
        }}>
          ✓ Video completado
        </div>
      )}
    </div>
  );
}
