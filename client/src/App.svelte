<script lang="ts">
  type Feature = {
    number: string;
    title: string;
    description: string;
    icon: 'board' | 'calendar' | 'files';
  };

  const features: Feature[] = [
    { number: '01', title: 'See the whole search', description: 'Move every opportunity from saved to offer on one calm, visual board.', icon: 'board' },
    { number: '02', title: 'Never miss the moment', description: 'Keep interviews, deadlines, and follow-ups visible before they become urgent.', icon: 'calendar' },
    { number: '03', title: 'Keep context close', description: 'Connect the right resume, contact, notes, and links to every application.', icon: 'files' },
  ];

  const pipeline = [
    { title: 'Saved', count: 4, jobs: [
      { company: 'Arcadia', role: 'Product Designer', color: '#ee7f55', mark: 'A' },
      { company: 'Northstar', role: 'UX Researcher', color: '#5a70df', mark: 'N' },
    ] },
    { title: 'Applied', count: 3, jobs: [
      { company: 'Luma Labs', role: 'Frontend Engineer', color: '#e3b644', mark: 'L' },
      { company: 'Fieldwork', role: 'Product Engineer', color: '#2e987d', mark: 'F' },
    ] },
    { title: 'Interview', count: 2, jobs: [
      { company: 'Pioneer', role: 'Software Engineer', color: '#282a2d', mark: 'P' },
    ] },
  ];

  let menuOpen = false;

  function scrollToId(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    menuOpen = false;
  }
</script>

<svelte:head><title>JobTrack — Own your job search</title></svelte:head>

<header class="site-header">
  <a class="brand" href="#top" aria-label="JobTrack home">
    <span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 8.5h14v10H5zM9 8.5V6h6v2.5M5 12h14M10 12v2h4v-2" /></svg></span>
    <span>JobTrack</span>
  </a>
  <button class="menu-button" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onclick={() => (menuOpen = !menuOpen)}><span></span><span></span></button>
  <nav class:open={menuOpen} aria-label="Main navigation">
    <button type="button" onclick={() => scrollToId('features')}>Features</button>
    <button type="button" onclick={() => scrollToId('how-it-works')}>How it works</button>
    <button class="nav-cta" type="button" onclick={() => scrollToId('get-started')}>Get started</button>
  </nav>
</header>

