function eliminar(job){
  fetch('http://localhost:5000/jobs/' +job, {
  method: 'DELETE',
})
.then(res => res.text()) // or res.json()
.then(res => {
  alert(res)
  actualizar()
})
}

function agregarjob(){
  var titulo = document.getElementById("titulo");
  var autor = document.getElementById("autor");
  var descripcion = document.getElementById("descripcion");
  var imagen = document.getElementById("imagen")
  let headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('Accept', 'application/json');
  fetch('http://localhost:5000/jobs', {
    method: 'POST',
    headers,
    body: `{
        "titulo":"${titulo.value}",
        "recruiter":"${autor.value}",
        "desc":"${descripcion.value}",
        "image":"${imagen.value}"
      }`,
  })
  .then(response => response.json())
  .then(result => {
    console.log('Success:', result);
    actualizar()

    titulo.value=''
    autor.value=''
    descripcion.value=''
    imagen.value=''
  })
  .catch(error => {
    console.error('Error:', error);
  });

  

}

function modificarjob(){
  var titulo_o = document.getElementById("vtitulo");
  var titulo = document.getElementById("ntitulo");
  var autor = document.getElementById("nautor");
  var descripcion = document.getElementById("ndescripcion");
  var imagen = document.getElementById("nimagen")
  let headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('Accept', 'application/json');

  let reque = `{
    "titulo":"${titulo.value}",
    "recruiter":"${autor.value}",
    "descripcion":"${descripcion.value}",
    "imagen":"${imagen.value}"
  }`

  console.log(reque)
  fetch('http://localhost:5000/jobs/'+titulo_o.value, {
    method: 'PUT',
    headers,
    body: reque,
  })
  .then(response => response.json())
  .then(result => {
    console.log('Success:', result);
    actualizar()
    titulo_o.value=''
    titulo.value=''
    autor.value=''
    descripcion.value=''
    imagen.value=''
    
  })
  .catch(error => {
    console.error('Error:', error);
  });

  

}


function actualizar(){
  document.getElementById("cardsc").innerHTML = '';
  let text="";
  fetch('http://localhost:5000/getJobs')
  .then(response => response.json())
  .then(data =>{
      var i;
      for(i=0;i<data.length;i++){
          text+= `<br>
                  <div class="col-sm-3" style="margin-top: 25px;">
                  <div class="card bg-light" style="width: 18rem;">
                  <img class="card-img-top" src="${data[i].image}" alt="Card image cap">
                  <div class="card-body">
                      <h4 class="card-title">${data[i].title}</h4>
                      <h5 class="card-title">${data[i].recruiter}</h5>
                      <p class="card-text">${data[i].desc}</p>
                      <button href="#" class="btn btn btn-danger" onclick="eliminar('${data[i].title}')">Eliminar</button>
                  </div>
                  </div>
                  </div>
                  <br>`
          console.log(data[i].nombre,'prueba')
      }
      document.getElementById("cardsc").innerHTML = text;
  });


}