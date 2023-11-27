/* global bootstrap: false */
(() => {
  'use strict'
  const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.forEach(tooltipTriggerEl => {
    new bootstrap.Tooltip(tooltipTriggerEl)
  })
})()

const close1 = document.getElementById("close")
const back1 = document.getElementById("back")

//function sidebar-small
const sidebarSmall = () => {
  
  sidebar.classList.add("sidebar-small")
  close1.classList.add("hide")
  back1.style.display='block'
}
//function sidebar-big
const sidebarBig = () => {

  sidebar.classList.remove("sidebar-small")
  close1.classList.remove("hide")
  back1.style.display='none'
}


if (localStorage.getItem("IsSmall")==="Yes") {
  sidebarSmall()
}else{
  sidebarBig()
}

close1.addEventListener("click", (eo) => {
  localStorage.setItem("IsSmall", "Yes" )
  eo.preventDefault()
  sidebarSmall()
})
back1.addEventListener("click", (eo) => {
  localStorage.setItem("IsSmall", "No" )
  eo.preventDefault()
  sidebarBig()
})
