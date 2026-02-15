// ─── GSAP Setup ───────────────────────────────────────────
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// ─── Hero Terminal Typewriter ─────────────────────────────
const heroTL = gsap.timeline({ delay: 0.5 });

heroTL
  .from('.hero-badge', { opacity: 0, y: -20, duration: 0.5 })
  .from('.hero-title', { opacity: 0, y: 30, duration: 0.6 }, '-=0.2')
  .from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
  .from('.hero-tagline', { opacity: 0, y: 15, duration: 0.4 }, '-=0.2')
  .to('#hero-tagline-text', { text: '"Catch it >_ Solve it."', duration: 1.2, ease: 'none' })
  .to('.hero-tagline-cursor', { opacity: 0, duration: 0.1, delay: 0.5 })
  .from('.terminal', { opacity: 0, y: 40, scale: 0.97, duration: 0.6 }, '-=0.2')
  .to('#install-cmd', { text: 'npm install @console-agent/agent', duration: 1.5, ease: 'none' })
  .to('#cursor1', { opacity: 0, duration: 0.1 })
  .to('#term-output-1', { opacity: 1, duration: 0.3 })
  .to('#term-line-2', { opacity: 1, duration: 0.2 }, '+=0.3')
  .to('#node-cmd', { text: 'console.agent.security("audit input", req.body, { verbose: true })', duration: 2.2, ease: 'none' })
  .to('#cursor2', { opacity: 0, duration: 0.1 })
  .to('#term-agent-output', { opacity: 1, duration: 0.4 })
  .from('#term-agent-output > div', { opacity: 0, x: -10, stagger: 0.15, duration: 0.3 })
  .to('#term-verbose-label', { opacity: 1, duration: 0.4 }, '+=0.3')
  .to('#term-quiet-output', { opacity: 1, duration: 0.4 })
  .from('#term-quiet-output > div', { opacity: 0, x: -10, stagger: 0.12, duration: 0.3 })
  .from('.hero-actions', { opacity: 0, y: 20, duration: 0.5 }, '-=0.5')
  .from('.hero-stats', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3');

// ─── Stat Counter Animation ──────────────────────────────
document.querySelectorAll('.stat-num').forEach(el => {
  const target = parseInt(el.dataset.target);
  ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to(el, {
        innerText: target,
        duration: 1,
        snap: { innerText: 1 },
        ease: 'power2.out'
      });
    }
  });
});

// ─── Scroll Animations ───────────────────────────────────
// Slide up
gsap.utils.toArray('[data-anim="slide-up"]').forEach(el => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    opacity: 0, y: 50, duration: 0.7, ease: 'power2.out'
  });
});

// Slide right
gsap.utils.toArray('[data-anim="slide-right"]').forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    opacity: 0, x: -60, duration: 0.6, delay: i * 0.15, ease: 'power2.out'
  });
});

// Slide left
gsap.utils.toArray('[data-anim="slide-left"]').forEach(el => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    opacity: 0, x: 60, duration: 0.6, ease: 'power2.out'
  });
});

// Fade in
gsap.utils.toArray('[data-anim="fade-in"]').forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    opacity: 0, y: 20, duration: 0.5, delay: i * 0.08, ease: 'power2.out'
  });
});

// Stagger groups (personas, use cases)
document.querySelectorAll('.persona-grid, .usecases-grid').forEach(grid => {
  const cards = grid.querySelectorAll('[data-anim="stagger"]');
  gsap.from(cards, {
    scrollTrigger: { trigger: grid, start: 'top 80%', once: true },
    opacity: 0, y: 40, scale: 0.95, stagger: 0.12, duration: 0.5, ease: 'back.out(1.2)'
  });
});

// Section titles
gsap.utils.toArray('.section-title').forEach(el => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    opacity: 0, y: 30, duration: 0.6, ease: 'power2.out'
  });
});

gsap.utils.toArray('.section-desc').forEach(el => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    opacity: 0, y: 20, duration: 0.5, delay: 0.15, ease: 'power2.out'
  });
});

// ─── Nav Scroll Effect ───────────────────────────────────
ScrollTrigger.create({
  start: 'top -80',
  onUpdate: self => {
    document.getElementById('nav').style.borderBottomColor =
      self.progress > 0 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)';
  }
});

// ─── Copy Buttons ────────────────────────────────────────
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const text = btn.dataset.copy;
    navigator.clipboard.writeText(text).then(() => {
      const orig = btn.textContent;
      btn.textContent = 'Copied!';
      btn.style.color = '#00e5a0';
      setTimeout(() => { btn.textContent = orig; btn.style.color = ''; }, 1500);
    });
  });
});

