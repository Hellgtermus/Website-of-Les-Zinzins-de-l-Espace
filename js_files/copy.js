document.querySelectorAll('a.copiable').forEach(el => {
  el.addEventListener('click', async (e) => {
    e.preventDefault();

    const text = el.dataset.copy || el.textContent.trim();
    try {
      await navigator.clipboard.writeText(text);
      el.textContent = '✓ Copié !';
      setTimeout(() => el.textContent = text, 2000);
    } catch (err) {
      console.error('Échec :', err);
    }
  });
});
