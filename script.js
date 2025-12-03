const urlBase = 'http://159.65.228.63/';
const endpoint = 'produtos';
let dados = [];

async function atualizar() {
    const lista = document.getElementById('lista-tarefas');
    lista.innerHTML = '<p class="loading">Carregando tarefas...</p>';

    try {
        const response = await fetch(${urlBase}${endpoint});
        dados = await response.json();

        if (!dados || dados.length === 0) {
            lista.innerHTML = '<p class="vazio">Nenhuma tarefa cadastrada</p>';
            return;
        }

        // Criação da tabela
        const table = document.createElement('table');
        table.classList.add('tabela-tarefas');

        // Cabeçalho da tabela
        const header = document.createElement('tr');
        const colunas = [
            'Prioridade',
            'Descrição',
            'Local',
            'Recursos',
            'Data Limite',
            'Matrícula'
        ];

        colunas.forEach(titulo => {
            const th = document.createElement('th');
            th.textContent = titulo;
            header.appendChild(th);
        });

        table.appendChild(header);

        // Conteúdo da tabela
        dados.forEach(tarefa => {
            const tr = document.createElement('tr');
            tr.classList.add('linha-tarefa');

            if (tarefa.prioridade === 'Urgente') {
                tr.classList.add('urgente');
            }

            const tdPrioridade = document.createElement('td');
            tdPrioridade.textContent = tarefa.prioridade;

            const tdDescricao = document.createElement('td');
            tdDescricao.textContent = tarefa.descricao;

            const tdLocal = document.createElement('td');
            tdLocal.textContent = tarefa.local;

            const tdRecursos = document.createElement('td');
            tdRecursos.textContent = (tarefa.recursosNecessarios || []).join(', ');

            const tdData = document.createElement('td');
            tdData.textContent = tarefa.dataLimite;

            const tdMatricula = document.createElement('td');
            tdMatricula.textContent = tarefa.matricula;

            tr.appendChild(tdPrioridade);
            tr.appendChild(tdDescricao);
            tr.appendChild(tdLocal);
            tr.appendChild(tdRecursos);
            tr.appendChild(tdData);
            tr.appendChild(tdMatricula);

            table.appendChild(tr);
        });

        lista.innerHTML = '';
        lista.appendChild(table);

    } catch (erro) {
        console.error('Erro ao carregar tarefas:', erro);
        lista.innerHTML = '<p class="erro">Erro ao carregar tarefas.</p>';
    }
}