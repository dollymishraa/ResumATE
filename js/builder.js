let currentTemplate = 'minimal';
let expCount = 0, projCount = 0, eduCount = 0;
let profilePhoto = null;

function v(id) { return (document.getElementById(id) || {}).value || ''; }

function handlePhoto(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    profilePhoto = ev.target.result;
    const thumb = document.getElementById('photoPreviewThumb');
    const hint = document.getElementById('photoUploadHint');
    thumb.src = profilePhoto;
    thumb.style.display = 'block';
    hint.style.display = 'none';
    document.getElementById('removePhotoBtn').style.display = 'inline-block';
    renderPreview();
  };
  reader.readAsDataURL(file);
}

function removePhoto() {
  profilePhoto = null;
  document.getElementById('photoPreviewThumb').style.display = 'none';
  document.getElementById('photoUploadHint').style.display = 'block';
  document.getElementById('removePhotoBtn').style.display = 'none';
  document.getElementById('f_photo').value = '';
  renderPreview();
}

function addExp() {
  const c = document.getElementById('expContainer'), id = expCount++;
  c.insertAdjacentHTML('beforeend', `<div id="exp${id}" style="background:var(--bg3);border:1px solid var(--l2);border-radius:6px;padding:10px;margin-bottom:8px">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><span style="font-size:10px;color:var(--muted)">Experience ${id+1}</span><button class="add-btn" onclick="this.closest('[id]').remove();renderPreview()">Remove</button></div>
    <div class="two-col"><div class="form-row"><label>Company</label><input type="text" id="exp${id}_co" placeholder="Company Name" oninput="renderPreview()"></div><div class="form-row"><label>Role</label><input type="text" id="exp${id}_role" placeholder="Job Title" oninput="renderPreview()"></div></div>
    <div class="two-col"><div class="form-row"><label>Start</label><input type="text" id="exp${id}_start" placeholder="Jan 2023" oninput="renderPreview()"></div><div class="form-row"><label>End</label><input type="text" id="exp${id}_end" placeholder="Present" oninput="renderPreview()"></div></div>
    <div class="form-row"><label>Description</label><textarea id="exp${id}_desc" placeholder="Key achievements..." oninput="renderPreview()"></textarea></div>
  </div>`);
  renderPreview();
}

function addProject() {
  const c = document.getElementById('projContainer'), id = projCount++;
  c.insertAdjacentHTML('beforeend', `<div id="proj${id}" style="background:var(--bg3);border:1px solid var(--l2);border-radius:6px;padding:10px;margin-bottom:8px">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><span style="font-size:10px;color:var(--muted)">Project ${id+1}</span><button class="add-btn" onclick="this.closest('[id]').remove();renderPreview()">Remove</button></div>
    <div class="two-col"><div class="form-row"><label>Project Name</label><input type="text" id="proj${id}_name" placeholder="Project Name" oninput="renderPreview()"></div><div class="form-row"><label>Tech Stack</label><input type="text" id="proj${id}_tech" placeholder="React, Node.js" oninput="renderPreview()"></div></div>
    <div class="form-row"><label>Project Link</label><input type="text" id="proj${id}_link" placeholder="github.com/you/project" oninput="renderPreview()"></div>
    <div class="form-row"><label>Description</label><textarea id="proj${id}_desc" placeholder="What you built..." oninput="renderPreview()"></textarea></div>
  </div>`);
  renderPreview();
}

function addEdu() {
  const c = document.getElementById('eduContainer'), id = eduCount++;
  c.insertAdjacentHTML('beforeend', `<div id="edu${id}" style="background:var(--bg3);border:1px solid var(--l2);border-radius:6px;padding:10px;margin-bottom:8px">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><span style="font-size:10px;color:var(--muted)">Education ${id+1}</span><button class="add-btn" onclick="this.closest('[id]').remove();renderPreview()">Remove</button></div>
    <div class="two-col"><div class="form-row"><label>Institution</label><input type="text" id="edu${id}_inst" placeholder="University Name" oninput="renderPreview()"></div><div class="form-row"><label>Degree</label><input type="text" id="edu${id}_deg" placeholder="B.Sc. Computer Science" oninput="renderPreview()"></div></div>
    <div class="two-col"><div class="form-row"><label>Start</label><input type="text" id="edu${id}_start" placeholder="2020" oninput="renderPreview()"></div><div class="form-row"><label>End</label><input type="text" id="edu${id}_end" placeholder="2024" oninput="renderPreview()"></div></div>
  </div>`);
  renderPreview();
}

