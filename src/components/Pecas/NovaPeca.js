import React, { useState } from 'react';

const sronly = {
  width: '1px',
  height: '1px',
  margin: -'1px',
  color: ' #ffffff' /* Texto branco */,
};

const NovaPeca = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNovaPeca = () => {
    setIsOpen(!isOpen);
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
                  <span sx={sronly}>X</span>
                </button>
              </div>
              {/* Corpo do modal */}
              <form className="p-4 md:p-5">
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
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Cadastrar Peça
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NovaPeca;
