const inputElement = document.querySelector(".nova-tarefa-input");
const addTarefaBotao = document.querySelector(".nova-tarefa-botao");

const tarefasContainer = document.querySelector(".tarefas-container");

const validarInput = () => inputElement.value.trim().length > 0;

const adicionarTarefa = () => {
  const inputValido = validarInput();

  if (!inputValido) {
    return inputElement.classList.add("erro");
  }

  const tarefaItemContainer = document.createElement("div");
  tarefaItemContainer.classList.add("tarefa-item");

  const tarefaConteudo = document.createElement("p");
  tarefaConteudo.innerText = inputElement.value;

  tarefaConteudo.addEventListener("click", () => checarClick(tarefaConteudo));

  const deletaItem = document.createElement("i");
  deletaItem.classList.add("fa-solid");
  deletaItem.classList.add("fa-trash-can");

  deletaItem.addEventListener("click", () =>
    checarClickDeletar(tarefaItemContainer, tarefaConteudo)
  );

  tarefaItemContainer.appendChild(tarefaConteudo);
  tarefaItemContainer.appendChild(deletaItem);

  tarefasContainer.appendChild(tarefaItemContainer);

  inputElement.value = "";

  atualizarArmazenamentoLocal();
};

const checarClick = (tarefaConteudo) => {
  const tarefas = tarefasContainer.childNodes;

  for (const tarefa of tarefas) {
    const tarefaAtualClick = tarefa.firstChild.isSameNode(tarefaConteudo);

    if (tarefaAtualClick) {
      tarefa.firstChild.classList.toggle("completed");
    }
  }
  atualizarArmazenamentoLocal();
};

const checarClickDeletar = (tarefaItemContainer, tarefaConteudo) => {
  const tarefas = tarefasContainer.childNodes;

  for (const tarefa of tarefas) {
    const tarefaAtualDeletar = tarefa.firstChild.isSameNode(tarefaConteudo);

    if (tarefaAtualDeletar) {
      tarefaItemContainer.remove();
    }
  }
  atualizarArmazenamentoLocal();
};

const mudancaInput = () => {
  const inputValido = validarInput();

  if (inputValido) {
    return inputElement.classList.remove("erro");
  }
};

const atualizarArmazenamentoLocal = () => {
  const tarefas = tarefasContainer.childNodes;

  const armazenamentoLocalTarefas = [...tarefas].map((tarefa) => {
    const conteudo = tarefa.firstChild;
    const completa = conteudo.classList.contains("completed");

    return { description: conteudo.innerText, completa };
  });

  localStorage.setItem("tarefas", JSON.stringify(armazenamentoLocalTarefas));
};

const atualizarTarefasComArmazenamentoLocal = () => {
  const tarefasDoArmazenamentoLocal = JSON.parse(
    localStorage.getItem("tarefas")
  );

  if (!tarefasDoArmazenamentoLocal) return; // Adiciona verificação para null

  for (const tarefa of tarefasDoArmazenamentoLocal) {
    const tarefaItemContainer = document.createElement("div");
    tarefaItemContainer.classList.add("tarefa-item");

    const tarefaConteudo = document.createElement("p");
    tarefaConteudo.innerText = tarefa.description;
    if (tarefa.completa) {
      tarefaConteudo.classList.add("completed");
    }

    tarefaConteudo.addEventListener("click", () => checarClick(tarefaConteudo));

    const deletaItem = document.createElement("i");
    deletaItem.classList.add("fa-solid");
    deletaItem.classList.add("fa-trash-can");

    deletaItem.addEventListener("click", () =>
      checarClickDeletar(tarefaItemContainer, tarefaConteudo)
    );

    tarefaItemContainer.appendChild(tarefaConteudo);
    tarefaItemContainer.appendChild(deletaItem);

    tarefasContainer.appendChild(tarefaItemContainer);
  }
};

// Chama a função para carregar tarefas do localStorage quando a página é carregada
atualizarTarefasComArmazenamentoLocal();

addTarefaBotao.addEventListener("click", () => adicionarTarefa());
inputElement.addEventListener("change", () => mudancaInput());
