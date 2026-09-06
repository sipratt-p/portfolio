// Run in the document head so the saved theme is applied before content paints.
(function () {
  var preference = 'system';
  try {
    var saved = localStorage.getItem('sethpratt-theme');
    if (saved === 'light' || saved === 'dark') preference = saved;
  } catch (_) {
    // Private browsing/storage restrictions should not prevent theme changes.
  }
  var dark = preference === 'dark' ||
    (preference === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', dark);
  document.documentElement.dataset.themePreference = preference;
})();
