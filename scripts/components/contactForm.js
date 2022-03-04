const form = document.forms["myform"];

/**
 * Permet de gérer l'ouverture et la fermeture de la modale de contact.
 * Gère aussi le scroll sur le reste du document en fonction de l'ouverture de la modale
 */
function toggleModal() {
  const body = document.querySelector("body");
  const infosContainer = document.querySelector(".infoContainer");
  const modal = document.querySelector(".contact_modal");
  const input = document.getElementById("senderFirstName");
  if (!modal.open) {
    modal.showModal();
    input.focus();
    body.classList.add("noScroll");
    infosContainer.classList.add("noScrollInfos");
  } else {
    modal.close();
    body.classList.remove("noScroll");
    infosContainer.classList.remove("noScrollInfos");
  }
}

function templateModal(photographer) {
  return /*html*/`
    <div class="modal">
      <header>
        <section class="modalTitleContainer">
          <p>Contactez-moi</p>
          <div>
            <img src="assets/icons/close.svg" onclick="toggleModal()" class="modalCloseButton" alt="Icone pour fermer la modale" tabindex="0"/>
          </div>
        </section>
        <p class="modalTitleName">${photographer.name}</p>
      </header>
      <form name="myform" id="myform" method="dialog" onsubmit="submitForm(event)">
        <div>
          <label for="senderFirstName">Prénom</label>
          <input type="text" name="senderFirstName"id="senderFirstName" pattern="^[a-zA-Z]{1}[a-zA-Z'À-ÿ -]+$" oninput="checkValidityInput(event, 'senderFirstName')" required/>
          <label for="senderLastName">Nom</label>
          <input type="text" name="senderLastName" id="senderLastName" pattern="^[a-zA-Z]{1}[a-zA-Z'À-ÿ -]+$" oninput="checkValidityInput(event, 'senderLastName')" required/>
          <label for="senderEmail">Email</label>
          <input type="email" name="senderEmail" id="senderEmail" pattern="^[A-Za-z0-9](([_.-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_.-]?[a-zA-Z0-9]+)*).([A-Za-z]{2,})" oninput="checkValidityInput(event, 'senderEmail')" required/>
          <label for="senderContent">Votre message</label>
          <textarea rows="2" name="senderContent" id="senderContent" oninput="checkValidityInput(event, 'senderContent')" required></textarea>
        </div>
        <button class="formButton" type="submit">Envoyer</button>
      </form>
    </div>
  `;
}

function checkValidityInput(e, input) {
  if (!e.target.validity.valid) form.elements[input].classList.add("invalid");
  if (e.target.validity.valid) form.elements[input].classList.remove("invalid");
}

export {
  checkValidityInput,
  templateModal,
  toggleModal,
};