import { useState } from 'react';
import { apiService } from '../services/api';
interface IssueCertificateParams {
  chapterId: string;
  chapterTitle: string;
  examScore: number;
}

// Certificate issuance without ACTA SDK dependency.
// When a real ACTA_API_KEY is configured, the backend handles the on-chain issuance.
export function useIssueCertificate() {
  const [issuing, setIssuing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const issueCertificate = async ({ chapterId, chapterTitle, examScore }: IssueCertificateParams) => {
    setIssuing(true);
    setError(null);

    const timestamp = Date.now();
    const vcId = `vc:tonalli:chapter:${chapterId}:${timestamp}`;
    const txId = `TONALLI_${timestamp}_${chapterId.substring(0, 8)}`;

    try {
      const stored = await apiService.storeCertificate({
        chapterId,
        chapterTitle,
        actaVcId: vcId,
        txHash: txId,
        examScore,
        type: 'official',
      });

      setIssuing(false);
      return { success: true, certificate: stored, vcId, txHash: txId };
    } catch (err: any) {
      console.error('[Certificate] Issuance error:', err);
      setError(err.message || 'Error al emitir certificado');
      setIssuing(false);
      return { success: false, error: err.message };
    }
  };

  return { issueCertificate, issuing, error };
}
