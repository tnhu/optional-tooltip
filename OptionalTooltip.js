function init() {
  try {
    function defineProperties(target, props) {
      for (var i = 0, len = props.length; i < len; i++) {
        var descriptor = props[i]
        descriptor.enumerable = descriptor.enumerable || false
        descriptor.configurable = true
        if ('value' in descriptor) descriptor.writable = true
        Object.defineProperty(target, descriptor.key, descriptor)
      }
    }

    var OptionalTooltip = (function(parent) {
      var upgrade = function() {
        try {
          return Reflect.construct(parent, arguments, this.constructor)
        } catch (e) {
          return parent.apply(this, arguments) || this
        }
      }

      function constructor() {}

      function OptionalTooltip() {
        var self = upgrade.apply(this, arguments)
        return constructor.apply(self, arguments) || self
      }

      OptionalTooltip.prototype = Object.create(parent.prototype, {
        constructor: {
          configurable: true,
          writable: true,
          value: OptionalTooltip
        }
      })

      OptionalTooltip.prototype.attributeChangedCallback = function attributeChangedCallback(
        attributeName,
        oldValue,
        newValue,
        namespace
      ) {
        var th = this

        setTimeout(function() {
          th.adjustTooltip()
        }, 250)
      }

      OptionalTooltip.prototype.adjustTooltip = function adjustTooltip() {
        var ATTR = 'data-tooltip'
        var child = this.firstElementChild

        if (child && child.scrollWidth > child.offsetWidth) {
          this.setAttribute(ATTR, this.getAttribute('data'))
        } else {
          this.removeAttribute(ATTR)
        }
      }

      defineProperties(OptionalTooltip, [
        {
          key: 'observedAttributes',
          get: function get() {
            return ['data']
          }
        }
      ])

      return OptionalTooltip
    })(HTMLElement)

    customElements.define('optional-tooltip', OptionalTooltip)
  } catch (e) {
    console.error(e)
  }
}

if (window.customElements) {
  init()
} else {
  var script = document.createElement('script')
  script.src = 'https://unpkg.com/@webcomponents/custom-elements/custom-elements.min.js'
  script.type = 'text/javascript'
  script.onload = init
  document.head.appendChild(script)
}

var data = { foo: 'bar' }

<optional-tooltip class=`tooltip--top` data=`${data}`>
</optional-tooltip>

attrs.class === "tooltip-top"
