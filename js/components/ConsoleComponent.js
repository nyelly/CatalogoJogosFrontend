import api from '../api.js';

export default {
 template: `
  <section>
    <h2>Gerenciar Consoles</h2>

    <input v-model="modelo" placeholder="Modelo do console">
    <input v-model.number="ano" placeholder="Ano de lançamento" type="number">

    <div class="button-container">
      <button v-if="!editando" @click="criarConsole">Criar Console</button>
      <button v-else @click="salvarEdicao">Salvar Alterações</button>
    </div>

    <ul>
      <li v-for="console in consoles" :key="console.id">
        {{ console.modelo }} ({{ console.ano }})
        <div>
          <button @click="editarConsole(console)">Editar</button>
          <button @click="deletarConsole(console.id)">Excluir</button>
        </div>
      </li>
    </ul>
  </section>
`,

  data() {
    return {
      modelo: '',
      ano: '',
      consoles: [],
      editando: false,
      idEditando: null
    }
  },

  mounted() {
    this.listarConsoles();
  },

  methods: {
    async listarConsoles() {
      const response = await api.get('/console');
      this.consoles = response.data;
    },

    async criarConsole() {
      if (!this.modelo || !this.ano) {
        alert('Preencha todos os campos!');
        return;
      }

      await api.post('/console', {
        modelo: this.modelo,
        ano: this.ano
      });

      this.modelo = '';
      this.ano = '';
      this.listarConsoles();
    },

    async deletarConsole(id) {
      if (confirm('Tem certeza que deseja excluir este console?')) {
        await api.delete(`/console/${id}`);
        this.listarConsoles();
      }
    },

    editarConsole(console) {
      this.modelo = console.modelo;
      this.ano = console.ano;
      this.idEditando = console.id;
      this.editando = true;
    },

    async salvarEdicao() {
      if (!this.modelo || !this.ano) {
        alert('Preencha todos os campos!');
        return;
      }

      await api.put(`/console/${this.idEditando}`, {
        modelo: this.modelo,
        ano: this.ano
      });

      this.modelo = '';
      this.ano = '';
      this.editando = false;
      this.idEditando = null;
      this.listarConsoles();
    }
  }
}