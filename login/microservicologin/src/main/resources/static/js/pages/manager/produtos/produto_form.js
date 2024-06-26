/**
 * @apiNote Função responsável por validar os dados do produto
 * @param Json json
 * @returns String frase
 * 
 * @author Caio Freire, Gabriel Ambuzeiro e Rian Vitor
 * @Data Criação 03.05.2024
 */
function validarDados(json) {
    let frase='';
    if((json.nome==null) || ((json.nome.trim()).length<2))
        frase +='O campo nome não pode está com menos de 2 caracteres!<br>';
    if((json.descricao==null) ||  ((json.descricao.trim()).length==0))
        frase +='O campo descricao não pode está vazio!<br>';
    if((json.preco==null) ||  ((json.preco.trim()).length==0))
        frase +='O campo preco não pode está vazio!<br>';
    return frase;
}

/**
 * @apiNote Função responsável por salvar os dados do produto
 * 
 * @author Caio Freire, Gabriel Ambuzeiro e Rian Vitor
 * @Data Criação 03.05.2024
 */
async function salvar() {
    let json={'id':0, 'idProduto':0, 'nome':null, 'descricao':null, 'preco':null};
    json.idProduto=window.sessionStorage.getItem('idProduto');
    json.nome=jQuery('#id_nome').val();
    json.descricao=jQuery('#id_descricao option:selected').val();
    json.preco=jQuery('#id_preco').val();
    let frase = validarDados(json);
    if(frase=='') {
        let resposta = await alterarDadosDaTabela('/salvarproduto', json);
        if(resposta.id) {
            alert('Os dados do produto foram salvos com sucesso!');
            jQuery('#id_div_pagina').html('');
            jQuery('#id_div_pagina').load('/pages/manager/produto/produto_listar.html', function(statusTxt, xhr) {
                if(statusTxt == 'error')
                    alert('Error: ' + xhr.status + ': ' + xhr.statusText);
            });
        } else
            alert('Os dados do produto NÃO foram salvos!');
    } else
        alert(frase);
}

/**
 * @apiNote Função responsável por visualizar os dados do produto para alteração
 * 
 * @author Caio Freire, Gabriel Ambuzeiro e Rian Vitor
 * @Data Criação 03.05.2024
 */
function visualizarDados(produto) {
    jQuery('#id_nome').val(produto[0].nome);
    jQuery('#id_preco').val(produto[0].preco);
    if(produto[0].descricao) {
        jQuery('#id_descricao').find('option').each(function() {
            if(jQuery(this).val()==produto[0].descricao) {
                jQuery(this).prop('selected', true);
            }
        });
    }
    if(produto[0].preco) {
        jQuery('#id_descricao').find('option').each(function() {
            if(jQuery(this).val()==produto[0].preco) {
                jQuery(this).prop('selected', true);
            }
        });
    }
}

/**
 * @apiNote Função responsável por listar os produtos cadastrados
 * 
 * @author Caio Freire, Gabriel Ambuzeiro e Rian Vitor
 * @Data criação: 03.05.2024
 */
async function listarDados(id) {
	let json={'id':id};
	let produto = await listarDadosDaTabela('/buscarprodutoPorId', json); //Função presente no arquivo static/js/pages/util/listarDadosDaTabela.js
	if(produto.resposta)
		jQuery('#id_div_conteudo').html('<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center fw-bold">A busca, com os parâmetros passados, gerou uma lista vazia!</div>');
	else if((produto!=null) && (produto[0].id!=null)) {
		visualizarDados(produto);
    }
}

/**
 * @apiNote Função responsável por inicialiar esta arquivo
 * 
 * @author Caio Freire, Gabriel Ambuzeiro e Rian Vitor
 * @Data Criação: 28.04.2024
 */
jQuery(function() {
    let id = window.sessionStorage.getItem('idproduto');
    //alert('idproduto: '+window.sessionStorage.getItem('idproduto'));
    jQuery('#id_btn_cancelar').prop("disabled",true);
    if(id!=0) {
        jQuery('#id_btn_cancelar').prop("disabled",false);
	    listarDados(id);
    }
    jQuery('#id_btn_salvar').click(function() {
        salvar();
    });
    jQuery('#id_btn_cancelar').click(function() {
        window.sessionStorage.setItem('idproduto', 0);
        window.sessionStorage.setItem('idProdutoproduto', 0);
        jQuery('#id_div_pagina').html('');
        jQuery('#id_div_pagina').load('/pages/manager/produto/produto_listar.html', function(statusTxt, xhr) {
            if(statusTxt == 'error')
                alert('Error: ' + xhr.status + ': ' + xhr.statusText);
        });
    });
});