//abrindo modal
function abrirModal(){
    overlay.classList.add("active");//inserindo no overlay o valor active
    criarTarefa.classList.add("active");//inserindo no criarTarefa o valor active
}
//fechando modal
function fecharModal(){
    overlay.classList.remove("active"); //removendo no overlay o valor active
    criarTarefa.classList.remove("active");//removendo no criarTarefa o valor active
}

//fazendo requisicao http na nossa api para acessar nosso mini banco na maquina
function buscarTarefas(){
    fetch("http://localhost:3000/tarefas") //fetch busca no endereco da api uma promessa
    .then(res => res.json()) //primeiro then trata a promessa e transforma em json
    .then(res => { 
        inserirTarefas(res); //segundo then envia a resposta para o inserir tarefas
    })
} 

//chamando buscador de tarefas
buscarTarefas(); 

//inserir recebe a lista de tarefas que foi buscada na api e esta em json
function inserirTarefas(listadeTarefas){
    if(listadeTarefas.length > 0){ //se maior que 0
        lista.innerHTML = "" //apaga o conteudo anterior
        listadeTarefas.map(tarefa => { //map nomeia cada unidade do array resposta da api com o nome tarefa[i]
            lista.innerHTML += ` 
                <li>
                    <h5>${tarefa.titulo}</h5>
                    <p>${tarefa.descricao}</p>
                    <div class="actions">
                        <box-icon name='trash' size="sm" onclick="deletarTarefa(${tarefa.id})"></box-icon>
                    </div>
                </li>
            `;//inserindo uma tarefa ao html com innerHTML
        })
    }
}

function novaTarefa(){
    event.preventDefault();
    let tarefa = {
        titulo : titulo.value,
        descricao : descricao.value
    }
    fetch("http://localhost:3000/tarefas", {
        method : "POST",
        headers: {
            "Content-type" : "application/json"
        },
        body: JSON.stringify(tarefa)
    })
    .then(res => res.json())
    .then(res => {
        fecharModal();
        buscarTarefas;
        let form =  document.querySelector("#criarTarefa form");
        form.reset();
    })
}


function deletarTarefa(id){
    fetch(`http://localhost:3000/tarefas/${id}`,{
        method: "DELETE",
    })
    .then(res => res.json())
    .then(res => {
        alert("ok")
        buscarTarefas();
    })
    
}

function pesquisarTarefas(){
    let lis = document.querySelectorAll("ul li");
    
    if(busca.value.length > 0){
        lis.forEach(li => {
            if(!li.children[0].innerText.includes(busca.value)){
                li.classList.add('oculto')
            }else {
                li.classList.remove('oculto')
            }
            
        })
        
    }else{
        lis.forEach(lis.forEach(li => {
            li.classList.remove('oculto')
        }))
    }

}