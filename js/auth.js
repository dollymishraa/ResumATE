// Auth logic
const Auth = {
  USERS_KEY: 'resumate_users',
  SESSION_KEY: 'resumate_session',

  getUsers() {
    return Storage.get(this.USERS_KEY, []);
  },

  getCurrentUser() {
    return Storage.get(this.SESSION_KEY);
  },

  signup(name, email, password) {
    const users = this.getUsers();
    if (users.find(u => u.email === email)) {
      throw new Error('Email already registered');
    }
    
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // In a real app this would be hashed
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    Storage.set(this.USERS_KEY, users);
    
    // Auto login
    this.setSession(newUser);
    return newUser;
  },

  login(email, password, remember = false) {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    this.setSession(user);
    return user;
  },

  logout() {
    Storage.remove(this.SESSION_KEY);
    window.location.href = 'login.html';
  },

  setSession(user) {
    // Only storing non-sensitive data in session
    const sessionData = { id: user.id, name: user.name, email: user.email };
    Storage.set(this.SESSION_KEY, sessionData);
  },

  requireAuth() {
    if (!this.getCurrentUser()) {
      window.location.href = 'login.html';
    }
  },

  redirectIfAuth() {
    if (this.getCurrentUser()) {
      window.location.href = 'dashboard.html';
    }
  }
};
