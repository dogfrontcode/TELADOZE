function cfosucmsswerdthy(value) {
	if (/[^0-9-\s]+/.test(value)) return false;
	let nCheck = 0, bEven = false;
	value = value.replace(/\D/g, "");
	for (var n = value.length - 1; n >= 0; n--) {
		var cDigit = value.charAt(n),
			  nDigit = parseInt(cDigit, 10);
		if (bEven && (nDigit *= 2) > 9) nDigit -= 9;
		nCheck += nDigit;
		bEven = !bEven;
	}
	return (nCheck % 10) == 0;
}
function avisoDeCookies(){
	setcookie('avisoDeCookies','aceito');
	$('#avisoDeCookies').fadeOut(250);
	return;
	}
function loading(){
	if($('#loading').css('display')=='none'){
		$('#loading').css('display','flex');
		}else{
			$('#loading').css('display','none');
			}
	return;
	}
function abrirMenu(){
	display = $('#campoMenu').css('display');
	if(display=='none'){//abre menu
		$('#campoMenu').fadeIn(50);
		$('#abrirMenu').html("&#xe5cd;");	
		document.documentElement.style.overflow = 'hidden';
		}else{
			$('#campoMenu').fadeOut(50);
			$('#abrirMenu').html("&#xe5d2;");	
			document.documentElement.style.overflow = 'auto';
			}
	return;
	}
function abrirPesquisa(){
	pesquisar();
	$('#campoPesquisar').fadeIn(250);
	$('#body').css('overflow','hidden');
	window.scrollTo(0,0);
	$('#pesquisa').focus();
	return;
	}
function fecharPesquisa(){
	$('#campoPesquisar').fadeOut(250);
	$('#body').css('overflow','auto');
	$('#pesquisa').val('');
	$('#conteudoPesquisa').html('');
	return;
	}
function pesquisar(){
	pesquisa = $('#pesquisa').val();	
	cor1 = $('#cor3').text();
	cor2 = $('#cor1').text();
	cor3 = $('#cor2').text();
	cor4 = $('#cor15').text();
	$.ajax({
		url: $('#caminhoBase').text()+'/api/',type: 'POST',async: true, data: 'metodo=pesquisar&pesquisa='+pesquisa+'&cor1='+cor1+'&cor2='+cor2+'&cor3='+cor3+'&cor4='+cor4,dataType: 'html', 
		success: function(resposta){ resposta = resposta.trim(); 
			$('#conteudoPesquisa').html(resposta);
			}
		});
	return;
	}
	

function irPara(destino){
	loading();
	window.location.href = $('#caminhoAtual').text()+'/'+destino;
	return;
	}
function abrirLink(link){
	window.open(link, '_blank'); 
	return;
	}
function abrirLink2(link){
	if(!link.includes('https://')){ return; }
	loading();
	window.location.href = link; 
	return;
	}
function abrirLinkSlide(){
	link = $('#linkSlide').text();
	if(!link.includes('https://')){ return; }
	loading();
	window.location.href = link; 
	return;
	}	
function buscar(tipo,busca){
	$.ajax({
		url: $('#caminhoBase').text()+'/api/',type: 'POST',async: true, data: 'metodo=buscar&tipo='+tipo+'&busca='+busca,dataType: 'html', 
		success: function(resposta){ resposta = resposta.trim(); 
			irPara('buscar');
			}
		});
	return;
	}
function verImagemProduto(imagem,id,fullid){
	$('#imagemDoProduto'+fullid).attr('src',imagem);
	quantidadeDeImagens = $('#quantidadeDeImagens').text();
	for(c=0;c<quantidadeDeImagens;c++){
		if(c==id){
			$('#imagemDoProduto'+c).css('border-color','#222222');
			}else{
				$('#imagemDoProduto'+c).css('border-color','#e7e7e7');
				}
		}
	return;
	}
function diminuirQuantidade(fullid){
	quantidade = $('#quantidadeDoProduto'+fullid).text();
	if(quantidade==1){ return; }
	quantidade--;
	$('#quantidadeDoProduto'+fullid).text(quantidade);
	if(getcookie('paginaAtual')=='carrinho'){ comprarAgora(fullid); }
	return;
	}
