import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import logo1 from './imagens/logomf.jpg';
import logo2 from './imagens/logomg.jpg';

const CardOrcamento = ({ orcamento, onClose }) => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <Dialog open={!!orcamento} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Orçamento / Pedido</DialogTitle>
      <DialogContent>
        <div className="order-form">
          {/* Cabeçalho da página */}
          <header className="header flex items-center justify-center">
            <div className="flex flex-col items-center">
              <img src={logo1} alt="Logo 1" className="w-60 mb-4" />
              <img src={logo2} alt="Logo 2" className="w-60 mb-4" />
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

            {/* Dados do cliente */}
            <div className="client-info-container rounded border-1 border-black mb-2">
              <table className="client-info-table">
                <tbody>
                  <tr>
                    <th>Nome</th>
                    <td>{orcamento.nome}</td>
                  </tr>
                  <tr>
                    <th>Endereço</th>
                    <td>{orcamento.endereco}</td>
                  </tr>
                  <tr>
                    <th>Carro</th>
                    <td>{orcamento.carro}</td>
                  </tr>
                  <tr>
                    <th>Cidade</th>
                    <td>{orcamento.cidade}</td>
                  </tr>
                  <tr>
                    <th>CPF/CNPJ</th>
                    <td>{orcamento.cpfCnpj}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Seleção de peças */}
            <table>
              <thead>
                <tr>
                  <th>Qnt.</th>
                  <th>Descrição do Produto/Serviço</th>
                  <th>Valor Unitário</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {orcamento.pecas.map((peca, index) => (
                  <tr key={index}>
                    <td>{peca.quantidade}</td>
                    <td>{peca.nome}</td>
                    <td>{(peca.precoCompra + peca.precoFrete).toFixed(2)}</td>
                    <td>
                      {(
                        (peca.precoCompra + peca.precoFrete) *
                        1.25 *
                        peca.quantidade
                      ).toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="4">
                    <p>
                      <input
                        type="checkbox"
                        name="parcelado"
                        className="mr-9"
                      />
                      PARCELADO: R${' '}
                      {orcamento.pecas
                        .reduce(
                          (acc, peca) =>
                            acc +
                            (peca.precoCompra + peca.precoFrete) *
                              1.45 *
                              peca.quantidade,
                          0,
                        )
                        .toFixed(2)}{' '}
                      Reais em até 10X SEM JUROS
                    </p>
                    <p>
                      <input type="checkbox" name="avista" className="mr-9" />À
                      VISTA: R${' '}
                      {orcamento.pecas
                        .reduce(
                          (acc, peca) =>
                            acc +
                            (peca.precoCompra + peca.precoFrete) *
                              1.25 *
                              peca.quantidade,
                          0,
                        )
                        .toFixed(2)}{' '}
                      Reais
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </main>

          {/* Rodapé */}
          <footer className="footer">
            <div className="relative container space-x-4 no-print">
              <Button variant="contained" className="w-72">
                Salvar Orçamento / Pedido
              </Button>
            </div>
          </footer>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CardOrcamento;
