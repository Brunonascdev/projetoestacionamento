$('.dropdown-toggle').dropdown();

function preencheHora(){
    var hora = "";
    for(var x = 0; x <= 23; x++){
      if(x <= 9){
        hora+="<option value="+x+">0"+x+"</option>";
      }else{
        hora+="<option value="+x+">"+x+"</option>";
      }
    }
    $("#horaEntrada").html(hora);
    $("#horaSaida").html(hora);
}

function preencheMinuto(){
  var minuto = "";
    for(var x = 0; x <= 59; x++){
      if(x <= 9){
        minuto+="<option value="+x+">0"+x+"</option>";
      }else{
        minuto+="<option value="+x+">"+x+"</option>";
      }
    }
    $("#minutoEntrada").html(minuto);
    $("#minutoSaida").html(minuto);
}

$(document).on("click", "#salvar", function(){
  var parametros ={
    "nome":$("#nome").val(),
    "cpf":$("#cpf").val()
  };

  $.ajax({
    type:"post", // como vou enviar os dados ao servidor
    url: "https://estacionamentomobileta.000webhostapp.com/cadastrar.php", //para aonde eu vou enviar
    data:parametros, //o que eu vou enviar

    //caso esteja certo
    success: function(data){
      navigator.notification.alert(data);
      $("#nome").val("")
      $("#cpf").val("")
    },

    //caso esteja errado
    error: function(data){
      navigator.notification.alert("Erro ao cadastrar!");
    }
  });
});

$(document).ready(function(){

    $.ajax({
    type:"post", // Como vai enviar os dados
    url:"https://estacionamentomobileta.000webhostapp.com/listar.php", // pra onde vai enviar
    dataType:"json", // o que eu vou enviar
    // caso sucesso
    success: function(data){
      var itemlista = '';
      $.each(data.vaga, function(i, dados){ 
        itemlista += "<option value="+dados.codigo+">"+dados.nome+"</option>";
        $("#selectPropietario").html(itemlista);
      });
      
      $(document).on("click", "#salvarCarro", function(){
        var cd = $("#selectPropietario option:selected").val();
        
        var parametros ={
          "cd":cd,
          "placa":$("#placa").val(),
          "marca":$("#marca").val(),
          "modelo":$("#modelo").val(),
          "tipo":$("#veiculo option:selected").val()
        };

          $.ajax({
            type:"post", // como vou enviar os dados ao servidor
            url: "https://estacionamentomobileta.000webhostapp.com/cadastrarCarro.php", //para aonde eu vou enviar
            data:parametros, //o que eu vou enviar

            //caso esteja certo
            success: function(data){
              navigator.notification.alert(data);
              $("#placa").val('');
              $("#marca").val('');
              $("#modelo").val('');
              $("#veiculo").val('');
            },

            //caso esteja errado
            error: function(data){
              navigator.notification.alert("Erro ao cadastrar!");
            }
          });

        

      });
    },
    // caso erro
    error: function(data){
      navigator.notification.alert("Erro ao buscar registros!");
    }
    });

  });

$(document).ready(function(){
  $.ajax({
    type:"post", // Como vai enviar os dados
    url:"https://estacionamentomobileta.000webhostapp.com/listarConsulta.php", // pra onde vai enviar
    dataType:"json", // o que eu vou enviar
    // caso sucesso
    success: function(data){
      var itemlista = '';
      var itemlistaDois = '';
      $.each(data.vaga, function(i, dados){ 
        itemlista += "<option value="+dados.id+">"+dados.nome+"</option>";
        $("#propietarioP").html(itemlista);

        itemlistaDois += "<option value="+dados.cdCarro+">"+dados.placa+"</option>";
        $("#placa").html(itemlistaDois);
      });

    },
    
    // caso erro
    error: function(data){
      navigator.notification.alert("Erro ao buscar registros!");
    }
    });

});


$(document).on("click", "#teste", function(){
        
        var placa = $("#placa option:selected").val();
        var idprop = $("#propietarioP option:selected").val();
        var hora = $("#horaEntrada option:selected").text();
        var minuto = $("#minutoEntrada option:selected").text();
        var horario = hora + ':' + minuto;

        var parametros = {
          "cdProp":idprop,
          "horario":horario,
          "placa":placa
        };
        $.ajax({
            type:"post", // como vou enviar os dados ao servidor
            url: "https://estacionamentomobileta.000webhostapp.com/cadastrarPermanencia.php", //para aonde eu vou enviar
            data:parametros, //o que eu vou enviar

            //caso esteja certo
            success: function(data){
              navigator.notification.alert(data);
              $("#propietarioP").val('');
              $("#horaEntrada").val('');
              $("#minutoEntrada").val('');
              $("#nomeProp").val('');
            },

            //caso esteja errado
            error: function(data){
              navigator.notification.alert("Erro ao cadastrar!");
            }
          });

      });

$(document).ready(function(){
  $.ajax({
    type:"post", // Como vai enviar os dados
    url:"https://estacionamentomobileta.000webhostapp.com/listarNaoSairam.php", // pra onde vai enviar
    dataType:"json", // o que eu vou enviar
    // caso sucesso
    success: function(data){
      var itemlista = '';

      $.each(data.vaga, function(i, dados){ 
        itemlista += "<option value="+dados.id+">"+dados.placa+"</option>";
        $("#placaConsulta").html(itemlista);
      });
    },
    
    // caso erro
    error: function(data){
      navigator.notification.alert("Erro ao buscar registros!");
    }
    });

});

$(document).on("change", "#placaConsulta", function(){
  $("#veiculos").show();
});
$(document).on("click", "#salvarTudo", function(){
  this.text('salva dnv kkkkkkk');
  $("#calcular").show();
  $("#valor").show();

});




