(() => {
  const projectNav = [
    ['Inicio', 'index.html#inicio'],
    ['Sobre mí', 'index.html#sobre-mi'],
    ['Proyectos', 'index.html#trabajo'],
    ['Servicios', 'index.html#servicios'],
    ['Contacto', 'index.html#contacto']
  ];

  const nav = document.querySelector('header nav ul');
  if (nav) {
    nav.innerHTML = projectNav
      .map(([label, href]) => `<li><a href="${href}"${label === 'Proyectos' ? ' class="navActive"' : ''}>${label}</a></li>`)
      .join('');
  }

  const nextProjects = document.querySelectorAll('.next-project');
  nextProjects.forEach((link) => {
    link.href = 'index.html#trabajo';
    link.setAttribute('aria-label', 'Ver todos los proyectos');
    link.innerHTML = `
      <div>
        <div class="np-label">Portfolio</div>
        <h3>Ver todos los proyectos</h3>
      </div>
      <span class="next-project-cta">Explorar proyectos</span>`;
  });

  if (!nextProjects.length) {
    const footer = document.querySelector('footer');
    if (footer) {
      const allProjectsLink = document.createElement('a');
      allProjectsLink.href = 'index.html#trabajo';
      allProjectsLink.className = 'next-project';
      allProjectsLink.setAttribute('aria-label', 'Ver todos los proyectos');
      allProjectsLink.innerHTML = `
        <div>
          <div class="np-label">Portfolio</div>
          <h3>Ver todos los proyectos</h3>
        </div>
        <span class="next-project-cta">Explorar proyectos</span>`;
      footer.before(allProjectsLink);
    }
  }

  const imageSelector = [
    '.case-cover img', '.gallery img', '.wt-img img', '.compare-frame img',
    '.photo img', '.packaging-image img', '.phone-frame img', '.social-grid img',
    '.final-image img', '.brand-logo-card img', '.hero-image img'
  ].join(', ');
  const images = [...document.querySelectorAll(imageSelector)];
  if (!images.length) return;

  const dialog = document.createElement('div');
  dialog.className = 'image-lightbox';
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-label', 'Imagen ampliada');
  dialog.innerHTML = `
    <button class="lightbox-close" type="button" aria-label="Cerrar imagen">×</button>
    <button class="lightbox-prev" type="button" aria-label="Imagen anterior">‹</button>
    <figure><img alt=""><figcaption></figcaption></figure>
    <button class="lightbox-next" type="button" aria-label="Imagen siguiente">›</button>`;
  document.body.append(dialog);

  const preview = dialog.querySelector('img');
  const caption = dialog.querySelector('figcaption');
  let activeIndex = 0;

  function showImage(index) {
    activeIndex = (index + images.length) % images.length;
    const source = images[activeIndex];
    preview.src = source.currentSrc || source.src;
    preview.alt = source.alt || 'Imagen del proyecto';
    caption.textContent = source.alt || '';
  }

  function open(index) {
    showImage(index);
    dialog.classList.add('is-open');
    document.body.classList.add('lightbox-open');
    dialog.querySelector('.lightbox-close').focus();
  }

  function close() {
    dialog.classList.remove('is-open');
    document.body.classList.remove('lightbox-open');
    images[activeIndex]?.focus();
  }

  images.forEach((image, index) => {
    image.classList.add('zoomable-image');
    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', `${image.alt || 'Imagen'} — ampliar`);
    image.addEventListener('click', () => open(index));
    image.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open(index);
      }
    });
  });

  dialog.querySelector('.lightbox-close').addEventListener('click', close);
  dialog.querySelector('.lightbox-prev').addEventListener('click', () => showImage(activeIndex - 1));
  dialog.querySelector('.lightbox-next').addEventListener('click', () => showImage(activeIndex + 1));
  dialog.addEventListener('click', (event) => { if (event.target === dialog) close(); });
  document.addEventListener('keydown', (event) => {
    if (!dialog.classList.contains('is-open')) return;
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowLeft') showImage(activeIndex - 1);
    if (event.key === 'ArrowRight') showImage(activeIndex + 1);
  });
})();
