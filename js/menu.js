const ham = document.querySelector('.nav-toggle');
const menu = document.querySelector('.menuResponsive');
let icon = document.querySelector('.nav-toggle i');

ham.addEventListener('click', () =>{
   menu.classList.toggle('active');
   if(menu.classList.contains('active')){
       icon.setAttribute('class', 'fas fa-times');
   }else{
    icon.setAttribute('class', 'fas fa-bars');
   }
});