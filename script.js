const button = document.querySelector(".button-add-task");
const button_rmv = document.querySelector(".button-remove-all-tsk");
const input = document.querySelector(".input-task");
const listaCompleta = document.querySelector(".list-task");
//valor vai ser alterado
let minhaListaDeItens = [];

function adicionarNovaTarefa() {
  if (input.value == "".length) {
    mostrarTarefas();
  } else {
    minhaListaDeItens.push({
      tarefa: input.value,
      concluida: false,
    });

    input.value = "";
    mostrarTarefas();
  }
}
function mostrarTarefas() {
  let novaLi = "";
  minhaListaDeItens.forEach((item, index) => {
    novaLi =
      novaLi +
      `
        <li class="task ${item.concluida && "done"}">
            <p>${item.tarefa}</p>
            <div class="buttons">
                <img src="./img/checked.png" alt="check" onclick="checkTask(${index})">
                <img src="./img/trash.png" alt="trash" onclick="deletarItem(${index})">
            </div>

        </li>`;
  });
  listaCompleta.innerHTML = novaLi;

  localStorage.setItem("lista", JSON.stringify(minhaListaDeItens));
}

function checkTask(index) {
  minhaListaDeItens[index].concluida = !minhaListaDeItens[index].concluida; //a exclamação é pra inverter de t para f e
  //de f para t.
  mostrarTarefas();
}

function deletarItem(index) {
  minhaListaDeItens.splice(index, 1);
  mostrarTarefas();
}

function deletarTodosOsItens(index) {
  minhaListaDeItens.splice(index);
  mostrarTarefas();
}

function recarregarTela() {
  const tarefasLs = localStorage.getItem("lista");
  if (tarefasLs) {
    minhaListaDeItens = JSON.parse(tarefasLs);
  }
  mostrarTarefas();
}
document.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    document.getElementById("button-add-task").click();
  }
});
recarregarTela();
button.addEventListener("click", adicionarNovaTarefa);
button_rmv.addEventListener("click", deletarTodosOsItens);
