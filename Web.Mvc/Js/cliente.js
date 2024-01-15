$(function () {
    JsGetCliente();

    $("#btnCliente").on("click", function () {
        JsGetCliente($(this).val());
    });

    $("#AddCliente").click(function () {
        $('.tit-clienteId').html('');
        $("#ClienteId").val(0);
        $("#salvarCliente")[0].reset();
        $("#addModal").modal("show");
        $("#addModalLabel").html('Adicionar Novo Cliente');
    });



    Submit();
});

//$('#example2').on('click', '.btnUsuarios', function () {
//    var data = table.row($(this).parents('tr')).data();
//    openUsuariosModal(data.ClienteId);
//    console.log('Gerenciar usuários para o ID: ' + data.ClienteId);
//});




$('#btnSalvarCadastroUsuario').click(function () {
    var clienteId = clienteSelecionado.ClienteId;
    var nome = $('#usuarioNomeCadastro').val();
    var email = $('#usuarioEmailCadastro').val();
    var senha = $('#usuarioSenhaCadastro').val();

    SetUsuarioCliente(clienteId, nome, email, senha);
});

function openUsuariosModal(clienteId) {
    $('#cadastroUsuarioClienteModal').modal('show');
    loadUsuarios(clienteId); // Carrega a tabela de usuários ao abrir o modal
}

function SetUsuarioCliente(clienteId, nome, email, senha) {
    $.ajax({
        type: "POST",
        url: "/Cliente/JsSetUsuarioCliente",
        data: { ClienteId: clienteId, UsuarioClienteNome: nome, UsuarioClienteNomeEmail: email, UsuarioClienteSenha: senha },
        dataType: "json",
        success: function (data) {
            alert(data.mensagem);
            loadUsuarios(clienteId);
        },
        error: function (xhr, textStatus, errorThrown) {
            console.error("Erro na requisição Ajax:", errorThrown);
        }
    });
}



function loadUsuarios(clienteId) {
    var tableUsuarios = $('#tableUsuarios').DataTable({
        "processing": true,
        "destroy": true,
        "serverSide": true,
        "aaSorting": [[0, "desc"]],
        "ajax": {
            "url": "/Cliente/JsGetUsuarioCliente/",
            "type": 'POST',
            'dataType': 'json',
            "data": {
                ClienteId: clienteId
            }
        },
        "columns": [
         /*{0}*/ { "data": "UsuarioClienteId", "autoWidth": true },
         /*{1}*/ { "data": "UsuarioClienteNome", "autoWidth": true },
         /*{2}*/ { "data": "UsuarioClienteEmail", "autoWidth": true },
         /*{3}*/ { "data": "UsuarioClienteSenha", "autoWidth": true },
         /*{5}*/ { "data": "UsuarioClienteAtivo", "autoWidth": true },
         /*{5}*/ { "data": "UsuarioClienteDataCadastro", "autoWidth": true }
        ],
        "language": {
            "url": "/Js/Portuguese.json",
            "initComplete": function (settings, json) {

                //$('#example2').off()
                //    .on('click', '.btnDeletar', function () {

                //        alert();
                //        var clienteid = $(this).data('clienteid');

                //        DeleteCliente(clienteid);

                //    });

                //$('#example2').off()
                //    .on('click', '.btnEditar', function () {

                //        var clienteid = $(this).data('clienteid');
                //        //updateClienteSelecionado(data);
                //        openEditModal(clienteid);
                //        console.log('Editar cliente com ID: ' + clienteid);
                //    });

            }
        }
    });

}



