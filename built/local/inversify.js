/**
 * inversify v.1.0.2 - A lightweight IoC container written in TypeScript.
 * Copyright (c) 2015 Remo H. Jansen
 * MIT inversify.io/LICENSE
 * http://inversify.io
 */
!function(n){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=n();else if("function"==typeof define&&define.amd)define([],n);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.inversify=n()}}(function(){return function n(e,t,i){function r(u,p){if(!t[u]){if(!e[u]){var c="function"==typeof require&&require;if(!p&&c)return c(u,!0);if(o)return o(u,!0);var s=new Error("Cannot find module '"+u+"'");throw s.code="MODULE_NOT_FOUND",s}var f=t[u]={exports:{}};e[u][0].call(f.exports,function(n){var t=e[u][1][n];return r(t?t:n)},f,f.exports,n,e,t,i)}return t[u].exports}for(var o="function"==typeof require&&require,u=0;u<i.length;u++)r(i[u]);return r}({1:[function(n,e,t){var i=n("./kernel");t.Kernel=i.Kernel;var r=n("./type_binding");t.TypeBinding=r.TypeBinding;var o=n("./type_binding_scope");t.TypeBindingScopeEnum=o.TypeBindingScopeEnum},{"./kernel":2,"./type_binding":4,"./type_binding_scope":5}],2:[function(n,e,t){var i=n("./type_binding_scope"),r=n("./lookup"),o=function(){function n(){this._bindingDictionary=new r.Lookup}return n.prototype.bind=function(n){this._bindingDictionary.add(n.runtimeIdentifier,n)},n.prototype.unbind=function(n){try{this._bindingDictionary.remove(n)}catch(e){throw new Error("Could not resolve service "+n)}},n.prototype.unbindAll=function(){this._bindingDictionary=new r.Lookup},n.prototype.resolve=function(n){var e;if(!this._bindingDictionary.hasKey(n))return null;e=this._bindingDictionary.get(n);var t=e[0];if(t.scope===i.TypeBindingScopeEnum.Singleton&&null!==t.cache)return t.cache;var r=this._injectDependencies(t.implementationType);return t.cache=r,r},n.prototype._getConstructorArguments=function(n){var e,t,i,r,o,u;return o=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm,u=/([^\s,]+)/g,e=n.toString().replace(o,""),t=e.indexOf("(")+1,i=e.indexOf(")"),r="function"==typeof Map&&-1!==e.indexOf("class")&&-1===e.indexOf("constructor")?null:e.slice(t,i).match(u),null===r&&(r=[]),r},n.prototype._injectDependencies=function(n){var e=this._getConstructorArguments(n);if(0===e.length)return new n;for(var t=[],i=null,r=0;r<e.length;r++){var o=e[r];i=this.resolve(o),t.push(i)}return this._construct(n,t)},n.prototype._construct=function(n,e){return new(Function.prototype.bind.apply(n,[null].concat(e)))},n}();t.Kernel=o},{"./lookup":3,"./type_binding_scope":5}],3:[function(n,e,t){var i=function(){function n(n,e){this.key=n,this.value=new Array,this.value.push(e)}return n}(),r=function(){function n(){this._hashMap=new Array}return n.prototype.getIndexByKey=function(n){for(var e=-1,t=0;t<this._hashMap.length;t++){var i=this._hashMap[t];i.key===n&&(e=t)}return e},n.prototype.add=function(n,e){if(null===n||void 0===n)throw new Error("Argument Null");if(null===e||void 0===e)throw new Error("Argument Null");var t=this.getIndexByKey(n);if(-1!==t){var r=this._hashMap[t];r.key===n&&r.value.push(e)}else this._hashMap.push(new i(n,e))},n.prototype.get=function(n){if(null===n||void 0===n)throw new Error("Argument Null");var e=this.getIndexByKey(n);if(-1===e)throw new Error("Key Not Found");var t=this._hashMap[e];return t.key===n?t.value:void 0},n.prototype.remove=function(n){if(null===n||void 0===n)throw new Error("Argument Null");var e=this.getIndexByKey(n);if(-1===e)throw new Error("Key Not Found");this._hashMap.splice(e,1)},n.prototype.hasKey=function(n){if(null===n||void 0===n)throw new Error("Argument Null");var e=this.getIndexByKey(n);return-1!==e?!0:!1},n}();t.Lookup=r},{}],4:[function(n,e,t){var i=n("./type_binding_scope"),r=function(){function n(n,e,t){if(this.runtimeIdentifier=n,this.implementationType=e,this.cache=null,"undefined"==typeof t)this.scope=i.TypeBindingScopeEnum.Transient;else{if(!i.TypeBindingScopeEnum[t]){var r="Invalid scope type "+t;throw new Error(r)}this.scope=t}}return n}();t.TypeBinding=r},{"./type_binding_scope":5}],5:[function(n,e,t){var i;!function(n){n[n.Transient=0]="Transient",n[n.Singleton=1]="Singleton"}(i||(i={})),t.TypeBindingScopeEnum=i},{}]},{},[1])(1)});