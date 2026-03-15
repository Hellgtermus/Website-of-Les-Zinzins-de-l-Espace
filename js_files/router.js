const content=document.getElementById("content");
let currentPage='home'; 
async function loadPage(path) {
    const lang=localStorage.getItem('lang') || 'en'; 
    const url=`pages/${lang}/${path}.html`;
    currentPage=path; 

    try {   
        const response=await fetch(url); 
        if (!response.ok) throw new Error("Page not found");
        content.innerHTML=await response.text();
    }catch (e) {
        content.innerHTML='<p>Page not found</p>'
    }
}
document.addEventListener('click', function(e) { 
    const link=e.target.closest('[data-page]'); 
    if (!link) return; 

    e.preventDefault();
    const page=link.dataset.page; 
    history.pushState({page}, '', link.href); 
    loadPage(page);
});
window.addEventListener('popstate', function(e) {
    if (e.state && e.state.page) {
        loadPage(e.state.page);
    }
});
loadPage('home');