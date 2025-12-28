// Toggle dark mode, persist in localStorage, respect OS preference
(function(){
  function setDarkMode(enabled){
    if(enabled) document.documentElement.classList.add('dark-mode');
    else document.documentElement.classList.remove('dark-mode');
  }

  function getSavedPreference(){
    try { return localStorage.getItem('dark-mode'); } catch(e) { return null; }
  }

  function applyPreferenceFromStorageOrSystem(){
    var pref = getSavedPreference();
    if(pref === 'dark') setDarkMode(true);
    else if(pref === 'light') setDarkMode(false);
    else setDarkMode(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }

  document.addEventListener('DOMContentLoaded', function(){
    applyPreferenceFromStorageOrSystem();
    var btn = document.getElementById('dark-mode-toggle');
    if(!btn) return;
    btn.addEventListener('click', function(){
      var isDark = document.documentElement.classList.toggle('dark-mode');
      try { localStorage.setItem('dark-mode', isDark ? 'dark' : 'light'); } catch(e){}
    });
  });
})();
