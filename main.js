URL = document.URL

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

console.log(URL)
if (URL.startsWith("https://modrinth.com/checklist")) {
    document.querySelector("title").innerHTML = "Mod Checklist | Modrinth"
    console.log("in url")
    main = document.querySelector("main")
    waitForElm('a[href="https://discord.gg/EUHuJHt"]').then((elm) => {
        elm.remove()
    })
    waitForElm('main div#main.main').then((elm) => {
        elm.remove()
    })
    waitForElm('a.iconified-button.raised-button.brand-button.nuxt-link-active[href="/"]').then((elm) => {
        elm.remove()
    })

    const version_box = document.createElement("input")
    version_box.type = "text"
    version_box.classList.add("iconified-button")
    version_box.classList.add("raised-button")
    version_box.classList.add("brand-button")
    version_box.classList.add("nuxt-link-active")
    version_box.value = "1.19.2"
    version_box.style.marginLeft = "39%"

    const loader_box = document.createElement("input")
    loader_box.type = "text"
    loader_box.classList.add("iconified-button")
    loader_box.classList.add("raised-button")
    loader_box.classList.add("brand-button")
    loader_box.classList.add("nuxt-link-active")
    loader_box.value = "Fabric"
    loader_box.style.marginLeft = "39%"

    const download_button = document.createElement("button")
    download_button.classList.add("iconified-button")
    download_button.classList.add("raised-button")
    download_button.classList.add("brand-button")
    download_button.classList.add("nuxt-link-active")
    download_button.innerHTML = "Download all mods"
    download_button.addEventListener("click", function() {
        console.log("DOWNLOADING")
        res = localStorage.getItem("mods-checklist-m").split(",")
        console.log(res)
        for (let i = 0;i < res.length;i++) {
            modid = res[i][0]
            // make it actually auto download, CLASS download-button
            window.open(`https://modrinth.com/mod/${modid}/versions?g=${version_box.value}&l=${loader_box.value}`, '_blank')
        }
        localStorage.setItem("mods-checklist-m", []) 
    })
    download_button.style.marginLeft = "39%"
    const download_list = document.createElement("p")
    download_list.classList.add("links")
    download_list.classList.add("links-2")
    base = '<h4 style="color:var(--color-text-dark);">Mods:</h4>'
    download_list.innerHTML = base
    download_list.style.width = "100%"
    download_list.style.textAlign = "center"
    
    res = localStorage.getItem("mods-checklist-m").split(",")
    console.log(res)
    res.sort(function(a, b){
        return b.length - a.length;
    });
    final = base
    for (let i = 0;i < res.length;i++) {
        mod = res[i]
        final = final + "<br>" + mod
    }
    download_list.innerHTML = final

    main.appendChild(version_box)
    main.appendChild(loader_box)
    main.appendChild(download_button)
    main.appendChild(download_list)
}

document.addEventListener("mousemove", function(){
    waitForElm(".project-card").then(() => {
        console.log("ae")
        if (document.querySelector(".project-card")) { 
            cards = document.querySelectorAll(".project-card")
            for (let i = 0;i < cards.length;i++) {
                if (!cards[i].querySelector(".nuxt-link-active")) {
                    const checklist_add = document.createElement("button")
                    const nameofcard = cards[i].querySelector('h2[class="name"]').parentNode.href.replaceAll("https://modrinth.com/mod/","")
                    if (localStorage.getItem("mods-checklist-m").indexOf(nameofcard) > -1) {
                        checklist_add.classList.add("brand-button")
                    }
                    checklist_add.classList.add("iconified-button")
                    checklist_add.classList.add("raised-button")
                    checklist_add.classList.add("nuxt-link-active")
                    checklist_add.innerHTML = "Add to checklist"
                    checklist_add.addEventListener("click", function() {
                        checklist_add.classList.toggle("brand-button")
                        let res = []
                        if (localStorage.getItem("mods-checklist-m")) {
                            res = localStorage.getItem("mods-checklist-m").split(",")
                            console.log(res)
                        }
                        if (checklist_add.classList.contains("brand-button")) {
                            res.push(nameofcard)
                            localStorage.setItem("mods-checklist-m", res.toString())
                            
                            console.log("ADDING")
                        } else {
                            const index = res.indexOf(nameofcard);
                            if (index > -1) {
                                res.splice(index, 1);
                            }
                            localStorage.setItem("mods-checklist-m", res.toString())
                            
                            console.log("REMOVING")
                        }
                    })
                    cards[i].appendChild(checklist_add)
                }
            }
        }
    })
})