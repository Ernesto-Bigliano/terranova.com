// Slider funcionalidad
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
let current = 0;

function showSlide(idx) {
	slides.forEach((slide, i) => {
		slide.classList.toggle('active', i === idx);
	});
}
function nextSlide() {
	current = (current + 1) % slides.length;
	showSlide(current);
}
function prevSlide() {
	current = (current - 1 + slides.length) % slides.length;
	showSlide(current);
}
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);
// Auto-slide cada 5 segundos
setInterval(nextSlide, 5000);

// Slider infinito marcas
const marcasCarousel = document.getElementById('marcasCarousel');
let scrollAmount = 0;
let marcasWidth = marcasCarousel.scrollWidth / 2;
let lastTimestamp = null;
const VELOCIDAD = 40; // px por segundo, ajustable

function animateMarcasSlider(ts) {
	if (!lastTimestamp) lastTimestamp = ts;
	const delta = ts - lastTimestamp;
	lastTimestamp = ts;
	scrollAmount += (VELOCIDAD * delta) / 1000;
	if (scrollAmount >= marcasWidth) {
		marcasCarousel.style.transition = 'none';
		scrollAmount = 0;
		marcasCarousel.style.transform = `translateX(0px)`;
		void marcasCarousel.offsetWidth;
		marcasCarousel.style.transition = '';
	} else {
		marcasCarousel.style.transform = `translateX(-${scrollAmount}px)`;
	}
	requestAnimationFrame(animateMarcasSlider);
}
if (marcasCarousel) {
	requestAnimationFrame(animateMarcasSlider);
}

// Modal modelos destacados
const modelosData = {
	familiar: {
		imgs: [
			'img/1_TerraNova_-29.webp',
			'img/1_TerraNova_-11.webp',
			'img/1_TerraNova_-14.webp',
		],
		title: 'Modelo Familiar',
		desc: 'El Modelo Familiar está pensado para quienes buscan comodidad y espacio. Cuenta con 2 o 3 dormitorios, living comedor amplio, cocina funcional y baño completo. Ideal para familias que desean crecer en un entorno moderno, seguro y eficiente. Materiales de alta calidad y excelente aislación térmica.',
	},
	compacto: {
		imgs: [
			'img/1_TerraNova_-29.webp',
			'img/1_TerraNova_-27.webp',
			'img/1_TerraNova_-29.webp',
		],
		title: 'Modelo Compacto',
		desc: 'El Modelo Compacto es perfecto para parejas, personas solas o como inversión. Diseño inteligente que aprovecha cada metro, bajo mantenimiento y rápido montaje. Incluye dormitorio, baño, cocina integrada y espacio de estar. Ideal para lotes pequeños o como casa de fin de semana.',
	},
	premium: {
		imgs: [
			'img/1_TerraNova_-29.webp',
			'img/1_TerraNova_-6.webp',
			'img/1_TerraNova_-14.webp',
		],
		title: 'Modelo Premium',
		desc: 'El Modelo Premium ofrece espacios generosos, terminaciones de alta gama y la posibilidad de personalizar cada ambiente. Grandes ventanales, suite principal, cocina gourmet y detalles exclusivos. La mejor opción para quienes buscan confort y distinción.',
	},
};
const modal = document.getElementById('modal-modelo');
const modalImgSlider = document.getElementById('modal-modelo-img-slider');
const modalTitle = document.getElementById('modal-modelo-title');
const modalDesc = document.getElementById('modal-modelo-desc');
const closeModal = document.querySelector('.modal-modelo-close');
const prevModalBtn = document.querySelector('.modal-slider-btn.prev');
const nextModalBtn = document.querySelector('.modal-slider-btn.next');
let sliderImgs = [];
let sliderIdx = 0;

document.querySelectorAll('.ver-detalle-btn').forEach((btn) => {
	btn.addEventListener('click', function (e) {
		e.preventDefault();
		const modelo = this.closest('.modelo-card').dataset.modelo;
		const data = modelosData[modelo];
		sliderImgs = data.imgs;
		sliderIdx = 0;
		modalImgSlider.src = sliderImgs[sliderIdx];
		modalTitle.textContent = data.title;
		modalDesc.textContent = data.desc;
		modal.classList.add('open');
		document.body.style.overflow = 'hidden';
	});
});
function showModalImg(idx) {
	if (!sliderImgs.length) return;
	sliderIdx = (idx + sliderImgs.length) % sliderImgs.length;
	modalImgSlider.src = sliderImgs[sliderIdx];
}
nextModalBtn.addEventListener('click', (e) => {
	e.stopPropagation();
	showModalImg(sliderIdx + 1);
});
prevModalBtn.addEventListener('click', (e) => {
	e.stopPropagation();
	showModalImg(sliderIdx - 1);
});
modalImgSlider.addEventListener('click', () => {
	showModalImg(sliderIdx + 1);
});
closeModal.addEventListener('click', () => {
	modal.classList.remove('open');
	document.body.style.overflow = '';
});
modal.addEventListener('click', (e) => {
	if (e.target === modal) {
		modal.classList.remove('open');
		document.body.style.overflow = '';
	}
});
// --- Modal imagen ampliada ---
const modalImgAmpliada = document.getElementById('modal-img-ampliada');
const imgAmpliada = document.getElementById('img-ampliada');
const closeImgAmpliada = document.querySelector('.modal-img-ampliada-close');
modalImgSlider.addEventListener('click', function (e) {
	if (e.target.tagName === 'IMG') {
		imgAmpliada.src = e.target.src;
		modalImgAmpliada.classList.add('open');
		document.body.style.overflow = 'hidden';
	}
});
closeImgAmpliada.addEventListener('click', () => {
	modalImgAmpliada.classList.remove('open');
	document.body.style.overflow = '';
});
modalImgAmpliada.addEventListener('click', (e) => {
	if (e.target === modalImgAmpliada) {
		modalImgAmpliada.classList.remove('open');
		document.body.style.overflow = '';
	}
});
// Animación logo rebote al hacer clic
const logo = document.getElementById('logoTerraNova');
if (logo) {
	logo.addEventListener('click', function () {
		logo.classList.remove('animated');
		void logo.offsetWidth;
		logo.classList.add('animated');
	});
}

// --- Ocultar header al llegar al h1 de la sección inicio ---
(function () {
	const header = document.querySelector('.header');
	const heroH1 = document.querySelector('.hero h1');
	if (!header || !heroH1) return;
	let lastScroll = window.scrollY;
	function checkHeader() {
		const h1Rect = heroH1.getBoundingClientRect();
		const headerHeight = header.offsetHeight;
		// Si el borde superior del h1 está por debajo del header, mostrar header
		if (h1Rect.top > headerHeight) {
			header.style.transform = 'translateY(0)';
		} else {
			header.style.transform = 'translateY(-100%)';
		}
		header.style.transition = 'transform 0.4s cubic-bezier(0.4,1.4,0.4,1)';
	}
	window.addEventListener('scroll', checkHeader);
	window.addEventListener('resize', checkHeader);
	// Inicializar estado
	checkHeader();
})();
