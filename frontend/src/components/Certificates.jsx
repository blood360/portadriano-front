import React from 'react';
import './Certificates.css';

export default function Certificates({ certificates }) {
  return (
    <div className="page-container">
      <h1 className="page-title">Meus Certificados</h1>
      <div className="grid-container" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {certificates.map(cert => (
          <div key={cert.id} className="grid-item">
            <div className="item-content">
              <h3 className="item-title">{cert.title}</h3>
              <p className="item-description">Emissor: {cert.issuer}</p>
              <p className="item-description">Data: {cert.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
