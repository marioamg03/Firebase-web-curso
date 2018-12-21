var databaseRefUsuarios = firebase.database().ref('usuario');
var databaseRefGuitarras = firebase.database().ref('guitarras');

var nombre = document.getElementById('nombre');
var descripcion = document.getElementById('descripcion');
var tipo = document.getElementById('tipo');
var precio = document.getElementById('precio');
var imagen = document.getElementById('imagen');

var btnLogout = document.getElementById('btnLogout');

btnLogout.addEventListener("click",function (){
  event.preventDefault();
  firebase.auth().signOut().then(function() {
    console.log("Se cerro la sesion");
    alert("Se cerro la sesion");
  }).catch(function(err){
    console.log(err);
  });
})

// funcion para leer si existe un cambio en el
//estado de sesion del usuario
firebase.auth().onAuthStateChanged(function(user){
  console.log(user);
  if (user) {
    console.log('Tenemos usuario');
  } else {
    window.location.href = 'index.html';
    console.log('No tenemos usuario');
  }
})

function nuevaGuitarra(){
  event.preventDefault();
  var obj = {
    nombre: nombre.value,
    descripcion:  descripcion.value,
    tipo: tipo.value,
    precio: precio.value,
    imagen: imagen.value
  }
  console.log(obj);
  if (tipo.value == "normal"){
    console.log("normal");
    subirGuitarra(obj,"normal");
  } else if (tipo.value == "vip") {
    console.log("vip");
    subirGuitarra(obj,"vip");
  } else {
    alert("El tipo tiene que ser normal o vip");
  }

}

function subirGuitarra (guitarra,tipo){
  databaseRefGuitarras.child(tipo).push(guitarra);
  console.log("se subieron los datos!");
}
