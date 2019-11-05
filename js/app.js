function applyTheme()
{
	document.body.classList.remove(previousPalette);
	previousPalette = this.value;
	document.body.classList.add(this.value);

	generateCanvas(canvas);
}

function generateCanvas(canvas)
{
	html2canvas(document.querySelector('#stage'), {
		backgroundColor: null,
		canvas: canvas,
		scale: 1,
		width: 1280,
		height: 720,
	});
}

function resizeSticky()
{
	stickyWidth = sticky.parentElement.clientWidth;
	sticky.style.width = stickyWidth + 'px';
}

function updateStage()
{
	stage.classList.remove(previousLayout);
	previousLayout = this.value;
	stage.classList.add(this.value);

	generateCanvas(canvas);
}

const canvas           = document.getElementById('canvas'),
      darkModeToggle   = document.getElementById('toggle'),
      form             = document.getElementById('form'),
	  imageLoader      = document.getElementById('input-image'),
	  layoutLogos      = document.querySelectorAll('.layout__logo'),
      layoutSelectors  = document.forms.form.elements.layout,
	  logoLoader       = document.getElementById('input-logo'),
	  paletteSelectors = document.forms.form.elements.palette,
	  stage            = document.getElementById('stage'),
	  sticky           = document.querySelector('.sticky'),
	  textInputs       = document.querySelectorAll('.input--text');
	  
let   previousLayout,
      previousPalette,
      stickyWidth = sticky.parentElement.clientWidth;

sticky.style.width = stickyWidth + 'px';

darkModeToggle.addEventListener('change', (event) => {
	document.body.classList.toggle('dark-mode');
});

for (var i = 0; i < layoutSelectors.length; i++) {
	layoutSelectors[i].addEventListener('change', updateStage);
}

for (var i = 0; i < paletteSelectors.length; i++) {
	paletteSelectors[i].addEventListener('change', applyTheme);
}

logoLoader.addEventListener('change', (event) => {
	let reader = new FileReader();

	reader.onload = function(event) {
		let img = new Image();

		img.onload = function() {
			let logos   = document.querySelectorAll('.layout__logo'),
				logoSrc = 'url(' + img.src + ')';

			for (var i = 0, max = logos.length; i < max; i++) {
				logos[i].style.backgroundImage = logoSrc;
			}

			generateCanvas(canvas);

			for (var i = 0, max = layoutLogos.length; i < max; i++) {
				layoutLogos[i].style.backgroundImage = logoSrc;
			}
		};
		img.src = event.target.result;
	};
	reader.readAsDataURL(event.target.files[0]);  
});

imageLoader.addEventListener('change', (event) => {
	let reader = new FileReader();

	reader.onload = function(event) {
		let img = new Image();

		img.onload = function() {
			stage.style.backgroundImage = 'url(' + img.src + ')';
			generateCanvas(canvas);
		};
		img.src = event.target.result;
	};
	reader.readAsDataURL(event.target.files[0]);  
});

textInputs.forEach(function(elem) {
	elem.addEventListener('change', (event) => {
		let results = document.querySelectorAll('.' + event.target.dataset.target);

		for (var i = 0, max = results.length; i < max; i++) {
			results[i].textContent = event.target.value;
		}
		generateCanvas(canvas);
	});
});

form.addEventListener('submit', (event) => {
	event.preventDefault();

	let imageName = 'test.jpg',
		canvas    = document.getElementById('canvas');

	canvas.toBlob(function(blob) {
		saveAs(blob, imageName);
	});

	return;
});

window.addEventListener('resize', resizeSticky);

/**
 * Change name of custom input labels to match filename
var inputs = document.querySelectorAll( '.inputfile' );
Array.prototype.forEach.call( inputs, function( input )
{
	var label	 = input.nextElementSibling,
		labelVal = label.innerHTML;

	input.addEventListener( 'change', function( e )
	{
		var fileName = '';
		if( this.files && this.files.length > 1 )
			fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
		else
			fileName = e.target.value.split( '\' ).pop();

		if( fileName )
			label.querySelector( 'span' ).innerHTML = fileName;
		else
			label.innerHTML = labelVal;
	});
});
 */


/**
 * May be able to use this to load in custom Google fonts
 * function(){

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "Public/Scripts/filename.js."; 
    document.getElementsByTagName("head")[0].appendChild(script);
    return false;
 */