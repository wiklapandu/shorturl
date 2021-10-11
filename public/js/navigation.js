const Menu = document.getElementById('Verticalmenu');
const btnOpen = document.getElementById('openMenu');
const btnClose = document.getElementById('closeMenu');
btnOpen.addEventListener('click', () => {
    Menu.style.transform = 'translateX(0px)'
})
btnClose.addEventListener('click', () => {
    Menu.style.transform = 'translateX(1080px)';
})