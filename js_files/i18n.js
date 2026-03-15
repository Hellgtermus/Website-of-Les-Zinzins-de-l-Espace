const select=document.getElementById('lang-select'); 

const saveLang=localStorage.getItem('lang') || 'en'; 
select.value=saveLang; 
applyLang(saveLang);

async function applyLang(lang) {
    document.documentElement.lang=lang;
    const response=await fetch(`lang/${lang}.json`);
    const texts=await response.json();

    document.querySelectorAll('[data-i18n]').forEach(function(el) {
        const key=el.getAttribute('data-i18n');
        if (texts[key]) el.textContent=texts[key];
    });
}

select.addEventListener('change', function() {
    const lang=select.value; 
    localStorage.setItem('lang', lang); 
    applyLang(lang);
    loadPage(currentPage);
});