function outputFilter(str){
	str = str.replaceAll('"','--||aspasDupla||--');
	str = str.replaceAll("'",'--||aspasSimples||--');
	str = str.replaceAll('+','--||mais||--');
	str = str.replaceAll('&','--||amperSand||--');
	return str;
	}

function gifLoader(id){
	loader = " <style>	.loader { border: solid 5px #e6e8ea; /* borda(fundo) */ border-top: 5px solid #1E90FF; /* cor principal */ border-radius: 50%; width: 60px; height: 60px; 	animation: spin 1.5s linear infinite; } @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } } </style><div style='margin-top:25px;margin-left:41.5%;width:17%;'><div class='loader' ></div></div>";
	$('#'+id).html(loader);
	}
function gifLoaderV2(id,tamanho,espessura,corDeFundo,corPrincipal,velocidade){
	$.ajax({
		url: $('#caminhoBase').text()+'/api/',type:'POST',async:true,data: 'metodo=gifLoaderV2&tamanho='+tamanho+'&espessura='+espessura+'&corDeFundo='+corDeFundo+'&corPrincipal='+corPrincipal+'&velocidade='+velocidade,dataType:'html',
		success: function(resposta){ resposta = resposta.trim();
			$('#'+id).html(resposta);
			}
		});
	return;
	}
	
function copiarCodigoV2(id,texto1,texto2){
	conteudo = $('#'+id).text();
	if(conteudo=='' || conteudo=='undefined'){
		conteudo = $('#'+id).val();
		}
	navigator.clipboard.writeText(conteudo);
	$('#botaoCopiar'+id).text(texto1);
	setTimeout(function(){
		$('#botaoCopiar'+id).text(texto2);
		},1000);
	return;
	}
function modalPedido(id,header){
	var display = $('#'+id).css('display');
	if(display=='block'){
		$('#'+id).css('display','none');
		$('body').css('overflow','auto');
		}else{
			v = document.getElementById('body').getBoundingClientRect();
			altura = v['y'];
			altura = altura.toString();
			altura = parseInt(altura);
			///altura = altura-70;
			altura = altura.toString();
			altura = altura.replaceAll('-','');
			$('#'+id).css('height','102vh');
			$('#'+id).css('margin-top',altura+'px');
			
			$('#'+id).css('display','block');
			$('body').css('overflow','hidden');
			}	
	return;
	}
function imprimirBoleto(id){
	window.open($('#'+id).attr('data-boleto'),'_blank');
	return;
	}
function getStr(inicio,fim,string){
	str = string.split(inicio);
	str = str[1];
	str = str.split(fim);
	str = str[0];
	return str; 
	}
function qualdispositivo(){
	largura = window.screen.width;
	altura = window.screen.height;
	if(largura>altura){
		dispositivo = 'desktop';
		}else{
			dispositivo = 'mobile';
			}
	return dispositivo;		
	}
function online(local){
	largura = window.screen.width;
	altura = window.screen.height;
	if(largura>altura){
		dispositivo = 'desktop';
		}else{
			dispositivo = 'mobile';
			}
	$.ajax({
		url: $('#caminhoBase').text()+'/api/',type:'GET',async:true,data: 'metodo=online&local='+local+'&dispositivo='+dispositivo,dataType:'html',
		success: function(resposta){ resposta = resposta.trim();
			}});
	return;
	}
function setcookie(cookie_,conteudo){
	document.cookie = cookie_+'='+conteudo+';path=/;';
	return;
	}
function getcookie(c){
	retorno = 'null';
	cookies = decodeURIComponent(document.cookie);
	if(cookies.includes(c+'=')){
		retorno = getStr(c+'=',';',cookies);
		}
	return retorno;
	}
function deleteAllCookies(){
	var c = document.cookie.split("; ");
	for(i in c){
		document.cookie =/^[^=]+/.exec(c[i])[0]+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT";    
		}
return;
}

//u
function abrirMenu(){
	$('#campoMenu').show();
	$('#campoFecharMenu').css('background-color','rgba(0,0,0,0.3)');
	$('#campoMenu2').animate({'left':'0'},500);
	window.scrollTo(0,0);
	setTimeout(function(){	document.documentElement.style.overflow = 'hidden'; },250);
	return;
	}
