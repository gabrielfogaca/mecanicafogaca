import React, { useState } from 'react';
import './LoginForm.css'; // Importar o CSS
import avatar from './mecanicoavatar.avif';
import { useNavigate } from 'react-router-dom';

function LoginModal() {
  const navigate = useNavigate(); // Corrigido para usar useNavigate como função

  const handleLogin = () => {
    navigate('/profile'); // Ajustado para o caminho da rota
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Função para fechar o modal ao clicar fora dele
  const handleOutsideClick = (event) => {
    if (event.target.className === 'modal') {
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      {/* Botão para abrir o modal */}
      <button onClick={() => setIsModalOpen(true)} style={{ width: 'auto' }}>
        Login
      </button>

      {/* O Modal */}
      {isModalOpen && (
        <div className="modal" onClick={handleOutsideClick}>
          <div className="modal-content animate">
            <div className="relative">
              <div className="flex justify-center">
                <span
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 text-2xl cursor-pointer"
                  title="Close Modal"
                >
                  &times;
                </span>
                <img
                  src={avatar}
                  alt="Avatar"
                  className="w-3/12 rounded-full"
                />
              </div>
            </div>

            <div className="container">
              <label htmlFor="uname">
                <b>Username</b>
              </label>
              <input
                type="text"
                placeholder="Enter Username"
                name="uname"
                required
              />

              <label htmlFor="psw">
                <b>Password</b>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                name="psw"
                required
              />

              <label>
                <input type="checkbox" defaultChecked name="remember" />{' '}
                Remember me
              </label>
              <button type="button" onClick={handleLogin}>
                Acessar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginModal;
