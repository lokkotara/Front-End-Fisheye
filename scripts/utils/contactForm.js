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
          <input type="text" name="senderFirstName"id="senderFirstName" required/>
          <label for="senderLastName">Nom</label>
          <input type="text" name="senderLastName" id="senderLastName" required/>
          <label for="senderEmail">Email</label>
          <input type="email" name="senderEmail" id="senderEmail" required/>
          <label for="senderContent">Votre message</label>
          <textarea rows="2" name="senderContent" id="senderContent" required></textarea>
        </div>
        <button class="formButton" type="submit">Envoyer</button>
      </form>
    </div>
  `;//TODO : la touche entrée semble déclencher la soumission du formulaire
}

export {
  templateModal,
  toggleModal,
};