import api from '../api.js';

export default {
  template: `
    <section>
      <h2>Gerenciar Jogos</h2>

      <input v-model="nome" placeholder="Nome do jogo">
      <input v-model="genero" placeholder="Gênero">
      <input v-model.number="anoLancamento" placeholder="Ano de lançamento" type="number">
      <input v-model="tipoMidia" placeholder="Tipo de mídia (CD/Cartucho)">
      <input v-model="urlCapa" placeholder="URL da capa">
      <input v-model.number="plataformaId" placeholder="ID do console" type="number">

      <button v-if="!editando" @click="criarJogo">Criar Jogo</button>
      <button v-else @click="salvarEdicao">Salvar Alterações</button>

      <ul>
        <li v-for="jogo in jogos" :key="jogo.id">
          {{ jogo.nome }} - {{ jogo.genero }} ({{ jogo.anoLancamento }})
          <button @click="editarJogo(jogo)">Editar</button>
          <button @click="deletarJogo(jogo.id)">Excluir</button>
        </li>
      </ul>
    </section>
  `,

  data() {
    return {
      nome: '',
      genero: '',
      anoLancamento: '',
      tipoMidia: '',
      urlCapa: '',
      plataformaId: '',
      jogos: [],
      editando: false,
      idEditando: null
    }
  },

  mounted() {
    this.listarJogos();
  },

  methods: {
    async listarJogos() {
      const response = await api.get('/jogos');
      this.jogos = response.data;
    },

    async criarJogo() {
      if (!this.nome || !this.genero || !this.anoLancamento || !this.tipoMidia || !this.urlCapa || !this.plataformaId) {
        alert('Preencha todos os campos!');
        return;
      }

      await api.post('/jogos', {
        nome: this.nome,
        genero: this.genero,
        anoLancamento: this.anoLancamento,
        tipoMidia: this.tipoMidia,
        urlCapa: this.urlCapa,
        plataformaId: this.plataformaId
      });

      this.resetarFormulario();
      this.listarJogos();
    },

    async deletarJogo(id) {
      if (confirm('Tem certeza que deseja excluir este jogo?')) {
        await api.delete(`/jogos/${id}`);
        this.listarJogos();
      }
    },

    editarJogo(jogo) {
      this.nome = jogo.nome;
      this.genero = jogo.genero;
      this.anoLancamento = jogo.anoLancamento;
      this.tipoMidia = jogo.tipoMidia;
      this.urlCapa = jogo.urlCapa;
      this.plataformaId = jogo.plataformaId;
      this.idEditando = jogo.id;
      this.editando = true;
    },

    async salvarEdicao() {
      if (!this.nome || !this.genero || !this.anoLancamento || !this.tipoMidia || !this.urlCapa || !this.plataformaId) {
        alert('Preencha todos os campos!');
        return;
      }

      await api.put(`/jogos/${this.idEditando}`, {
        nome: this.nome,
        genero: this.genero,
        anoLancamento: this.anoLancamento,
        tipoMidia: this.tipoMidia,
        urlCapa: this.urlCapa,
        plataformaId: this.plataformaId
      });

      this.resetarFormulario();
      this.listarJogos();
    },

    resetarFormulario() {
      this.nome = '';
      this.genero = '';
      this.anoLancamento = '';
      this.tipoMidia = '';
      this.urlCapa = '';
      this.plataformaId = '';
      this.editando = false;
      this.idEditando = null;
    }
  }
}