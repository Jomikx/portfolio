const firstname = document.getElementById("firstname")
const formbox = document.getElementById("formbox")
const statusbar = document.getElementById("statusbar")
const nameinput = document.getElementById("nameinput")
const yearselect = document.getElementById("yearselect")
const displayname = document.getElementById("displayname")
const webtext = document.getElementById("webtext")

const clickbutton = document.getElementById("clickbutton")
const doubleclickbutton = document.getElementById("doubleclickbutton")
const pressholdbutton = document.getElementById("pressholdbutton")

firstname.innerHTML = "Aljo"

// Click
clickbutton.addEventListener("click", function () {
    firstname.innerHTML = "Future Web Developer!"
})

// DoubleClick
doubleclickbutton.addEventListener("dblclick", function () {
    firstname.innerHTML = "Future Web Developer!"
})

// Press & Hold (held for 1 second)
let holdtimer = null

pressholdbutton.addEventListener("mousedown", function () {
    holdtimer = setTimeout(function () {
        firstname.innerHTML = "Future Web Developer!"
        statusbar.innerHTML = "You held the button"
    }, 1000)
})

function stophold() {
    clearTimeout(holdtimer)
}

pressholdbutton.addEventListener("mouseup", stophold)
pressholdbutton.addEventListener("mouseleave", stophold)

// Nickname
nameinput.addEventListener("input", function () {
    displayname.innerHTML = nameinput.value
})

// Year level
yearselect.addEventListener("change", function () {
    webtext.innerHTML = yearselect.value
})

// Status bar
formbox.addEventListener("mouseenter", function () {
    statusbar.innerHTML = "You enter the Form"
})

formbox.addEventListener("mouseleave", function () {
    statusbar.innerHTML = "You leave the Form"
})
