// Get the modal
var modal = document.getElementById('myModal');

// Get the modal content
var modalContent = document.getElementsByClassName('modal-content');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
	var modalWrapper = document.getElementById('modal-wrapper');
	modalWrapper.remove();

}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
		var modalWrapper = document.getElementById('modal-wrapper');
		modalWrapper.remove();
    }
}

function getModal(){
	modal.style.display = "block";
	var currentmodal = document.getElementById('myModal');
	var myModal = currentmodal.getElementsByClassName('modal-content')[0];
	var modalWrapper = document.createElement('div');
	modalWrapper.id = "modal-wrapper";
	myModal.appendChild(modalWrapper);
}
