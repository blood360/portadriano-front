import React from 'react';

export default function Certificates({ certificates }) {
  return (
    <div className="page-container">
      <h1 className="page-title">Meus Certificados</h1>
      <div className="grid-container" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {certificates.map(cert => (
          <div key={cert.id} className="grid-item">
            {/* CORREÇÃO: Usa imageData e mimeType do DB para o src */}
            {cert.imageData && <img src={`data:${cert.mimeType};base64,${cert.imageData}`} alt={cert.title} className="item-image" />}
            <div className="item-content">
              <h3 className="item-title">{cert.title}</h3>
              <p className="item-description">Emissor: {cert.issuer}</p>
              <p className="item-description">Tipo: {cert.courseType}</p>
              {cert.status === 'Concluído' ? (
                <>
                  <p className="item-description">Data de Início: {cert.startDate}</p>
                  <p className="item-description">Data de Conclusão: {cert.endDate}</p>
                </>
              ) : (
                <p className="item-description">Status: Cursando (Previsão: {cert.expectedEndDate})</p>
              )}
              {cert.hours && <p className="item-description">Carga Horária: {cert.hours} horas</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
