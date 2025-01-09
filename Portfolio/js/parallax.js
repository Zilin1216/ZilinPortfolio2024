let text = document.getElementById('text');
let BG = document.getElementById('BG');
let tree = document.getElementById('tree');

window.addEventListener('scroll', ()=>{
    let value = window.scrollY;

    text.style.marginTop = value * 2.5 + 'px';
    left.style.left = value * -1.5 + 'px'; 
    right.style.left = value * 1.5 + 'px';
});