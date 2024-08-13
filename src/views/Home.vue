<template>
	<div class="container-fluid">
		<img src="../assets/img/logo.png" alt="Logo" class="navbar-logo">
	  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
		<h1 class="h2">Dashboard</h1>
	  </div>
	  <div class="row mb-3">
		<div class="col-md-4">
		  <div class="card text-white bg-primary mb-3">
			<div class="card-body">
			  <h5 class="card-title">Pedidos Pendentes</h5>
			  <p class="card-text">{{ pedidosPendentes }}</p>
			</div>
		  </div>
		</div>
		<div class="col-md-4">
		  <div class="card text-white bg-warning mb-3">
			<div class="card-body">
			  <h5 class="card-title">Pedidos Abertos</h5>
			  <p class="card-text">{{ pedidosAbertos }}</p>
			</div>
		  </div>
		</div>
		<div class="col-md-4">
		  <div class="card text-white bg-success mb-3">
			<div class="card-body">
			  <h5 class="card-title">Pedidos Concluídos</h5>
			  <p class="card-text">{{ pedidosConcluidos }}</p>
			</div>
		  </div>
		</div>
	  </div>
	  <div class="row">
		<div class="col-md-6">
		  <div class="card mb-4">
			<div class="card-body">
			  <h5 class="card-title">Pedidos na Última Semana</h5>
			  <canvas id="chartPedidosSemanal"></canvas>
			</div>
		  </div>
		</div>
		<div class="col-md-6">
		  <div class="card mb-4">
			<div class="card-body">
			  <h5 class="card-title">Pedidos no Último Mês</h5>
			  <canvas id="chartPedidosMensal"></canvas>
			</div>
		  </div>
		</div>
	  </div>
	  <div class="row">
		<div class="col-md-6">
		  <div class="card mb-4">
			<div class="card-body">
			  <h5 class="card-title">Score dos Funcionários</h5>
			  <table class="table">
				<thead>
					<tr>
						<th>Funcionário</th>
						<th>Score</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="score in scores" :key="score.name">
						<td>{{ score.name }}</td>
						<td>{{ score.score }}</td>
					</tr>
				</tbody>
			  </table>
			</div>
		  </div>
		</div>
		<div class="col-md-6">
		  <div class="card mb-4">
			<div class="card-body">
			  <h5 class="card-title">Últimos Chats</h5>
			  <div id="latest-chats">
			      <div class="chat">
			          <div class="avatar">
			              <img src="avatar1.jpg" alt="Avatar">
			          </div>
			          <div class="chat-content">
			              <p>Olá! Como posso ajudar?</p>
			          </div>
			      </div>
			      <div class="chat">
			          <div class="avatar">
			              <img src="avatar2.jpg" alt="Avatar">
			          </div>
			          <div class="chat-content">
			              <p>Olá! Estou com um problema no pedido X.</p>
			          </div>
			      </div>
			      <!-- Outros chats aqui -->
			  </div>
			</div>
		  </div>
		</div>
	  </div>
	</div>
</template>

<style>
    .avatar img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }
    .chat {
        display: flex;
        margin-bottom: 10px;
    }
    .chat-content {
        background-color: #f1f1f1;
        border-radius: 10px;
        padding: 10px;
        margin-left: 10px;
    }
</style>

<script>
    export default {
        data() {
            return {
                scores: [
                    { name: 'João', score: 85 },
                    { name: 'Maria', score: 70 },
                    { name: 'Pedro', score: 95 },
                    { name: 'Ana', score: 80 },
                    { name: 'Carlos', score: 75 }
                ]
            };
        }
    };
</script>
