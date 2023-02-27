version = "1.6.1"

function log(a) {
    console.log("[Modrinth Checklist Updating] ", a)
}
const versionAlert = document.createElement("button")
versionAlert.style.transition = "1s 1s"
versionAlert.style.position = "fixed"
versionAlert.style.fontSize = "2em"
versionAlert.style.height = "7em"
versionAlert.style.width = "10em"
versionAlert.style.left = "-100%"
versionAlert.style.top = "5em"
versionAlert.innerHTML = "Modrinth Checklist is not updated! Click here to get latest release."
versionAlert.classList.add("iconified-button")
versionAlert.classList.add("raised-button")
versionAlert.classList.add("nuxt-link-active")
versionAlert.classList.add("brand-button")

document.querySelector(".layout").appendChild(versionAlert)
log("Checking version...")
fetch('https://raw.githubusercontent.com/achoolucgust/ModrinthLister/main/version.txt').then(response => {
    response.text().then(latest => {
        log(version)
        log(latest)
        if (version != latest) {
            log("Not Updated")
            versionAlert.style.left = "5em"          
        }
    })
})