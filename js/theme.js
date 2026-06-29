const Theme = {
  init() {
    const settings = Storage.get('resumate_settings', { theme: 'dark' });
    document.documentElement.setAttribute('data-theme', settings.theme);
  },
  
  toggle() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    
    const settings = Storage.get('resumate_settings', {});
    settings.theme = next;
    Storage.set('resumate_settings', settings);
  }
};

Theme.init();
