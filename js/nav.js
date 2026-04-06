(function () {
  var toggle = document.querySelector(".nav__toggle");
  var nav = document.querySelector("#primary-nav");
  var backdrop = document.querySelector("#primary-nav .nav__backdrop");
  if (!toggle || !nav) return;

  var mq = window.matchMedia("(max-width: 720px)");

  function initTabindex() {
    if (!mq.matches) {
      nav.querySelectorAll("a").forEach(function (a) {
        a.removeAttribute("tabindex");
      });
      if ("inert" in HTMLElement.prototype) {
        nav.inert = false;
      }
      return;
    }
    nav.querySelectorAll("a").forEach(function (a) {
      if (nav.classList.contains("is-open")) {
        a.removeAttribute("tabindex");
      } else {
        a.setAttribute("tabindex", "-1");
      }
    });
    if ("inert" in HTMLElement.prototype) {
      nav.inert = !nav.classList.contains("is-open");
    }
  }

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
    nav.setAttribute("aria-hidden", open ? "false" : "true");
    document.body.classList.toggle("nav-menu-open", open);
    document.documentElement.classList.toggle("nav-menu-open", open);
    initTabindex();
  }

  initTabindex();

  toggle.addEventListener("click", function () {
    setOpen(!nav.classList.contains("is-open"));
  });

  if (backdrop) {
    backdrop.addEventListener("click", function () {
      setOpen(false);
    });
  }

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setOpen(false);
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      setOpen(false);
    }
  });

  function closeIfDesktop() {
    if (!mq.matches && nav.classList.contains("is-open")) {
      setOpen(false);
    } else {
      initTabindex();
    }
  }
  if (mq.addEventListener) {
    mq.addEventListener("change", closeIfDesktop);
  } else {
    mq.addListener(closeIfDesktop);
  }
})();
