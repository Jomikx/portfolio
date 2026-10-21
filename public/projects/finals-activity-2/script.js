const Message1 = document.getElementById("message")
const Button1 = document.getElementById("loadbtn")
const Profile1 = document.getElementById("profile")
const Grades1 = document.getElementById("grades")
const Schedule1 = document.getElementById("schedule")


Button1.addEventListener("click", function () {

    Button1.disabled = true

    Message1.innerHTML = "Loading Dashboard..."
    Profile1.innerHTML = "Profile: waiting..."
    Grades1.innerHTML = "Grades: waiting..."
    Schedule1.innerHTML = "Schedule: waiting..."

    const profilepromise = new Promise(function (resolve) {
        setTimeout(function () {
            Profile1.innerHTML = "Profile: loaded"
            resolve()
        }, 1000)
    })

    const gradespromise = new Promise(function (resolve) {
        setTimeout(function () {
            Grades1.innerHTML = "Grades: loaded"
            resolve()
        }, 2000)
    })

    const schedulepromise = new Promise(function (resolve) {
        setTimeout(function () {
            Schedule1.innerHTML = "Schedule: loaded"
            resolve()
        }, 3000)
    })

    Promise.all([profilepromise, gradespromise, schedulepromise])
        .then(function () {
            setTimeout(function () {
                Message1.innerHTML = "Dashboard Ready!"
                Button1.disabled = false
            }, 2000)
        })

})
