const promptBox = document.getElementById('prompt');
const preview = document.getElementById('preview');
const codeOutput = document.getElementById('codeOutput');
const generateBtn = document.getElementById('generate');
const copyBtn = document.getElementById('copyCode');
const downloadBtn = document.getElementById('downloadCode');
const openBtn = document.getElementById('openPreview');
let generatedHTML = '';

document.querySelectorAll('.example').forEach(button => {
  button.addEventListener('click', () => {
    promptBox.value = button.dataset.prompt;
    promptBox.focus();
  });
});

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
function pickName(prompt) {
  const match = prompt.match(/(?:for|called|named)\s+([A-Z][A-Za-z0-9 '&-]{1,28})/);
  if (match) return match[1].replace(/[.,].*$/, '').trim();
  return 'Your Name';
}
function buildSite(prompt) {
  const lower = prompt.toLowerCase();
  const name = escapeHTML(pickName(prompt));
  const isCafe = /coffee|cafe|café|restaurant|food|bakery/.test(lower);
  const isBusiness = /business|company|agency|service|technology|startup/.test(lower);
  const title = isCafe ? 'A little place to slow down.' : isBusiness ? 'Ideas into impact.' : 'Turning ideas into digital experiences.';
  const subtitle = isCafe ? 'Freshly brewed coffee, good food, and a warm welcome.' : isBusiness ? 'Smart solutions, thoughtful service, and technology that moves you forward.' : 'A simple, thoughtful space to share work, ideas, and what comes next.';
  const accent = /green|nature|eco/.test(lower) ? '#6eaa83' : /pink|rose/.test(lower) ? '#d77c9b' : isCafe ? '#b77a48' : '#627cf6';
  const sections = isCafe
    ? `<section id="menu"><h2>Our favourites</h2><div class="cards"><article><b>Classic Coffee</b><p>Rich, smooth and freshly made.</p></article><article><b>Fresh Bakes</b><p>A little treat for your day.</p></article><article><b>Seasonal Specials</b><p>Something new to discover.</p></article></div></section><section id="about"><h2>Made with care</h2><p>We believe the best moments are shared over something delicious.</p></section>`
    : isBusiness
    ? `<section id="services"><h2>What we do</h2><div class="cards"><article><b>Web solutions</b><p>Modern digital experiences for your goals.</p></article><article><b>Creative strategy</b><p>Clear thinking that helps ideas grow.</p></article><article><b>Support</b><p>A reliable partner from start to finish.</p></article></div></section><section id="about"><h2>About us</h2><p>We bring people, ideas and technology together to make useful things happen.</p></section>`
    : `<section id="about"><h2>A little about me</h2><p>I'm passionate about learning, creating and solving problems. This is where I share my journey and the things I'm working on.</p></section><section id="work"><h2>Selected work</h2><div class="cards"><article><b>Project One</b><p>A project I'm proud to share.</p></article><article><b>Project Two</b><p>Another idea brought to life.</p></article><article><b>What I'm learning</b><p>Always exploring something new.</p></article></div></section>`;
  const nav = isCafe ? '<a href="#menu">Menu</a><a href="#about">About</a>' : isBusiness ? '<a href="#services">Services</a><a href="#about">About</a>' : '<a href="#about">About</a><a href="#work">Work</a>';
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${name} — Website</title>
<style>
*{box-sizing:border-box}body{margin:0;font-family:Arial,sans-serif;color:#202331;background:#fff;line-height:1.65}.nav{height:68px;display:flex;align-items:center;justify-content:space-between;padding:0 8%;border-bottom:1px solid #eee}.logo{font-size:20px;font-weight:800;color:#202331;text-decoration:none}.nav a{color:#555;text-decoration:none;margin-left:24px;font-size:14px}.hero{padding:85px 8%;background:linear-gradient(120deg,${accent}18,#fff 70%)}.eyebrow{color:${accent};font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase}.hero h1{font-size:clamp(38px,7vw,66px);line-height:1.08;max-width:720px;margin:15px 0}.hero p{color:#606779;max-width:550px;font-size:17px}.btn{display:inline-block;margin-top:16px;padding:12px 20px;background:${accent};color:white;text-decoration:none;border-radius:6px;font-weight:bold}section{padding:55px 8%}h2{font-size:30px;margin:0 0 22px}.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.cards article{padding:22px;border:1px solid #e8eaf0;border-radius:10px;background:#fff}.cards b{font-size:17px}.cards p,section>p{color:#687083}.contact{background:#f6f7fb}.footer{text-align:center;padding:22px;color:#858b99;font-size:13px}@media(max-width:600px){.nav{padding:0 5%}.nav a{margin-left:10px}.hero{padding:60px 6%}section{padding:45px 6%}.cards{grid-template-columns:1fr}}
</style></head><body>
<header class="nav"><a class="logo" href="#">${name}</a><nav>${nav}<a href="#contact">Contact</a></nav></header>
<main><div class="hero"><div class="eyebrow">WELCOME</div><h1>${escapeHTML(title)}</h1><p>${escapeHTML(subtitle)}</p><a class="btn" href="#contact">${isCafe ? 'Visit us' : 'Get in touch'}</a></div>
${sections}<section class="contact" id="contact"><h2>Let's connect</h2><p>Have a question or an idea? We'd love to hear from you.</p><a class="btn" href="mailto:hello@example.com">Contact us</a></section></main>
<div class="footer">© 2026 ${name}. Made with care.</div></body></html>`;
}

generateBtn.addEventListener('click', () => {
  const prompt = promptBox.value.trim();
  if (!prompt) {
    promptBox.focus();
    promptBox.placeholder = 'Please describe the website you want to create...';
    return;
  }
  generatedHTML = buildSite(prompt);
  preview.srcdoc = generatedHTML;
  codeOutput.textContent = generatedHTML;
  copyBtn.disabled = false;
  downloadBtn.disabled = false;
});
copyBtn.addEventListener('click', async () => {
  if (!generatedHTML) return;
  try {
    await navigator.clipboard.writeText(generatedHTML);
    copyBtn.textContent = 'Copied!';
    setTimeout(() => copyBtn.textContent = 'Copy HTML', 1500);
  } catch {
    copyBtn.textContent = 'Select code below';
  }
});
downloadBtn.addEventListener('click', () => {
  if (!generatedHTML) return;
  const blob = new Blob([generatedHTML], {type:'text/html'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'generated-website.html';
  link.click();
  URL.revokeObjectURL(url);
});
openBtn.addEventListener('click', () => {
  if (!generatedHTML) return;
  const blob = new Blob([generatedHTML], {type:'text/html'});
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
});