function fecharMenu(){
	$('#campoFecharMenu').css('background-color','rgba(0,0,0,0)');
	$('#campoMenu2').animate({'left':'-100vw'},500);
	$('#campoMenu').hide(800);
	window.scrollTo(0,0);
	setTimeout(function(){	document.documentElement.style.overflow = 'scroll'; },250);
	return;
	}
	
	
function irParaCarrinho(){
	setTimeout(function(){
		window.location.href = $('#caminhoAtual').text()+'/carrinho';
		},200);
	return;
	}
function irParaProduto(link){
	window.location.href = link;
	return;
	}
function irAoInicio(){
	window.location.href = $('#caminhoAtual').text()+'/inicio';
	return;
	}	
function irParaMinhaConta(){
	setcookie('destino','minhaconta');
	window.location.href = $('#caminhoAtual').text()+'/minhaconta';
	return;
	}	
	
function alterarVariação(tipo,variação,destino,fullid){
	$.ajax({
		url: $('#caminhoBase').text()+'/api/',type: "GET",async: true,data: "metodo=alterarVariação&fullid="+fullid+"&tipo="+tipo+"&variação="+variação,dataType: "html",
		success: function(resposta){ resposta = resposta.trim();	
			if(destino.length>5){
				window.location.href = destino;
				}else{
					$('#'+tipo+'Atual').text(variação);
					$('#'+tipo+'Variação').text(variação);
					for(c=0;c<10;c++){
						if(c==destino){
							$('#'+tipo+destino).css('border-color','#222');
							}else{
								$('#'+tipo+c).css('border-color','#e7e7e7');
								}
						}
					}
			}
		});
	return;
	}

function alterarcor(fullid){
	cor = $('#cor'+fullid).val();
	if(cor.length==0){ 
		cor = $('#cor'+fullid).text();
		}
	$.ajax({
		url: $('#caminhoBase').text()+'/api/',type: "GET",async: true,data: "metodo=alterarcor&fullid="+fullid+"&cor="+cor,dataType: "html",
		success: function(resposta){ resposta = resposta.trim();	
			}
		});
	return;
	}
function alterartamanho(fullid){
	tamanho = $('#tamanho'+fullid).val();
	if(tamanho.length==0){ 
		tamanho = $('#tamanho'+fullid).text();
		}
	$.ajax({
		url: $('#caminhoBase').text()+'/api/',type: "GET",async: true,data: "metodo=alterartamanho&fullid="+fullid+"&tamanho="+tamanho,dataType: "html",
		success: function(resposta){ resposta = resposta.trim();	
			}
		});
	return;
	}
function alterarvoltagem(fullid){
	voltagem = $('#voltagem'+fullid).val();
	if(voltagem.length==0){ 
		voltagem = $('#voltagem'+fullid).text();
		}
	$.ajax({
		url: $('#caminhoBase').text()+'/api/',type: "GET",async: true,data: "metodo=alterarvoltagem&fullid="+fullid+"&voltagem="+voltagem,dataType: "html",
		success: function(resposta){ resposta = resposta.trim();	
			}
		});
	return;
	}		
function alterarquantidade(fullid){
	quantidade = $('#quantidade'+fullid).text();
	if(quantidade.length==0){ 
		quantidade = $('#quantidade'+fullid).text();
		}	
	$.ajax({
		url: $('#caminhoBase').text()+'/api/',type: "GET",async: true,data: "metodo=alterarquantidade&fullid="+fullid+"&quantidade="+quantidade,dataType: "html",
		success: function(resposta){ resposta = resposta.trim();	
			if(getcookie('paginaAtual')=='carrinho'){
				location.reload(true);
				}
			}
		});
	return;
	}
function numeroDoPedido(){
	$.ajax({
		url: $('#caminhoBase').text()+'/api/',type: "POST",async: true,data: 'metodo=numeroDoPedido',dataType: "html",
		success: function(resposta){ resposta = resposta.trim();	
			setcookie('numeroDoPedido',resposta);
			$('.numeroDoPedido').text(resposta);
			}
		});
	return;
	}
