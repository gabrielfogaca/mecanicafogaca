import React from 'react';

const PecasCard = ({ pecas }) => {
  if (!pecas) {
    return (
      <div role="status" className="flex items-start justify-center h-screen">
        <div className="mt-10">
          <div class="flex items-center justify-center w-96 h-96 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <div class="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
              Veja os detalhes da Peça clicando no botão "Ver Detalhes"...
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Função para calcular o preço de venda
  const calcularPrecoVenda = (precoCompra, precoFrete) => {
    return (precoCompra + precoFrete) * 1.2;
  };

  return (
    <div className="max-w-sm mx-auto p-6 border border-gray-200 rounded-lg shadow-lg bg-white dark:bg-gray-800 dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Detalhes da Peça
      </h2>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Nome
          </h3>
          <p className="text-gray-900 dark:text-gray-100">
            {pecas.nome || 'Não disponível'}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Preço de Compra
          </h3>
          <p className="text-gray-900 dark:text-gray-100">
            R$ {pecas.precoCompra.toFixed(2) || 'Não disponível'}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Preço do Frete
          </h3>
          <p className="text-gray-900 dark:text-gray-100">
            R$ {pecas.precoFrete.toFixed(2) || 'Não disponível'}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Preço de Venda
          </h3>
          <p className="text-gray-900 dark:text-gray-100">
            R${' '}
            {calcularPrecoVenda(pecas.precoCompra, pecas.precoFrete).toFixed(2)}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Quantidade em Estoque
          </h3>
          <p className="text-gray-900 dark:text-gray-100">
            {pecas.quantidadeEstoque || 'Não disponível'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PecasCard;