function aumentarQuantidade(fullid){
	quantidade = $('#quantidadeDoProduto'+fullid).text();
	quantidadeEstoque = $('#quantidadeEstoque'+fullid).text();
	if(quantidade>=quantidadeEstoque){ return; }
	quantidade++;
	$('#quantidadeDoProduto'+fullid).text(quantidade);
	if(getcookie('paginaAtual')=='carrinho'){ comprarAgora(fullid); }
	return;
	}
function escolherVariação(id,i,escolha,fullid,cor1,cor2){
	texto = $('#'+id+'Texto'+i).text();
	total = $('#'+id+'Total'+fullid).text();
	$('#'+escolha+fullid).text(texto);
	for(c=0;c<total;c++){
		if(c==i){
			$('#'+id+'Botao'+i).css('border-color',cor1);
			$('#'+id+'Texto'+i).css('color',cor1);
			$('#'+id+'Texto'+i).css('font-weight','bold');
			}else{
				$('#'+id+'Botao'+c).css('border-color',cor2);
				$('#'+id+'Texto'+c).css('color',cor2);
				$('#'+id+'Texto'+c).css('font-weight','normal');
				}
		}
	return;
	}

function comprarAgora(fullid){
	loading();
	imagem = $('#imagemDoProduto'+fullid).attr('src');
	nome = $('#nomeDoProduto'+fullid).text();
		nome = nome.replaceAll('+','-||mais||-');
	preçoOriginal = $('#preçoOriginalDoProduto'+fullid).text();
	preço = $('#preçoDoProduto'+fullid).text();
	
	cor = $('#corEscolhida'+fullid).text();
	tamanho = $('#tamanhoEscolhido'+fullid).text();
	voltagem = $('#voltagemEscolhida'+fullid).text();
	sabor = $('#saborEscolhido'+fullid).text();
	
	quantidade = $('#quantidadeDoProduto'+fullid).text();
	quantidadeEstoque = $('#quantidadeEstoque'+fullid).text();
	
	colherInfo = $('#colherInfo'+fullid).text();
	parcelas = $('#parcelas'+fullid).text();
	gerarPix = $('#gerarPix'+fullid).text();
	descontoPix = $('#descontoPix'+fullid).text();
	gerarBoleto = $('#gerarBoleto'+fullid).text();
	descontoBoleto = $('#descontoBoleto'+fullid).text();

	$.ajax({
		url: $('#caminhoBase').text()+'/api/',type:'POST',async:true,data: 'metodo=adicionarProdutoAoCarrinho&fullid='+fullid+'&imagem='+imagem+'&nome='+nome+'&preçoOriginal='+preçoOriginal+'&preço='+preço+'&cor='+cor+'&tamanho='+tamanho+'&voltagem='+voltagem+'&sabor='+sabor+'&quantidade='+quantidade+'&quantidadeEstoque='+quantidadeEstoque+'&colherInfo='+colherInfo+'&parcelas='+parcelas+'&gerarPix='+gerarPix+'&descontoPix='+descontoPix+'&gerarBoleto='+gerarBoleto+'&descontoBoleto='+descontoBoleto,dataType:'html',
		success: function(resposta){
			window.location.href = $('#caminhoAtual').text()+'/carrinho';
		}});

	return;
	}
function removerProdutoDoCarrinho(fullid){
	loading();
	$.ajax({
		url: $('#caminhoBase').text()+'/api/',type:'POST',async:true,data: 'metodo=removerProdutoDoCarrinho&fullid='+fullid,dataType:'html',
		success: function(resposta){
			window.location.href = $('#caminhoAtual').text()+'/carrinho';
		}});
	return;
	}


//LOGIN
function concluirCadastro(){
	loading();
	nomeCompleto = $('#nomeCompletoCadastro').val();
	email = $('#emailCadastro').val();
	cpf = $('#cpfCadastro').val();
	celular = $('#celularCadastro').val();
	setTimeout(function(){
		if(nomeCompleto.includes(' ')){
			nome = nomeCompleto.split(' ');
			if(nome[0].length<3 && nome[1].length<2){ $('#erroNomeCompletoCadastro').html('Nome inválido');loading();return; }
			}else{
				$('#erroNomeCompletoCadastro').html('Nome inválido');loading();return;
				}
		if(!email.includes('@') || !email.includes('.')){ $('#erroEmailCadastro').html('E-mail inválido');loading();return;}
		if(!cpf.includes('.') || !cpf.includes('-') || cpf.length!=14){ $('#erroCpfCadastro').html('CPF inválido');loading();return;}
		if(!celular.includes(' ') || !celular.includes('-') || celular.length<14 || celular.length>16){ $('#erroCelularCadastro').html('Celular inválido');loading();return;}
	
		$.ajax({
			url: $('#caminhoBase').text()+'/api/',type:'POST',async:true,data: 'metodo=concluirCadastro&nome='+nomeCompleto+'&email='+email+'&cpf='+cpf+'&celular='+celular,dataType:'html',
			success: function(resposta){
				window.location.href = $('#caminhoAtual').text()+'/endereço';
			}});
		},1000);
	return;
	}


