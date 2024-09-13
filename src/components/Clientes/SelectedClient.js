import React, { useState, useEffect } from 'react';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import CardOrcamento from './CardOrcamento';

const ClientCard = ({ client }) => {
  const [selectedOrcamento, setSelectedOrcamento] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [orcamentos, setOrcamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Configuração do Firebase
  const db = getFirestore();
  const auth = getAuth();

  // Função para buscar orçamentos do Firestore
  const fetchOrcamentos = async () => {
    if (!client || !client.cpfcnpj) return;

    try {
      setLoading(true);
      const orcamentosRef = collection(db, 'orcamento');
      const q = query(orcamentosRef, where('cpfcnpj', '==', client.cpfcnpj));
      const querySnapshot = await getDocs(q);
      const orcamentosData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrcamentos(orcamentosData);
    } catch (error) {
      console.error('Erro ao buscar orçamentos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Efetuar autenticação e buscar orçamentos quando o componente é montado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchOrcamentos();
      } else {
        console.log('Usuário não autenticado.');
      }
    });

    return () => unsubscribe();
  }, [auth, client]);

  // Função para selecionar um orçamento e exibir o modal
  const handleOrcamentoClick = (id) => {
    const orcamentoSelecionado = orcamentos.find(
      (orcamento) => orcamento.id === id,
    );
    setSelectedOrcamento(orcamentoSelecionado);
    setShowModal(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrcamento(null);
  };

  if (!client) {
    return (
      <div role="status" className="flex items-start justify-center h-screen">
        <div className="mt-10">
          <div className="flex items-center justify-center w-96 h-96 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
              Veja os detalhes do Cliente clicando no botão "Ver Detalhes"...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto p-6 border border-gray-200 rounded-lg shadow-lg bg-white dark:bg-gray-800 dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Detalhes do Cliente
      </h2>

      <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <svg
          className="absolute w-12 h-12 text-gray-400 -left-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Nome Completo
          </h3>
          <p className="text-gray-900 dark:text-gray-100">
            {client.nome || 'Não disponível'}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            CPF/CNPJ
          </h3>
          <p className="text-gray-900 dark:text-gray-100">
            {client.cpfcnpj || 'Não disponível'}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Carro
          </h3>
          <p className="text-gray-900 dark:text-gray-100">
            {client.carro || 'Não disponível'}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Placa
          </h3>
          <p className="text-gray-900 dark:text-gray-100">
            {client.placa || 'Não disponível'}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Data de Nascimento
          </h3>
          <p className="text-gray-900 dark:text-gray-100">
            {client.dataNascimento || 'Não disponível'}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Cidade
          </h3>
          <p className="text-gray-900 dark:text-gray-100">
            {client.cidade || 'Não disponível'}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Telefone 1
          </h3>
          <p className="text-gray-900 dark:text-gray-100">
            {client.telefone1 || 'Não disponível'}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Telefone 2
          </h3>
          <p className="text-gray-900 dark:text-gray-100">
            {client.telefone2 || 'Não disponível'}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Orçamentos
          </h3>
          {loading ? (
            <p>Carregando orçamentos...</p>
          ) : (
            <ul className="list-disc pl-5 text-gray-900 dark:text-gray-100">
              {orcamentos.length > 0 ? (
                orcamentos.map((orcamento) => (
                  <li key={orcamento.id}>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-semibold">Valor: </span>
                        {orcamento.ValorAvista} -
                        <span className="font-semibold"> Data: </span>
                        {orcamento.dataOrcamento}
                        <button
                          onClick={() => handleOrcamentoClick(orcamento.id)}
                          className="text-white bg-blue-500 rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 w-80"
                        >
                          Visualizar Orçamento / Pedido
                        </button>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li>Não disponível</li>
              )}
            </ul>
          )}
        </div>

        {/* Modal */}
        {showModal && selectedOrcamento && (
          <CardOrcamento
            orcamento={selectedOrcamento}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default ClientCard;
