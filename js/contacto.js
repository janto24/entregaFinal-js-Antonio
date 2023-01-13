const mailDelUsuarioContacto = document.querySelector("#mail")
const formularioContacto = document.querySelector("#formContact")

const mailValido = email => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const funcionValidadoraMail = (a) => {
 if (!mailValido(a.value)) {
    return false
  } else {
    return true
  }
}


async function evento (e) {
  e.preventDefault()
  if (!funcionValidadoraMail(mailDelUsuarioContacto)) {
    swal({
      position: "top-end",
      icon: "error",
      title: `"${mailDelUsuarioContacto.value}" no es un mail válido`,
    }) 
  } else {    
  let data = new FormData(e.target);
  fetch(formularioContacto.action, {
    method: formularioContacto.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      formularioContacto.reset()
      swal({
        position: "top-end",
        icon: "success",
        title: "¡Gracias, nos podremos en contacto!",
        timer: 3000
      });
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          swal({
            position: "top-end",
            icon: "error",
            title: `${data["errors"].map(error => error["message"]).join(", ")}`,
          })
        } else {
          swal({
            position: "top-end",
            icon: "error",
            title: "Tuvimos un problema al enviar el formulario.",
            showConfirmButton: true
          })
        }
      })
    }
  }).catch(error => {
    swal({
      position: "top-end",
      icon: "error",
      title: "Tuvimos un problema al enviar el formulario.",
      showConfirmButton: true
    })
  });
} 
}

formularioContacto.addEventListener("submit", evento)