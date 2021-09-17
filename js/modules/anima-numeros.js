export default class AnimaNumeros {
  constructor(numeros, observerTarget, observerClass) {
    this.numeros = document.querySelectorAll(numeros);
    this.observerTarget = document.querySelector(observerTarget);
    this.observerClass = observerClass;
    // bind o this do objeto ao callback da mutação
    this.handleMutation = this.handleMutation.bind(this);
  }
  // recebe um elemento do DOM, com numero em seu texto
  // incrementa a partir de 0 até numero final
  static incrementarNumero(numero) {
    const total = +numero.textContent;
    const incremento = Math.floor(total / 100);
    let start = 0;
    const timer = setInterval(() => {
      start += incremento;
      numero.textContent = start;
      if (start >= total) {
        numero.textContent = total;
        clearInterval(timer);
      }
    }, 25 * Math.random());
  }
  // ativa incrementar numero para cada numero selecionado no DOM
  animaNumeros() {
    this.numeros.forEach((numero) =>
      this.constructor.incrementarNumero(numero)
    );
  }
  // função que ocorre quando a mutações ocorrer
  handleMutation(mutation) {
    if (mutation[0].target.classList.contains(this.observerClass)) {
      this.observer.disconnect();
      this.animaNumeros();
    }
  }
  // adiciona o MutationObserver para verificar
  // quando a classe ativa é adiciona ao evento target
  addMutationObserver() {
    this.observer = new MutationObserver(this.handleMutation);
    this.observer.observe(this.observerTarget, { attributes: true });
  }

  init() {
    if (this.numeros.length && this.observerTarget) {
      this.addMutationObserver();
    }
    return this;
  }
}
