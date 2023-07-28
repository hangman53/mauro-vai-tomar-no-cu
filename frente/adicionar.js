
const URL = "http://localhost:3001/jogos/";

var idJogo = null;
lerParametros();

function lerParametros() {
    const urlParams = new URLSearchParams(window.location.search);
    idJogo = urlParams.get("id");
    var data = urlParams.get("data");
    var timeMandante = urlParams.get("timeMandante");
    var timeVisitante = urlParams.get("timeVisitante");
    var placar = urlParams.get("placar");
    var local = urlParams.get("local");

    document.getElementById("data").value = data;
    document.getElementById("timeMandante").value = timeMandante;
    document.getElementById("timeVisitante").value = timeVisitante;
    document.getElementById("placar").value = placar;
    document.getElementById("local").value = local;

    var botaoAdicionar = document.getElementById("botaoAdicionar");
    botaoAdicionar.addEventListener("click", function () {
        var data = document.getElementById("data").value;
        var timeMandante = document.getElementById("timeMandante").value;
        var timeVisitante = document.getElementById("timeVisitante").value;
        var placar = document.getElementById("placar").value;
        var local = document.getElementById("local").value;

        if (idJogo != null) {
            enviaPUT(idJogo, data, timeMandante, timeVisitante, placar, local);
        } else {
            enviaPOST(data, timeMandante, timeVisitante, placar, local);
        }
    });
} 

function enviaPUT(id, data, timeMandante, timeVisitante, placar, local) {
    var header = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            data: data,
            timeMandante: timeMandante,
            timeVisitante: timeVisitante,
            placar: placar,
            local: local
        })
    };

    fetch(URL+id,header)
    .then(function(response){
        return response.json()
    }).then(function(data){
        window.location.href = 'index.html';
    }).catch(function(){
        var mensagemErro = document.getElementById("erro")
        mensagemErro.style.display = "visible"
    })
}


function enviaPOST(data, timeMandante, timeVisitante, placar, local) {
    var header = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            data: data,
            timeMandante: timeMandante,
            timeVisitante: timeVisitante,
            placar: placar,
            local: local
        })
    };

    fetch(URL, header)
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Erro ao realizar a requisição POST");
            }
            window.location.href = 'index.html';
        })
        .catch(function () {
            var mensagemErro = document.getElementById("erro");
            mensagemErro.style.display = "visible";
        });
}