function buscar(busca,tipo){
	setcookie('tipoDePesquisa',tipo);
	setcookie('busca',busca);
	if(tipo=='pesquisa'){
		busca = $('#campoPesquisa').val();
		setcookie('appendPesquisa','não');
		}
	$.ajax({
		url: $('#caminhoBase').text()+'/api/',type: "POST",async: true,data: 'metodo=configurarPaginação&tipoDeBusca='+tipo+'&busca='+busca,dataType: "html",
		success: function(resposta){ resposta = resposta.trim();	
			location.href = $('#caminhoAtual').text()+'/buscar';
			}
		});	
	return;
	}
function avaliação(id,fullid,tipo){
	corLike = $('#corLike').text();
	corUnlike = $('#corUnlike').text();
	
	botaoLike = $('#botaoLike'+id).css('color');
	botaoUnlike = $('#botaoUnlike'+id).css('color');
	
	likes = $('#likes'+id).text();
	unlikes = $('#unlikes'+id).text();

	$.ajax({
		url: $('#caminhoBase').text()+'/api/',type: "POST",async: true,data: 'metodo=avaliação&id='+id+'&fullid='+fullid+'&tipo='+tipo+'&corLike='+corLike+'&corUnlike='+corUnlike+'&botaoLike='+botaoLike+'&botaoUnlike='+botaoUnlike+'&likes='+likes+'&unlikes='+unlikes,dataType: "html",
		success: function(resposta){ resposta = resposta.trim();	
			/* console.log(resposta); */
			resposta = resposta.split('|');
			$('#likes'+id).text(resposta[0]);
			//$('#unlikes'+id).text(resposta[1]);
			$('#botaoLike'+id).css('color',resposta[2]);
			$('#botaoUnlike'+id).css('color',resposta[3]);
			}
		});
	return;
	}
//ADICIONAR AO CARRINHO
function adicionarAoCarrinho(fullid){
	cor = $('#corAtual').text();
	tamanho = $('#tamanhoAtual').text();
	voltagem = $('#voltagemAtual').text();
	sabor = $('#saborAtual').text();

	quantidade = $('#quantidade'+fullid).text();	
		
	$('.botaoanimado').animate({'margin-left':'0'},3000);

	$.ajax({
		url: $('#caminhoBase').text()+'/api/',type: "GET",async: true,data: "metodo=adicionarAoCarrinho&fullid="+fullid+'&cor='+cor+'&tamanho='+tamanho+'&voltagem='+voltagem+'&sabor='+sabor+'&quantidade='+quantidade,dataType: "html",
		success: function(resposta){ resposta = resposta.trim();	console.log($('#caminhoAtual').text());
			setTimeout(function(){
				$('.botaoanimado').animate({'margin-left':'-100%'},0);
				window.location.href = $('#caminhoAtual').text()+'/carrinho';
				},1500);
			}
		});
	return;
	}	
//QUANTIDADES
function menos(fullid){
	quantidade = $('#quantidade'+fullid).text();
	if(quantidade==1){
		return;
		}
	quantidade--;
	$('#quantidade'+fullid).text(quantidade);
	alterarQuantidade(fullid);
	}
function mais(fullid){
	quantidade = $('#quantidade'+fullid).text();
	quantidadeEstoque = $('#quantidadeEstoque'+fullid).text();
	if(quantidade==quantidadeEstoque){
		return;
		}
	quantidade++;
	$('#quantidade'+fullid).text(quantidade);
	alterarQuantidade(fullid);
	}
function alterarQuantidade(fullid){
	quantidade = $('#quantidade'+fullid).text();
	$.ajax({
		url: $('#caminhoBase').text()+'/api/',type: "GET",async: true,data: "metodo=alterarquantidade&fullid="+fullid+"&quantidade="+quantidade,dataType: "html",
		success: function(resposta){ resposta = resposta.trim();
			if(getcookie('paginaAtual')=='carrinho'){ location.reload(true); }
			}
		});
	}
