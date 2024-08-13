<template>
  <main>
    <div class="container-fluid">
      <div class="logo">
        <h2>Listagem de Pedidos</h2>
      </div>
      <div class="row">
        <h3 class="my-2"></h3>
        <div class="row mb-4">
          <div class="col-md-4">
            <div class="card bg-success text-white">
              <div class="card-body">
                <h5 class="card-title">Ticket Médio</h5>
                <p class="card-text">R$ 150,00</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card bg-success text-white">
              <div class="card-body">
                <h5 class="card-title">Receita Total</h5>
                <p class="card-text">R$ 15.000,00</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card bg-success text-white">
              <div class="card-body">
                <h5 class="card-title">Quantidade de Pedidos</h5>
                <p class="card-text">100</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-4 d-flex align-items-center">
          <!-- Inputs de Data -->
          <div class="me-3 d-flex flex-column">
            <label for="dataInicio" class="form-label mb-0">Data de Criação:</label>
            <input type="date" id="dataInicio" v-model="dataInicio" class="form-control form-control-sm" />
          </div>

          <div class="me-3 d-flex flex-column">
            <label for="dataFim" class="form-label mb-0">Data de Saída:</label>
            <input type="date" id="dataFim" v-model="dataFim" class="form-control form-control-sm" />
          </div>


          <!-- Input de Pesquisa Cliente -->
          <div class="me-2 d-flex flex-column">
            <label for="pesquisarCliente" class="form-label mb-0" style="margin-left: 50px;">Pesquise por Palavra-Chave:</label>
            <input type="text" id="pesquisarCliente" v-model="consultaBusca" placeholder="Digite para pesquisar"
              class="form-control form-control-sm" style="width: 450px; height: 30px; margin-left: 50px;" />

          </div>
          <!-- Botão de Busca -->
          <div>
            <button @click="buscarCliente" class="btn btn-success my-2">Buscar</button>
          </div>
        </div>



        <hr>
        <!-- Ícones para exportar -->
        <div class="d-flex mb-3">
          <i class="fas fa-file-pdf me-3 icon-lg" :class="{ 'active': isPDFExporting }" @click="exportarPDF"></i>
          <i class="fas fa-file-csv me-3 icon-lg" :class="{ 'active': isCSVExporting }" @click="exportarCSV"></i>
          <i class="fas fa-print icon-lg" @click="imprimir"></i>
        </div>

        <div class="table-responsive">
          <table class="table table-striped table-bordered tabela-pedido">
            <thead class="cara">
              <tr class="teste">
                <th colspan="8" class="text-center">Lista de Pedidos de Venda</th>
              </tr>
              <tr>
                <th scope="col" class="py-3 px-2 text-lg">Código</th>
                <th scope="col" class="py-3 px-4 text-lg">Cliente</th>
                <th scope="col" class="py-3 px-4 text-lg">Qtd</th>
                <th scope="col" class="py-3 px-4 text-lg">Valor</th>
                <th scope="col" class="py-3 px-4 text-lg">Método</th>
                <th scope="col" class="py-3 px-4 text-lg">Status</th>
                <th scope="col" class="py-3 px-4 text-lg">Ações</th>
              </tr>
            </thead>
            <tbody>
              <!-- Loop apenas se houver pedidos -->
              <tr v-for="(pedido, index) in pedidosFiltrados" :key="pedido.pedidoID">
                <td>{{ pedido.pedidoID }}</td>
                <td>{{ pedido.cliente.nomeCliente }}</td>
                <td>{{ pedido.qtdProduto }}</td>
                <td>{{ calcularTotal(pedido) }}</td>
                <td>{{ pedido.formaPagamento }}</td>
                <td>
                  <span :class="{
                    'badge bg-success': pedido.statusPedido === 'Aprovado',
                    'badge bg-danger': pedido.statusPedido === 'Rejeitado',
                    'badge bg-warning': pedido.statusPedido === 'Pendente',
                    'badge bg-info': pedido.statusPedido === 'Em andamento',
                  }">{{ pedido.statusPedido }}</span>
                </td>
                <td>
                  <button class="btn btn-warning btn-sm me-1" @click="abrirModalEdicao(pedido)">
                    <i class="fas fa-edit"></i> <!-- Ícone de editar -->
                    Editar
                  </button>

                  <button class="btn btn-danger btn-sm me-1" @click="abrirModalExclusao(pedido.pedidoID)">
                    <i class="fas fa-trash-alt"></i> <!-- Ícone de excluir -->
                    Excluir
                  </button>
                  
                  <button class="btn btn-info btn-sm" @click="verDetalhes(pedido)">
                    <i class="fas fa-info-circle"></i> <!-- Ícone de detalhes -->
                    Detalhes
                  </button>
                </td>
              </tr>

              <!-- Mensagem de "Nenhum pedido encontrado" sempre visível -->
              <tr v-if="pedidosFiltrados.length === 0">
                <td colspan="7" class="text-center">Nenhum pedido encontrado.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Paginação -->
      <nav aria-label="Navegação de página exemplo">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" tabindex="-1" @click="paginaAnterior">Anterior</a>
        </li>
        <li class="page-item" v-for="pagina in totalPaginas" :key="pagina" :class="{ active: pagina === currentPage }">
          <a class="page-link" href="#" @click="mudarPagina(pagina)">{{ pagina }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPaginas }">
          <a class="page-link" href="#" @click="proximaPagina">Próximo</a>
        </li>
      </ul>
    </nav>

      <!-- Modal de Detalhes -->
      <div class="modal fade" id="pedidoModal" tabindex="-1" aria-labelledby="pedidoModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="pedidoModalLabel">Detalhes do Pedido</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div v-if="Object.keys(pedidoDetalhes).length === 0">
          <p>Nenhum pedido selecionado.</p>
        </div>
        <div v-else>
          <div class="table-responsive">
            <table class="table">
              <tbody>
                <tr>
                  <th scope="row">Cliente:</th>
                  <td>{{ pedidoDetalhes.cliente.nomeCliente }}</td>
                </tr>
                <tr>
                  <th scope="row">Código do Pedido:</th>
                  <td>{{ pedidoDetalhes.pedidoID }}</td>
                </tr>
                <tr>
                  <th scope="row">Data de Entrada:</th>
                  <td>{{ formatarData(pedidoDetalhes.data_entrada_pedido) }}</td>
                </tr>
                <tr>
                  <th scope="row">Status:</th>
                  <td>{{ pedidoDetalhes.statusPedido }}</td>
                </tr>
                <tr>
                  <th scope="row">Forma de Pagamento:</th>
                  <td>{{ pedidoDetalhes.formaPagamento }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h5>Produtos:</h5>
          <table class="table">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Preço Unitário</th>
                <th>Valor Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="produto in pedidoDetalhes.produtos" :key="produto.ProdutoID">
                <td>{{ produto.pedidoID }}</td>
                <td>{{ produto.quantidade }}</td>
                <td>{{ produto.produto.preco }}</td>
                <td>{{ (produto.produto.preco * produto.quantidade).toFixed(2) }}</td>
              </tr>
            </tbody>
          </table>
          <h5>Total do Pedido: {{ calcularPrecoTotal().toFixed(2) }}</h5>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
      </div>
    </div>
  </div>
</div>


      <!-- Modal de Exclusão -->
      <div class="modal fade" id="modalExclusao" tabindex="-1" aria-labelledby="modalExclusaoLabel" aria-hidden="true" v-show="exibirModalExclusao">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalExclusaoLabel">Confirmar exclusão</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Tem certeza de que deseja excluir este pedido?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" class="btn btn-danger" @click="confirmarExclusao">Excluir</button>
            </div>
          </div>
        </div>
      </div>
        <!-- Modal de Edição -->
  <div class="modal fade" id="modalEdicao" tabindex="-1" aria-labelledby="modalEdicaoLabel" aria-hidden="true" v-show="exibirModalEdicao">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalEdicaoLabel">Editar Status do Pedido</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="fecharModalEdicao"></button>
        </div>
        <div class="modal-body">
          <!-- Formulário de edição -->
          <form @submit.prevent="salvarAlteracoes">
            <div class="mb-3">
              <label for="statusPedido" class="form-label">Novo Status do Pedido</label>
              <select id="statusPedido" class="form-select" v-model="novoStatusPedido">
                <option value="Aprovado">Aprovado</option>
                <option value="Rejeitado">Rejeitado</option>
                <option value="Pendente">Pendente</option>
                <option value="Em andamento">Em andamento</option>
              </select>
            </div>

            <button type="submit" class="btn btn-primary" @click="salvarAlteracoes">Salvar Alterações</button>
            <button type="button" class="btn btn-secondary" @click="fecharModalEdicao">Cancelar</button>
          </form>
        </div>
      </div>
    </div>
  </div>



    </div>
  </main>
</template>

<script>
import axios from 'axios';
import jsPDF from 'jspdf';

export default {
  data() {
    return {
      pedidos: [],
      consultaBusca: '',
      clientesEncontrados: [], 
      linhasPorPagina: 15,
      pedidoDetalhes: {},
      dataInicio: '',
      dataFim: '',
      statusFiltro: [],
      filtrosAplicados: false,
      exibirModalExclusao: false,
      pedidoParaExcluir: null,
      pedidoParaEditar: null,
      novoStatusPedido: '',
      isPDFExporting: false,
      isCSVExporting: false,
    };
  },
  computed: {
    pedidosFiltrados() {
      let pedidosFiltrados = this.pedidos;

      if (this.consultaBusca) {
        pedidosFiltrados = pedidosFiltrados.filter((pedido) => {
          const nomeCliente = pedido.cliente ? pedido.cliente.NomeCliente.toLowerCase() : '';
          return nomeCliente.includes(this.consultaBusca.toLowerCase());
        });
      }

      if (this.dataInicio) {
        const dataInicio = new Date(this.dataInicio);
        pedidosFiltrados = pedidosFiltrados.filter((pedido) => new Date(pedido.Data_entrada_pedido) >= dataInicio);
      }

      if (this.dataFim) {
        const dataFim = new Date(this.dataFim);
        pedidosFiltrados = pedidosFiltrados.filter((pedido) => new Date(pedido.Data_entrada_pedido) <= dataFim);
      }

      if (this.statusFiltro.length > 0) {
        pedidosFiltrados = pedidosFiltrados.filter((pedido) => this.statusFiltro.includes(pedido.StatusPedido));
      }

      return pedidosFiltrados.slice(0, this.linhasPorPagina);
    }
  },

  methods: {

    exportarPDF() {
      this.isPDFExporting = true; 
      const doc = new jsPDF();
      doc.text("Lista de Pedidos de Venda", 20, 10);
      doc.autoTable({
        head: [
          ["Código", "Cliente", "Quantidade", "Valor", "Método", "Status"]
        ],
        body: this.pedidosFiltrados.map(pedido => [
          pedido.pedidoID,
          pedido.cliente.nomeCliente,
          pedido.qtdProduto,
          this.calcularTotal(pedido),
          pedido.formaPagamento,
          pedido.statusPedido
        ]),
        startY: 20,
      });

      doc.save("pedidos.pdf");

      setTimeout(() => {
        this.isPDFExporting = false; 
      }, 1000);
    },
    exportarCSV() {
      this.isCSVExporting = true; 
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += [
        "Código",
        "Cliente",
        "Quantidade",
        "Valor",
        "Método",
        "Status"
      ].join(",") + "\n";

      this.pedidosFiltrados.forEach((pedido) => {
        csvContent += [
          pedido.pedidoID,
          pedido.cliente.nomeCliente,
          pedido.qtdProduto,
          this.calcularTotal(pedido),
          pedido.formaPagamento,
          pedido.statusPedido
        ].join(",") + "\n";
      });

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "pedidos.csv");
      document.body.appendChild(link); 
      link.click();

      setTimeout(() => {
        this.isCSVExporting = false; 
      }, 1000);
    },
    imprimir() {
      // Função para imprimir
      window.print();
    },

    calcularTotal(pedido) {
      let total = 0;
      console.log(pedido.produtos);
      pedido.produtos.forEach(item => {
        total += (item.quantidade == 0 ? 1 : item.quantidade) * item.produto.preco
      });
      return total;
    },
    buscarCliente() {
      // Realiza a busca pelo nome do cliente via Axios, passando 'NomeCliente' como parâmetro
      axios.get(`https://localhost:7103/api/clientes?NomeCliente=${this.consultaBusca}`)
        .then(response => {
          // Define os clientes encontrados
          this.clientesEncontrados = response.data;
        })
        .catch(error => {
          console.error('Erro ao buscar clientes:', error);
        });
    },
    buscarPedidos() {
      axios.get('https://localhost:7103/api/pedidos')
        .then((response) => {
          this.pedidos = response.data;
        })
        .catch((error) => {
          console.error('Erro ao buscar pedidos:', error);
        });
    },
    aplicarFiltros() {
      this.filtrosAplicados = true;
    },
    verDetalhes(pedido) {
      this.pedidoDetalhes = pedido;
      const modal = new bootstrap.Modal(document.getElementById('pedidoModal'));
      modal.show();
    },
    // FUNÇÕES PARA EDITAR PEDIDO

    abrirModalEdicao(pedido) {
      this.exibirModalExclusao = false; // Fecha o modal de exclusão, se estiver aberto
      this.exibirModalEdicao = true;
      if (pedido) {
        this.pedidoParaEditar = { ...pedido };
        console.log('Abrindo modal de edição...');
        const modal = new bootstrap.Modal(document.getElementById('modalEdicao'));
        modal.show();
      }
    },
    fecharModalEdicao() {
      this.exibirModalEdicao = false;
      this.novoStatusPedido = ''; // Limpa o novoStatusPedido
      this.pedidoParaEditar = null;
    },

    cancelarEdicao() {
      this.fecharModalEdicao(); // Remove chamada redundante para fecharModalEdicao
    },

    salvarAlteracoes() {
      if (this.pedidoParaEditar && this.novoStatusPedido) {
        axios.put(`https://localhost:7103/api/pedidos/${this.pedidoParaEditar.pedidoID}`, {
          statusPedido: this.novoStatusPedido
        })
        .then(response => {
          console.log('Pedido editado com sucesso:', response.data);
          this.fecharModalEdicao();
        })
        .catch(error => {
          console.error('Erro ao editar pedido:', error);
        });
      }
    },

    // FUNÇÕES PARA Excluir PEDIDO

    abrirModalExclusao(pedidoID) {
      this.pedidoParaExcluir = pedidoID;
      const modal = new bootstrap.Modal(document.getElementById('modalExclusao'));
      modal.show();
    },
    fecharModalExclusao() {
      this.exibirModalExclusao = false;
      this.pedidoParaExcluir = null;
    },
    cancelarExclusao() {
      this.fecharModalExclusao();
    },
    excluirPedidoNoBackend(pedidoID) {
      return axios.delete(`https://localhost:7103/api/pedidos/${pedidoID}`)
        .then(response => {
          console.log('Pedido excluído com sucesso:', response.data);
          this.buscarPedidos();
        })
        .catch(error => {
          console.error('Erro ao excluir pedido:', error);
        });
    },

    confirmarExclusao() {
      if (this.pedidoParaExcluir) {
        this.excluirPedidoNoBackend(this.pedidoParaExcluir)
          .then(() => {
            this.fecharModalExclusao();
          })
          .catch((error) => {
            console.error('Erro ao excluir o pedido:', error);
            this.fecharModalExclusao();
          });
      }
    },
    formatarData(data) {
      return new Date(data).toLocaleDateString('pt-BR');
    },
    filtrarPorData(tipo) {
      this.aplicarFiltros();
    },
    atualizarStatusFiltro(status) {
      if (this.statusFiltro.includes(status)) {
        this.statusFiltro = this.statusFiltro.filter(s => s !== status);
      } else {
        this.statusFiltro.push(status);
      }
      this.aplicarFiltros();
    },
    calcularTotalProdutos() {
      let totalProdutos = 0;
      if (this.pedidoDetalhes && this.pedidoDetalhes.Produtos) {
        this.pedidoDetalhes.Produtos.forEach(produto => {
          totalProdutos += produto.Quantidade;
        });
      }
      return totalProdutos;
    },
    calcularPrecoTotal() {
      let precoTotal = 0;
      if (this.pedidoDetalhes && this.pedidoDetalhes.produtos) {
        this.pedidoDetalhes.produtos.forEach(produto => {
          precoTotal += (produto.quantidade == 0 ? 1 : produto.quantidade) * produto.produto.preco;
        });
      }
      return precoTotal;
    },
    calcularValorTotalProduto(produto) {
      return (produto.quantidade == 0 ? 1 : produto.quantidade) * produto.produto.preco;
    }
  },
  mounted() {
    this.buscarPedidos();
  },
};
</script>





<style scoped>
th {
  color: #fff;
  background-color: #1e293b;
}



.icon-lg {
  font-size: 35px;
  /* Tamanho personalizado */
}
</style>
