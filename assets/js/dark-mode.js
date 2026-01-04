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
    // ensure aria-pressed reflects current mode and set helpful tooltip
    function updateToggleState(btnEl){
      var isDarkNow = document.documentElement.classList.contains('dark-mode');
      btnEl.setAttribute('aria-pressed', isDarkNow);
      // title/aria-label indicate the action the button will perform
      var action = isDarkNow ? 'Switch to light mode' : 'Switch to dark mode';
      btnEl.title = action;
      btnEl.setAttribute('aria-label', action);
    }

    updateToggleState(btn);

    btn.addEventListener('click', function(){
      var isDark = document.documentElement.classList.toggle('dark-mode');
      try { localStorage.setItem('dark-mode', isDark ? 'dark' : 'light'); } catch(e){}
      updateToggleState(btn);
    });
  });
})();
