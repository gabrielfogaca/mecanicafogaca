import React, { useState, useEffect } from 'react';
import './OrderForm.css';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import logo1 from './imagens/logomf.jpg';
import logo2 from './imagens/logomg.jpg';

const clientData = [
  {
    nomeCompleto: 'João da Silva',
    cpf: '123.456.789-00',
    carro: 'Fiat Uno',
    dataNascimento: '01/01/1980',
    cidade: 'São Paulo',
    telefone: '(11) 98765-4321',
    endereco: 'Rua das Flores, 123',
    orcamentos: ['R$ 10.000', 'R$ 15.000', 'R$ 20.000'],
  },
  {
    nomeCompleto: 'Maria Oliveira',
    cpf: '987.654.321-00',
    carro: 'Honda Civic',
    dataNascimento: '15/03/1990',
    cidade: 'Rio de Janeiro',
    telefone: '(21) 91234-5678',
    endereco: 'Avenida Brasil, 456',
    orcamentos: ['R$ 5.000', 'R$ 8.000', 'R$ 12.000'],
  },
  {
    nomeCompleto: 'Carlos Pereira',
    cpf: '456.789.123-00',
    carro: 'Ford Fiesta',
    dataNascimento: '22/07/1985',
    cidade: 'Belo Horizonte',
    telefone: '(31) 99876-5432',
    endereco: 'Rua dos Mineiros, 789',
    orcamentos: ['R$ 7.000', 'R$ 10.000', 'R$ 14.000'],
  },
  {
    nomeCompleto: 'Ana Costa',
    cpf: '321.654.987-00',
    carro: 'Chevrolet Tracker',
    dataNascimento: '30/10/1982',
    cidade: 'Curitiba',
    telefone: '(41) 93456-7890',
    endereco: 'Rua das Araucárias, 321',
    orcamentos: ['R$ 12.000', 'R$ 18.000', 'R$ 22.000'],
  },
  {
    nomeCompleto: 'Roberto Lima',
    cpf: '654.321.987-00',
    carro: 'Volkswagen Gol',
    dataNascimento: '05/12/1978',
    cidade: 'Porto Alegre',
    telefone: '(51) 92345-6789',
    endereco: 'Avenida Farrapos, 654',
    orcamentos: ['R$ 9.000', 'R$ 13.000', 'R$ 17.000'],
  },
];

const PecasData = [
  {
    nome: 'Peça A',
    precoCompra: 100,
    precoFrete: 20,
    quantidadeEstoque: 50,
  },
  {
    nome: 'Peça B',
    precoCompra: 200,
    precoFrete: 30,
    quantidadeEstoque: 30,
  },
  {
    nome: 'Peça C',
    precoCompra: 150,
    precoFrete: 25,
    quantidadeEstoque: 20,
  },
  {
    nome: 'Peça D',
    precoCompra: 80,
    precoFrete: 15,
    quantidadeEstoque: 40,
  },
  {
    nome: 'Peça E',
    precoCompra: 220,
    precoFrete: 35,
    quantidadeEstoque: 10,
  },
];