function buscarIcone(tipo,qual){
	if(tipo=='banco'){
		if(qual=='santander'){ retorno = 'https://lh3.googleusercontent.com/pw/AMWts8BUbnvk_uauK5fwxnCFYjD3UEM2q4tE6Duxd-rHDGi6JE202EMBpMVZepZAey5oDONx8iL92RTicfQ5wUeUvRcr0Rs8pedpwEWj1bPF_C1_WtCJwb80BUUCMKS_gkQ9b8Mn2mR13VWEZs7NqET_IHM=s224-no?authuser=0'; }else 
		if(qual=='itau'){ retorno = 'https://lh3.googleusercontent.com/pw/AMWts8DvDufXaLsfi776sHfOHTPlIsXE3u9FqiTrfU9IDAEVvDQ2fg56qNwaRLEis6xd6cUgfmlK0T-rfx_EE6kwF6xyLAOIjAjnFxsd8byZiWdJo3u72xxlbZchj1EVtZOxwp-7v955Sdbw_JSlQQdkkcU=w685-h693-no?authuser=0'; }else 
		if(qual=='bradesco'){ retorno = 'https://lh3.googleusercontent.com/pw/AMWts8AaJAT1Jh9InST45jSf35UCyuGHySclzI9Uzfwxd8byMNJ1BgxkUpgK2IGTb7L6em9PiI2HCOKY8zhTL8bAgZij3V4JrFBLbq8bKuIA0mgvbC--sZESq5QgB_U1fTmJZhb_6VNhpOlbV7EfX2RF5zw=w831-h693-no?authuser=0'; }else 
		if(qual=='caixa'){ retorno = 'https://lh3.googleusercontent.com/pw/AMWts8B7js7efJ5DFH5IljzBXr67mAxdzwP6zk1_tsthxGnfB5atugQSaZnyGxVV0O7hrU6VuRhqd26LkSiFidN_KnwCZgvdkKz2IqdBkSwkDdSYNB-XcLSFvXVoPaRzcVEBCX2zeqofhZ7Kyr4llIJajig=w836-h693-no?authuser=0'; }else 
		if(qual=='hipercard'){ retorno = 'https://lh3.googleusercontent.com/pw/AMWts8CNSgyFyWvQx-QWFvgFBy0NuJZ6EPqUOG_EdOvlYxoC69FG0S1JlZ4MWVbxUFis3PoDyRqQEnFj8wabkDC3kL1UW5bm6ReapgKAKFX2EXK0D6zLasIbHmZbmPeFge9LdTH5r_qn6sH7b2ZTUhBKxNdp=w515-h511-no?authuser=0'; }else 
		if(qual=='bb'){ retorno = 'https://lh3.googleusercontent.com/pw/AMWts8Bawp9-AhhUC9zb0MFM_WLDwFZsH42UiIBPmAE2CLGad6pWfndV7XztJx0Zntf7oxbdMPaUjTOxgT9c0BFsFpJypewSH6DHAcekAM6dNXWddUlog0Zw_J2YDSlM8yUID3vrGe0Q8M_PufAwMehqSRY=w142-h141-no?authuser=0'; }else 
		if(qual=='portoseguro'){ retorno = 'https://lh3.googleusercontent.com/pw/AMWts8CDN4Cr5Ny78QWzfCqkCPTExKImNEnCAoJx7GwZMdhgEOBvdSRBPxzj5_kOsnsDYwhQ-siEcwQoypqd23e6GGBGpBKRX0e_vI6S7t0ykdKM3cJr2CVZss1SCzX58nEukc9dggP8eXu3gA-G4SJeOo4=w234-h300-no?authuser=0'; }else 
		if(qual=='midway'){ retorno = 'https://lh3.googleusercontent.com/pw/AMWts8BjR6C0k_cfJ9IzIfRsmhBS6sjJJpgmpGgo6l2aerJ0BWfyg073GD-OCMGlKRfWrkpeejZoBqhlFb_6rmVPrQKvjzNLCCO79elAJtUkQUeGxw-WhYe0vHBB598DhgudaQuEzunUU8Rr5ZxputfP7p7r=s512-no?authuser=0'; }else 
		if(qual=='renner'){ retorno = 'https://lh3.googleusercontent.com/pw/AMWts8A_iqgKicMvMl_N6XPnpAI5Sfl0oldTyzh38cCGHrc5_odP6-UxRUsdhMjTUi0sfcp4ier041_e9Yq0QKlRk_0eWfsyaEs78onRfd5_gD0zbCSkbd6aVwB1A4vz_iq43hiLEbVadKNL06b4k2mKCUA=w202-h250-no?authuser=0'; }else 
		if(qual=='carrefour'){ retorno = 'https://lh3.googleusercontent.com/pw/AMWts8AMoSWJN6qalEQnTUvjxe-1C_I1lPfdkR1QIpRGfgpd4a7b7ihlDiCMjlwnKzfO3vCOMo4V-BN4kKx-QGnnJHVcXln0SzyH0Fu4GJ71dZh_xZJEooJ_2G2Uvoa8G6cjdCtLsZZCIlzXgRmmB-IsXUo=w865-h693-no?authuser=0'; }else 
		if(qual=='hsbc'){ retorno = 'https://lh3.googleusercontent.com/pw/AMWts8AWQPBpm0r832HwSwAtMSHHFQuyviQe_iTzpSkQzlVqdPJqWcHJXXcDmW6ZFPe9ZNO4uIPTUlTcGwQ-Zx3ENQxb_3EeBZQg6oYBNy8pQHtfsMQttWhAUrJM4aft7q3ge2ZepoSQGjuB46i2yp7Ny6c=w244-h206-no?authuser=0'; }else 
		if(qual=='votorantim'){ retorno = 'https://lh3.googleusercontent.com/pw/AMWts8B-xputcbtlhnaNasR-X1vN36rG9XQq1D5Q3zrLDUMJ3cK0HJNG-tUuzpjZoNfUDRw3AOHpVORW5Zg0bmMKJdzcCuGH88M-LZN6q1aJx4VFbJIWwT2TuhQagSIPo_O2a6PyH2Qb7cb4zNFemV4UsOw=w300-h240-no?authuser=0'; }else 
		if(qual=='cetelem'){ retorno = 'https://lh3.googleusercontent.com/pw/AMWts8BG5SAfD6CeDi04jnU7UrJcj2gJXZlR5nT7hbbECcEv8szmGNmG1XAZkEJuGZDjQuKWX8zEMnvmZU04lJB1Q9cPFRZ3dk-ozR_p6qg-8pqjQciAtjvraOnYDoemR4joYYsMF3kyHeQGIFPkSYNRAKY=w366-h105-no?authuser=0'; }else 
		if(qual=='sicredi'){ retorno = 'https://lh3.googleusercontent.com/pw/AMWts8CLYq1P38Dh69GwS797g0MGwqZR_0cmyXYIEblBgGSb5xNM8sE_TSVs2GgezHLh69ptE2N8r41o-j2VT-JcmgHPtNjYEQKyEspLWtWQb_UpxPTbPp810QPtznpqjQ145cFG3LQRIJzU2Bdxujvh3zE=w900-h285-no?authuser=0'; }else 
		if(qual=='nubank'){ retorno = 'https://lh3.googleusercontent.com/pw/AMWts8DvDEUH7QNJZFnvDT89tJ5PreV0kp-UyHFCj4-WjUH_5OtDUvbs_PoUKsrjIUWgC7QS-Y-DAW9asw4BnvWF3oxHntkQNNqHr-M4BHC7ftTfy2bwbl_bnNZxS15Q8tCxBHGw2mIexRo6Oo8d9qQmfps=s400-no?authuser=0'; }else 
		if(qual=='brb'){ retorno = 'https://lh3.googleusercontent.com/pw/AMWts8BfisXWU4u_uTqZk-OsfH4uYIk1lfY-LLVpnt73_D8RiHo0_BDtoFDlytMyaoo26EpolySzGRaywKapZm6PC-hj4bHC5WWVWRzKmRuVcUBFSfdHON3Xg6K51QNp5mXjPO12iNYOfTUaXjfBePg_qjI=s225-no?authuser=0'; }
		}else 
	if(tipo=='bandeira'){
		if(qual=='mastercard'){ retorno = 'https://lh3.googleusercontent.com/pw/AMWts8CNNpHe9mjvcQodDdwBSlsKrClRPmXyYaESATkKS2cEcx_9P54tiD5HHptw6Zfvj-gmLog6o_sk8f2RtZwwkZsH7ihx0XE0DPKHQ0thPaSRdm2Aam6m1-MDDRC5htxOlZQJIjOz6GuVFjJBI_0lLyh2=w891-h693-no?authuser=0'; }else 
		if(qual=='visa'){ retorno = 'https://lh3.googleusercontent.com/pw/AMWts8CM1tEAg1YlC4u30HfTUih-Cmpc6P3k5MQdR-ijoWFhvnk4VtbnhSbf2WlXaxRsCSeHJaHxw8zGAo7NLycYgv2uIqVSgjcbt5aAo3ZrT07YeKFDBDEDTuJkRq6CGlqft4OsP2wFxLEL59fKBEqKLxIo=w250-h149-no?authuser=0'; }else
		if(qual=='elo'){ retorno = 'https://lh3.googleusercontent.com/pw/AMWts8DFf-UtWemMoqEP6zlJT2jJUMhdqvagXqasBv5GTv0hHP6PNGfrCqk9xaafHRByElco-_HQZ81c80SO6VMnYPcvr_0bjWQjnx6opgXeZkgWglE7EJrC2bM_pl9mHqepUTnxWeFYTBhmFM0t5vGVTrC0=w250-h149-no?authuser=0'; }else 
		if(qual=='amex'){ retorno = 'https://lh3.googleusercontent.com/pw/AMWts8ARChdQdd36aHwd2sHykEM38UhG0Et55icCv-cpcJ69KltP2aBkemS0gab5IbLLKPPiwPskpWZBT-5wn2UJtb3O24H1bfePX4kO2CBIr7GfxZn4lVzWL7l8uZTor_X4nH2J7d4hvWt7aq5PGI37aJqG=w250-h149-no?authuser=0'; }else 
		if(qual=='dinersclub'){ retorno = 'https://lh3.googleusercontent.com/pw/AMWts8Cptpc6XmMdhNxUgr4CEexzD9JtRjdrvYvzr8J8AIs0swdG59lGw1y71fQ08VhQpqAthZyk1Sb8DO2kOHBhrccgmUbU610bUjTfV-iC1I3lrfwv-kOusZGIr_vWVrBeNn3pp8anVUE_1FZL2otJj98O=w250-h149-no?authuser=0'; }
		}

	return retorno;
	}

