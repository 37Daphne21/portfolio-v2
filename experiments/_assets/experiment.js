class ExperimentLayout extends HTMLElement {
  connectedCallback() {
    const label = this.getAttribute('label') || '';
    const title = this.getAttribute('title') || '';
    const desc = this.getAttribute('desc') || '';
    const titleHTML = title.replace(/\|/g, '<br>');

    this.innerHTML = `
      <a href="../../#lab" class="experiment__back">← Back to Lab</a>

      <section class="experiment__section" aria-label="${label}">
        <div class="experiment__head">
          <p class="experiment__label">${label}</p>
          <h1 class="experiment__title">${titleHTML}</h1>
          <p class="experiment__desc">${desc}</p>
        </div>

        <div class="experiment__content">
          ${this.innerHTML}
        </div>
      </section>
    `;
  }
}

customElements.define('experiment-layout', ExperimentLayout);