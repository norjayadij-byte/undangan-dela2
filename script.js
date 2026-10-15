"use strict";
const pages = Array.from(document.querySelectorAll('.flip-page'));
const openButton = document.getElementById('openInvite');
const music = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicStatus = document.getElementById('musicStatus');
const counter = document.getElementById('pageCounter');
const eventTime = new Date('2027-01-24T19:00:00+08:00').getTime();
const whatsapp = '6282150403002';
const message = 'Halo Eka & Eva! Saya ingin mengonfirmasi kehadiran pada ulang tahun Dela Nur Hikmah, Minggu 24 Januari 2027 pukul 19.00 WITA di Hotel Mercure Samarinda.\n\nNama: \nJumlah tamu: \nKonfirmasi (hadir/tidak hadir): ';
document.getElementById('rsvp').href = 'https://wa.me/' + whatsapp + '?text=' + encodeURIComponent(message);
function updateCountdown(){
 let diff=Math.max(0,eventTime-Date.now());
 const days=Math.floor(diff/86400000);diff%=86400000;
 const hours=Math.floor(diff/3600000);diff%=3600000;
 const minutes=Math.floor(diff/60000);diff%=60000;
 const seconds=Math.floor(diff/1000);
 [['days',days],['hours',hours],['minutes',minutes],['seconds',seconds]].forEach(([id,n])=>{const el=document.getElementById(id);if(el)el.textContent=String(n).padStart(2,'0');});
}
updateCountdown();setInterval(updateCountdown,1000);
let current=0;
function goToPage(target){
 if(!Number.isInteger(target)||target<0||target>=pages.length||target===current)return;
 const previous=pages[current], next=pages[target];
 // Remove stale animation states so all navigation buttons keep working.
 pages.forEach(p=>p.classList.remove('is-turning'));
 previous.classList.remove('is-active');
 previous.classList.add(target>current?'is-past':'is-future');
 previous.classList.remove(target>current?'is-future':'is-past');
 previous.setAttribute('aria-hidden','true');
 next.classList.remove('is-past','is-future','is-turning');
 next.classList.add('is-active');
 next.setAttribute('aria-hidden','false');
 next.scrollTop=0;
 current=target;
 counter.textContent=(current+1)+' / '+pages.length;
}
pages.forEach((page,i)=>{page.classList.toggle('is-active',i===0);page.classList.toggle('is-future',i!==0);page.setAttribute('aria-hidden',String(i!==0));});
function updateMusicStatus(){musicStatus.textContent=music.paused?'Putar musik':'Jeda musik';}
function musicError(){musicStatus.textContent='Putar musik';musicToggle.title='Musik gagal diputar. Periksa nama file musik.mp3 dan pastikan file sudah disalin.';}
// Call play() synchronously inside the real button click (required on mobile browsers).
openButton.addEventListener('click',()=>{
 musicToggle.hidden=false;
 music.volume=0.65;
 const playAttempt=music.play();
 goToPage(1);
 if(playAttempt&&typeof playAttempt.then==='function')playAttempt.then(updateMusicStatus).catch(musicError);
 else updateMusicStatus();
});
// Event delegation also works after animation and for nested icons/spans.
document.addEventListener('click',event=>{
 const button=event.target.closest('[data-go]');
 if(button){event.preventDefault();goToPage(Number(button.getAttribute('data-go')));}
});
musicToggle.addEventListener('click',()=>{
 if(music.paused){const attempt=music.play();if(attempt&&typeof attempt.then==='function')attempt.then(updateMusicStatus).catch(musicError);}
 else {music.pause();updateMusicStatus();}
});
music.addEventListener('play',updateMusicStatus);
music.addEventListener('pause',updateMusicStatus);
music.addEventListener('error',musicError);
if(window.lucide)window.lucide.createIcons();

// Nama tamu diambil dari URL ?to=... (tanpa HTML injection).
const guestParam = new URLSearchParams(window.location.search).get('to');
const guestName = guestParam ? guestParam.trim().slice(0,120) : '';
const guestAddress = document.getElementById('guestAddress');
const guestNameEl = document.getElementById('guestName');
if (guestName && guestAddress && guestNameEl) {
  guestNameEl.textContent = guestName;
  guestAddress.hidden = false;
}