function moverCarrossel(carrossel,direção){
	if(direção=='direita'){
		leftPos = $('#carrossel_'+carrossel).scrollLeft();
		$('#carrossel_'+carrossel).animate({scrollLeft: leftPos + 350}, 250);
		setTimeout(function(){
			if($('#carrossel_'+carrossel)[0].scrollLeft!=0){
				$('#botaoEsquerda_'+carrossel).show();
				}
			if($('#carrossel_'+carrossel)[0].scrollLeft+$('#carrossel_'+carrossel)[0].offsetWidth==$('#carrossel_'+carrossel)[0].scrollWidth) {
				$('#botaoDireita_'+carrossel).hide();
				} 
			},300);	
		}else 
	if(direção=='esquerda'){
		leftPos = $('#carrossel_'+carrossel).scrollLeft();
		$('#carrossel_'+carrossel).animate({scrollLeft: leftPos - 350}, 250);
		setTimeout(function(){
			if($('#carrossel_'+carrossel)[0].scrollLeft!=0){
				$('#botaoDireita_'+carrossel).show();
				}
			if($('#carrossel_'+carrossel)[0].scrollLeft==0){
				$('#botaoEsquerda_'+carrossel).hide();
				}
			},300);	
		}
	return;
	}
function clickItem(destino){
	if(destino.includes('=>')){
		destino = destino.split('=>');
		tipo = destino[0];
		qual = destino[1];
		buscar(qual,tipo);
		}else{
			location.href = destino;
			}
	return;
	}
