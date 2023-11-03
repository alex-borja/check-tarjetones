const form = document.querySelector(".form");
const inforTarjetones = document.querySelector(".infoTarjetones");

const sede = document.getElementById("sede");
const linkFinal = document.getElementById("linkFinal");
const linkBanner = document.getElementById("linkBanner");
const furriel = document.getElementById("furriel");
const kw = document.getElementById("kw");
const matomo = document.getElementById("matomo");
const pixel = document.getElementById("pixel");

const input = document.getElementById("file");
const selectedFiles = document.querySelector(".selectedFiles");

const currentTarjeton = document.createElement("div");

inforTarjetones.addEventListener("submit", async (e) => {
    e.preventDefault();

})

input.addEventListener("change", () => {
    for(const file of input.files) {
        selectedFiles.innerText += `\n${file.name}`;
    }
})

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    let files = input.files;

    let fileData = await files[0].text()
    currentTarjeton.innerHTML = fileData

    verifyLinks(currentTarjeton);
})

function verifyLinks(file) {
    let links = file.getElementsByTagName("a");

    let finalLink = links[0];
    let banner = links[1];
    let button = links[2];
    let email = links[6];

    console.log(finalLink)
    console.log(banner)
    console.log(button)
    console.log(email)

}