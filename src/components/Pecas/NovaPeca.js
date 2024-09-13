import React, { useState } from 'react';
import { useAuth } from '../../contexts/authContext'; // Importar o contexto de autenticação
import { db } from '../../firebase/firebase'; // Importar o db do Firebase
import { collection, addDoc } from 'firebase/firestore'; // Importar funções do Firestore
import { v4 as uuidv4 } from 'uuid'; // Importar função para gerar UUID
import { toast, ToastContainer } from 'react-toastify'; // Importar o Toastify
import 'react-toastify/dist/ReactToastify.css'; // Importar estilos do Toastify
import { Bounce } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Importar o hook para navegação

const NovaPeca = () => {
  const { userLoggedIn } = useAuth(); // Obter estado de autenticação
  const navigate = useNavigate(); // Hook para navegação
  const [isOpen, setIsOpen] = useState(false);
  const [nome, setNome] = useState('');
  const [precoCompra, setPrecoCompra] = useState('');
  const [precoFrete, setPrecoFrete] = useState('');
  const [estoque, setEstoque] = useState('');

  const toggleNovaPeca = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar se o usuário está autenticado
    if (!userLoggedIn) {
      navigate('/'); // Redirecionar para a página inicial
      return;
    }

    try {
      // Gerar um UID único para a peça
      const uid = uuidv4();
      const data = {
        uid,
        nome,
        precoCompra: parseFloat(precoCompra),
        precoFrete: parseFloat(precoFrete),
        estoque: parseInt(estoque, 10),
        dataDoCadastro: new Date().toLocaleDateString('pt-BR'),
      };

      // Salvar a nova peça no Firestore
      await addDoc(collection(db, 'peca'), data);

      // Limpar os campos do formulário e fechar o modal
      setNome('');
      setPrecoCompra('');
      setPrecoFrete('');
      setEstoque('');
      toggleNovaPeca();

      // Exibir mensagem de sucesso
      toast.success(`A peça "${nome}" foi cadastrada com sucesso!`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
      });
    } catch (error) {
      console.error('Erro ao cadastrar peça:', error);
      toast.error(`Não foi possível cadastrar a peça "${nome}".`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
      });
    }
  };

  return (
    <>
      {/* Botão para abrir modal de cadastro */}
      <button
        onClick={toggleNovaPeca}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        + Nova Peça
      </button>

      {/* Modal de cadastro */}
      {isOpen && (
        <div
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            {/* Conteúdo do modal */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Cabeçalho do modal */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Cadastro de nova Peça
                </h3>
                <button
                  onClick={toggleNovaPeca}
                  type="button"
                  className="text-white bg-gray-500 hover:bg-gray-600 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                >
                  <span className="sr-only">Fechar</span>
                </button>
              </div>
              {/* Corpo do modal */}
              <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="nome"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Nome da Peça
                    </label>
                    <input
                      type="text"
                      name="nome"
                      id="nome"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Digite o nome da peça"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="precoCompra"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Preço de Compra
                    </label>
                    <input
                      type="number"
                      name="precoCompra"
                      id="precoCompra"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Digite o preço de compra"
                      value={precoCompra}
                      onChange={(e) => setPrecoCompra(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="precoFrete"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Preço do Frete
                    </label>
                    <input
                      type="number"
                      name="precoFrete"
                      id="precoFrete"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Digite o preço do frete"
                      value={precoFrete}
                      onChange={(e) => setPrecoFrete(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="estoque"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Estoque
                    </label>
                    <input
                      type="number"
                      name="estoque"
                      id="estoque"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Digite a quantidade em estoque"
                      value={estoque}
                      onChange={(e) => setEstoque(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Cadastrar Peça
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
        transition={Bounce}
        closeButton={false}
      />
    </>
  );
};

export default NovaPeca;
