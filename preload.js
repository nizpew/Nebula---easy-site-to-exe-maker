// Preload script: remove scroll lateral e deixa rolamento suave
window.addEventListener('DOMContentLoaded', () => {
  const css = `
    ::-webkit-scrollbar { width: 0 !important; }
    body { overflow: auto; }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
});

