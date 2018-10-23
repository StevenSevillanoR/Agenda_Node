
var nombre = $('#nombre')
var nombreUsuario = $('#user')
var fnacimiento = $('#fNacimiento')
var pass = $('#pass')
var cpass = $("#cpass")

$('#registro').on('click', function (event) {
  event.preventDefault()
  console.log(nombre.val(), nombreUsuario.val(), fnacimiento.val(), pass.val(), cpass.val())
    if (nombreUsuario.val() != "" && pass.val() != "" && cpass.val()!= "" && nombre.val() != "" && fnacimiento.val() != "") {
      if (nombreUsuario.val().includes('@') && nombreUsuario.val().includes('.com') || nombreUsuario.val().includes('.es') || nombreUsuario.val().includes('.co')){
        if (pass.val() == cpass.val()) {
          let url = '/users/new'
          let user = {
            nombres: nombre.val(),
            usuario: nombreUsuario.val(),
            password: pass.val(),
            fNacimiento: fnacimiento.val(),
            eventos: null
          }
          /*$.ajax({
            url: url,
            method: 'POST',
            data: user,
            success: function(response){
              console.log(response)
              if (response == "Registro guardado") {
                window.location.href = "http://localhost:8082/index.html"
              }
            },
            error: function(response){
              console.log(response)
              alert("No fue posible conectarse con el servidor")
            }
          })*/
          $.post(url, user, function (data,status) {
            alert("Data: "+data+"\nStatus: "+status);
            if (data == "Registro guardado") {
              window.location.href = "http://localhost:8082/index.html"
            }else{
              alert("No se ha guardado el usuario correctamente")
            }
          })
        } else {
          alert("Las contraseñas ingresadas no coinciden, por favor verifique y vuelva a intentarlo")
        }
      }else{
        alert("Su usuario es incorrecto. Por favor, digite un email de la forma example@mail.com")
      }
    } else {
        alert("Complete todos los campos")
    }
})