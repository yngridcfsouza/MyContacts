export default class EventManager {
  constructor() {
    this.listeners = new Map();
  }

  on(event, listener) {
    /* caso o array esteja vazio a aplicação quebra por tentar acessar o .push */
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(listener);
  }

  /* payload → os dados que você quer enviar para as funções listener. (Ex.: informações de um usuário, dados de uma requisição, etc.) */
  emit(event, payload) {
    if (!this.listeners.has(event)) {
      return;
    }

    this.listeners.get(event).forEach((listener) => {
      listener(payload);
    });
  }

  removeListener(event, listenerToRemove) {
    const listeners = this.listeners.get(event);

    if (!listeners) {
      return;
    }
    const filteredListeners = listeners.filter(
      (listener) => listener !== listenerToRemove,
    );

    this.listeners.set(event, filteredListeners);
  }
}