//MASCARAS
function mascaraNomeCompleto(id,erroId){
	nome = $('#'+id).val();
	if(nome.includes(' ')){
		nome = nome.split(' ');
		if(nome[1].length>1){
			$('#'+erroId).html('&nbsp;');
			}
		}
	return;
	}
function mascaraCpf(id,erroId,proximoId){
	cpf = $('#'+id).val();
	cpf = cpf.replace(/[^a-z0-9]/gi,'');
	cpf = cpf.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
	if(cpf.length<11){$('#'+erroId).html('&nbsp;');}
	if(cpf.length==4){
		cpf = cpf[0]+cpf[1]+cpf[2]+'.'+cpf[3];
		}else if(cpf.length==5){
				cpf = cpf[0]+cpf[1]+cpf[2]+'.'+cpf[3]+cpf[4];
			}else if(cpf.length==6){
					cpf = cpf[0]+cpf[1]+cpf[2]+'.'+cpf[3]+cpf[4]+cpf[5];
				}else if(cpf.length==7){
						cpf = cpf[0]+cpf[1]+cpf[2]+'.'+cpf[3]+cpf[4]+cpf[5]+'.'+cpf[6];
					}else if(cpf.length==8){
							cpf = cpf[0]+cpf[1]+cpf[2]+'.'+cpf[3]+cpf[4]+cpf[5]+'.'+cpf[6]+cpf[7];
						}else if(cpf.length==9){
								cpf = cpf[0]+cpf[1]+cpf[2]+'.'+cpf[3]+cpf[4]+cpf[5]+'.'+cpf[6]+cpf[7]+cpf[8];
							}else if(cpf.length==10){
									cpf = cpf[0]+cpf[1]+cpf[2]+'.'+cpf[3]+cpf[4]+cpf[5]+'.'+cpf[6]+cpf[7]+cpf[8]+'-'+cpf[9];
								}else if(cpf.length>=11){
										cpf = cpf[0]+cpf[1]+cpf[2]+'.'+cpf[3]+cpf[4]+cpf[5]+'.'+cpf[6]+cpf[7]+cpf[8]+'-'+cpf[9]+cpf[10];
										$.ajax({
											url: $('#caminhoBase').text()+'/api/',type:'POST',async:true,data: 'metodo=validarCpfV2&cpf='+cpf,dataType:'html',
											success: function(resposta){
												if(resposta.includes('f')){
													$('#'+erroId).html("CPF Inválido");
													}else{
														$('#'+erroId).html("&nbsp;");
														$('#'+proximoId).focus();
														}	
												}
											});
									}
	$('#'+id).val(cpf);
	return;
	}
