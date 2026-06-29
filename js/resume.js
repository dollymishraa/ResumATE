const ResumeManager = {
  RESUMES_KEY: 'resumate_resumes',

  getAll() {
    const user = Auth.getCurrentUser();
    if (!user) return [];
    
    const allResumes = Storage.get(this.RESUMES_KEY, {});
    return allResumes[user.id] || [];
  },

  get(id) {
    const resumes = this.getAll();
    return resumes.find(r => r.id === id);
  },

  save(resume) {
    const user = Auth.getCurrentUser();
    if (!user) return false;

    const allResumes = Storage.get(this.RESUMES_KEY, {});
    if (!allResumes[user.id]) allResumes[user.id] = [];

    const index = allResumes[user.id].findIndex(r => r.id === resume.id);
    if (index >= 0) {
      allResumes[user.id][index] = resume;
    } else {
      allResumes[user.id].push(resume);
    }

    return Storage.set(this.RESUMES_KEY, allResumes);
  },

  create(name = 'Untitled Resume') {
    const newResume = {
      id: Date.now().toString(),
      name,
      createdDate: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      selectedTemplate: 'modern',
      personalInfo: {},
      education: [],
      experience: [],
      skills: [],
      projects: [],
      certifications: []
    };
    
    this.save(newResume);
    return newResume;
  },

  duplicate(id) {
    const original = this.get(id);
    if (!original) return null;

    const copy = {
      ...original,
      id: Date.now().toString(),
      name: `${original.name} (Copy)`,
      createdDate: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };

    this.save(copy);
    return copy;
  },

  delete(id) {
    const user = Auth.getCurrentUser();
    if (!user) return false;

    const allResumes = Storage.get(this.RESUMES_KEY, {});
    if (!allResumes[user.id]) return false;

    allResumes[user.id] = allResumes[user.id].filter(r => r.id !== id);
    return Storage.set(this.RESUMES_KEY, allResumes);
  }
};
