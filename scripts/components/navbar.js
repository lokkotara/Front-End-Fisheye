export default function render(page) {
  if (page === "photographer") return templateNavbarPhotographer();
  return templateNavbarIndex();
}

function templateNavbarIndex() {
  return /*html*/`
    <img src="./assets/images/logo.png" id="logo" class="logo" alt="Fisheye Home page"/>
    <h1>Nos photographes</h1>
  `;
}

function templateNavbarPhotographer() {
  return /*html*/`
    <img src="./assets/images/logo.png" class="logoNavbar" alt="Fisheye Home page" onclick="changePage(['index'])" tabindex="0" role="button" aria-label="Revenir à l'accueil"/>
  `;
}