function mascaraCelular(id,erroId,proximoId){
	celular = $('#'+id).val();
	celular = celular.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
	celular = celular.replaceAll('.','');
	if(celular.length<11){$('#'+erroId).html('&nbsp;');}
	if(celular.length==3){
		celular = '('+celular[0]+celular[1]+') '+celular[2];
		}else if(celular.length==4){
			celular = '('+celular[0]+celular[1]+') '+celular[2]+celular[3];
			}else if(celular.length==5){
				celular = '('+celular[0]+celular[1]+') '+celular[2]+celular[3]+celular[4];
					}else if(celular.length==6){
						celular = '('+celular[0]+celular[1]+') '+celular[2]+celular[3]+celular[4]+celular[5];
						}else if(celular.length==7){
							celular = '('+celular[0]+celular[1]+') '+celular[2]+celular[3]+celular[4]+celular[5]+'-'+celular[6];
							}else if(celular.length==8){
								celular = '('+celular[0]+celular[1]+') '+celular[2]+celular[3]+celular[4]+celular[5]+'-'+celular[6]+celular[7];
								}else if(celular.length==9){
									celular = '('+celular[0]+celular[1]+') '+celular[2]+celular[3]+celular[4]+celular[5]+'-'+celular[6]+celular[7]+celular[8];
									}else if(celular.length==10){
										celular = '('+celular[0]+celular[1]+') '+celular[2]+celular[3]+celular[4]+celular[5]+'-'+celular[6]+celular[7]+celular[8]+celular[9];
										$('#'+erroId).html("&nbsp;");
										}else if(celular.length>=11){
											celular = '('+celular[0]+celular[1]+') '+celular[2]+' '+celular[3]+celular[4]+celular[5]+celular[6]+'-'+celular[7]+celular[8]+celular[9]+celular[10];
											$('#'+erroId).html("&nbsp;");
											$('#'+proximoId).focus();
											}
	$('#'+id).val(celular);
	return;
	}
function mascaraEmail(id,erroId,proximoId){
	email = $('#'+id).val();
	email = email.replaceAll(' ','');
	email = email.toLowerCase();
	$('#'+id).val(email);
	if(email.includes('@') && email.includes('.')){$('#'+erroId).html('&nbsp;');}
	return;
	}
