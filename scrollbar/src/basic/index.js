import SimpleBar from 'simplebar';

document.addEventListener('DOMContentLoaded', () => {

	const myElement = document.querySelector('.custom-scrollbar');
	new SimpleBar(myElement, { autoHide: false });

});

