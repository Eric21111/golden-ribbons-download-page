/**
 * The download button points at downloads/GoldenRibbons.apk.
 * To publish an update, replace that file and keep the same filename.
 * Change the version line in index.html only after the new APK's
 * versionName has been verified. See README.md.
 *
 * Current file:
 * Expo build 57ea1a4e-bd7f-447e-b5a2-f0b8663b823a
 * versionName 1.0.0
 * package com.anonymous.goldenribbon
 */
(function () {
  var link = document.getElementById("download-link");
  if (!link) return;

  var label = link.querySelector("[data-download-label]");

  function showUnavailable() {
    link.removeAttribute("href");
    link.removeAttribute("download");
    link.setAttribute("role", "button");
    link.setAttribute("aria-disabled", "true");
    link.classList.add("is-disabled");
    if (label) label.textContent = "Download coming soon";
    link.addEventListener("click", function (event) {
      event.preventDefault();
    });
  }

  var params = new URLSearchParams(window.location.search);
  if (params.get("apk") === "unavailable") {
    showUnavailable();
    return;
  }

  var target = link.getAttribute("href");
  if (!target) {
    showUnavailable();
    return;
  }

  fetch(target, { method: "HEAD" })
    .then(function (response) {
      if (!response.ok) showUnavailable();
    })
    .catch(function () {
      /* A failed check must not hide a file the browser can still download. */
    });
})();
