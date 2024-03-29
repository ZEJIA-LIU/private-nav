// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var site = localStorage.getItem('site');
siteObject = JSON.parse(site);
var hashMap = siteObject || [{
  logo: "D",
  url: "https://douyu.com",
  link: "https://douyu.com"
}, {
  logo: "H",
  url: "https://huya.com",
  link: "https://huya.com"
}, {
  logo: "X",
  url: "https://xiedaimala.com",
  link: "https://xiedaimala.com"
}, {
  logo: "G",
  url: "https://github.com",
  link: "https://github.com"
}, {
  logo: "M",
  url: "https://mail.qq.com/",
  link: "https://mail.qq.com/"
}, {
  logo: "B",
  url: "https://bilibili.com",
  link: "https://bilibili.com"
}];

simplifyUrl = function simplifyUrl(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '');
};

render = function (_render) {
  function render() {
    return _render.apply(this, arguments);
  }

  render.toString = function () {
    return _render.toString();
  };

  return render;
}(function () {
  $('.siteList').find('li:not(.lastLi)').remove();
  hashMap.forEach(function (node, index) {
    var $li = $("\n           <li>\n             <div class=\"site-wrapper\">\n                <div class=\"logo\"><img width=32 src='https://".concat(simplifyUrl(node.link), "/favicon.ico' alt=\"").concat(node.logo, "\"></div>\n                <div class=\"link\">").concat(simplifyUrl(node.link), "</div>\n                <div class=\"close\"> \n                  <div class=\"icon-wrapper\">\n                    <svg class=\"icon delete\">\n                      <use xlink:href=\"#icon-shanchu\"></use>\n                    </svg>\n                   </div>\n                </div>\n            </div>    \n           </li>\n        ")).insertBefore($('.siteList').find('.lastLi'));
    $li.on('click', function () {
      window.open(node.url, '_self');
    });
    $li.find('img').on('error', function () {
      $li.find('img').css({
        display: 'none'
      });
      $li.find('.logo').html("".concat(node.logo));
    });
    $li.on('click', '.close', function (e) {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
});

render();
$('.addButton').on('click', function () {
  var url = window.prompt('请问你要添加的网址是什么？');

  if (url.indexOf('http') !== 0) {
    url = 'https://' + url;
  }

  var newSite = {
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url,
    link: url
  };
  hashMap.push(newSite);
  render();
});

window.onbeforeunload = function () {
  localStorage.setItem('site', JSON.stringify(hashMap));
};

document.addEventListener('keypress', function (e) {
  var key = e.key;

  for (var i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
$('#searchInput').on('keypress', function (e) {
  e.stopPropagation();
});
$('#searchInput').on('focus', function () {
  if ($('#searchInput').val() === '使用百度搜索') {
    $('#searchInput').val('').css('color', 'black');
  }
});
$('#searchInput').on('blur', function () {
  if ($('#searchInput').val() === '') {
    $('#searchInput').val('使用百度搜索').css('color', 'grey');
  }
});
$('form').on('submit', function () {
  if ($('#searchInput').val() === '使用百度搜索') {
    $('#searchInput').val('');
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.ba28c4a4.js.map