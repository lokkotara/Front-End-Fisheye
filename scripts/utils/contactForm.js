export default  function toggleModal(e) {
  if (e !== undefined) e.preventDefault();
  const modal = document.querySelector(".contact_modal");
  modal.classList.toggle("hidden");
  if (!modal.classList.contains("hidden")) {
    const input = document.querySelector("#senderFirstName");
    input.focus();
  }
}