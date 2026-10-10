// Easter eggs and the scripted "agent" behind the terminal.
// Pages call Eggs.reply(text) and may register page-specific actions with Eggs.on(name, fn).
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const handlers = {};
  const state = { grid: false, retro: false, lights: false, fallen: false };
  const options = { columns: 12, gutter: 16, baseline: 8, fall: 'main > *' };

  console.log('%cHello, curious one.', 'font: 700 22px Georgia, serif; color: #0f5c6e');
  console.log('This site was designed and coded by AI agents, from a human brief.\nThere are six easter eggs. You just found one. The agent on the page knows the others.');

  const css = document.createElement('style');
  css.textContent = `
    #eggs-grid { position: fixed; inset: 0; z-index: 2147483000; pointer-events: none; }
    #eggs-grid span { position: absolute; right: 1rem; top: 1rem; padding: .25rem .5rem; background: #ff2bd6; color: #000; font: 600 12px/1.4 system-ui, sans-serif; }
    #eggs-dark { position: fixed; inset: 0; z-index: 2147482000; pointer-events: none; transition: opacity .5s;
      background: radial-gradient(circle at var(--x, 50vw) var(--y, 50vh), transparent 0 120px, rgba(4, 10, 18, .985) 200px); }
    #eggs-note { position: fixed; right: 8vw; bottom: 18vh; z-index: 2147481000; max-width: 30ch; margin: 0; font: 400 14px/1.6 "Martian Mono", ui-monospace, monospace; font-stretch: 87.5%; color: #10233a; background: rgba(255, 255, 255, .92); padding: .5rem .75rem; }
    #eggs-note b { color: #c2185b; font-weight: 600; }
    /* A wall switch in the far corner. It glows in the dark, like a real one. */
    #eggs-switch { all: unset; position: fixed; right: 14px; bottom: 14px; z-index: 2147482600; width: 26px; height: 40px; border-radius: 5px; cursor: pointer;
      background: #f4f6f7; border: 1px solid #b9c4cb; box-shadow: 0 1px 2px rgba(16, 35, 58, .25); display: grid; place-items: center; }
    #eggs-switch::after { content: ""; width: 10px; height: 18px; border-radius: 3px; background: #dde3e7; border: 1px solid #a9b5bd;
      box-shadow: inset 0 -8px 0 #c7d0d6; transition: box-shadow .15s; }
    #eggs-switch[aria-pressed="true"] { background: #16283d; border-color: #5fd4e2; box-shadow: 0 0 10px rgba(95, 212, 226, .55); }
    #eggs-switch[aria-pressed="true"]::after { background: #1f3a55; border-color: #5fd4e2; box-shadow: inset 0 8px 0 #2b4c6b; }
    #eggs-switch:focus-visible { outline: 2px solid #5fd4e2; outline-offset: 3px; }
    #eggs-cookie { all: unset; position: fixed; z-index: 2147481500; font-size: 2.5rem; line-height: 1; cursor: pointer; translate: -50% -50%; transition: scale .3s, opacity .3s; }
    #eggs-cookie:hover { scale: 1.2; }
    #eggs-cookie.eaten { scale: 0; opacity: 0; pointer-events: none; }
    #eggs-toast { position: fixed; left: 50%; top: 1.5rem; translate: -50% 0; z-index: 2147482700; max-width: min(34rem, calc(100% - 2rem)); margin: 0; padding: .9rem 1.2rem;
      background: #e6ecef; color: #10233a; border-left: 4px solid #5fd4e2; font: 500 15px/1.5 system-ui, sans-serif; }
    .eggs-falling { transition: transform 1.1s cubic-bezier(.5, 0, .9, .6) !important; }
    body.eggs-retro, body.eggs-retro *:not(#eggs-retro, #eggs-retro *, #eggs-grid, #eggs-grid *, #eggs-switch, #eggs-switch *) {
      font-family: "Comic Sans MS", "Comic Sans", cursive !important; color: #ffff00 !important;
      background-color: transparent !important; border-color: #c0c0c0 !important; box-shadow: none !important; border-radius: 0 !important; }
    body.eggs-retro { background: #000080 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Ctext x='10' y='32' font-size='22'%3E%E2%AD%90%3C/text%3E%3C/svg%3E") !important; }
    body.eggs-retro h1, body.eggs-retro h1 * { color: #ff00ff !important; text-shadow: 3px 3px #00ffff !important; }
    body.eggs-retro a { color: #00ff00 !important; text-decoration: underline !important; }
    #eggs-retro { position: fixed; left: 0; right: 0; top: 0; z-index: 2147483001; padding: .4rem; background: #c0c0c0; color: #000;
      border: 3px outset #fff; font: 700 14px/1.4 "Comic Sans MS", cursive; text-align: center; }
    #eggs-retro button { font: inherit; border: 2px outset #fff; background: #c0c0c0; cursor: pointer; }
    body.eggs-retro { padding-top: 4.5rem !important; }
  `;
  document.head.append(css);

  const el = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstChild; };

  function grid() {
    state.grid = !state.grid;
    document.getElementById('eggs-grid')?.remove();
    if (!state.grid) return;
    const { columns, gutter, baseline } = options;
    const col = `calc((100% - ${(columns - 1) * gutter}px) / ${columns})`;
    const node = el(`<div id="eggs-grid" aria-hidden="true"><span>${columns} cols · ${baseline}px baseline · D to hide</span></div>`);
    node.style.background = [
      `repeating-linear-gradient(to bottom, rgba(255, 43, 214, .22) 0 1px, transparent 1px ${baseline}px)`,
      `repeating-linear-gradient(to right, rgba(0, 166, 184, .16) 0 ${col}, transparent 0 calc(${col} + ${gutter}px))`,
    ].join(',');
    node.style.padding = getComputedStyle(document.body).padding;
    node.style.backgroundOrigin = 'content-box';
    node.style.backgroundClip = 'content-box';
    document.body.append(node);
  }

  function retro() {
    state.retro = !state.retro;
    document.body.classList.toggle('eggs-retro', state.retro);
    document.getElementById('eggs-retro')?.remove();
    if (!state.retro) return;
    const banner = el(`<div id="eggs-retro"><marquee>UNDER CONSTRUCTION ~ Welcome to my homepage!!! ~ You are visitor #000042 ~ Best viewed in Internet Explorer 6 at 800x600 ~ Sign my guestbook!!!</marquee><button type="button">Back to 2026</button></div>`);
    banner.querySelector('button').onclick = retro;
    document.body.append(banner);
  }

  function lights() {
    state.lights = !state.lights;
    lightSwitch.setAttribute('aria-pressed', state.lights);
    for (const id of ['eggs-dark', 'eggs-note', 'eggs-cookie', 'eggs-toast']) document.getElementById(id)?.remove();
    if (!state.lights) return;
    document.body.append(
      el('<p id="eggs-note" aria-hidden="true"><b>agent ›</b> It is dark. Somewhere out here, there is a cookie.</p>'),
      cookie(),
      el('<div id="eggs-dark" aria-hidden="true"></div>'),
    );
  }

  // Bonus: a cookie hidden at a random spot, only visible under the flashlight.
  function cookie() {
    const node = el('<button id="eggs-cookie" type="button" aria-label="A cookie">🍪</button>');
    node.style.left = `${10 + Math.random() * 75}vw`;
    node.style.top = `${12 + Math.random() * 70}vh`;
    node.onclick = () => {
      node.classList.add('eaten');
      document.getElementById('eggs-toast')?.remove();
      const toast = el('<p id="eggs-toast" role="status">You found the cookie. It is the only cookie on this site: no tracking, no banner, no consent needed.</p>');
      document.body.append(toast);
      setTimeout(() => toast.remove(), 6000);
      console.log('%c🍪 Cookie eaten. Achievement unlocked: night vision.', 'font-size: 14px');
    };
    return node;
  }

  const lightSwitch = el('<button id="eggs-switch" type="button" aria-pressed="false" aria-label="Lights" title="Lights"></button>');
  lightSwitch.onclick = lights;
  document.body.append(lightSwitch);
  addEventListener('pointermove', (e) => {
    document.documentElement.style.setProperty('--x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--y', `${e.clientY}px`);
  });

  function gravity() {
    if (reduced) return;
    state.fallen = !state.fallen;
    document.querySelectorAll(options.fall).forEach((node, n) => {
      node.classList.add('eggs-falling');
      node.style.transitionDelay = `${n * 60}ms`;
      node.style.transform = state.fallen ? `translateY(${innerHeight + 300}px) rotate(${(Math.random() - .5) * 60}deg)` : '';
    });
  }

  const actions = { grid, retro, lights, gravity };
  const run = (name) => (handlers[name] ?? actions[name])?.();

  // Posts come from the page itself: every <article> with an <h2> is a post, so ls never drifts from what is shown.
  const esc = (t) => t.replace(/[<&"]/g, (c) => ({ '<': '&lt;', '&': '&amp;', '"': '&quot;' })[c]);
  const posts = () => [...document.querySelectorAll('article')].map((a) => {
    const title = a.querySelector('h2')?.textContent.trim() ?? '';
    return {
      file: `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}.md`,
      title,
      date: a.querySelector('time')?.textContent.trim() ?? '',
      excerpt: a.querySelector('p')?.textContent.trim() ?? '',
      href: a.querySelector('h2 a')?.getAttribute('href') ?? '#',
    };
  });
  const ls = (prefix = '') => {
    const files = posts().map((post) => post.file);
    return prefix + (files.length ? `${files.join('\n')}\n(cat &lt;file&gt; to read)` : 'No posts on this page yet.');
  };
  const cat = (name) => {
    const post = posts().find((p) => p.file === name.trim());
    return post
      ? `${esc(post.title)}  ${esc(post.date)}\n${esc(post.excerpt)}\n<a href="${esc(post.href)}">read it</a>`
      : `cat: ${esc(name)}: no such file. try ls`;
  };
  const LINKS = '<a href="https://github.com/bourafai">github.com/bourafai</a>\n<a href="https://www.linkedin.com/in/bourafai">linkedin.com/in/bourafai</a>\n<a href="https://x.com/bourafai">x.com/bourafai</a>';

  // First match wins. Each rule: [regex on lowercased input, reply (string or fn), optional action].
  const RULES = [
    [/^(help|\?|commands)$/, 'Talk to me in plain words, or type a command:\nabout  ls  cat &lt;file&gt;  links  grid  early designs  gravity  lights off  clear\nAnd most Linux commands. Tab completes.\nOutside the prompt, press D for the designer\'s grid.'],
    [/secret|easter|egg/, 'The secret: this whole site was designed and coded by AI agents, from Aymene\'s brief and words.\nThere are six easter eggs. Try: grid, early designs, gravity, lights off. And open the browser console.'],
    // Linux commands: each one gets a joke instead of a real effect.
    [/nmap|^ssh\b|\/etc\/(passwd|shadow)|chmod\s+777|hack|^nc\b|metasploit|sqlmap|drop table/, 'Are you a hacker? OMG! 😱\nPlease be gentle, this is a static page. There is nothing behind it but HTML and a cookie.'],
    [/^ls\s+-\w*a/, () => ls('.cookie    (hidden file. turn the lights off to find it)\n')],
    [/^mkdir\b/, 'mkdir: permission denied. Moving in already? Rent is one coffee.'],
    [/^cd\b/, 'cd: you cannot leave. This is a one-page site.'],
    [/^pwd$/, '/home/aymene/portfolio. You are here. Lost? Try ls.'],
    [/^touch\b/, 'touch: please do not touch the art.'],
    [/^(vim?|vi)\b/, 'You are now stuck in vim. Forever. (Just kidding: :q works here.)'],
    [/^(nano|emacs)\b/, 'Bold choice. The vim people have been notified.'],
    [/^git\s+blame/, 'git blame: every line was written by an AI agent. Aymene only approved them. Mostly.'],
    [/^git\b/, 'git: nothing to commit, working tree clean. Unlike the early designs.'],
    [/^(top|htop|ps)\b/, 'PID 1  coffee     99% CPU\nPID 2  agents     80% CPU\nPID 3  aymene    shipping'],
    [/^kill\b/, 'kill: agents cannot be killed, only rate-limited.'],
    [/^man\b/, 'No manual entry. Ask me in plain words instead.'],
    [/^history$/, 'graphic designer > web developer > product engineer > agents.\nThe ugly part: try early designs.'],
    [/^(npm|pnpm|bun|yarn|apt|apt-get|brew)\b/, 'Installing 1,284 dependencies to render one page... just kidding. Zero dependencies here.'],
    [/^(curl|wget)\b/, 'You are already here. No need to download me.'],
    [/^ping\b/, 'pong. 0% packet loss.'],
    [/^uname/, 'AymeneOS 10+ (frontend-focused) x86_64 GNU/Design'],
    [/^date$/, () => `${new Date().toString()}\nAlso: sorry, I am already married. 💍`],
    [/^echo\s+(.+)/, (m) => m[1].replace(/[<&]/g, (c) => (c === '<' ? '&lt;' : '&amp;'))],
    [/redesign|recompose|shuffle|rearrange|make it|another|poster/, () => (handlers.recompose ? 'Redesigning. One moment.' : 'Nothing to redesign here. This layout is final. For now.'), 'recompose'],
    [/^cat\s+(.+)/, (m) => cat(m[1])],
    [/^ls$|writ|blog|post|article|read/, () => ls()],
    [/grid|layout|typograph|design system/, 'Toggling the grid. Aymene was a graphic designer first. Shortcut: D.', 'grid'],
    [/early|old|first|2004|retro|v0\.1|ugly|past/, 'Rendering the early-2000s version. You asked for it.', 'retro'],
    [/gravity|fall|drop/, 'Gravity toggled. Ask again to put things back.', 'gravity'],
    [/light|dark|lamp|night/, 'Lights toggled. Move the pointer around: something is hidden in the dark. The switch is in the far corner.', 'lights'],
    [/^clear$/, null, 'clear'],
    [/^sudo/, 'aymene is not in the sudoers file. This incident will be reported to the agents.'],
    [/coffee|☕/, '  ( (\n   ) )\n ........\n |      |]\n \\      /\n  `----\'   brewing. come back in 4 minutes.'],
    [/^rm\b/, 'nice try. the agents already backed everything up.'],
    [/^exit$/, 'there is no exit. only ls.'],
    [/link|github|linkedin|twitter|^x$|contact|social/, LINKS],
    [/about|who|what do|work|job|does|you do|whoami/, 'Aymene Bourafai. Product engineer, frontend-focused, 10+ years building for the web.\nGraphic designer turned developer, now designing how developers and AI agents work together.'],
    [/^(hi|hello|hey|bonjour|salut)\b/, 'Hello. Ask me who Aymene is, what to read, or for the secret.'],
  ];

  // Ghost-text autocomplete candidates, most useful first.
  const SUGGESTIONS = ['help', 'whoami', 'who is aymene?', 'ls', 'ls -la',
    'links', 'grid', 'early designs', 'gravity', 'lights off', 'tell me the secret', 'clear', 'coffee', 'sudo make me a sandwich',
    'mkdir', 'cd ..', 'pwd', 'touch', 'vim', 'git blame', 'top', 'history', 'ping aymene', 'uname -a', 'date', 'echo hello', 'npm install', 'ssh root@aymene', 'exit'];

  window.Eggs = {
    options,
    suggest(input) {
      const q = input.toLowerCase();
      return q ? [...SUGGESTIONS, ...posts().map((post) => `cat ${post.file}`)].find((c) => c.startsWith(q) && c !== q) ?? null : null;
    },
    on(name, fn) { handlers[name] = fn; },
    reply(input) {
      const q = input.trim().toLowerCase();
      for (const [re, answer, action] of RULES) {
        const m = q.match(re);
        if (!m) continue;
        if (action) setTimeout(() => run(action), 250);
        return typeof answer === 'function' ? answer(m) : answer;
      }
      return 'I am a small scripted agent, not a model. Try help, or ask for the secret.';
    },
  };

  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && state.lights) return lights();
    if (e.metaKey || e.ctrlKey || e.altKey || e.target.closest('input, textarea, [contenteditable]')) return;
    if (e.key.toLowerCase() === 'd') grid();
  });
})();
