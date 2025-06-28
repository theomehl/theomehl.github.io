console.log('loading banner ad...');
let container = document.querySelector('#ad-container');
let element = document.createElement('div');
element.id = 'Adbanner';
element.innerHTML = 'On a website running real ads, this would have been a banner ad.';
element.classList.add('notice');

container.appendChild(element);
