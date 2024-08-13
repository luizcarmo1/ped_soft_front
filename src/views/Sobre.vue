<template>
  <main>
    <div class="container">
      <div class="row justify-content-center mt-5">
        <!-- Card da Fabrica de Codigos -->
        <div class="col-md-4">
          <div class="card text-center">
            <img src="../assets/img/logo.png" class="card-img-top mx-auto d-block" style="max-width: 150px; height: 120px;" alt="GitHub">
            <div class="card-body">
              <h5 class="card-title">Fabrica de Codigo</h5>
              <p class="card-text">Entre aqui</p>
              <a href="https://www.fabricadecodigos.com.br/" class="btn btn-primary" target="_blank">Clique aqui</a>
            </div>
          </div>
        </div>

        <!-- Card do GitHub -->
        <div class="col-md-4">
          <div class="card text-center">
            <img src="../assets/img/github.png" class="card-img-top mx-auto d-block" style="max-width: 150px; max-height: 120px;" alt="GitHub">
            <div class="card-body">
              <h5 class="card-title">GitHub</h5>
              <p class="card-text">Entre aqui</p>
              <a href="https://github.com/GoFDD/projeto_pedsoft" class="btn btn-primary" target="_blank">Enviar para o GitHub</a>
            </div>
          </div>
        </div>

        <!-- Card do Canva -->
        <div class="col-md-4">
          <div class="card text-center">
            <img src="../assets/img/canva.jpg" class="card-img-top mx-auto d-block" style="max-width: 150px; height: 120px;" alt="Canva">
            <div class="card-body">
              <h5 class="card-title">Canva</h5>
              <p class="card-text">Entre aqui</p>
              <a href="https://www.canva.com/design/DAGH3klpuRY/OnwOdDjqz6RLscK2uyxltw/edit?utm_content=DAGH3klpuRY&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton" class="btn btn-primary" target="_blank">Enviar para o Canva</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  // Se houver lógica do componente, coloque aqui
}
</script>

<style scoped>
/* Estilos personalizados para os cards */
.card {
  margin-bottom: 20px;
}

.card-title {
  color: #333;
}

.card-text {
  color: #666;
}
</style>
