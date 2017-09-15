try {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  var OptionalTooltip = (function(parent) {
    var upgrade =
      typeof Reflect === "object"
        ? function() {
            return Reflect.construct(parent, arguments, this.constructor);
          }
        : function() {
            return parent.apply(this, arguments) || this;
          };

    function constructor() {}

    function OptionalTooltip() {
      var self = upgrade.apply(this, arguments);
      return constructor.apply(self, arguments) || self;
    }

    OptionalTooltip.prototype = Object.create(parent.prototype, {
      constructor: {
        configurable: true,
        writable: true,
        value: OptionalTooltip
      }
    });

    OptionalTooltip.prototype.attributeChangedCallback = function attributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace
    ) {
      var th = this;

      setTimeout(function() {
        th.adjustTooltip();
      }, 250);
    };

    OptionalTooltip.prototype.adjustTooltip = function adjustTooltip() {
      var ATTR = "data-tooltip";
      var child = this.firstElementChild;

      if (child && child.scrollWidth > child.offsetWidth) {
        this.setAttribute(ATTR, this.getAttribute("data"));
      } else {
        this.removeAttribute(ATTR);
      }
    };

    defineProperties(OptionalTooltip, [
      {
        key: "observedAttributes",
        get: function get() {
          return ["data"];
        }
      }
    ]);

    return OptionalTooltip;
  })(HTMLElement);

  if (window.customElements) {
    customElements.define("optional-tooltip", OptionalTooltip);
  }
} catch (e) {
  console.error(e);
}

// TODO
// Load polyfill () if customElements does not exist
// - https://github.com/webcomponents/custom-elements
// - https://cdn.rawgit.com/webcomponents/custom-elements/master/custom-elements.min.js