(function () {
  var images = [
    'context-grammar/images/ISO-GREEN/IF-hero-scene-B.png',
    'context-grammar/images/ISO-GREEN/IF-hero-scene-D.png',
    'context-grammar/images/ISO-GREEN/IF-hero-scene-E.png',
    'context-grammar/images/ISO-GREEN/IF-hero-scene-F.png',
    'context-grammar/images/ISO-GREEN/IF-hero-scene-G.png',
    'context-grammar/images/ISO-GREEN/IF-hero-scene-H.png',
  ];

  var chosen = images[Math.floor(Math.random() * images.length)];
  var hero = document.getElementById('hero');
  if (!hero) return;

  // Preload then reveal to avoid flash
  var img = new Image();
  img.onload = function () {
    hero.style.backgroundImage = "url('" + chosen + "')";
  };
  img.onerror = function () {
    // Fallback to first image if chosen fails
    hero.style.backgroundImage = "url('" + images[0] + "')";
  };
  img.src = chosen;
})();