// ─── Smooth Scroll for Nav Links ─────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ─── Global Language Toggle (JS / Python) ────────────────
(function() {
  // Python equivalents for every code block on the page
  // Keyed by a substring of the JS code to match the block
  const pyMap = [
    // Quick Start: Install
    { match: 'npm install @console-agent/agent',
      py: 'pip install console-agent',
      pyLang: 'bash',
      pyCopy: 'pip install console-agent' },
    // Quick Start: Use it
    { match: "import '@console-agent/agent'",
      py: `from console_agent import agent, init

# Fire-and-forget (default mode)
agent("analyze this error", context=error)

# Blocking — get structured results
result = agent("validate email", context=email, mode="blocking")

# Persona shortcuts
agent.security("check for SQL injection", context=user_input)
agent.debug("why is this slow?", context={"duration": dur, "query": sql})
agent.architect("review API design", context=endpoint)`,
      pyLang: 'python',
      pyCopy: `from console_agent import agent, init\n\nagent("analyze this error", context=error)` },
    // API Reference: main API
    { match: 'console.agent("explain this error"',
      py: `# Simple — fire-and-forget
agent("explain this error", context=error)

# Get structured results
result = agent("analyze", context=data,
    persona="security",
    model="gemini-3-flash-preview",
    thinking={"level": "high", "include_thoughts": True},
)

print(result.success)     # bool
print(result.summary)     # "SQL injection detected..."
print(result.confidence)  # 0.94
print(result.data)        # {"vulnerability": "...", "fix": "..."}`,
      pyLang: 'python' },
    // API Reference: AgentResult type
    { match: 'interface AgentResult',
      py: `@dataclass
class AgentResult:
    success: bool              # Overall task success
    summary: str               # Human-readable conclusion
    reasoning: Optional[str]   # Agent's thought process
    data: dict[str, Any]       # Structured findings
    actions: list[str]         # Tools used / steps taken
    confidence: float          # 0-1 confidence score
    metadata: ResultMetadata   # model, tokens, latency, etc.

@dataclass
class ResultMetadata:
    model: str
    tokens_used: int
    latency_ms: int
    tool_calls: list[ToolCall]
    cached: bool`,
      pyLang: 'python' },
    // Persona cards: Security
    { match: 'console.agent.security("audit this query", sql)',
      py: `agent.security("audit this query", context=sql)`,
      pyLang: 'python' },
    // Persona cards: Debugger
    { match: 'console.agent.debug("why is this slow?", metrics)',
      py: `agent.debug("why is this slow?", context=metrics)`,
      pyLang: 'python' },
    // Persona cards: Architect
    { match: 'console.agent.architect("review API", endpoint)',
      py: `agent.architect("review API", context=endpoint)`,
      pyLang: 'python' },
    // Persona cards: General
    { match: 'console.agent("validate this data", records)',
      py: `agent("validate this data", context=records)`,
      pyLang: 'python' },
    // Config: Full Config
    { match: "import { init } from '@console-agent/agent'",
      py: `import os
from console_agent import agent, init
from console_agent.types import FileAttachment
from pydantic import BaseModel, Field
from typing import List

init(
    api_key=os.environ["GEMINI_API_KEY"],
    model="gemini-2.5-flash-lite",
    persona="general",
    mode="fire-and-forget",
    timeout=10000,

    budget={
        "max_calls_per_day": 100,
        "max_tokens_per_call": 8000,
        "cost_cap_daily": 1.00,  # USD
    },

    anonymize=True,              # Auto-strip secrets/PII
    local_only=False,            # Disable cloud tools
    dry_run=False,               # Log without calling API
    log_level="info",
    include_caller_source=True,  # Auto-read source file
)

# ── Structured Output ────────────────────────

# Option A: Pydantic model → typed, validated
class Sentiment(BaseModel):
    sentiment: str = Field(description="positive/negative/neutral")
    score: float
    keywords: List[str]

result = agent(
    "analyze sentiment", context=review,
    schema_model=Sentiment,
)
result.data["sentiment"]  # "positive" ✅ typed

# ── File Attachments ─────────────────────────

doc = agent(
    "What does this document say?",
    files=[
        FileAttachment(
            filepath="./data/report.pdf",
            media_type="application/pdf",
        ),
    ],
)`,
      pyLang: 'python' },
  ];

  // Use-case cards Python equivalents
  const usecasePyMap = {
    'console.agent.security("check for SQL injection", userInput)':
      'agent.security("check for SQL injection", context=user_input)',
    'console.agent.debug("why is this slow?", { duration, query })':
      'agent.debug("why is this slow?", context={"duration": dur, "query": sql})',
    'await console.agent("validate batch meets schema", records)':
      'agent("validate batch meets schema", context=records)',
    'console.agent.architect("review API design", { endpoint })':
      'agent.architect("review API design", context=endpoint)',
    'await console.agent("calculate optimal batch size", metrics)':
      'agent("calculate optimal batch size", context=metrics)',
    'console.agent("research CVEs for lodash@4.17.20")':
      'agent("research CVEs for lodash@4.17.20")',
  };

  // Store original JS content for each code block
  const codeBlocks = document.querySelectorAll('.code-block pre code');
  const originals = new Map();
  codeBlocks.forEach(el => {
    originals.set(el, {
      html: el.innerHTML,
      text: el.textContent,
      className: el.className,
    });
  });

  // Store original use-case card content
  const usecaseCards = document.querySelectorAll('.usecase-card > code');
  const usecaseOriginals = new Map();
  usecaseCards.forEach(el => {
    usecaseOriginals.set(el, el.textContent);
  });

  // Store original copy button data
  const copyBtns = document.querySelectorAll('.copy-btn');
  const copyOriginals = new Map();
  copyBtns.forEach(btn => {
    copyOriginals.set(btn, btn.dataset.copy);
  });

  function switchLang(lang) {
    const isPy = lang === 'python';
    document.body.classList.toggle('lang-python', isPy);

    // Toggle nav buttons
    document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Switch code blocks
    codeBlocks.forEach(el => {
      const orig = originals.get(el);
      if (isPy) {
        // Find matching Python equivalent
        const entry = pyMap.find(m => orig.text.includes(m.match));
        if (entry) {
          el.className = 'language-' + (entry.pyLang || 'python');
          el.textContent = entry.py;
          Prism.highlightElement(el);
          // Update copy button
          const copyBtn = el.closest('.code-block')?.querySelector('.copy-btn');
          if (copyBtn) {
            copyBtn.dataset.copy = entry.pyCopy || entry.py;
          }
        }
      } else {
        // Restore JS original
        el.innerHTML = orig.html;
        el.className = orig.className;
        // Restore copy button
        const copyBtn = el.closest('.code-block')?.querySelector('.copy-btn');
        if (copyBtn && copyOriginals.has(copyBtn)) {
          copyBtn.dataset.copy = copyOriginals.get(copyBtn);
        }
      }
    });

    // Switch use-case card inline code
    usecaseCards.forEach(el => {
      const origText = usecaseOriginals.get(el);
      if (isPy && usecasePyMap[origText]) {
        el.textContent = usecasePyMap[origText];
      } else {
        el.textContent = origText;
      }
    });

    // Update hero terminal — force update regardless of animation state
    const installCmd = document.getElementById('install-cmd');
    const termOutput = document.getElementById('term-output-1');
    const nodeCmd = document.getElementById('node-cmd');
    if (isPy) {
      if (installCmd) installCmd.textContent = 'pip install console-agent';
      if (termOutput) {
        const dim = termOutput.querySelector('.terminal-dim');
        if (dim) dim.textContent = '+ console-agent@1.0.0';
        termOutput.style.opacity = '1';
      }
      if (nodeCmd) nodeCmd.textContent = 'agent.security("audit input", context=req_body, verbose=True)';
      // Show all terminal lines
      const termLine2 = document.getElementById('term-line-2');
      const termAgentOut = document.getElementById('term-agent-output');
      if (termLine2) termLine2.style.opacity = '1';
      if (termAgentOut) termAgentOut.style.opacity = '1';
      // Kill any running GSAP on these elements so it doesn't overwrite
      gsap.killTweensOf('#install-cmd');
      gsap.killTweensOf('#node-cmd');
    } else {
      if (installCmd) installCmd.textContent = 'npm install @console-agent/agent';
      if (termOutput) {
        const dim = termOutput.querySelector('.terminal-dim');
        if (dim) dim.textContent = '+ @console-agent/agent@1.0.0';
      }
      if (nodeCmd) nodeCmd.textContent = 'console.agent.security("audit input", req.body, { verbose: true })';
      gsap.killTweensOf('#install-cmd');
      gsap.killTweensOf('#node-cmd');
    }
  }

  // Bind toggle buttons
  document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => switchLang(btn.dataset.lang));
  });
})();
