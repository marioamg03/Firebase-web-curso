var btnLogout = document.getElementById('btnLogout');
var databaseRef = firebase.database().ref('usuario');

var btnPush = document.getElementById('btnPush');
var btnUpdate = document.getElementById('btnUpdate');
var btnSet = document.getElementById('btnSet');
var btnRemove = document.getElementById('btnRemove');

var datosPerfil = document.getElementById('datosPerfil');
var perfilNombre = document.getElementById('perfilNombre');
var perfilEmail = document.getElementById('perfilEmail');
var perfilTelefono = document.getElementById('perfilTelefono');
var perfilDireccion = document.getElementById('perfilDireccion');

var editarDatos = document.getElementById('formularioPerfil');
var BtnEditar = document.getElementById('perfilEditar');


var nombreForm = document.getElementById('nombreForm');
var emailForm = document.getElementById('emailForm');
var telefonoForm = document.getElementById('telefonoForm');
var calleForm = document.getElementById('calleForm');
var interiorForm = document.getElementById('interiorForm');
var coloniaForm = document.getElementById('coloniaForm');
var cpForm = document.getElementById('cpForm');

var cancelForm = document.getElementById('cancelForm');

var refTest = firebase.database().ref("test");

// funcion para leer si existe un cambio en el
//estado de sesion del usuario
firebase.auth().onAuthStateChanged(function(user){
  console.log(user);
  if (user) {
    console.log('Tenemos usuario');
    leebasededatos(user.uid);
  } else {
    window.location.href = 'index.html';
    console.log('No tenemos usuario');
  }
})

//once se utiliza para leer una sola vez la información
// mientras que on se utiliza para que siempre este atento a los cambios
// y se actualice en tiempo real
function leebasededatos(uid) {
  databaseRef.child(uid).on('value', function(data) {
    console.log(data.val());
    llenarInformacion(data.val().nombre, data.val().email, data.val().telefono, data.val().Direccion);
  })
}

function llenarInformacion(nombre, email, telefono, direccion) {
  perfilNombre.innerHTML = nombre;
  perfilEmail.innerHTML = email;
  if (telefono) {
    perfilTelefono.innerHTML = telefono;
  }
  if (direccion) {
    perfilDireccion.innerHTML = direccion.calle + " " + direccion.interior + " " + direccion.colonia + " " + direccion.cp;
  }


}

btnLogout.addEventListener("click",function (){
  event.preventDefault();
  firebase.auth().signOut().then(function() {
    alert("Se cerro la sesion");
  }).catch(function(err){
    console.log(err);
  });
})

btnPush.addEventListener("click",function(){
  var objeto = {
    curso: 'firebase',
    profesor: 'angel',
    contenidos:{
      primero: 'autenticacion',
      segundo: 'database'
    }
  }
  refTest.push(objeto).then(function(){
    console.log('se subio correctamente la información');
  }).catch(function(err){
    console.log('hubo un error al subir la información' + err);
  });
})

btnUpdate.addEventListener("click",function(){
  var objeto = {
    curso: 'desarrollo web',
    profesor: 'leonidas',
    contenidos:{
      primero: 'html',
      segundo: 'css'
    }
  }
  refTest.child('-LFw_S-S_sT9crIvBjY1').update(objeto).then(function(){
    console.log('se subio correctamente la información');
  }).catch(function(err){
    console.log('hubo un error al subir la información' + err);
  });
})

btnSet.addEventListener("click",function(){
  var objeto = {
    curso: 'android',
    profesor: 'annais',
    contenidos:{
      primero: 'android',
      segundo: 'firebase'
    }
  }
  refTest.set(objeto).then(function(){
    console.log('se subio correctamente la información');
  }).catch(function(err){
    console.log('hubo un error al subir la información' + err);
  });
})

btnRemove.addEventListener("click",function(){
  refTest.child('contenidos').remove();
})

perfilEditar.addEventListener("click",function(){
  console.log('hola');
  datosPerfil.style.display = "none";
  editarDatos.style.display = "block";
})

cancelForm.addEventListener("click", function(){
  datosPerfil.style.display = "block";
  editarDatos.style.display = "none";
})

function enviarDatos() {
  event.preventDefault();
  var uid = firebase.auth().currentUser.uid;
  var obj = {
    nombre:nombreForm.value,
    email:emailForm.value,
    telefono:telefonoForm.value,
    Direccion: {
      calle:calleForm.value,
      interior:interiorForm.value,
      colonia:coloniaForm.value,
      cp:cpForm.value
    }
  }
  databaseRef.child(uid).update(obj).then(function(){
    datosPerfil.style.display = "block";
    editarDatos.style.display = "none";
  });
}
