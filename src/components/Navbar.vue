<template>
  <nav :class="['navbar', mode]">
    <div class="navbar-container">
      <div class="navbar-left">
        <img src="../assets/img/logo.png" alt="Logo" class="navbar-logo">
        <span class="navbar-title"></span>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      mode: 'claro' // Define o modo inicial
    };
  },
  methods: {
    toggleMode() {
      // Alterna entre os modos claro e escuro
      this.mode = this.mode === 'claro' ? 'escuro' : 'claro';
    }
  }
};
</script>

<style scoped>
.navbar {
  height: 60px;
}

.claro {
  background-color: #1E293B;
  color: #fff;
}

.escuro {
  background-color: #fff;
  color: #1E293B;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.navbar-left {
  display: flex;
  align-items: center;
  flex: 1;
}

.navbar-logo {
  height: 60px;
  margin-right: 10px;
}

.navbar-right {
  display: flex;
  align-items: center;
}

.navbar-title {
  font-size: 2.5rem;
  font-weight: bold;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.mode-toggle {
  background-color: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 1rem;
}

/* Estilos responsivos */
@media (max-width: 767px) {
  .navbar-right {
    display: none; /* Esconde os elementos da direita da barra de navegação em telas menores */
  }

  .navbar-left {
    text-align: center; /* Centraliza o título da barra de navegação em telas menores */
    justify-content: center; /* Adiciona isso para centralizar corretamente */
  }

  .navbar-title {
    margin: 0; /* Remove o margin extra */
  }

  .navbar-logo {
    margin-left: 200px; /* Ajuste se necessário para manter a centralização */
  }
}
</style>
