(function () {
  var video = document.querySelector(".hero__video");
  var hero = document.querySelector(".hero");
  if (!video) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function tryPlay() {
    if (reduceMotion) return;
    var p = video.play();
    if (p && typeof p.then === "function") {
      p.catch(function () {});
    }
  }

  function tryPause() {
    video.pause();
  }

  if (reduceMotion) {
    video.removeAttribute("autoplay");
    video.preload = "none";
    if (hero) hero.classList.add("hero--reduced-motion");
    return;
  }

  video.preload = "metadata";
  video.setAttribute("playsinline", "");
  video.muted = true;

  if (!hero || !("IntersectionObserver" in window)) {
    tryPlay();
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && entry.intersectionRatio > 0.15) {
          tryPlay();
        } else {
          tryPause();
        }
      });
    },
    { root: null, threshold: [0, 0.15, 0.5] }
  );

  io.observe(hero);
  requestAnimationFrame(function () {
    tryPlay();
  });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      tryPause();
      return;
    }
    if (!hero) {
      tryPlay();
      return;
    }
    var r = hero.getBoundingClientRect();
    var inView = r.bottom > 32 && r.top < window.innerHeight - 32;
    if (inView) tryPlay();
  });
})();
