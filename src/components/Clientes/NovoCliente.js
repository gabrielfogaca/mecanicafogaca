import React, { useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import { db } from '../../firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NovoCliente = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    cpfcnpj: '',
    carro: '',
    cidade: '',
    dataNascimento: '',
    telefone1: '',
    telefone2: '',
    endereco: '',
    placa: '',
    dataDoCadastro: new Date().toLocaleDateString('pt-BR'),
    numero: 0,
  });

  const { currentUser } = useAuth();

  const toggleNovoCliente = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error('Você precisa estar autenticado para cadastrar um cliente', {
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
      return;
    }

    try {
      const clienteRef = doc(db, 'cliente', formData.cpfcnpj);
      await setDoc(clienteRef, formData);
      toast.success('Sucesso ao cadastrar o Cliente!', {
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
      setIsOpen(false);
    } catch (error) {
      console.error('Erro ao salvar cliente: ', error);
      toast.error('Erro ao cadastrar o Cliente!', {
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
      {/* NovoCliente toggle button */}
      <button
        onClick={toggleNovoCliente}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        + Novo Cliente
      </button>

      {/* Main NovoCliente */}
      {isOpen && (
        <div
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            {/* NovoCliente content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* NovoCliente header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Cadastro de novo Cliente
                </h3>
                <button
                  onClick={toggleNovoCliente}
                  type="button"
                  className="text-white bg-gray-500 hover:bg-gray-600 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                >
                  <span>X</span>
                </button>
              </div>

              {/* NovoCliente body */}
              <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      placeholder="Digite seu nome completo"
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      CPF/CNPJ
                    </label>
                    <input
                      type="text"
                      name="cpfcnpj"
                      value={formData.cpfcnpj}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      placeholder="Digite o CPF/CNPJ"
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Carro
                    </label>
                    <input
                      type="text"
                      name="carro"
                      value={formData.carro}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      placeholder="Digite o modelo do carro"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Data de Nascimento
                    </label>
                    <input
                      type="date"
                      name="dataNascimento"
                      value={formData.dataNascimento}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Cidade
                    </label>
                    <input
                      type="text"
                      name="cidade"
                      value={formData.cidade}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      placeholder="Digite sua cidade"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Endereço, nº
                    </label>
                    <input
                      type="text"
                      name="endereco"
                      value={formData.endereco}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      placeholder="Digite o endereço"
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Placa do Carro
                    </label>
                    <input
                      type="text"
                      name="placa"
                      value={formData.placa}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      placeholder="Digite a placa do carro"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Telefone 1
                    </label>
                    <input
                      type="tel"
                      name="telefone1"
                      value={formData.telefone1}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      placeholder="Digite seu telefone principal"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Telefone 2 (opcional)
                    </label>
                    <input
                      type="tel"
                      name="telefone2"
                      value={formData.telefone2}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      placeholder="Digite seu telefone secundário"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Cadastrar Cliente
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

export default NovoCliente;
