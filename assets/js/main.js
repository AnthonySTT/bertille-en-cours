/* Me Bertille Toudic — interactions (JavaScript natif, sans dépendance) */
(function () {
  "use strict";
  var doc = document.documentElement;
  doc.classList.add("js");

  /* Séquence d’ouverture */
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { doc.classList.add("is-loaded"); });
  });

  /* En-tête au défilement */
  var header = document.querySelector("[data-header]");
  var onScroll = function () {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Menu mobile */
  var toggle = document.querySelector("[data-nav-toggle]");
  var list = document.querySelector("[data-nav-list]");
  function setMenu(open) {
    if (!toggle || !list) return;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.querySelector(".sr-only").textContent = open ? "Fermer le menu" : "Ouvrir le menu";
    list.classList.toggle("is-open", open);
  }
  if (toggle && list) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    list.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
  }

  /* Apparition progressive des sections */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }


  /* Frise des étapes : progression au défilement et compteur de documents */
  var steps = document.querySelector("[data-steps]");
  if (steps) {
    var items = steps.querySelectorAll("[data-step]");
    var updateSteps = function () {
      var r = steps.getBoundingClientRect();
      var mid = window.innerHeight * 0.55;
      var p = Math.min(1, Math.max(0, (mid - r.top) / r.height));
      steps.style.setProperty("--progress", p.toFixed(3));
      items.forEach(function (li) {
        li.classList.toggle("is-reached", li.getBoundingClientRect().top + 30 < mid);
      });
    };
    window.addEventListener("scroll", updateSteps, { passive: true });
    window.addEventListener("resize", updateSteps);
    steps.addEventListener("toggle", updateSteps, true);
    updateSteps();
  }

  /* Liens qui pré-remplissent l’objet du formulaire */
  document.querySelectorAll("[data-objet]").forEach(function (link) {
    link.addEventListener("click", function () {
      var sel = document.getElementById("f-objet");
      if (sel) sel.value = link.getAttribute("data-objet");
    });
  });

  /* Barre de contact mobile : masquée quand la section contact est visible */
  var bar = document.querySelector("[data-mobile-bar]");
  var contact = document.getElementById("contact");
  if (bar && contact && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      bar.classList.toggle("is-hidden", entries[0].isIntersecting);
    }, { threshold: 0.15 }).observe(contact);
  }

  /* Formulaire : validation locale, AUCUN envoi en phase de développement.
     Pour la mise en ligne chez OVH : renseigner l’attribut action vers un
     script d’envoi (ex. contact.php) et retirer le preventDefault ci-dessous. */
  var form = document.querySelector("[data-form]");
  if (form) {
    var status = form.querySelector("[data-form-status]");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var firstInvalid = null;
      form.querySelectorAll("[required]").forEach(function (field) {
        var ok = field.type === "checkbox" ? field.checked : field.checkValidity() && field.value.trim() !== "";
        field.setAttribute("aria-invalid", ok ? "false" : "true");
        if (!ok && !firstInvalid) firstInvalid = field;
      });
      if (firstInvalid) {
        status.classList.add("is-error");
        status.textContent = firstInvalid.type === "checkbox"
          ? "Merci d’accepter l’utilisation de vos données pour que je puisse vous répondre."
          : "Certains champs sont incomplets. Vérifiez votre nom, votre adresse électronique, l’objet et votre message.";
        firstInvalid.focus();
        return;
      }
      status.classList.remove("is-error");
      status.textContent = "Version de démonstration : le message n’a pas été envoyé. En attendant la mise en service, contactez le cabinet au 07 69 11 51 03.";
    });
  }
})();
