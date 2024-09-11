import React, { useState, useEffect } from 'react';
import './OrderForm.css';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import logo1 from './imagens/logomf.jpg';
import logo2 from './imagens/logomg.jpg';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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
  {
    nome: 'Carcaça da caixa de câmbio',
    precoCompra: 2000,
    precoFrete: 300,
    quantidadeEstoque: 10,
  },
  {
    nome: 'Coroa e pinhão',
    precoCompra: 6400,
    precoFrete: 0,
    quantidadeEstoque: 10,
  },
  {
    nome: 'Rolamentos',
    precoCompra: 850,
    precoFrete: 50,
    quantidadeEstoque: 10,
  },
  {
    nome: 'Conjunto de engrenagens',
    precoCompra: 6000,
    precoFrete: 500,
    quantidadeEstoque: 10,
  },
  {
    nome: 'Kit cubo e luva',
    precoCompra: 2200,
    precoFrete: 200,
    quantidadeEstoque: 10,
  },
];

const getStyles = (name, personName, theme) => ({
  fontWeight:
    personName.indexOf(name) === -1
      ? theme.typography.fontWeightRegular
      : theme.typography.fontWeightMedium,
});

function Orcamento() {
  const [currentDate, setCurrentDate] = useState('');
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedPecas, setSelectedPecas] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('pt-BR'); // Formato de data no padrão brasileiro
    setCurrentDate(formattedDate);
  }, []);

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
    if (!selectedPecas.some((peca) => peca.nome === newPeca.nome)) {
      setSelectedPecas([...selectedPecas, newPeca]);
    } else {
      alert('A peça já está adicionada.');
    }
  };

  const printPage = () => {
    // Adiciona a classe "no-print" aos elementos que não devem ser impressos
    const elementsToHide = document.querySelectorAll('.no-print');
    elementsToHide.forEach((element) => element.classList.add('hidden'));

    // Executa a impressão
    window.print();

    // Remove a classe "no-print" dos elementos após a impressão
    elementsToHide.forEach((element) => element.classList.remove('hidden'));
  };

  return (
    <div className="order-form">
      {/* Cabeçalho da página */}
      <header className="header flex items-center justify-center">
        <div className="flex flex-col items-center">
          <img src={logo1} alt="" className="w-60 mb-4" />
          <img src={logo2} alt="" className="w-60 mb-4" />
        </div>
        <div className="flex flex-col items-center text-center">
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
        <div className="header-info">
          <div className="options">
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
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel className="no-print" id="select-client-label">
            Selecione o Cliente
          </InputLabel>
          <Select
            labelId="select-client-label"
            id="select-client"
            value={selectedClient?.nomeCompleto || ''}
            className="no-print"
            onChange={handleClientChange}
            input={<OutlinedInput label="Selecione o Cliente" />}
            MenuProps={MenuProps}
          >
            <MenuItem value="">
              <em>+ Selecione um cliente</em>
            </MenuItem>
            {clientData.map((client) => (
              <MenuItem
                key={client.cpf}
                value={client.nomeCompleto}
                style={getStyles(
                  client.nomeCompleto,
                  selectedClient?.nomeCompleto || '',
                  theme,
                )}
              >
                {client.nomeCompleto}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Dados do cliente */}
        <div className="client-info-container rounded border-1 border-black mb-2">
          {selectedClient && (
            <table className="client-info-table">
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
        </div>

        {/* Seleção de peças */}
        <table>
          <thead>
            <tr>
              <th>Qnt.</th>
              <th>Descrição do Produto/Serviço</th>
              <th>Valor Unitário</th>
              <th>Total</th>
              <th className="no-print">Ação</th>
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
                  <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel
                      className="no-print no-print-produto"
                      id={`select-peca-${index}-label`}
                    >
                      Selecione a Peça
                    </InputLabel>
                    <Select
                      className="no-print-produto"
                      labelId={`select-peca-${index}-label`}
                      id={`select-peca-${index}`}
                      value={peca?.nome || ''}
                      onChange={(e) => handlePecaChange(e, index)}
                      input={<OutlinedInput label="Selecione a Peça" />}
                      MenuProps={MenuProps}
                    >
                      <MenuItem value="">
                        <em>Selecione uma peça</em>
                      </MenuItem>
                      {PecasData.map((pecaData) => (
                        <MenuItem
                          key={pecaData.nome}
                          value={pecaData.nome}
                          style={getStyles(
                            pecaData.nome,
                            peca?.nome || '',
                            theme,
                          )}
                        >
                          {pecaData.nome}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </td>
                <td>
                  {peca
                    ? (peca.precoCompra + peca.precoFrete) * peca.quantidade
                    : ''}
                </td>
                <td>
                  {peca
                    ? (peca.precoCompra + peca.precoFrete) *
                      1.25 *
                      peca.quantidade
                    : ''}
                </td>
                <td className="no-print">
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
                  color="success"
                  onClick={() => handleAddPeca()}
                  className="no-print"
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
        <div className="relative container space-x-4 no-print">
          {/* Botões de ações */}
          <Button
            variant="contained"
            color="primary"
            className="w-40"
            onClick={printPage}
          >
            Imprimir
          </Button>
          <Button variant="contained" className="w-72">
            Salvar Orçamento
          </Button>
        </div>

        <div>
          <p>
            À VISTA: R${' '}
            {selectedPecas.reduce(
              (acc, peca) =>
                acc +
                (peca
                  ? (peca.precoCompra + peca.precoFrete) *
                    1.25 *
                    peca.quantidade
                  : 0),
              0,
            )}
            ,00
          </p>

          <p>Assinatura: ___________________________</p>
        </div>
      </footer>
    </div>
  );
}

export default Orcamento;
