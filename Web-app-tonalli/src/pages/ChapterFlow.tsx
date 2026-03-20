import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { useAuthStore } from '../stores/authStore';
import type { ChapterWithProgress, ChapterModuleData } from '../types';
import { VideoModule } from '../components/VideoModule';
import { LivesIndicator } from '../components/LivesIndicator';
import { ConversionScreen } from '../components/ConversionScreen';
import { ChapterQuiz } from '../components/ChapterQuiz';

export function ChapterFlow() {
  const { chapterId } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [chapter, setChapter] = useState<ChapterWithProgress | null>(null);
  const [activeModule, setActiveModule] = useState<ChapterModuleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showConversion, setShowConversion] = useState(false);
  const [infoRead, setInfoRead] = useState(false);

  const loadChapter = async () => {
    if (!chapterId) return;
    try {
      const data = await apiService.getChapterWithProgress(chapterId);
      setChapter(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChapter();
  }, [chapterId]);

  const handleCompleteInfo = async (moduleId: string) => {
    await apiService.completeInfoModule(moduleId);
    await loadChapter();
    setActiveModule(null);
    setInfoRead(false);
  };

  const handleQuizComplete = async () => {
    await loadChapter();
    setActiveModule(null);

    // Check if we're at 75% (modules 1-3 done, module 4 not started)
    const updated = await apiService.getChapterWithProgress(chapterId!);
    if (updated.completionPercent === 75 && !user?.isPremium) {
      setShowConversion(true);
    }
  };

  const handleUnlockExam = async () => {
    await apiService.unlockFinalExam(chapterId!);
    setShowConversion(false);
    await loadChapter();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-400 border-t-transparent mx-auto mb-4" />
          <p className="text-white">Cargando capítulo...</p>
        </div>
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-red-400">Capítulo no encontrado</p>
      </div>
    );
  }

  // Show conversion screen
  if (showConversion) {
    return (
      <ConversionScreen
        chapterTitle={chapter.title}
        onUpgradePremium={() => navigate('/premium')}
        onBuyCertificate={handleUnlockExam}
        onSkip={() => { setShowConversion(false); navigate('/chapters'); }}
      />
    );
  }

  // Show active module content
  if (activeModule) {
    return (
      <div className="min-h-screen bg-gray-900">
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setActiveModule(null)}
            className="text-gray-400 hover:text-white text-xl"
          >
            &larr;
          </button>
          <div className="flex-1">
            <h2 className="text-white font-bold">{activeModule.title}</h2>
            <p className="text-gray-400 text-sm">{chapter.title}</p>
          </div>
          {(activeModule.type === 'quiz' || activeModule.type === 'final_exam') && (
            <LivesIndicator
              lives={activeModule.livesRemaining}
              lockedUntil={activeModule.lockedUntil}
            />
          )}
        </div>

        <div className="max-w-3xl mx-auto p-4">
          {/* Info Module */}
          {activeModule.type === 'info' && (
            <div>
              <div
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{
                  __html: formatContent(activeModule.content || ''),
                }}
              />
              {!activeModule.completed && (
                <div className="mt-8 text-center">
                  {!infoRead ? (
                    <button
                      onClick={() => setInfoRead(true)}
                      className="bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-xl hover:bg-yellow-400 transition"
                    >
                      He terminado de leer
                    </button>
                  ) : (
                    <button
                      onClick={() => handleCompleteInfo(activeModule.id)}
                      className="bg-green-500 text-white font-bold py-3 px-8 rounded-xl hover:bg-green-400 transition"
                    >
                      Completar modulo
                    </button>
                  )}
                </div>
              )}
              {activeModule.completed && (
                <div className="mt-8 text-center">
                  <span className="text-green-400 font-bold text-lg">Completado</span>
                </div>
              )}
            </div>
          )}

          {/* Video Module */}
          {activeModule.type === 'video' && (
            <VideoModule
              moduleId={activeModule.id}
              videoUrl={activeModule.videoUrl || ''}
              completed={activeModule.completed}
              progress={activeModule.videoProgress}
              onComplete={() => loadChapter().then(() => setActiveModule(null))}
            />
          )}

          {/* Quiz / Final Exam */}
          {(activeModule.type === 'quiz' || activeModule.type === 'final_exam') && (
            <ChapterQuiz
              moduleId={activeModule.id}
              type={activeModule.type}
              lives={activeModule.livesRemaining}
              lockedUntil={activeModule.lockedUntil}
              completed={activeModule.completed}
              bestScore={activeModule.score}
              isPremium={chapter.isPremium}
              chapterId={chapter.id}
              chapterTitle={chapter.title}
              onComplete={handleQuizComplete}
            />
          )}
        </div>
      </div>
    );
  }

  // Chapter overview with 4 modules
  return (
    <div className="min-h-screen bg-gray-900 pb-20">
      {/* Chapter Header */}
      <div className="relative">
        {chapter.coverImage && (
          <div
            className="h-48 bg-cover bg-center"
            style={{ backgroundImage: `url(${chapter.coverImage})` }}
          >
            <div className="h-full bg-gradient-to-b from-transparent to-gray-900" />
          </div>
        )}
        <div className="px-4 py-6">
          <button onClick={() => navigate('/chapters')} className="text-gray-400 hover:text-white mb-3 block">
            &larr; Capítulos
          </button>
          <h1 className="text-2xl font-bold text-white mb-2">{chapter.title}</h1>
          <p className="text-gray-400">{chapter.description}</p>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Progreso</span>
              <span className="text-yellow-400 font-bold">{chapter.completionPercent}%</span>
            </div>
            <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full transition-all duration-500"
                style={{ width: `${chapter.completionPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4 Modules */}
      <div className="px-4 space-y-4">
        {chapter.modules.map((mod, index) => {
          const icons: Record<string, string> = {
            info: '\uD83D\uDCDA',
            video: '\uD83C\uDFAC',
            quiz: '\uD83D\uDCDD',
            final_exam: '\uD83C\uDFC6',
          };
          const colors: Record<string, string> = {
            info: 'from-blue-600 to-blue-500',
            video: 'from-purple-600 to-purple-500',
            quiz: 'from-orange-600 to-orange-500',
            final_exam: 'from-yellow-600 to-yellow-500',
          };

          return (
            <button
              key={mod.id}
              onClick={() => mod.unlocked ? setActiveModule(mod) : null}
              disabled={!mod.unlocked}
              className={`w-full text-left rounded-xl p-4 transition-all duration-200 ${
                mod.unlocked
                  ? 'bg-gray-800 hover:bg-gray-750 cursor-pointer border border-gray-700 hover:border-gray-600'
                  : 'bg-gray-800/50 opacity-50 cursor-not-allowed border border-gray-800'
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Module number circle */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-br ${
                    mod.completed ? 'from-green-500 to-green-400' : colors[mod.type]
                  }`}
                >
                  {mod.completed ? '\u2714' : icons[mod.type]}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 font-bold">MODULO {mod.order}</span>
                    {mod.completed && (
                      <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                        Completado
                      </span>
                    )}
                    {!mod.unlocked && (
                      <span className="text-xs bg-gray-600/50 text-gray-400 px-2 py-0.5 rounded-full">
                        Bloqueado
                      </span>
                    )}
                  </div>
                  <h3 className="text-white font-semibold mt-0.5">{mod.title}</h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                    <span>+{mod.xpReward} XP</span>
                    {mod.hasQuiz && <span>Min. 80%</span>}
                    {mod.type === 'video' && <span>90% para completar</span>}
                    {mod.livesRemaining >= 0 && mod.hasQuiz && !mod.completed && (
                      <span className="text-red-400">
                        {mod.livesRemaining} {mod.livesRemaining === 1 ? 'vida' : 'vidas'}
                      </span>
                    )}
                  </div>
                </div>

                {mod.score > 0 && (
                  <div className="text-right">
                    <span className={`text-lg font-bold ${mod.score >= 80 ? 'text-green-400' : 'text-yellow-400'}`}>
                      {mod.score}%
                    </span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function formatContent(content: string): string {
  try {
    const parsed = JSON.parse(content);
    if (parsed.sections) {
      return parsed.sections
        .map((s: any) =>
          `<h3>${s.icon || ''} ${s.title}</h3><p>${s.text}</p>`
        )
        .join('');
    }
  } catch {
    // Not JSON, treat as HTML/text
  }
  return content || '<p>No hay contenido disponible aún.</p>';
}
