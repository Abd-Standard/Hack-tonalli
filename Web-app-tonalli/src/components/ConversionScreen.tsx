interface Props {
  chapterTitle: string;
  onUpgradePremium: () => void;
  onBuyCertificate: () => void;
  onSkip: () => void;
}

export function ConversionScreen({ chapterTitle, onUpgradePremium, onBuyCertificate, onSkip }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        {/* Celebration */}
        <div className="mb-8">
          <div className="text-7xl mb-4">{'\uD83C\uDF89'}</div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {'\u00A1'}Felicidades!
          </h1>
          <p className="text-xl text-yellow-400 font-semibold">
            Has completado el 75% de "{chapterTitle}"
          </p>
          <p className="text-gray-400 mt-2">
            Chima esta orgullosa de tu progreso. {'\uD83C\uDF1F'}
          </p>
        </div>

        {/* Achievement image placeholder */}
        <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/30 rounded-2xl p-6 mb-8">
          <div className="text-5xl mb-3">{'\uD83C\uDFC5'}</div>
          <h3 className="text-white font-bold text-lg">Imagen de Logro</h3>
          <p className="text-gray-400 text-sm mt-1">{chapterTitle}</p>
          <button className="mt-3 text-sm text-yellow-400 hover:text-yellow-300">
            Compartir en redes sociales
          </button>
        </div>

        {/* Upgrade options */}
        <div className="space-y-4">
          {/* Option A: Premium */}
          <button
            onClick={onUpgradePremium}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-bold py-4 px-6 rounded-xl hover:from-yellow-400 hover:to-yellow-300 transition-all shadow-lg shadow-yellow-500/25"
          >
            <div className="text-lg">{'\u2B50'} Hazte Premium — $20 USD/mes</div>
            <div className="text-sm font-normal mt-1 opacity-80">
              Sin anuncios {'\u2022'} Vidas ilimitadas {'\u2022'} 2 capitulos/semana {'\u2022'} Certificados incluidos {'\u2022'} Podio
            </div>
          </button>

          {/* Option B: Certificate only */}
          <button
            onClick={onBuyCertificate}
            className="w-full bg-gray-700 text-white font-bold py-4 px-6 rounded-xl hover:bg-gray-600 transition-all border border-gray-600"
          >
            <div className="text-lg">{'\uD83D\uDCDC'} Solo este certificado — $10 USD</div>
            <div className="text-sm font-normal mt-1 text-gray-400">
              Desbloquea el examen final {'\u2022'} Certificado oficial ACTA {'\u2022'} NFT en Stellar
            </div>
          </button>

          {/* Skip */}
          <button
            onClick={onSkip}
            className="w-full text-gray-500 hover:text-gray-400 py-3 text-sm transition"
          >
            Continuar sin certificado (tu progreso queda en 75%)
          </button>
        </div>
      </div>
    </div>
  );
}
