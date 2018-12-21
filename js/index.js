var btnLoginG = document.getElementById('btnLoginG');
var btnLoginF = document.getElementById('btnLoginF');
var btnLogout = document.getElementById('btnLogout');

var btnProfile = document.getElementById('btnProfile');
var btnAdmin = document.getElementById('btnAdmin');

const imgref = firebase.storage().ref()
var refGuitarras = firebase.database().ref("guitarras")

//Consulta de una imagen
// imgref.child("invie-acustica.png").getDownloadURL().then(function(url){
//   console.log (url);
// })

var databaseRef = firebase.database().ref('usuario');
var usuario = {};

// console.log(btnLoginG);
// console.log(btnLoginF);
// console.log(btnLogout);

firebase.auth().onAuthStateChanged(function(user){
// console.log(user);
  if (user) {
    console.log('Tenemos usuario');
    btnLoginG.style.visibility = "hidden";
    btnLoginF.style.visibility = "hidden";
    btnLogout.style.visibility = "visible";
    btnProfile.style.visibility = "visible";
    btnAdmin.style.visibility = "visible";
  } else {
    console.log('No tenemos usuario');

    btnLoginG.style.visibility = "visible";
    btnLoginF.style.visibility = "visible";
    btnLogout.style.visibility = "hidden";
    btnProfile.style.visibility = "hidden";
    btnAdmin.style.visibility = "hidden";

  }
})

// Sign in using a popup google.
btnLoginG.addEventListener("click",function (){
  event.preventDefault();
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  firebase.auth().signInWithPopup(provider)
  .then(function(datosUsuario){
    console.log(datosUsuario);
    usuario = {
      nombre: datosUsuario.user.displayName,
      email: datosUsuario.user.email,
      uid: datosUsuario.user.uid
    }
    //console.log(usuario.uid);
    agregarUsuario(usuario, usuario.uid);
  }).catch(function(err){
    console.log(err);
  });
})

// Sign in using a popup facebook.
btnLoginF.addEventListener("click",function(){
  event.preventDefault();
  var provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('public_profile');
  firebase.auth().signInWithPopup(provider).then(function(datosUsuario) {
    console.log(datosUsuario);
    usuario = {
      nombre: datosUsuario.user.displayName,
      email: datosUsuario.user.email,
      uid: datosUsuario.user.uid
    }
    //console.log(usuario.uid);
    agregarUsuario(usuario, usuario.uid);
  }).catch(function(err){
    console.log(err);
  });
})


btnLogout.addEventListener("click",function (){
  event.preventDefault();
  firebase.auth().signOut().then(function() {
    console.log("Se cerro la sesion");
    alert("Se cerro la sesion");
  }).catch(function(err){
    console.log(err);
  });
})

btnProfile.addEventListener("click",function (){
  event.preventDefault();
  window.location.assign("../perfil.html");
})

btnAdmin.addEventListener("click",function (){
  event.preventDefault();
  window.location.assign("../admin.html");
})







function agregarUsuario(usuario,uid) {
  databaseRef.child(uid).update(usuario)
}

function leerGuitarras () {
  refGuitarras.child('vip').on('child_added', (datos) => {
    console.log('vip', datos.val())
    const guitar = datos.val()
    const nombreGui = datos.val().nombre
    const contenedorElementos = document.getElementById('guitarrasContent')
    console.log(datos.key, guitar.nombre, guitar.precio, guitar.descripcion, guitar.metadata)
    contenedorElementos.insertBefore(
      crearElementoGuitarra(datos.key, guitar.nombre, guitar.precio, guitar.descripcion, guitar.imagen),
        contenedorElementos.firsChild
      )
  } )
}

function leerguitarrasVip () {
  refGuitarras.child('normal').on('child_added', (datos) => {
    console.log('normales', datos.val())
    const guitar = datos.val()
    const nombreGui = datos.val().nombre
    const contenedorElementos = document.getElementById('guitarrasContentVip')
    console.log(datos.key, guitar.nombre, guitar.precio, guitar.descripcion, guitar.metadata)
    contenedorElementos.insertBefore(
      crearElementoGuitarra(datos.key, guitar.nombre, guitar.precio, guitar.descripcion, guitar.imagen),
        contenedorElementos.firstChild
      )
  } )
}

function crearElementoGuitarra(key, nombre, precio, descripcion, img) {
  const uid = firebase.auth().currentUser.uid

  const html =
      '<article class="guitarra contenedor">' +
        '<img class="derechac" src="" alt="Guitarra Invie Acustica" width="150"/>' +
        '<div class="contenedor-guitarra-a">' +
          '<h3 class="title-b"></h3>' +
          '<ol>' +
            '<li class="precio-b"></li>' +
            '<li class="descripcion-b"></li>' +
          '</ol>' +
        '</div>' +
        '<button type="button" onclick="comprar('+'`'+key+'`'+')">Comprar</button>'+
      '</article>'

  // Create the DOM element from the HTML
  const div = document.getElementById('div')
  div.innerHTML = html

  const guitarElement = div.firstChild
  var imgURL = ""
  imgref.child(img).getDownloadURL().then((url) => {
    imgURL = url
  }).then(() => {
    guitarElement.getElementsByClassName('title-b')[0].innerText = nombre
    guitarElement.getElementsByClassName('precio-b')[0].innerText = precio
    guitarElement.getElementsByClassName('descripcion-b')[0].innerText = descripcion
    guitarElement.getElementsByClassName('derechac')[0].src = imgURL
  })
  return guitarElement
}

leerGuitarras()
leerguitarrasVip()
