import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

const TeacherItem = () => {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://avatars1.githubusercontent.com/u/49247275?s=460&u=a9e83c76788c406802b53783210a84a8ad36ebf1&v=4"
          alt="Lucas Dib"
        />
        <div>
          <strong>Lucas Dib</strong>
          <span>Programação</span>
        </div>
      </header>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
        voluptates aliquid numquam tempore eligendi dicta praesentium quis
        saepe,
        <br />
        <br />
        nobis minima, animi tenetur corrupti! Exercitationem maxime atque
        voluptate eveniet laborum esse.
      </p>

      <footer>
        <p>
          Preço/Hora <strong>R$ 10,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
};

export default TeacherItem;