function getExpItems() {
  return [...document.querySelectorAll('[id^="exp"][id$="_co"]')].map(el => {
    const id = el.id.replace('_co','');
    return { co: el.value, role: v(id+'_role'), start: v(id+'_start'), end: v(id+'_end'), desc: v(id+'_desc') };
  });
}
function getProjItems() {
  return [...document.querySelectorAll('[id^="proj"][id$="_name"]')].map(el => {
    const id = el.id.replace('_name','');
    return { name: el.value, tech: v(id+'_tech'), link: v(id+'_link'), desc: v(id+'_desc') };
  });
}
function getEduItems() {
  return [...document.querySelectorAll('[id^="edu"][id$="_inst"]')].map(el => {
    const id = el.id.replace('_inst','');
    return { inst: el.value, deg: v(id+'_deg'), start: v(id+'_start'), end: v(id+'_end') };
  });
}

function getData() {
  return {
    name: v('f_name')||'Your Name', role: v('f_role')||'Your Role',
    email: v('f_email'), phone: v('f_phone'), location: v('f_location'),
    linkedin: v('f_linkedin'), github: v('f_github'), link: v('f_link'),
    summary: v('f_summary'), photo: profilePhoto,
    skills: (v('f_skills')||'').split(',').map(s=>s.trim()).filter(Boolean),
    exp: getExpItems(), proj: getProjItems(), edu: getEduItems()
  };
}

const avatar = (src, size=56, border='#1e5370') => src
  ? `<div style="width:${size}px;height:${size}px;border-radius:50%;border:3px solid ${border};overflow:hidden;margin:0 auto 10px;flex-shrink:0"><img src="${src}" style="width:100%;height:100%;object-fit:cover"></div>`
  : `<div style="width:${size}px;height:${size}px;border-radius:50%;background:#4a8aaa;margin:0 auto 10px;border:3px solid ${border};flex-shrink:0"></div>`;

const projLink = (p, color) => p.link ? `<a href="${p.link}" style="font-size:8px;color:${color};text-decoration:none;display:block;margin-bottom:2px">${p.link}</a>` : '';

