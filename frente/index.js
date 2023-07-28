const url = "http://localhost:3001/jogos/"

var listajogos = []

    



function criarlinhaJogos(jogos) {
   
        let d = new Date(jogos.data);

    
    return `<div id="linhajogos">
          <p class="dados">`+ jogos.id + `</p>
          <p class="dados">${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} </p>
          <p class="dados"> `+ jogos.timeMandante + `</p>
          <p class="dados"> `+ jogos.timeVisitante + `</p>
          <p class="dados"> `+ jogos.placar + `</p>
          <p class="dados"> `+ jogos.local + `</p>
          <img id="editar" class="editar" src="lapis.png" alt="editar">
          <img class="lixeira item" src="lixo.png" alt="excluir">
               </div>`;
}

var bt = document.getElementById("btnBusca")
bt.addEventListener("click", function () {
    var busca = document.getElementById("txtBusca").value
    var tabela = document.getElementById("tabelajogos")
    tabela.innerHTML = ""
    tabelajogos.innerHTML = iniciarTabela()
    for (let L = 0; L < listajogos.length; L++) {
        const jogo = listajogos[L];
        if (jogo.id == busca || jogo.timeMandante == busca || jogo.timeVisitante == busca || jogo.local == busca) {
            tabelajogos.innerHTML += criarlinhaJogos(jogo)
            cadastrarEventosLixeira()
            editar()

        } else if (busca == "") {
            tabela.innerHTML = ""
            tabela.innerHTML = iniciarTabela()
            tabela.innerHTML += criarlinhaJogos(jogo)
        }
    }
})

function realizarEclusao(id) {
    var header = {
        method: "DELETE"
    }
    fetch(url + id, header)
        .then(function (response) {
            return response.text()
        }).then(function (data) {
            console.log("excluido");
            atualizarTela(id)
        }).catch(function (data) {
            alert("erro")
        })
}

function cadastrarEventosLixeira() {
    var lixo = document.getElementsByClassName("lixeira")
    for (let i = 0; i < lixo.length; i++) {
        const e = lixo[i];
        e.addEventListener("click", function s(event) {
            var id = event.target.parentElement.children[0].innerText
            console.log(id)
            realizarEclusao(id)
        })

    }
}



function atualizarTela(id) {
    listajogos = listajogos.filter(p => p.id != id)
    var tabelajogos = document.getElementById("tabelajogos")
    tabelajogos.innerHTML = ""
    adicionarjogos(listajogos)

}

function adicionarjogos(jogos) {
    var tabelajogos = document.getElementById("tabelajogos")
    tabelajogos.innerHTML = iniciarTabela()
    for (let i = 0; i < jogos.length; i++) {
        const p = jogos[i];
        tabelajogos.innerHTML += criarlinhaJogos(p)

    }
    cadastrarEventosLixeira()
    editar()
}

var botao = document.getElementById("botaoAdicionar")
botao.addEventListener("click", function () {
    window.location.href = "adicionar.html"
})

fetch(url).then(function (response) {
    return response.json()
}).then(function (data) {
    listajogos = data
    adicionarjogos(data);

}).catch(function () {
    console.log("deu ruim!!!")
})


function iniciarTabela() {
    return `<div id="linhajogos">
    <p class="cabecalho">id</p>
    <p class="cabecalho">data</p>
    <p class="cabecalho">Time mandante</p>
    <p class="cabecalho">Time visitante</p>
    <p class="cabecalho">placar</p>
    <p class="cabecalho">local</p>
    <p class="cabecalho">atualizar</p>
    <p class="cabecalho">excluir</p>
</div>`;
}

function editar() {
    var editar = document.getElementsByClassName("editar");
    for (let i = 0; i < editar.length; i++) {
        const l = editar[i];
        l.addEventListener("click", function (event) {
            var id = event.target.parentElement.children[0].innerText;
            var data = event.target.parentElement.children[1].innerText;
            var timemandante = event.target.parentElement.children[2].innerText;
            var timevisitante = event.target.parentElement.children[3].innerText;
            var placar = event.target.parentElement.children[4].innerText;
            var local = event.target.parentElement.children[5].innerText;
            window.location.href = editarURL("adicionar.html", id, data, timemandante, timevisitante, placar, local);
        });
    }
}


function editarURL(url, id, data, timemandante, timevisitante, placar, local) {
    return url + '?id=' + id + '&data=' + data + '&timemandante=' + timemandante + '&timevisitante=' + timevisitante + '&placar=' + placar + '&local=' + local;
}



