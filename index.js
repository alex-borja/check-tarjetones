const form = document.querySelector(".form");
const filesForm = document.querySelector(".form-section");
const inforTarjetones = document.querySelector(".info-tarjetones");

const sede = document.getElementById("sede");
const linkFinal = document.getElementById("linkFinal");
const linkBanner = document.getElementById("linkBanner");
const linkSede = document.getElementById("linkSede");
const furriel = document.getElementById("furriel");
const kw = document.getElementById("kw");
const matomo = document.getElementById("matomo");
const pixel = document.getElementById("pixel");

const input = document.getElementById("file");
const selectedFiles = document.querySelector(".selectedFiles");
const alertDom = document.querySelector(".alert");

const corrections = document.getElementsByClassName("corrections hidde")[0];

let alert = "";
let showInputForm = false;
let showInputParams = true;

inforTarjetones.addEventListener("submit", (e) => {
    e.preventDefault();
    if(
        sede.value === "" ||
        linkFinal.value === "" ||
        linkBanner.value === "" ||
        furriel.value === "" ||
        kw.value === "" ||
        matomo.value === "" ||
        pixel.value === ""
    ) {
        alert = "Llena todos los campos antes de seguir";
        alertDom.textContent = alert;
    } else {
        alertDom.style.display = "none";

        showInputForm = true;
        if(showInputForm) filesForm.classList = "form-section"
    }
})

input.addEventListener("change", () => {
    for(const file of input.files) {
        selectedFiles.innerText += `\n${file.name}`;
    }
})

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    let files = input.files;
    corrections.classList = "corrections";

    for (const file of files) {
        let fileData = await file.text()
        let currentTarjeton = document.createElement("div");
        currentTarjeton.innerHTML = fileData

        let linksInfo = verifyLinks(currentTarjeton);
        console.log(linksInfo)

        let fileCorrection = document.createElement("div");
        let fileCorrections = `<div class="file-corrections">
                <p>${file.name}</p>
                <br>
                <ul>
                    <li>${linksInfo[0]}</li> 
                    <li>${linksInfo[1]}</li> 
                    <li>${linksInfo[2]}</li> 
                </ul>
        </div>`

        fileCorrection.innerHTML += fileCorrections
        corrections.appendChild(fileCorrection);
    }
})

function verifyLinks(file) {
    let links = file.getElementsByTagName("a");

    let finalLinkFromParams = linkFinal.value.trim() + furriel.value.trim() + kw.value.trim() + matomo.value.trim()
    let bannerLinkFromParams = linkBanner.value + furriel.value + kw.value + matomo.value
    let emailLinkFromParams = linkSede.value + furriel.value + kw.value + matomo.value

    let finalLink = links[0].href;
    let banner = links[1].href;
    let email = links[6].href;

    let checkFinalLink = checkUrls(finalLinkFromParams, finalLink)
    let checkBannerLink = checkUrls(bannerLinkFromParams, banner)
    let checkEmailLink = checkUrls(emailLinkFromParams, email)

    let info = [];

    if(!checkFinalLink) {
        info.push("Hay un error en este link: " + finalLink + 
        "\nEl valor correcto es: " + finalLinkFromParams)
    } else {
        info.push("Final link correct");
    }

    if(!checkBannerLink) {
        info.push(
            "Hay un error en este link: " + banner + 
            "\nEl valor correcto es: " + bannerLinkFromParams 
        )
    } else {
        info.push("Banner and button link correct");
    }

    if(!checkEmailLink) {
        info.push(
            "Hay un error en este link: " + email + 
            "\nEl valor correcto es: " + emailLinkFromParams 
        )
    } else {
        info.push("Email link correct");
    }
    return info;
}

function checkUrls(urlFromParams, urlFromFile) {
    return urlFromParams === urlFromFile ? true : false;
}
