/**
 * @apiNote Função responsável por listar os usuários cadastrados
 * 
 * @author Caio Freire, Gabriel Ambuzeiro e Rian Vitor
 * @Data criação: 12.04.2024
 */
async function listarDados() {
	let json={'nome': null, 'descricao': null, 'preco': null};
	if(jQuery('#id_nome').val()!='')
		json.nome=jQuery('#id_nome').val();
	if(jQuery('#id_descricao option:selected').val()!='T')
		json.descricao=jQuery('#id_descricao option:selected').val();
	if(jQuery('#id_preco').val()!='')
		json.preco=jQuery('#id_preco').val();
	jQuery('#id_div_conteudo').html('');
	let lista = await listarDadosDaTabela('/listarProduto', json); //Função presente no arquivo static/js/pages/util/listarDadosDaTabela.js
	if(lista.resposta)
		jQuery('#id_div_conteudo').html('<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center fw-bold">A busca, com os parâmetros passados, gerou uma lista vazia!</div>');
	else if((lista.length>0) && (lista[0].id!=0))
		visualizarDados(lista); //Função presente no arquivo usuario_visualiza_dados.js
}

/**
 * @apiNote Função responsável por inicialiar esta arquivo
 * 
 * @author Caio Freire, Gabriel Ambuzeiro e Rian Vitor
 * @Data Criação: 06.04.2024 / 15.04.2024
 */
jQuery(function() {
	listarDados();
	jQuery('#id_btn_buscar').click( function() {
		listarDados();
	});
});