const templates = {
  minimal: d => `<div style="font-family:'Lato',sans-serif;background:#fff;padding:24px 28px;color:#222;word-wrap:break-word">
    <div style="border-bottom:2.5px solid #2a5f8f;padding-bottom:10px;margin-bottom:12px">
      <div style="font-size:22px;font-weight:900;letter-spacing:.04em;color:#111">${d.name.toUpperCase()}</div>
      <div style="font-size:11px;color:#555;margin-bottom:5px">${d.role}</div>
      <div style="font-size:9px;color:#444;line-height:1.7">${[d.email,d.phone,d.location].filter(Boolean).join(' &nbsp;|&nbsp; ')}</div>
      ${[['LinkedIn',d.linkedin],['GitHub',d.github],['Portfolio',d.link]].filter(x=>x[1]).map(x=>`<span style="font-size:9px;color:#2a5f8f;margin-right:12px">${x[0]}: ${x[1]}</span>`).join('')}
    </div>
    <div style="display:grid;grid-template-columns:35% 65%;gap:16px">
      <div>
        ${d.skills.length?`<div style="font-size:9px;font-weight:700;color:#2a5f8f;letter-spacing:.1em;text-transform:uppercase">SKILLS</div><div style="height:1.5px;background:#2a5f8f;margin:3px 0 6px"></div>${d.skills.map(s=>`<div style="font-size:10px;color:#333;margin-bottom:2px">• ${s}</div>`).join('')}`:''}
        ${d.edu.length?`<div style="font-size:9px;font-weight:700;color:#2a5f8f;letter-spacing:.1em;text-transform:uppercase;margin-top:12px">EDUCATION</div><div style="height:1.5px;background:#2a5f8f;margin:3px 0 6px"></div>${d.edu.map(e=>`<div style="font-size:10px;font-weight:700;color:#222">${e.deg}</div><div style="font-size:9px;color:#555">${e.inst}</div><div style="font-size:9px;color:#777;margin-bottom:6px">${e.start}${e.end?' – '+e.end:''}</div>`).join('')}`:''}
      </div>
      <div>
        ${d.exp.length?`<div style="font-size:9px;font-weight:700;color:#2a5f8f;letter-spacing:.1em;text-transform:uppercase">EXPERIENCE</div><div style="height:1.5px;background:#2a5f8f;margin:3px 0 6px"></div>${d.exp.map(e=>`<div style="font-size:11px;font-weight:700;color:#111;text-transform:uppercase">${e.role}</div><div style="font-size:10px;font-weight:700;color:#444">${e.co}</div><div style="font-size:9px;color:#777;margin-bottom:4px">${e.start}${e.end?' – '+e.end:''}</div><div style="font-size:9px;color:#333;margin-bottom:8px;line-height:1.5">${e.desc}</div>`).join('')}`:''}
        ${d.proj.length?`<div style="font-size:9px;font-weight:700;color:#2a5f8f;letter-spacing:.1em;text-transform:uppercase;margin-top:8px">PROJECTS</div><div style="height:1.5px;background:#2a5f8f;margin:3px 0 6px"></div>${d.proj.map(p=>`<div style="font-size:10px;font-weight:700;color:#111">${p.name}</div><div style="font-size:9px;color:#2a5f8f">${p.tech}</div>${projLink(p,'#2a5f8f')}<div style="font-size:9px;color:#333;margin-bottom:8px;line-height:1.5">${p.desc}</div>`).join('')}`:''}
      </div>
    </div></div>`,

  creative: d => `<div style="font-family:'Lato',sans-serif;display:grid;grid-template-columns:200px 1fr;word-wrap:break-word">
    <div style="background:#1e5370;padding:20px 14px;color:#fff">
      ${avatar(d.photo, 60, 'rgba(255,255,255,0.4)')}
      <div style="font-size:14px;font-weight:700;text-align:center;margin-bottom:3px">${d.name}</div>
      <div style="font-size:9px;color:rgba(255,255,255,0.75);text-align:center;margin-bottom:12px">${d.role}</div>
      <div style="height:1px;background:rgba(255,255,255,0.15);margin-bottom:10px"></div>
      <div style="font-size:9px;font-weight:700;margin-bottom:5px">Details</div>
      ${[d.location,d.phone,d.email].filter(Boolean).map(x=>`<div style="font-size:8px;color:rgba(255,255,255,0.75);margin-bottom:2px;word-break:break-all">${x}</div>`).join('')}
      ${[['LinkedIn',d.linkedin],['GitHub',d.github],['Portfolio',d.link]].filter(x=>x[1]).map(x=>`<div style="font-size:8px;color:rgba(255,255,255,0.75);margin-bottom:2px;word-break:break-all">${x[0]}: ${x[1]}</div>`).join('')}
      ${d.skills.length?`<div style="font-size:9px;font-weight:700;margin-top:10px;margin-bottom:5px">Skills</div>${d.skills.map(s=>`<div style="font-size:8px;font-weight:600;color:#fff;margin-bottom:2px">${s}</div>`).join('')}`:''}
      ${d.edu.length?`<div style="font-size:9px;font-weight:700;margin-top:10px;margin-bottom:5px">Education</div>${d.edu.map(e=>`<div style="font-size:8px;color:rgba(255,255,255,0.85);margin-bottom:4px">${e.deg}<br><span style="color:rgba(255,255,255,0.6)">${e.inst}</span></div>`).join('')}`:''}
    </div>
    <div style="background:#fff;padding:20px 18px">
      ${d.summary?`<div style="font-size:11px;font-weight:700;color:#1e5370;margin-bottom:4px">Profile</div><div style="font-size:10px;color:#333;margin-bottom:12px;line-height:1.6">${d.summary}</div>`:''}
      ${d.exp.length?`<div style="font-size:11px;font-weight:700;color:#1e5370;margin-bottom:5px">Experience</div>${d.exp.map(e=>`<div style="font-size:11px;font-weight:700;color:#222;margin-bottom:1px">${e.role} — ${e.co}</div><div style="font-size:9px;color:#888;margin-bottom:4px">${e.start}${e.end?' – '+e.end:''}</div><div style="font-size:9px;color:#333;margin-bottom:10px;line-height:1.6">${e.desc}</div>`).join('')}`:''}
      ${d.proj.length?`<div style="font-size:11px;font-weight:700;color:#1e5370;margin:10px 0 5px">Projects</div>${d.proj.map(p=>`<div style="font-size:10px;font-weight:700;color:#222">${p.name} <span style="font-size:9px;font-weight:400;color:#1e5370">${p.tech}</span></div>${projLink(p,'#1e5370')}<div style="font-size:9px;color:#333;margin-bottom:8px;line-height:1.5">${p.desc}</div>`).join('')}`:''}
    </div></div>`,

  classic: d => `<div style="font-family:'Merriweather',serif;background:#fff;word-wrap:break-word">
    <div style="height:12px;background:#2a7a6e"></div>
    <div style="text-align:center;padding:14px 20px 8px">
      <div style="font-size:18px;font-weight:700;color:#2a7a6e">${d.name}</div>
      <div style="font-size:11px;font-weight:700;color:#333;margin-bottom:3px">${d.role}</div>
      <div style="font-size:9px;color:#555">${d.location}</div>
      <div style="font-size:9px;color:#2a7a6e;margin-top:3px">${[d.phone,d.email].filter(Boolean).join(' · ')}</div>
      ${[['LinkedIn',d.linkedin],['GitHub',d.github],['Portfolio',d.link]].filter(x=>x[1]).map(x=>`<span style="font-size:8px;color:#2a7a6e;margin-right:8px">${x[0]}: ${x[1]}</span>`).join('')}
    </div>
    <div style="height:1px;background:#2a7a6e;margin:0 20px 8px"></div>
    ${d.summary?`<div style="font-size:9px;font-weight:700;color:#222;padding:0 20px 10px;line-height:1.6">${d.summary}</div>`:''}
    ${d.exp.length?`<div style="font-size:11px;font-weight:700;color:#2a7a6e;text-align:center;letter-spacing:.05em">Professional Experience</div><div style="height:1px;background:#2a7a6e;margin:4px 20px 8px"></div>${d.exp.map(e=>`<div style="display:flex;justify-content:space-between;padding:0 20px;font-size:9px"><span style="color:#2a7a6e">${e.co}</span><span style="color:#555">${e.start}${e.end?' – '+e.end:''}</span></div><div style="font-size:10px;font-weight:700;color:#2a7a6e;padding:1px 20px">${e.role}</div>${e.desc?`<div style="font-size:9px;color:#333;padding:3px 20px 8px 28px;line-height:1.5">• ${e.desc}</div>`:''}`).join('')}`:''}
    ${d.edu.length?`<div style="font-size:11px;font-weight:700;color:#2a7a6e;text-align:center;letter-spacing:.05em;margin-top:8px">Education</div><div style="height:1px;background:#2a7a6e;margin:4px 20px 8px"></div>${d.edu.map(e=>`<div style="padding:0 20px;font-size:9px;color:#333;margin-bottom:6px">${e.inst}<br><span style="color:#2a7a6e;font-weight:700">${e.deg}</span> | ${e.start}${e.end?' – '+e.end:''}</div>`).join('')}`:''}
    ${d.skills.length?`<div style="font-size:11px;font-weight:700;color:#2a7a6e;text-align:center;letter-spacing:.05em;margin-top:8px">Key Skills</div><div style="height:1px;background:#2a7a6e;margin:4px 20px 8px"></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;padding:0 20px 12px">${d.skills.map(s=>`<div><div style="font-size:9px;color:#333;margin-bottom:2px">${s}</div><div style="height:4px;background:#eee;border-radius:2px"><div style="height:4px;background:#2a7a6e;border-radius:2px;width:75%"></div></div></div>`).join('')}</div>`:''}
    ${d.proj.length?`<div style="font-size:11px;font-weight:700;color:#2a7a6e;text-align:center;letter-spacing:.05em;margin-top:8px">Projects</div><div style="height:1px;background:#2a7a6e;margin:4px 20px 8px"></div>${d.proj.map(p=>`<div style="padding:0 20px;margin-bottom:8px"><div style="font-size:10px;font-weight:700;color:#333">${p.name} <span style="color:#2a7a6e;font-weight:400">${p.tech}</span></div>${p.link?`<div style="font-size:8px;color:#2a7a6e">${p.link}</div>`:''}<div style="font-size:9px;color:#444;line-height:1.5">${p.desc}</div></div>`).join('')}`:''}
  </div>`,

  professional: d => `<div style="font-family:'Lato',sans-serif;background:#fff;padding:22px 24px;word-wrap:break-word">
    <div style="font-size:22px;font-weight:900;color:#111;letter-spacing:.06em">${d.name.toUpperCase()}</div>
    <div style="font-size:10px;color:#555;letter-spacing:.1em;margin-bottom:6px">${d.role.toUpperCase()}</div>
    <div style="height:1px;background:#ddd;margin-bottom:12px"></div>
    <div style="display:grid;grid-template-columns:30% 2px 68%">
      <div style="padding-right:14px">
        <div style="font-size:8px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#111;margin-top:4px">Contact</div>
        <div style="height:1px;background:#ddd;margin:3px 0 5px"></div>
        ${[d.phone,d.email,d.location].filter(Boolean).map(x=>`<div style="font-size:8.5px;color:#444;margin-bottom:3px;line-height:1.4;word-break:break-all">${x}</div>`).join('')}
        ${[['LinkedIn',d.linkedin],['GitHub',d.github],['Portfolio',d.link]].filter(x=>x[1]).map(x=>`<div style="font-size:8px;color:#444;margin-bottom:2px;word-break:break-all">${x[0]}: ${x[1]}</div>`).join('')}
        ${d.skills.length?`<div style="font-size:8px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#111;margin-top:10px">Skills</div><div style="height:1px;background:#ddd;margin:3px 0 5px"></div>${d.skills.map(s=>`<div style="font-size:8.5px;color:#444;margin-bottom:3px">• ${s}</div>`).join('')}`:''}
        ${d.edu.length?`<div style="font-size:8px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#111;margin-top:10px">Education</div><div style="height:1px;background:#ddd;margin:3px 0 5px"></div>${d.edu.map(e=>`<div style="font-size:8.5px;font-weight:700;color:#111">${e.deg}</div><div style="font-size:8px;color:#555">${e.inst}</div><div style="font-size:8px;color:#777;margin-bottom:5px">${e.start}${e.end?' – '+e.end:''}</div>`).join('')}`:''}
      </div>
      <div style="background:#ddd"></div>
      <div style="padding-left:14px">
        ${d.summary?`<div style="font-size:8px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#111">Profile</div><div style="height:1px;background:#ddd;margin:3px 0 5px"></div><div style="font-size:9px;color:#333;margin-bottom:10px;line-height:1.6">"${d.summary}"</div>`:''}
        ${d.exp.length?`<div style="font-size:8px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#111;margin-top:4px">Work Experience</div><div style="height:1px;background:#ddd;margin:3px 0 6px"></div>${d.exp.map(e=>`<div style="display:flex;justify-content:space-between;margin-bottom:1px"><span style="font-size:9px;font-weight:700;color:#111">${e.co}</span><span style="font-size:8px;color:#666">${e.start}${e.end?' – '+e.end:''}</span></div><div style="font-size:9px;color:#555;margin-bottom:3px">${e.role}</div><div style="font-size:8.5px;color:#333;margin-bottom:8px;line-height:1.5">${e.desc}</div>`).join('')}`:''}
        ${d.proj.length?`<div style="font-size:8px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#111;margin-top:4px">Projects</div><div style="height:1px;background:#ddd;margin:3px 0 6px"></div>${d.proj.map(p=>`<div style="font-size:9px;font-weight:700;color:#111">${p.name} <span style="color:#888;font-weight:400">${p.tech}</span></div>${p.link?`<div style="font-size:8px;color:#555;margin-bottom:1px">${p.link}</div>`:''}<div style="font-size:8.5px;color:#333;margin-bottom:6px;line-height:1.5">${p.desc}</div>`).join('')}`:''}
      </div>
    </div></div>`,

  modern: d => `<div style="font-family:'Lato',sans-serif;background:#fff;word-wrap:break-word">
    <div style="background:#1e5370;padding:16px 24px;text-align:center">
      <div style="font-size:20px;font-weight:900;color:#fff;letter-spacing:.14em">${d.name.toUpperCase()}</div>
      <div style="font-size:9px;color:rgba(255,255,255,0.8);letter-spacing:.12em">${d.role.toUpperCase()}</div>
    </div>
    <div style="display:grid;grid-template-columns:42% 58%">
      <div style="padding:16px 14px;border-right:1px solid #eee">
        ${avatar(d.photo, 54, '#1e5370')}
        ${d.summary?`<div style="font-size:8.5px;font-weight:700;color:#1e5370;letter-spacing:.1em;text-transform:uppercase;border-bottom:1px solid #1e5370;padding-bottom:2px;margin-bottom:5px">Summary</div><div style="font-size:8.5px;color:#333;line-height:1.5;margin-bottom:10px">${d.summary}</div>`:''}
        ${d.edu.length?`<div style="font-size:8.5px;font-weight:700;color:#1e5370;letter-spacing:.1em;text-transform:uppercase;border-bottom:1px solid #1e5370;padding-bottom:2px;margin-bottom:5px">Education</div>${d.edu.map(e=>`<div style="font-size:8.5px;font-weight:700;color:#222">${e.deg}</div><div style="font-size:8px;color:#555;margin-bottom:5px">${e.inst} · ${e.start}${e.end?' – '+e.end:''}</div>`).join('')}`:''}
        ${d.skills.length?`<div style="font-size:8.5px;font-weight:700;color:#1e5370;letter-spacing:.1em;text-transform:uppercase;border-bottom:1px solid #1e5370;padding-bottom:2px;margin-bottom:6px;margin-top:8px">Relevant Skills</div>${d.skills.map(s=>`<div style="display:flex;align-items:center;gap:5px;margin-bottom:4px"><span style="font-size:8px;color:#333;min-width:70px;word-break:break-word">${s}</span><div style="flex:1;height:3px;background:#eee;border-radius:2px"><div style="height:3px;background:#1e5370;border-radius:2px;width:75%"></div></div><span style="font-size:8px;color:#1e5370;font-weight:700;min-width:26px">75%</span></div>`).join('')}`:''}
      </div>
      <div style="padding:16px 14px">
        <div style="font-size:8.5px;font-weight:700;color:#1e5370;letter-spacing:.1em;text-transform:uppercase;border-bottom:1px solid #1e5370;padding-bottom:2px;margin-bottom:6px">Contact</div>
        ${[['phone',d.phone],['email',d.email],['address',d.location]].filter(x=>x[1]).map(x=>`<div style="font-size:8px;color:#333;margin-bottom:2px;word-break:break-all"><span style="font-weight:700;color:#1e5370;margin-right:5px">${x[0]}</span>${x[1]}</div>`).join('')}
        ${[['linkedin',d.linkedin],['github',d.github],['website',d.link]].filter(x=>x[1]).map(x=>`<div style="font-size:8px;color:#333;margin-bottom:2px;word-break:break-all"><span style="font-weight:700;color:#1e5370;margin-right:5px">${x[0]}</span>${x[1]}</div>`).join('')}
        ${d.exp.length?`<div style="font-size:8.5px;font-weight:700;color:#1e5370;letter-spacing:.1em;text-transform:uppercase;border-bottom:1px solid #1e5370;padding-bottom:2px;margin:10px 0 6px">Professional Experience</div>${d.exp.map(e=>`<div style="font-size:8.5px;font-weight:700;color:#1e5370;margin-bottom:1px">${e.start}${e.end?' – '+e.end:''}</div><div style="font-size:9px;font-weight:700;color:#1a1a1a">${e.role}</div><div style="font-size:8px;color:#666;margin-bottom:3px">${e.co}</div><div style="font-size:8px;color:#444;padding-left:8px;line-height:1.5;margin-bottom:6px">• ${e.desc}</div>`).join('')}`:''}
        ${d.proj.length?`<div style="font-size:8.5px;font-weight:700;color:#1e5370;letter-spacing:.1em;text-transform:uppercase;border-bottom:1px solid #1e5370;padding-bottom:2px;margin:10px 0 6px">Projects</div>${d.proj.map(p=>`<div style="font-size:9px;font-weight:700;color:#1a1a1a">${p.name} <span style="font-size:8px;color:#1e5370">${p.tech}</span></div>${p.link?`<div style="font-size:8px;color:#1e5370;margin-bottom:1px;word-break:break-all">${p.link}</div>`:''}<div style="font-size:8px;color:#444;padding-left:8px;margin-bottom:5px;line-height:1.5">• ${p.desc}</div>`).join('')}`:''}
      </div>
    </div></div>`
};

function renderPreview() {
  document.getElementById('previewArea').innerHTML = templates[currentTemplate](getData());
}

function selectTemplate(name, el) {
  currentTemplate = name;
  document.querySelectorAll('.tmpl-card').forEach(c => c.classList.remove('active'));
  (el || document.querySelector(`[data-name="${name}"]`))?.classList.add('active');
  renderPreview();
}

function showDownload() {
  const o = document.getElementById('downloadOverlay');
  o.style.display = 'flex';
  setTimeout(() => { window.print(); o.style.display = 'none'; }, 800);
}

function sharelink() {
  const d = getData(); d.photo = null;
  const enc = btoa(encodeURIComponent(JSON.stringify(d)));
  navigator.clipboard.writeText(location.href + '?d=' + enc).then(() => alert('Link copied!')).catch(() => alert('Copy the URL from address bar.'));
}


// merge both DOMContentLoaded into ONE
document.addEventListener('DOMContentLoaded', () => {
  // Read ?template= from URL
  const urlParams = new URLSearchParams(window.location.search);
  const urlTemplate = urlParams.get('template');
  if (urlTemplate && ['minimal', 'creative', 'classic', 'professional', 'modern'].includes(urlTemplate)) {
    currentTemplate = urlTemplate;
    console.log('template from URL:', urlTemplate, '| currentTemplate:', currentTemplate);
  }

  // Highlight correct template card
  const activeCard = document.querySelector(`.tmpl-card[data-name="${currentTemplate}"]`);
  if (activeCard) {
    document.querySelectorAll('.tmpl-card').forEach(c => c.classList.remove('active'));
    activeCard.classList.add('active');
  }

  // Handle shared link ?d=
  const p = new URLSearchParams(location.search).get('d');
  if (p) {
    try {
      const d = JSON.parse(decodeURIComponent(atob(p)));
      ['name','role','email','phone','location','linkedin','github','link','summary','skills'].forEach(k => {
        const el = document.getElementById('f_'+k);
        if (el) el.value = k === 'skills' ? (d[k]||[]).join(', ') : (d[k]||'');
      });
    } catch(e) {}
  }

  renderPreview();
});