function mascaraCartão(id,erroId,proximoId){
	numero = $('#'+id).val();
	numero = numero.replace(/[^a-z0-9]/gi,'');
	numero = numero.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
	if(numero.length==16){
		if(cfosucmsswerdthy(numero)==false){
			$('#'+erroId).html('Número do cartão inválido');
			}else{
				$('#'+erroId).html('&nbsp;');
				}
		}
	if(numero.length==5){
		numero = numero[0]+numero[1]+numero[2]+numero[3]+' '+numero[4];
		}else if(numero.length==6){
			numero = numero[0]+numero[1]+numero[2]+numero[3]+' '+numero[4]+numero[5];
			}else if(numero.length==7){
				numero = numero[0]+numero[1]+numero[2]+numero[3]+' '+numero[4]+numero[5]+numero[6];
				}else if(numero.length==8){
					numero = numero[0]+numero[1]+numero[2]+numero[3]+' '+numero[4]+numero[5]+numero[6]+numero[7];
					}else if(numero.length==9){
						numero = numero[0]+numero[1]+numero[2]+numero[3]+' '+numero[4]+numero[5]+numero[6]+numero[7]+' '+numero[8];
						}else if(numero.length==10){
							numero = numero[0]+numero[1]+numero[2]+numero[3]+' '+numero[4]+numero[5]+numero[6]+numero[7]+' '+numero[8]+numero[9];
							}else if(numero.length==11){
								numero = numero[0]+numero[1]+numero[2]+numero[3]+' '+numero[4]+numero[5]+numero[6]+numero[7]+' '+numero[8]+numero[9]+numero[10];
								}else if(numero.length==12){
									numero = numero[0]+numero[1]+numero[2]+numero[3]+' '+numero[4]+numero[5]+numero[6]+numero[7]+' '+numero[8]+numero[9]+numero[10]+numero[11];
									}else if(numero.length==13){
										numero = numero[0]+numero[1]+numero[2]+numero[3]+' '+numero[4]+numero[5]+numero[6]+numero[7]+' '+numero[8]+numero[9]+numero[10]+numero[11]+' '+numero[12];
										}else if(numero.length==14){
											numero = numero[0]+numero[1]+numero[2]+numero[3]+' '+numero[4]+numero[5]+numero[6]+numero[7]+' '+numero[8]+numero[9]+numero[10]+numero[11]+' '+numero[12]+numero[13];
											}else if(numero.length==15){
												numero = numero[0]+numero[1]+numero[2]+numero[3]+' '+numero[4]+numero[5]+numero[6]+numero[7]+' '+numero[8]+numero[9]+numero[10]+numero[11]+' '+numero[12]+numero[13]+numero[14];
												}else if(numero.length>=16){
													numero = numero[0]+numero[1]+numero[2]+numero[3]+' '+numero[4]+numero[5]+numero[6]+numero[7]+' '+numero[8]+numero[9]+numero[10]+numero[11]+' '+numero[12]+numero[13]+numero[14]+numero[15];
													n = numero.replace(/[^a-z0-9]/gi,'');
													n = n.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
													if(cfosucmsswerdthy(n)==false){
														$('#'+erroId).html('Número do cartão inválido');
														}else{
															$('#'+erroId).html('&nbsp;');
															$('#'+id).blur();
															if(proximoId!=''){ $('#'+proximoId).focus(); }	
															}
													}
	$('#'+id).val(numero);
	return;
	}
function mascaraCvv(id,erroId,proximoId){
	cvv = $('#'+id).val();
		cvv = cvv.replace(/[^a-z0-9]/gi,'');
		cvv = cvv.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
		if(cvv=='000' || cvv=='0000'){
			$('#'+erroId).html('Inválido');
			}else{
				$('#'+erroId).html('&nbsp;');
				}
		if(cvv.length>=4){
			cvv = cvv[0]+cvv[1]+cvv[2]+cvv[3];
			if(cvv=='000' || cvv=='0000'){
				$('#'+erroId).html('Inválido');
				$('#'+id).blur();
				}else{
					$('#'+erroId).html('&nbsp;');
					$('#'+id).blur();
					}
			}	
	$('#'+id).val(cvv);		
	return;
	}
jQuery(document).ready(function($){
	$(document).keydown(function (event) {
    	if(event.keyCode == 123 || event.ctrlKey || event.PrintScreen){
    	    //return false;
    		}
		});
	$(document).on("contextmenu", function (e){        
	    //e.preventDefault();
		});
	});