function JsGetCliente(clienteId = 0) {
    var table = $('#example2').DataTable({
        "processing": true,
        "destroy": true,
        "serverSide": true,
        "aaSorting": [[0, "desc"]],
        "ajax": {
            "url": "/Cliente/JsGetCliente/",
            "type": 'POST',
            'dataType': 'json',
            "data": {
                ClienteId: clienteId
            }
        },
        "columnDefs": [
            {
                "render": function (data, type, row) {
                    return '<button class="btnEditar" data-clienteid="' + row.ClienteId + '" onclick="openEditModal(' + row.ClienteId + ')">Editar</button>' +
                        '<button type="button" class="btnDeletar" data-clienteid="' + row.ClienteId + '" onclick="DeleteCliente(' + row.ClienteId + ')">Deletar</button>';
                       
                },
                "targets": 5,
            }
        ],
        "columns": [
         /*{0}*/ { "data": "ClienteId", "autoWidth": true },
         /*{1}*/ { "data": "Nome", "autoWidth": true },
         /*{2}*/ { "data": "Email", "autoWidth": true },
         /*{3}*/ { "data": "Celular", "autoWidth": true },
         /*{4}*/ { "data": "Idade", "autoWidth": true },
         /*{5}*/ { "data": "ClienteId", "autoWidth": true },
        ],
        "language": {
            "url": "/Js/Portuguese.json",
            "initComplete": function (settings, json) {

                //$('#example2').off()
                //    .on('click', '.btnDeletar', function () {

                //        alert();
                //        var clienteid = $(this).data('clienteid');

                //        DeleteCliente(clienteid);

                //    });

                //$('#example2').off()
                //    .on('click', '.btnEditar', function () {

                //        var clienteid = $(this).data('clienteid');
                //        //updateClienteSelecionado(data);
                //        openEditModal(clienteid);
                //        console.log('Editar cliente com ID: ' + clienteid);
                //    });

            }
        }
    });

}

function DeleteCliente(clienteid) {
    var confirmDelete = confirm('Tem certeza que deseja deletar o cliente com ID ' + clienteid + '?');

    if (confirmDelete) {
        $.ajax({
            type: "POST",
            url: "/Cliente/JsDeleteCliente",
            data: { ClienteId: clienteid },
            dataType: "json",
            success: function (response) {
                alert(response.mensagem);
                JsGetCliente();
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error("Erro na requisição Ajax:", errorThrown);
            }
        });
    }
}


var clienteSelecionado = {
    ClienteId: 0,
    Nome: '',
    Email: '',
    Celular: '',
    Idade: 0
};





function updateClienteSelecionado(data) {
    clienteSelecionado.ClienteId = data.ClienteId;
    clienteSelecionado.Nome = data.Nome;
    clienteSelecionado.Email = data.Email;
    clienteSelecionado.Celular = data.Celular;
    clienteSelecionado.Idade = data.Idade;
}









function openEditModal(clienteId) {

    console.log('Chamando openEditModal com:', clienteId);
    $.ajax({
        type: "POST",
        url: "/Cliente/JsGetCliente/",
        data: { ClienteId: clienteId },
        dataType: "json",
        success: function (result) {

            var item = result.data[0];
            console.log(item);
            $('#addModal').modal('show');
            $('.tit-clienteId').html('ID: ' + clienteId);

            $("#addModalLabel").html('Editar Cliente');
            $('#ClienteId').val(clienteId).prop('readonly', true);


            $('#Nome').val(item.Nome);
            $('#Email').val(item.Email);
            $('#Celular').val(item.Celular);
            $('#Idade').val(item.Idade);

            //NESSA PARTE DO CODIGO EU GOSTARIA QUE ELE TAMBÉM DIRECIONASSE OS OUTROS DADOS DO CLIENTE SOLICITADO PRA DENTRO DO FORM PARA PREENCHER AUTOMATICAMENTE O FORM.

        },
        error: function (xhr, textStatus, errorThrown) {
            console.error("Erro na requisição Ajax:", errorThrown);
        }
    });
}





function Submit() {
    $("#salvarCliente").submit(function (event) {
        event.preventDefault(); // Impede o comportamento padrão do formulário (recarregar a página)

        var formData = $(this).serialize(); // Serializa o formulário

        $.ajax({
            type: "POST",
            url: "/Cliente/JsSetCliente", // Substitua "Controller" pelo nome real do seu controlador
            data: formData, // Use os dados serializados do formulário
            dataType: "json",
            success: function (data) {
                alert(data.mensagem);
                $('.blocker').hide();
                $('#addmodal').hide();
                JsGetCliente(0);

                // Fechar a página atual
                window.close();
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error("Erro na requisição Ajax:", errorThrown);
            }
        });
    });
}




    function voltarParaPagina() {
        $('#addModal').modal('hide');
    window.history.back();
    }