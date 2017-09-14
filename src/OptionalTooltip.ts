try {
  class OptionalTooltip extends HTMLElement {
    attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
      var th = this

      setTimeout(function() {
        th.adjustTooltip()
      }, 250)
    }

    static get observedAttributes() {
      return ['data'];
    }

    adjustTooltip() {
      var ATTR = 'data-tooltip'
      var child = this.firstElementChild

      if (child && child.scrollWidth > child.offsetWidth) {
        this.setAttribute(ATTR, this.getAttribute('data'))
      } else {
        this.removeAttribute(ATTR)
      }
    }
  }

  if (window.customElements) {
    customElements.define('optional-tooltip', OptionalTooltip)
  }
} catch (e) {
}