<main id="top">
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero-copy">
      <p class="eyebrow"><span></span> Your search, finally organized</p>
      <h1 id="hero-title">Own your<br /><em>job search.</em></h1>
      <p class="hero-lede">Applications, interviews, resumes, and follow-ups—brought together in one focused workspace.</p>
      <div class="hero-actions">
        <button class="button button-primary" type="button" onclick={() => scrollToId('get-started')}>Start tracking free <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m7 4 6 6-6 6M3 10h10" /></svg></button>
        <button class="text-link" type="button" onclick={() => scrollToId('how-it-works')}>See how it works <span aria-hidden="true">↓</span></button>
      </div>
      <p class="microcopy"><span class="avatar-stack" aria-hidden="true"><i>R</i><i>C</i><i>J</i></span> Built for job seekers, by job seekers.</p>
    </div>

    <div class="hero-visual" aria-label="Preview of the JobTrack application board">
      <div class="accent-shape shape-one"></div><div class="accent-shape shape-two"></div>
      <div class="dashboard-shell">
        <div class="dashboard-topbar">
          <div class="mini-brand"><span></span> JobTrack</div>
          <div class="dashboard-search">Search applications… <kbd>⌘ K</kbd></div>
          <div class="dashboard-user">RG</div>
        </div>
        <div class="dashboard-body">
          <aside class="dashboard-sidebar">
            <span class="active"><i></i> Overview</span><span><i></i> Applications</span><span><i></i> Calendar</span><span><i></i> Resumes</span><span><i></i> Contacts</span>
          </aside>
          <div class="dashboard-main">
            <div class="board-heading"><div><small>MY WORKSPACE</small><strong>Applications</strong></div><button type="button" tabindex="-1">+ Add application</button></div>
            <div class="board-grid">
              {#each pipeline as column}
                <div class="board-column">
                  <div class="column-title"><span>{column.title}</span><b>{column.count}</b></div>
                  {#each column.jobs as job}
                    <article class="job-card">
                      <div class="company-logo" style:background={job.color}>{job.mark}</div>
                      <div><strong>{job.role}</strong><span>{job.company}</span></div>
                      <small>{column.title === 'Interview' ? 'Tomorrow · 10:00' : 'Updated 2d ago'}</small>
                    </article>
                  {/each}
                  <div class="add-card">+ Add card</div>
                </div>
              {/each}
            </div>
          </div>
        </div>
      </div>
      <div class="floating-note note-interview"><span class="note-icon">✓</span><div><small>UP NEXT</small><strong>Interview tomorrow</strong><p>Pioneer · 10:00 AM</p></div></div>
      <div class="floating-note note-total"><strong>12</strong><span>active<br />applications</span></div>
    </div>
  </section>

  <section class="trust-strip" aria-label="Product benefits"><p>Less juggling. More momentum.</p><div><span>One clear workspace</span><span>Thoughtful reminders</span><span>Your data stays yours</span></div></section>

  <section class="features section-wrap" id="features" aria-labelledby="features-title">
    <div class="section-heading">
      <p class="eyebrow"><span></span> Everything in its place</p>
      <h2 id="features-title">A calmer way to<br />find what’s <em>next.</em></h2>
      <p>JobTrack gives your search just enough structure—so you can spend less time managing tabs and more time making progress.</p>
    </div>
    <div class="feature-grid">
      {#each features as feature}
        <article class="feature-card">
          <div class="feature-meta"><span>{feature.number}</span><svg viewBox="0 0 48 48" aria-hidden="true">
            {#if feature.icon === 'board'}<path d="M8 10h32v28H8zM8 18h32M19 18v20M30 18v20" />
            {:else if feature.icon === 'calendar'}<path d="M9 13h30v27H9zM9 21h30M16 8v9M32 8v9M17 28h5M27 28h5M17 34h5" />
            {:else}<path d="M11 8h18l8 8v24H11zM29 8v9h8M17 25h14M17 31h11" />{/if}
          </svg></div>
          <h3>{feature.title}</h3><p>{feature.description}</p>
        </article>
      {/each}
    </div>
  </section>

  <section class="steps" id="how-it-works" aria-labelledby="steps-title">
    <div class="steps-inner section-wrap">
      <div><p class="eyebrow light"><span></span> Simple from day one</p><h2 id="steps-title">From scattered<br />to <em>sorted.</em></h2></div>
      <ol>
        <li><span>01</span><div><strong>Add an opportunity</strong><p>Save the role, company, link, and the details worth remembering.</p></div></li>
        <li><span>02</span><div><strong>Move it forward</strong><p>Update the stage as you apply, interview, follow up, and hear back.</p></div></li>
        <li><span>03</span><div><strong>Stay one step ahead</strong><p>See what needs attention today without searching through your inbox.</p></div></li>
      </ol>
    </div>
  </section>

  <section class="final-cta section-wrap" id="get-started" aria-labelledby="cta-title">
    <div class="cta-badge" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 8.5h14v10H5zM9 8.5V6h6v2.5M5 12h14M10 12v2h4v-2" /></svg></div>
    <p class="eyebrow"><span></span> Ready when you are</p>
    <h2 id="cta-title">Your next opportunity<br />deserves a <em>clear path.</em></h2>
    <p>Bring your job search into focus. Start tracking in minutes.</p>
    <button class="button button-primary" type="button">Create your workspace <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m7 4 6 6-6 6M3 10h10" /></svg></button>
  </section>
</main>

<footer>
  <a class="brand" href="#top"><span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 8.5h14v10H5zM9 8.5V6h6v2.5M5 12h14M10 12v2h4v-2" /></svg></span><span>JobTrack</span></a>
  <p>Make every application count.</p><small>© 2026 JobTrack</small>
</footer>
