//Funcion para registrar usuarios

function CrearUsuario(){
    var nombre = document.getElementById("nombre");
    var apellido = document.getElementById("apellido");
    var usuario = document.getElementById("usuario");
    var pass = document.getElementById("pass")

  let headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('Accept', 'application/json');
  
  
  fetch('http://localhost:5000/registro', {
        method: 'POST',
        headers,
        body: `{
            "nombre":"${nombre.value}",
            "apellido":"${apellido.value}",
            "usuario":"${usuario.value}",
            "password":"${pass.value}"
          }`,
      })
      .then(response => response.json())
      .then(result => {
        console.log('Success:', result);
        nombre.value=''
        apellido.value=''
        usuario.value=''
        pass.value=''
        alert('Usuario Creado')
      })
      .catch(error => {
        console.error('Error:', error);
        nombre.value=''
        apellido.value=''
        usuario.value=''
        pass.value=''
        alert('Hubo un error creando usuario')
      });


}

// Funcion para Iniciar Sesion
function IniciarSesion(){
    var usuario = document.getElementById("luser");
    var pass = document.getElementById("lpass");

  fetch(`http://localhost:5000/login/${usuario.value}/${pass.value}`)
  .then(response => response.json())
  .then(data =>{
      console.log(data.data)
    if(data.data==true){
        window.location.href='../Pagina/Inicio.html'
    }else{
        alert('Usuario/Contraseña Invalidos')
        pass.value='';
        usuario.value='';
    }
  });
/*
    
    */

}