var codigosP = "";
var myModal = new bootstrap.Modal(document.getElementById('modalFoto'));


// Funções de evento

document.addEventListener("DOMContentLoaded", function(event) {
    $("#showOnPrint").hide()



});

document.getElementById("fecharModal").addEventListener("click", afterImageCopy);

document.getElementById("fecharModal1").addEventListener("click", afterImageCopy);



window.addEventListener('afterprint', (event) => {
    $("#codigoPenal input:checkbox:not(:checked)").show()
    $("#showOnPrint").hide()
    $("#hideOnPrint").show()
    codigosP = "";
    $("#codigoPenal").show()

    $("#ddsRG").text("")
    $("#ddsNome").text("")
    $("#ddsTel").text("")
    $("#infoAuto").find("p").remove()
    $("#ddsTrab").text("")
    $("#infoRelato").text("")
    $("#infoDefesa").text("")
    $("#tableArtigos").each(function(key, element) {
        $(element).find("tr").remove()
    })
    $("#codigoPenal input:checkbox:checked").each(function(key, element) {
        $(element).prop("checked", true);
    })
    $("#rgPessoa").val("")
    $("#nomePessoa").val("")
    $("#telefonePessoa").val("")
    $("#trabalhoPessoa").val("")
    $("#relatoPrisao").val("")
    $("#defesaReu").val("")

});



function afterImageCopy() {

    $("#codigoPenal input:checkbox:not(:checked)").show()
    $("#showOnPrint").hide()
    $("#hideOnPrint").show()
    codigosP = "";
    $("#codigoPenal").show()

    $("#ddsRG").text("")
    $("#ddsNome").text("")
    $("#ddsTel").text("")
    $("#infoAuto").find("p").remove()
    $("#ddsTrab").text("")
    $("#infoRelato").text("")
    $("#infoDefesa").text("")
    $("#tableArtigos").each(function(key, element) {
        $(element).find("tr").remove()
    })
    $("#codigoPenal input:checkbox:checked").each(function(key, element) {
        $(element).prop("checked", false);
    })
    $("#rgPessoa").val("")
    $("#nomePessoa").val("")
    $("#telefonePessoa").val("")
    $("#trabalhoPessoa").val("")
    $("#relatoPrisao").val("")
    $("#defesaReu").val("")
    $("#fotoPrisao").find("canvas").remove();
    $(".navbar").show();
}

function elaboraApf() {
    window.scrollTo(0, 0)
    if ($("#defesaReu").val().length != 0 && $("#rgPessoa").val().length != 0 && $("#nomePessoa").val().length != 0 && $("#telefonePessoa").val().length != 0 && $("#trabalhoPessoa").val().length != 0 && $("#relatoPrisao").val().length != 0 && $("#respPrisao").val() != "") {
        if ($("#codigoPenal input:checkbox:checked").length != 0) {

            $("#ddsRG").text($("#rgPessoa").val().toUpperCase())
            $("#ddsNome").text($("#nomePessoa").val().toUpperCase())
            $("#ddsTel").text($("#telefonePessoa").val().toUpperCase())
            $("#ddsTrab").text($("#trabalhoPessoa").val().toUpperCase())
            $("#infoRelato").text($("#relatoPrisao").val().toUpperCase())
            $("#infoDefesa").text($("#defesaReu").val().toUpperCase())
            $("#hideOnPrint").hide()
            $("#showOnPrint").show()
            $("#codigoPenal").hide()
            $("#assinaturaResp").text($("#respPrisao").val())
            $(".navbar").hide();
            var tempo = 0;
            $("#codigoPenal input:checkbox:checked").each(function(key, element) {
                codigosP += $(element).parent().find(".form-check-label").text().trim() + ", ";
                console.log(parseInt("" + element.value))
                tempo = tempo + parseInt("" + element.value)
                $("#tableArtigos").append(` <tr>
                    <th scope="row">${key + 1}</th>
                    <td>${$(element).parent().find(".form-check-label").text()}</td>
                    <td>${element.value} Minutos</td>
                </tr>`)

            });
            $("#infoAuto").append(`<p class="text-justify">Qual noticia o recolhimento de <b>${$("#nomePessoa").val().toUpperCase()}</b> de RG: <b>${$("#rgPessoa").val().toUpperCase()}</b>  caracterizando-se o estado de flagrância previsto nos artigos <b>${codigosP.toUpperCase()}</b>  do Código de Processo Penal, No mesmo auto representa a autoridade policial pela decretação da prisão preventiva do autuado, ou caso assim não se entenda pela decretação de sua prisão temporária.</p><p class="text-justify">Diante do exposto, HOMOLOGO o presente o auto de prisão em flagrante e <b>DECRETO A PRISÃO TEMPORÁRIA de ${$("#nomePessoa").val().toUpperCase()}</b> pelo prazo de ${tempo} minutos, findo o qual em não havendo prorrogação, deverá ser posto imediatamente em liberdade, independentemente de alvará, salvo se por outro motivo deva permanecer custodiado.</p>`)

            html2canvas(document.getElementById("container"), {
                allowTaint: true,
                scrollY: -window.scrollY
            }).then(canvas => {
                document.getElementById("fotoPrisao").appendChild(canvas)
            });
            myModal.show()
        } else {
            toastr["warning"]("Esqueceu de colocar os artigos", "Opa...")
        }

    } else {
        toastr["warning"]("Algum campo está vazio", "Opa...")
    }

}