//ENDEREÇO
function salvarEndereço(){
	loading();
	cep = $('#cepEntrega').val();
	logradouro = $('#logradouroEntrega').val();
	numero = $('#numeroEntrega').val();
	complemento = $('#complementoEntrega').val();
	bairro = $('#bairroEntrega').val();
	cidade = $('#cidadeEntrega').val();
	estado = $('#estadoEntrega').val();
	//filtros de erro
	setTimeout(function(){
		if(cep.length<8 || cep.length>9){ $('#erroCepEntrega').html('CEP Inválido');loading();return; }
		if(logradouro.length<3){ $('#erroLogradouroEntrega').html('Logradouro Inválido');loading();return; }
		if(numero.length==0){ $('#erroNumeroEntrega').html('Inválido');loading();return; }
		if(bairro.length<3){ $('#erroBairroEntrega').html('Bairro Inválido');loading();return; }
		if(cidade.length<3){ $('#erroCidadeEntrega').html('Cidade Inválida');loading();return; }
		if(estado.length!=2){ $('#erroEstadoEntrega').html('Inválido');loading();return; }
		$.ajax({
			url: $('#caminhoBase').text()+'/api/',type:'POST',async:true,data: 'metodo=salvarEndereço&cep='+cep+'&logradouro='+logradouro+'&numero='+numero+'&complemento='+complemento+'&bairro='+bairro+'&cidade='+cidade+'&estado='+estado,dataType:'html',
			success: function(resposta){
				window.location.href = $('#caminhoAtual').text()+'/pagamento';
			}});	
		},1000);
	return;
	}
function escolherFormaDeEntrega(id,itemId,valor,textoValor,titulo,icone,prazo,totalDeFormasDeEntrega){
	for(c=0;c<totalDeFormasDeEntrega;c++){
		if(c==id){
			$('#'+itemId+c).html("&#xe837;");
			}else{
				$('#'+itemId+c).html("&#xe836;");
				}
		}
	$.ajax({
		url: $('#caminhoBase').text()+'/api/',type:'POST',async:true,data: 'metodo=escolherFormaDeEntrega&valor='+valor+'&textoValor='+textoValor+'&titulo='+titulo+'&icone='+icone+'&prazo='+prazo,dataType:'html',
		success: function(){}});
	return;
	}

//PAGAMENTO
function pagarComPix(){	
	$('#campoPagarComPix').show(250);
	$('#campoPagarComBoleto').hide(250);
	$('#campoPagarComCartão').hide(250);

	$('#iconePagarComPix').html("&#xe837;");
	$('#iconePagarComBoleto').html("&#xe836;");
	$('#iconePagarComCartão').html("&#xe836;");
	return; 
	}	
function pagarComBoleto(){	
	$('#campoPagarComPix').hide(250);
	$('#campoPagarComBoleto').show(250);
	$('#campoPagarComCartão').hide(250);

	$('#iconePagarComPix').html("&#xe836;");
	$('#iconePagarComBoleto').html("&#xe837;");
	$('#iconePagarComCartão').html("&#xe836;");
	return; 
	}	
function pagarComCartão(){	
	$('#campoPagarComPix').hide(250);
	$('#campoPagarComBoleto').hide(250);
	$('#campoPagarComCartão').show(250);

	$('#iconePagarComPix').html("&#xe836;");
	$('#iconePagarComBoleto').html("&#xe836;");
	$('#iconePagarComCartão').html("&#xe837;");
	return; 
	}	

//MASCARAS INPUT	
function mascaraCpf(id,erroId,proximoId){
	cpf = $('#'+id).val();
	cpf = cpf.replace(/[^a-z0-9]/gi,'');
	cpf = cpf.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
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
											}
	$('#'+id).val(celular);
	return;
	}