function Orcamento() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('pt-BR'); // Formato de data no padrão brasileiro
    setCurrentDate(formattedDate);
  }, []);

  const [selectedClient, setSelectedClient] = useState('');
  const [selectedPecas, setSelectedPecas] = useState([]);

  const handleClientChange = (e) => {
    const client = clientData.find(
      (client) => client.nomeCompleto === e.target.value,
    );
    setSelectedClient(client);
  };

  const handlePecaChange = (e, index) => {
    const selectedPeca = PecasData.find((peca) => peca.nome === e.target.value);
    if (selectedPeca) {
      const updatedPecas = [...selectedPecas];
      updatedPecas[index] = { ...selectedPeca, quantidade: 1 };
      setSelectedPecas(updatedPecas);
    }
  };

  const handleQuantityChange = (e, index) => {
    const updatedPecas = [...selectedPecas];
    updatedPecas[index].quantidade = Number(e.target.value);
    setSelectedPecas(updatedPecas);
  };

  const handleRemovePeca = (index) => {
    const updatedPecas = selectedPecas.filter((_, i) => i !== index);
    setSelectedPecas(updatedPecas);
  };

  const handleAddPeca = () => {
    const newPeca = { nome: '', quantidade: 1 };
    // Check if a piece with the same name already exists
    if (!selectedPecas.some((peca) => peca.nome === newPeca.nome)) {
      setSelectedPecas([...selectedPecas, newPeca]);
    } else {
      alert('A peça já está adicionada.');
    }
  };

  return (
    <div className="order-form">
      {/* Cabeçalho da página */}
      <header class="header flex items-center justify-center">
        <div class="flex flex-col items-center">
          <img src={logo1} alt="" className="w-60 mb-4" />
          <img src={logo2} alt="" className="w-60 mb-4" />
        </div>
        <div class="flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold mb-2">
            OFICINA ESPECIALIZADA EM SISTEMA
          </h2>
          <h2 className="text-2xl font-bold mb-2">
            COMMON RAIL E SOLDAS ESPECIAIS
          </h2>
          <p>Rua Miguel Capssa, 58, Assis Brasil - Ijuí/RS</p>
          <p>Fone: 55 99928-7017 / 55 99235-5642</p>
        </div>
      </header>

      {/* Corpo principal */}
      <main className="main">
        <div class="header-info">
          <div class="options">
            <label>
              <input type="checkbox" name="pedido" className="ml-4" />
              <span className="ml-4">Pedido</span>
            </label>
            <label>
              <input type="checkbox" name="orcamento" />
              <span className="ml-4">Orçamento</span>
            </label>
          </div>
          <p className="date">Data: {currentDate}</p>
        </div>

        {/* Seleção de cliente */}
        <label htmlFor="cliente">Selecione o Cliente</label>
        <select
          id="cliente"
          value={selectedClient?.nomeCompleto || ''}
          onChange={handleClientChange}
        >
          <option value="">Selecione um cliente</option>
          {clientData.map((client) => (
            <option key={client.cpf} value={client.nomeCompleto}>
              {client.nomeCompleto}
            </option>
          ))}
        </select>

        {/* Dados do cliente */}
        {selectedClient && (
          <table>
            <tbody>
              <tr>
                <th>Nome</th>
                <td>{selectedClient.nomeCompleto}</td>
              </tr>
              <tr>
                <th>Endereço</th>
                <td>{selectedClient.endereco}</td>
              </tr>
              <tr>
                <th>Carro</th>
                <td>{selectedClient.carro}</td>
              </tr>
              <tr>
                <th>Cidade</th>
                <td>{selectedClient.cidade}</td>
              </tr>
              <tr>
                <th>CPF/CNPJ</th>
                <td>{selectedClient.cpf}</td>
              </tr>
            </tbody>
          </table>
        )}

        {/* Seleção de peças */}
        <table>
          <thead>
            <tr>
              <th>Qnt.</th>
              <th>Descrição do Produto/Serviço</th>
              <th>Valor Unitário</th>
              <th>Total</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {selectedPecas.map((peca, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="number"
                    value={peca?.quantidade || 1}
                    min="1"
                    max={peca?.quantidadeEstoque || 1}
                    onChange={(e) => handleQuantityChange(e, index)}
                  />
                </td>
                <td>
                  <select
                    value={peca?.nome || ''}
                    onChange={(e) => handlePecaChange(e, index)}
                  >
                    <option value="">Selecione uma peça</option>
                    {PecasData.map((peca) => (
                      <option key={peca.nome} value={peca.nome}>
                        {peca.nome}
                      </option>
                    ))}
                  </select>
                </td>
                <td>{peca?.precoCompra || ''}</td>
                <td>
                  {peca
                    ? (peca.precoCompra + peca.precoFrete) * peca.quantidade
                    : ''}
                </td>
                <td>
                  <Button
                    onClick={() => handleRemovePeca(index)}
                    variant="contained"
                    startIcon={<DeleteIcon />}
                  >
                    Remover
                  </Button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="5">
                <Button
                  type="button"
                  variant="contained"
                  // className="w-72"
                  color="success"
                  onClick={() => handleAddPeca(selectedPecas)}
                >
                  + Adicionar Peça ao Pedido/Orçamento
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </main>

      {/* Rodapé */}
      <footer className="footer">
        <div className="relative container space-x-4">
          {/* Botões de ações */}
          <Button variant="contained" className="w-40">
            Imprimir
          </Button>
          <Button variant="contained" className="w-72">
            Salvar Orçamento
          </Button>
        </div>

        <p>
          À VISTA: R${' '}
          {selectedPecas.reduce(
            (acc, peca) =>
              acc +
              (peca
                ? (peca.precoCompra + peca.precoFrete) * peca.quantidade
                : 0),
            0,
          )}
          ,00
        </p>
        <p>Assinatura: ___________________________</p>
      </footer>
    </div>
  );
}

export default Orcamento;
