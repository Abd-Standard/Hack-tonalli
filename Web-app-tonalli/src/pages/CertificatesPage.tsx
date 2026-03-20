import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { CertificateCard } from '../components/CertificateCard';
import type { ActaCertificateData } from '../types';

export function CertificatesPage() {
  const [certs, setCerts] = useState<ActaCertificateData[]>([]);
  const [loading, setLoading] = useState(true);
  const [verifyId, setVerifyId] = useState('');
  const [verifyResult, setVerifyResult] = useState<any>(null);

  useEffect(() => {
    loadCerts();
  }, []);

  const loadCerts = async () => {
    try {
      const data = await apiService.getCertificates();
      setCerts(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleVerify = async () => {
    if (!verifyId.trim()) return;
    try {
      const result = await apiService.verifyCertificate(verifyId);
      setVerifyResult(result);
    } catch {
      setVerifyResult({ valid: false });
    }
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(200,39,26,0.1))',
        borderBottom: '1px solid var(--border)',
        padding: '40px 24px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '4rem', marginBottom: 12 }}>{'\uD83C\uDFC6'}</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: 8 }}>Mis Certificados</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Certificados oficiales validados por ACTA en Stellar
        </p>
      </div>

      <div className="container" style={{ padding: '32px 24px', maxWidth: 800, margin: '0 auto' }}>
        {/* Verify section */}
        <div className="card" style={{ padding: 20, marginBottom: 32 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 12 }}>Verificar certificado</h3>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="text"
              className="input-field"
              placeholder="Ingresa el VC ID del certificado"
              value={verifyId}
              onChange={(e) => setVerifyId(e.target.value)}
              style={{ flex: 1 }}
            />
            <button
              onClick={handleVerify}
              className="btn btn-primary"
            >
              Verificar
            </button>
          </div>
          {verifyResult && (
            <div style={{
              marginTop: 12,
              padding: 12,
              borderRadius: 8,
              background: verifyResult.valid ? 'rgba(0,200,150,0.1)' : 'rgba(255,71,87,0.1)',
              border: `1px solid ${verifyResult.valid ? 'rgba(0,200,150,0.3)' : 'rgba(255,71,87,0.3)'}`,
            }}>
              {verifyResult.valid ? (
                <div>
                  <p style={{ color: '#00C896', fontWeight: 700 }}>{'\u2714'} Certificado valido</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 4 }}>
                    {verifyResult.certificate?.chapterTitle} — {verifyResult.certificate?.username} — {verifyResult.certificate?.examScore}%
                  </p>
                </div>
              ) : (
                <p style={{ color: '#FF4757', fontWeight: 700 }}>{'\u2718'} Certificado no encontrado</p>
              )}
            </div>
          )}
        </div>

        {/* Certificates grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <div className="animate-spin" style={{ width: 40, height: 40, border: '3px solid var(--border)', borderTopColor: 'var(--accent)', borderRadius: '50%', margin: '0 auto' }} />
          </div>
        ) : certs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 60 }}>
            <div style={{ fontSize: '4rem', marginBottom: 16 }}>{'\uD83D\uDCDC'}</div>
            <h3 style={{ fontWeight: 700, marginBottom: 8 }}>Sin certificados aun</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              Completa capitulos al 100% para obtener certificados oficiales ACTA
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
            {certs.map((cert) => (
              <CertificateCard key={cert.id} cert={cert} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