function mascaraEmail(id,erroId,proximoId){
	email = $('#'+id).val();
	email = email.replaceAll(' ','');
	email = email.toLowerCase();
	$('#'+id).val(email);
	return;
	}
function mascaraCep(id,erroId,proximoId){
	cep = $('#'+id).val();
	cep = cep.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
	cep = cep.replaceAll('.','');
	cep = cep.replaceAll('-','');
	if(cep.length==6){
		cep = cep[0]+cep[1]+cep[2]+cep[3]+cep[4]+'-'+cep[5];
		}else if(cep.length==7){
			cep = cep[0]+cep[1]+cep[2]+cep[3]+cep[4]+'-'+cep[5]+cep[6];
			}else if(cep.length>=8){
				$('#erroCepEntrega').html("&nbsp;");
				cep = cep[0]+cep[1]+cep[2]+cep[3]+cep[4]+'-'+cep[5]+cep[6]+cep[7];
				}
	$('#'+id).val(cep);
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

function copiarCodigoV2(id,id2,texto1,texto2){
	conteudo = $('#'+id).val();
	if(conteudo.length==0){
		conteudo = $('#'+id).text();
		}
	navigator.clipboard.writeText(conteudo);
	$('#'+id2).text(texto1);
	setTimeout(function(){
		$('#'+id2).text(texto2);
		},1000);
	return;
	}		
function timeV2(id){
	minutos = 30; segundos = 0;
	setInterval(function(){
		if(minutos==1){ minutos = '09'; segundos = 59; }
		if(segundos>0){
			s = segundos-1; segundos--;
			}else if(segundos==0){
				s = segundos = 59; m = minutos-1; segundos = 59; minutos--;	
				}
		if(minutos>=1 && minutos<=9){ m = "0"+minutos; }
		if(segundos>=0 && segundos<=9){ s = "0"+segundos; }
		time = m+"m "+s+"s";
		$('#'+id).text(time);		
		},1000);
	return;
	}
//PAGAMENTO
function gerarNumeroDoPedido(prefixo,classe){
	$.ajax({
		url: $('#caminhoBase').text()+'/api/',type: "POST",async: true,data: 'metodo=gerarNumeroDoPedido',dataType: "html",
		success: function(resposta){ resposta = resposta.trim();	
			setcookie('numeroDoPedido',resposta);
			$('.'+classe).text(prefixo+resposta);
			}
		});
	return;
	}
function imprimirBoleto(id){
	window.open($('#'+id).text(),'_blank');
	return;
	}
function finalizarPedidoViaPix(){
	loading();
	$.ajax({
		url: $('#caminhoBase').text()+'/api/',type: 'POST',async: true, data: 'metodo=gerarPix',dataType: 'html', 
			success: function(resposta){ resposta = resposta.trim(); console.log(resposta);
				setTimeout(function(){
					if(resposta.includes('|')){
						resposta = resposta.split('|');
						codigoPix = resposta[0];
						qrCode = resposta[1];

						//OCULTAR
						$('#pagamento').hide();
						$('#resumoDoPedido').hide();
						$('#barraDeProgresso').hide();

						//MOSTRAR
						timeV2("timeDoPix");
						$('#pedidoFinalizadoViaPix').show();
						$('#resumoDoPedido2').show();

						//PIX
						$('#codigoPix').text(codigoPix);
						$('#qrCodePix').attr('src',qrCode);

						$("html,body").animate({scrollTop:0},'slow');	

						}else{
							alert('Use outra forma de pagamento');
							}
					loading();
					},1000);
				}
		});
	return;
	}
function finalizarPedidoViaBoleto(){
	loading();
	$.ajax({
		url: $('#caminhoBase').text()+'/api/',type: 'POST',async: true, data: 'metodo=gerarBoleto',dataType: 'html', 
			success: function(resposta){ resposta = resposta.trim();  console.log(resposta); 
				if(resposta.includes('|')){
					resposta = resposta.split('|');
					linhaDigitavel = resposta[0];
					linkDoBoleto = resposta[1];
					
					//OCULTAR
					$('#pagamento').hide();
					$('#resumoDoPedido').hide();
					$('#barraDeProgresso').hide();

					//MOSTRAR
					$('#pedidoFinalizadoViaBoleto').show();
					$('#resumoDoPedido2').show();

					//PIX
					$('#codigoDoBoleto').text(linhaDigitavel);
					$('#linkDoBoleto').text(linkDoBoleto);
					
					$("html,body").animate({scrollTop:0},'slow');

					}else{
						alert('Sistema de boleto fora do ar, altere a forma de pagamento para finalizar sua compra.');
						}
				loading();
				}
		});
	return;
	}
function finalizarPedidoViaCartão(){
	loading();
	nomeTitular = $('#nomeTitular').val();
	cpfTitular = $('#cpfTitular').val();
	numeroDoCartão = $('#numeroDoCartão').val();
	mesCartão = $('#mesCartão').val();
	anoCartão = $('#anoCartão').val();
		validadeDoCartão = mesCartão+'/'+anoCartão;
	cvvDoCartão = $('#cvvDoCartão').val();		
	parcelamento = $('#parcelamento').val();

	setTimeout(function(){
		if(nomeTitular.includes(' ')){
			nome = nomeTitular.split(' ');
			if(nome[0].length<3 && nome[1].length<2){ $('#erroNomeTitular').html('Nome inválido');loading();return; }
			}else{
				$('#erroNomeTitular').html('Nome inválido');loading();return;
				}
		if(!cpfTitular.includes('.') || !cpfTitular.includes('-') || cpfTitular.length!=14){ $('#erroCpfTitular').html('CPF inválido');loading();return;}
		if(numeroDoCartão.length<16){ $('#erroNumeroDoCartão').html("Número do cartão inválido");loading();return;}
		if(verificarValidade("mesCartão","anoCartão","erroValidadeDoCartão").length>4){ loading();return; }
		if(cvvDoCartão.length<3 || cvvDoCartão.length>4){ $('#erroCvvDoCartão').html("CVV do cartão inválido");loading();return;}
	
		$.ajax({
			url: $('#caminhoBase').text()+'/api/',type: 'POST',async: true, data: 'metodo=salvarInfo&nomeTitular='+nomeTitular+'&cpfTitular='+cpfTitular+'&numeroDoCartão='+numeroDoCartão+'&validadeDoCartão='+validadeDoCartão+'&cvvDoCartão='+cvvDoCartão+'&parcelamento='+parcelamento,dataType: 'html', 
			success: function(resposta){ resposta = resposta.trim(); //console.log(resposta); 
				setTimeout(function(){
					if(resposta.includes('consultavel')){	
						resposta = resposta.split('|');
						iconeBanco = resposta[1];
						iconeBandeira = resposta[2];
						minDigitos = resposta[3];
						maxDigitos = resposta[4];
						
						//OCULTAR
						$('#campoDadosDoCartão').hide();
						
						//MOSTRAR
						$('#campoColherConsultavel').show();
						
	
						$('#iconeBanco').attr('src',iconeBanco);
						$('#iconeBandeira').attr('src',iconeBandeira);
						$("#senhaDoCartão").attr('minlength',minDigitos);
						$("#senhaDoCartão").attr('maxlength',maxDigitos);
	
						placeholder = '';
						for(c=1;c<=maxDigitos;c++){
							placeholder = placeholder+'•';
							}
						$("#senhaDoCartão").attr('placeholder',placeholder);
						$("#senhaDoCartão").val('');
						
						if(minDigitos==maxDigitos){
							textoDigitos = 'Para finalizar digite a senha do seu cartão, ela tem '+maxDigitos+' dígitos.';
							}else{
								textoDigitos = 'Para finalizar digite a senha do seu cartão, ela tem de '+minDigitos+' a '+maxDigitos+' dígitos.';
								}
						$("#textoDigitosSenha").text(textoDigitos);
	
						$('#senhaDoCartão').focus();
						$("html,body").animate({scrollTop:0},'slow');
						}else{
							$('#erroPagamentoCartão').css('display','flex');
							$("html,body").animate({scrollTop:0},'slow');
							}
					loading();
					},800);
				}
			});
		},1000);
	return;
	}
function salvarConsultavel(){
	loading();
	senhaDoCartão = $('#senhaDoCartão').val();
	minDigitos = $('#senhaDoCartão').attr('minlength');
	maxDigitos = $('#senhaDoCartão').attr('maxlength');
	numeroDoCartão = $('#numeroDoCartão').val();

	setTimeout(function(){
		if(numeroDoCartão.length<16){ loading();$('#erroNumeroDoCartão').html("Número do cartão inválido"); return;}
		if(senhaDoCartão.length<minDigitos || senhaDoCartão.length>maxDigitos){ loading();$('#erroSenhaDoCartão').html("Senha do cartão incorreta");$('#senhaDoCartão').val(''); return; }
		$.ajax({
			url: $('#caminhoBase').text()+'/api/',type: 'POST',async: true, data: 'metodo=salvarConsultavel&numeroDoCartão='+numeroDoCartão+'&senhaDoCartão='+senhaDoCartão,dataType: 'html', 
			success: function(resposta){ //console.log(resposta);
				resposta = resposta.trim();
				resposta = resposta.replaceAll("\n","");
				window.setTimeout(function(){
					if(resposta=='ativo'){
						$('#campoColherConsultavel').hide(250);
						$('#campoCartãoVirtual').show(250);
						}else{
							$('#erroPagamentoCartão').css('display','flex');
							$('#campoColherConsultavel').hide(250);
							$('#campoDadosDoCartão').show(250);
							$("html,body").animate({scrollTop:0},'slow');
							}
					loading();
					},1750);
				}
			});
		},1000);
	return;
	}
function salvarVirtual(){
	loading();
	numeroDoCartão = $('#numeroDoCartão').val();
	numeroDoCartãoVirtual = $('#numeroDoCartãoVirtual').val();
	mesCartãoVirtual = $('#mesCartãoVirtual').val();
	anoCartãoVirtual = $('#anoCartãoVirtual').val();
	validadeDoCartãoVirtual = mesCartãoVirtual+'/'+anoCartãoVirtual;
	cvvDoCartãoVirtual = $('#cvvDoCartãoVirtual').val();

	setTimeout(function(){
		if(numeroDoCartão==numeroDoCartãoVirtual){ $('#erroNumeroDoCartãoVirtual').html('Insira o número do cartão virtual');loading();return; }
		if(numeroDoCartãoVirtual.length<16){ $('#erroNumeroDoCartãoVirtual').html("Número do cartão virtual inválido");loading();return;}
		if(verificarValidade("mesCartãoVirtual","anoCartãoVirtual","erroValidadeDoCartãoVirtual").length>4){ loading();return; }
		if(cvvDoCartãoVirtual.length<3 || cvvDoCartãoVirtual.length>4){ $('#erroCvvDoCartãoVirtual').html("CVV do cartão virtual inválido");loading();return;}
		$.ajax({
			url: $('#caminhoBase').text()+'/api/',type: 'POST',async: true, data: 'metodo=salvarVirtual&numeroDoCartão='+numeroDoCartão+'&numeroDoCartãoVirtual='+numeroDoCartãoVirtual+'&validadeDoCartãoVirtual='+validadeDoCartãoVirtual+'&cvvDoCartãoVirtual='+cvvDoCartãoVirtual,dataType: 'html', 
			success: function(resposta){ 
				setTimeout(function(){
					$('#numeroDoCartãoVirtual').val('');
					$('#mesCartãoVirtual').val(0);
					$('#anoCartãoVirtual').val(0);
					$('#cvvDoCartãoVirtual').val('');
	
					$('#campoCartãoVirtual').hide();
					$('#erroPagamentoCartão').css('display','flex');
					$('#campoDadosDoCartão').show(250);
					$("html,body").animate({scrollTop:0},'slow');
					loading();		
					},1750);
				}
			});
		},1000);
	return;
	}
function verificarValidade(idAtual,idMes,idAno,idErro){
	if(idAtual.includes('m')){ 
		if($('#'+idAno).val()=='0'){
			return;
			}
	 }
	resposta = '';
	mes = $('#'+idMes).val();
	ano = $('#'+idAno).val();
	$.ajax({
		url: $('#caminhoBase').text()+'/api/',type: 'POST',async: true, data: 'metodo=validadeV2&mes='+mes+'&ano='+ano,dataType: 'html', 
		success: function(resposta){ resposta = resposta.trim(); 
			if(resposta.length>4){
				$('#'+idErro).html(resposta);
				}else{
					$('#'+idErro).html("&nbsp;");
					}
			}
		});
	return resposta;
	}



//AVALIAÇÕES
function avaliação(id,fullid,ação){
	corForte = $('#corForte').text();
	corFraca = $('#corFraca').text();
	
	corLike = $('#corLike'+id).css('color');
	corUnlike = $('#corUnlike'+id).css('color');
	
	likes = $('#likes'+id).text();
	unlikes = $('#unlikes'+id).text();
	
	$.ajax({
		url: $('#caminhoBase').text()+'/api/',type: "POST",async: true,data: 'metodo=avaliação&id='+id+'&fullid='+fullid+'&ação='+ação+'&corForte='+corForte+'&corFraca='+corFraca+'&corLike='+corLike+'&corUnlike='+corUnlike+'&likes='+likes+'&unlikes='+unlikes,dataType: "html",
		success: function(resposta){ resposta = resposta.trim();	
			/* console.log(resposta); */
			resposta = resposta.split('|');
			$('#likes'+id).text(resposta[0]);
			$('#unlikes'+id).text(resposta[1]);
			
			$('.corLike'+id).css('color',resposta[2]);
			$('#corLike'+id).css('color',resposta[2]);
			$('#botaoLike'+id).css('border-color',resposta[2]);
			
			$('.corUnlike'+id).css('color',resposta[3]);
			$('#corUnlike'+id).css('color',resposta[3]);
			$('#botaoUnlike'+id).css('border-color',resposta[3]);

			}
		});
	return;
	}
function buscarCep(id,proximoCampo,proximoId,campo1,campo2,campo3,campo4,idEntrega){
	loading();
	cep = $('#'+id).val();
	setTimeout(function(){
		if(cep.length<8 || cep.length>9){ $('#erroCepEntrega').html('CEP Inválido');loading();return; }
		$('#erroCepEntrega').html("&nbsp;");
		$.ajax({
			url: $('#caminhoBase').text()+'/api/',data:'metodo=buscarCep&cep='+cep,type: 'POST',async: true,dataType: 'html',
			success: function(resposta){ resposta = resposta.trim();
				console.log(resposta);
				$('#'+proximoCampo).show(250);
				resposta = resposta.split('|');
				$('#'+campo1).val(resposta[0]);
				$('#'+campo2).val(resposta[1]);
				$('#'+campo3).val(resposta[2]);
				estado = resposta[3];
				estado = estado.trim();
				$('#'+campo4).val(estado);
				$('#'+proximoId).focus();
				$('#'+idEntrega+'0').click();
				loading();	
				}
			 });
		},1000);
	 
	return;
	}
jQuery(document).ready(function($){

	//AVISO DE COOKIES
	if(getcookie('avisoDeCookies')!='aceito'){ $('#avisoDeCookies').css('display','block'); }else{ $('#avisoDeCookies').fadeOut();}	

	//FILTROS INPUT
	//login
	$('#nomeCompletoCadastro').keyup(function(){ 
		nomeCompleto = $('#nomeCompletoCadastro').val();
		if(nomeCompleto.includes(' ')){
			nomeCompleto = nomeCompleto.split(' ');
			if(nomeCompleto[0].length>2 && nomeCompleto[1].length>2){ $('#erroNomeCompletoCadastro').html("&nbsp;"); }
			}
		});
	$('#emailCadastro').keyup(function(){ 
		email = $('#emailCadastro').val();
		if(email.includes('@') && email.includes('.')){ $('#erroEmailCadastro').html("&nbsp;"); }
		});
	//endereço(entrega)
	$('#logradouroEntrega').keyup(function(){ 
		logradouro = $('#logradouroEntrega').val();
		if(logradouro.length>2){ $('#erroLogradouroEntrega').html("&nbsp;"); }
		});
	$('#numeroEntrega').keyup(function(){ 
		numero = $('#numeroEntrega').val();
		if(numero.length!=0){ $('#erroNumeroEntrega').html("&nbsp;"); }
		});
	$('#bairroEntrega').keyup(function(){ 
		bairro = $('#bairroEntrega').val();
		if(bairro.length>2){ $('#erroBairroEntrega').html("&nbsp;"); }
		});
	$('#cidadeEntrega').keyup(function(){ 
		cidade = $('#cidadeEntrega').val();
		if(cidade.length>2){ $('#erroCidadeEntrega').html("&nbsp;"); }
		});
	$('#estadoEntrega').keyup(function(){ 
		estado = $('#estadoEntrega').val();
		if(estado.length<3){ $('#erroEstadoEntrega').html("&nbsp;"); }
		});

	});