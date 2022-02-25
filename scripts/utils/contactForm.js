function toggleModal() {
  const body = document.querySelector("body");
  const modal = document.querySelector(".contact_modal");
  const button = document.querySelector(".contact_button");
  modal.classList.toggle("hidden");
  if (modal.classList.contains("hidden")) {
    button.focus();
    body.classList.remove("noScroll");
  }
  if (!modal.classList.contains("hidden")) {
    manageModalNav();
    body.classList.add("noScroll");
  }
}

function templateModal(photographer) {
  return /*html*/`
    <div class="modal" role="dialog">
      <header>
        <section class="modalTitleContainer">
          <p>Contactez-moi</p>
          <div>
            <img src="assets/icons/close.svg" onclick="toggleModal(event)" class="modalCloseButton" alt="Icone pour fermer la modale" tabindex="0"/>
          </div>
        </section>
        <p class="modalTitleName">${photographer.name}</p>
      </header>
      <form name="myform" id="myform" method="dialog">
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
        <button class="formButton" type="button" onclick="submitForm(event)">Envoyer</button>
      </form>
    </div>
  `;
}

function manageModalNav() {
  const  focusableElements =
  "button, input, textarea, [tabindex]:not([tabindex=\"-1\"])";
  const modal = document.querySelector(".contact_modal");
  const focusableContent = modal.querySelectorAll(focusableElements);

  const firstFocusableElement = focusableContent[0];
  const secondFocusableElement = focusableContent[1];
  const lastFocusableElement = focusableContent[focusableContent.length - 1];
  const focusableContentArr = Array.from(focusableContent);
  const img = focusableContentArr.shift();
  focusableContentArr.push(img);

  document.addEventListener("keydown", e => {
    const isTabPressed = e.key === "Tab";
    if (!isTabPressed) {
      return;
    }
    if (e.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus();
        e.preventDefault();
      }
    }
  });
  secondFocusableElement.focus();
}

export {
  templateModal,
  toggleModal,
};