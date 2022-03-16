import React from 'react';

import style from './styles.module.css';

// import CoticLogo from '../../../assets/LOGO-COTIC_NOVA.svg';

export default function Footer() {
  return (
    <div className={style.container}>
      <div className={style.row}>
        <div className={style.conteudo}>
          COTIC - Coordenadoria de Tecnologia da Informação e Comunicação - Atendimento ao Usuário: 0800 280 1158
        </div>
        <div className={style.versao}>
          Versão: 4.6.13
        </div>
      </div>
    </div>
  );
}