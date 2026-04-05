import { useState, useEffect } from "react";

// ─────────── THEME ───────────

const T = {
  dark: {
    bg: "#0a0a0a", card: "#111", border: "#1e1e1e", inputBg: "#0e0e0e",
    text: "#e8e8e8", textMuted: "#888", textDim: "#555", textSub: "#aaa",
    accent: "#7eb8e0", btnBg: "#1a1a1a", tagBg: "#1a1a1a",
    checkBg: "#0c1520", checkColor: "#7eb8e0",
  },
  light: {
    bg: "#f5f5f0", card: "#ffffff", border: "#e0e0e0", inputBg: "#fafafa",
    text: "#222", textMuted: "#666", textDim: "#999", textSub: "#555",
    accent: "#3B7DD8", btnBg: "#f5f5f5", tagBg: "#f0f0f0",
    checkBg: "#EAF2FF", checkColor: "#3B7DD8",
  },
};

// ─────────── REFERENCES ───────────

const REFERENCES = [
  {
    id: "samhsa",
    label: "SAMHSA (2014)",
    full: "Substance Abuse and Mental Health Services Administration. (2014). SAMHSA's Concept of Trauma and Guidance for a Trauma-Informed Approach. HHS Publication No. (SMA) 14-4884.",
    url: "https://store.samhsa.gov/product/samhsas-concept-of-trauma-and-guidance-for-a-trauma-informed-approach/sma14-4884",
  },
  {
    id: "greenspan",
    label: "Greenspan & Wieder (2006)",
    full: "Greenspan, S. I., & Wieder, S. (2006). Engaging Autism: Using the Floortime Approach to Help Children Relate, Communicate, and Think. Da Capo Press.",
  },
  {
    id: "greenspan1997",
    label: "Greenspan (1997)",
    full: "Greenspan, S. I. (1997). The Growth of the Mind and the Endangered Origins of Intelligence. Addison-Wesley.",
  },
  {
    id: "dunn",
    label: "Dunn (2014)",
    full: "Dunn, W. (2014). Sensory Profile 2: User's Manual. Pearson.",
  },
  {
    id: "ayres",
    label: "Ayres (1972/2005)",
    full: "Ayres, A. J. (2005). Sensory Integration and the Child: Understanding Hidden Sensory Challenges (25th Anniversary Ed.). Western Psychological Services.",
  },
  {
    id: "perry",
    label: "Perry & Winfrey (2021)",
    full: "Perry, B. D., & Winfrey, O. (2021). What Happened to You? Conversations on Trauma, Resilience, and Healing. Flatiron Books.",
  },
  {
    id: "porges",
    label: "Porges (2011)",
    full: "Porges, S. W. (2011). The Polyvagal Theory: Neurophysiological Foundations of Emotions, Attachment, Communication, and Self-Regulation. W. W. Norton.",
  },
  {
    id: "bath",
    label: "Bath (2008)",
    full: "Bath, H. (2008). The Three Pillars of Trauma-Informed Care. Reclaiming Children and Youth, 17(3), 17–21.",
  },
  {
    id: "cole",
    label: "Cole et al. (2005)",
    full: "Cole, S. F., O'Brien, J. G., Gadd, M. G., Ristuccia, J., Wallace, D. L., & Gregory, M. (2005). Helping Traumatized Children Learn. Massachusetts Advocates for Children.",
    url: "https://traumasensitiveschools.org",
  },
];

// ─────────── SAMHSA PRINCIPLES ───────────
// Source: SAMHSA (2014). SAMHSA's Concept of Trauma and Guidance for a Trauma-Informed Approach.
// Adapted for educational and therapeutic activity planning.

const SAMHSA = [
  {
    id: "safety",
    label: "Safety",
    color: "#27ae60",
    source: "SAMHSA, 2014; Bath, 2008; Porges, 2011",
    desc: "Ensuring physical and emotional safety throughout the environment and interactions.",
    prompts: [
      "What could feel physically or emotionally unsafe about {activity}?",
      "What sensory elements might feel threatening (noise, lighting, proximity)?",
      "How can the student exit or take a break without social cost?",
      "Is the space predictable — does the student know what will happen and when?",
      "Are there implicit social threats (being called on, public performance)?",
    ],
    adaptations: [
      "Offer a designated calm corner or break signal",
      "Preview the activity steps visually before beginning",
      "Use consistent routines and transition warnings",
      "Allow positioning choice (where to sit, proximity to others)",
      "Reduce startle risks (no sudden timer buzzers, unexpected calls)",
      "Provide a visual schedule showing beginning, middle, and end",
    ],
  },
  {
    id: "trust",
    label: "Trustworthiness & Transparency",
    color: "#7eb8e0",
    source: "SAMHSA, 2014; Bath, 2008; Cole et al., 2005",
    desc: "Building and maintaining trust through transparency, consistency, and clear expectations.",
    prompts: [
      "Are expectations for {activity} clear and stated up front?",
      "Does the student know why they are doing this and what comes next?",
      "Have you followed through on previous promises related to this type of task?",
      "Is the grading or evaluation criteria transparent?",
      "Could anything about {activity} feel like a trick or trap?",
    ],
    adaptations: [
      "Share the purpose of the activity in student-friendly language",
      "Post step-by-step instructions visually (not just verbally)",
      "Be explicit: 'This is not graded' or 'I will not call on you without warning'",
      "Follow through consistently on stated expectations",
      "Avoid surprise changes mid-task — narrate adjustments aloud",
      "Use first/then language: 'First we will ___, then you can ___'",
    ],
  },
  {
    id: "peer",
    label: "Peer Support",
    color: "#e89b2d",
    source: "SAMHSA, 2014; Perry & Winfrey, 2021",
    desc: "Promoting healing and connection through peer relationships and mutual support.",
    prompts: [
      "Does {activity} require social interaction? Is the student ready for that?",
      "Are peer groupings safe — is the student placed with trusted peers?",
      "Is there a way to build in cooperative (not competitive) elements?",
      "Could peer modeling support the student without singling them out?",
      "Is there risk of social comparison or embarrassment?",
    ],
    adaptations: [
      "Offer partner work with a chosen or trusted peer",
      "Use cooperative structures (think-pair-share) rather than competitive ones",
      "Normalize struggle: 'Everyone finds this tricky at first'",
      "Provide sentence starters for peer interaction",
      "Allow parallel work (side-by-side, not face-to-face) if preferred",
      "Build in structured turn-taking so no one dominates",
    ],
  },
  {
    id: "collaboration",
    label: "Collaboration & Mutuality",
    color: "#9b59b6",
    source: "SAMHSA, 2014; Greenspan & Wieder, 2006",
    desc: "Partnering with the student and leveling power differences in the relationship.",
    prompts: [
      "During {activity}, who holds the power — and does the student feel that?",
      "Is there room for the student to shape how the activity goes?",
      "Are you doing things WITH the student or TO the student?",
      "Can the student give feedback on what is or isn't working?",
      "Does the student see themselves as a partner in their own learning?",
    ],
    adaptations: [
      "Co-create activity rules or expectations with the student",
      "Offer two ways to complete the task and let the student choose",
      "Check in mid-task: 'How is this going for you?'",
      "Position yourself at eye level, beside (not across from) the student",
      "Use collaborative language: 'Let's figure this out together'",
      "Allow student to set their own goal within the task",
    ],
  },
  {
    id: "empowerment",
    label: "Empowerment, Voice & Choice",
    color: "#e63946",
    source: "SAMHSA, 2014; Cole et al., 2005",
    desc: "Prioritizing student agency, strengths, and self-advocacy throughout the activity.",
    prompts: [
      "Where does the student have genuine choice during {activity}?",
      "Does {activity} build on the student's existing strengths or interests?",
      "Can the student advocate for what they need (tools, breaks, modifications)?",
      "Is there a way the student can demonstrate competence?",
      "Are you recognizing effort and process, not just outcomes?",
    ],
    adaptations: [
      "Offer choice in materials, order, or response format",
      "Connect the activity to the student's interests when possible",
      "Teach and practice self-advocacy scripts: 'I need a break' / 'Can I try it this way?'",
      "Highlight what the student did well, specifically",
      "Let the student teach or show a peer something they know",
      "Provide multiple ways to respond (verbal, written, drawn, gestured)",
    ],
  },
  {
    id: "cultural",
    label: "Cultural, Historical & Gender Issues",
    color: "#2c8c99",
    source: "SAMHSA, 2014; Perry & Winfrey, 2021",
    desc: "Addressing cultural, historical, and gender-related factors that affect the student's experience.",
    prompts: [
      "Does {activity} reflect or respect the student's cultural background?",
      "Are the materials and examples culturally relevant and diverse?",
      "Could the content trigger historical or intergenerational trauma?",
      "Are gender norms or assumptions embedded in the activity?",
      "Does the student's cultural context influence how they engage with authority or peers?",
    ],
    adaptations: [
      "Use texts, images, and examples that reflect the student's identity",
      "Be aware of cultural differences in eye contact, personal space, and communication style",
      "Avoid activities that assume a specific family structure or home environment",
      "Check for implicit bias in how you interpret engagement or behavior",
      "Invite family or community knowledge into the activity when appropriate",
      "Offer culturally sustaining options (e.g., storytelling, oral traditions)",
    ],
  },
];

// ─────────── DIR LEVELS ───────────
// Source: Greenspan & Wieder (2006). Engaging Autism. Da Capo Press.
// Greenspan (1997). The Growth of the Mind. Addison-Wesley.
// Functional Emotional Developmental Capacities (FEDCs) adapted for activity planning.

const DIR_LEVELS = [
  {
    level: 1,
    label: "Shared Attention & Regulation",
    subtitle: "Calm, alert, engaged",
    color: "#7eb8e0",
    source: "Greenspan & Wieder, 2006; Porges, 2011",
    desc: "Can the student achieve and maintain a calm, focused, alert state during the activity?",
    prompts: [
      "Does {activity} allow for co-regulation support?",
      "Can the environment be modified to support regulation (lighting, noise, seating)?",
      "Is there a calm-down plan if the student becomes dysregulated?",
      "How long does the student need to sustain attention — is that realistic?",
    ],
    adaptations: [
      "Begin with a regulating activity (deep breaths, heavy work, movement)",
      "Offer fidgets, movement breaks, or weighted items",
      "Reduce environmental stressors before introducing the task",
      "Use a visual or body-based check-in scale before starting",
      "Shorten the task or build in natural pauses",
    ],
    sensory: [
      "Auditory: background noise level, competing sounds",
      "Visual: lighting intensity, visual clutter on materials",
      "Proprioceptive: seating type, need for movement input",
      "Tactile: material textures (paper, pencil grip, shared objects)",
    ],
  },
  {
    level: 2,
    label: "Engagement & Relating",
    subtitle: "Warm, trusting connection",
    color: "#27ae60",
    source: "Greenspan & Wieder, 2006; Perry & Winfrey, 2021",
    desc: "Can the student engage in a warm, trusting relationship with the adult or peers during this task?",
    prompts: [
      "Is there a trusting relationship in place before asking the student to do {activity}?",
      "Does the student feel safe enough to engage emotionally?",
      "Can you use affect (warmth, tone, facial expression) to draw the student in?",
      "Is there pleasure or joy available in this interaction?",
    ],
    adaptations: [
      "Start with connection before content — a warm greeting or shared moment",
      "Use animated affect, playfulness, and genuine curiosity",
      "Follow the student's lead before introducing your agenda",
      "Match the student's emotional tone before redirecting",
      "Avoid jumping straight into demands — build the bridge first",
    ],
    sensory: [
      "Proximity: is the student comfortable with your physical closeness?",
      "Tone of voice: is your voice calm, warm, and predictable?",
      "Eye contact: is the student comfortable with direct gaze?",
      "Touch: does the student welcome or avoid physical contact?",
    ],
  },
  {
    level: 3,
    label: "Two-Way Communication",
    subtitle: "Purposeful back-and-forth",
    color: "#e89b2d",
    source: "Greenspan & Wieder, 2006; Greenspan, 1997",
    desc: "Can the student engage in purposeful back-and-forth interaction (gestural or verbal) during the activity?",
    prompts: [
      "Does {activity} support back-and-forth exchanges, or is it one-directional?",
      "Can the student initiate, not just respond?",
      "Are there natural opportunities for the student to communicate intent?",
      "Is the communication demand appropriate for the student's level?",
    ],
    adaptations: [
      "Build in natural turn-taking within the activity",
      "Use open-ended prompts rather than yes/no questions",
      "Wait — give extra processing time for the student to respond",
      "Use visuals or AAC to support communication if needed",
      "Create opportunities for the student to direct the interaction",
    ],
    sensory: [
      "Processing speed: does the student need extra wait time?",
      "Motor planning: can the student physically execute the communication?",
      "Auditory processing: can the student follow verbal exchanges at this pace?",
    ],
  },
  {
    level: 4,
    label: "Complex Communication & Problem-Solving",
    subtitle: "Sustained shared thinking",
    color: "#9b59b6",
    source: "Greenspan & Wieder, 2006; Greenspan, 1997",
    desc: "Can the student sustain a chain of back-and-forth interactions to solve problems or negotiate during the activity?",
    prompts: [
      "Does {activity} require sustained problem-solving or negotiation?",
      "Can the student maintain a long chain of back-and-forth exchanges?",
      "Is there room for the student to problem-solve rather than follow a script?",
      "Can the student handle the emotional complexity of disagreement or confusion?",
    ],
    adaptations: [
      "Break complex tasks into smaller problem-solving steps",
      "Use visual supports to map out the problem-solving process",
      "Model thinking aloud: 'Hmm, I'm not sure — let me think...'",
      "Allow the student to try, fail, and try again without penalty",
      "Co-regulate through frustration moments rather than removing the challenge",
    ],
    sensory: [
      "Cognitive load: is the student managing sensory input AND complex thinking?",
      "Emotional regulation: can the student manage frustration during challenging tasks?",
      "Motor demands: are fine motor demands competing with cognitive demands?",
    ],
  },
  {
    level: 5,
    label: "Emotional Ideas",
    subtitle: "Symbolic & creative use of ideas",
    color: "#e63946",
    source: "Greenspan & Wieder, 2006; Greenspan, 1997",
    desc: "Can the student use ideas creatively and symbolically — through language, pretend play, or imagination — during the activity?",
    prompts: [
      "Does {activity} invite creative or imaginative thinking?",
      "Can the student express ideas symbolically (through words, drawing, pretend)?",
      "Is there space for the student's own ideas, not just 'right answers'?",
      "Can the student label and express emotional states related to the content?",
    ],
    adaptations: [
      "Invite 'what if' questions and imaginative scenarios",
      "Allow multiple forms of expression (drawing, acting, building, narrating)",
      "Connect academic content to the student's emotional experience",
      "Use story-based or narrative approaches to the material",
      "Validate all ideas before evaluating or correcting",
    ],
    sensory: [
      "Are sensory needs met enough to free up capacity for creative thinking?",
      "Does the physical environment support imagination (flexible space, open-ended materials)?",
      "Is the student's body calm enough to access higher-level thinking?",
    ],
  },
  {
    level: 6,
    label: "Emotional Thinking",
    subtitle: "Logical bridges between ideas",
    color: "#2c8c99",
    source: "Greenspan & Wieder, 2006; Greenspan, 1997",
    desc: "Can the student build logical bridges between ideas — connecting cause and effect, comparing perspectives, and reflecting?",
    prompts: [
      "Does {activity} ask the student to reason, compare, or connect ideas logically?",
      "Can the student reflect on their own thinking or perspective?",
      "Is there room for 'why' and 'how' questions, not just 'what'?",
      "Can the student hold multiple perspectives at once?",
    ],
    adaptations: [
      "Use graphic organizers to make logical connections visible",
      "Ask 'why do you think that?' and 'how do you know?' gently",
      "Compare perspectives: 'What might ___ think about this?'",
      "Support metacognition: 'What helped you figure that out?'",
      "Connect the activity to real-life cause-and-effect scenarios",
    ],
    sensory: [
      "Is the student regulated enough to access abstract reasoning?",
      "Are distractions minimized to support sustained logical thought?",
      "Is the environment supporting or competing with cognitive demands?",
    ],
  },
];

// ─────────── SENSORY DOMAINS ───────────
// Source: Dunn (2014). Sensory Profile 2. Ayres (1972/2005). Sensory Integration and the Child.

const SENSORY = [
  {
    id: "auditory",
    label: "Auditory",
    color: "#7eb8e0",
    prompts: [
      "Is the environment noisy or unpredictable?",
      "Does {activity} require sustained listening?",
      "Are there competing auditory inputs (hallway noise, HVAC, peers)?",
      "Does the student need auditory information repeated or presented visually?",
    ],
    supports: [
      "Offer noise-reducing headphones or a quieter space",
      "Pair auditory instructions with visual supports",
      "Reduce background noise before starting",
      "Use a calm, even tone — avoid sudden volume changes",
    ],
  },
  {
    id: "visual",
    label: "Visual",
    color: "#27ae60",
    prompts: [
      "Are materials visually cluttered or overwhelming?",
      "Is the lighting too bright, too dim, or flickering?",
      "Does the student need to track visually across a page or board?",
      "Is there too much visual information competing for attention?",
    ],
    supports: [
      "Reduce visual clutter on worksheets — use clean layouts with whitespace",
      "Offer a reading window or line guide",
      "Adjust lighting if possible (avoid fluorescents)",
      "Use high-contrast, well-spaced text",
    ],
  },
  {
    id: "tactile",
    label: "Tactile",
    color: "#e89b2d",
    prompts: [
      "Does {activity} involve touching materials the student may find aversive?",
      "Is the student comfortable with shared materials (books, manipulatives)?",
      "Does the pencil or tool feel comfortable in the student's hand?",
      "Are there unexpected tactile experiences (glue, paint, textured paper)?",
    ],
    supports: [
      "Offer alternative tools (pencil grips, stylus, keyboard)",
      "Provide a tactile fidget or comfort object",
      "Warn before introducing new textures",
      "Allow the student to observe before touching",
    ],
  },
  {
    id: "proprioceptive",
    label: "Proprioceptive",
    color: "#9b59b6",
    prompts: [
      "Does {activity} require the student to sit still for extended periods?",
      "Does the student seem to need more input to their muscles and joints?",
      "Is the student leaning, pushing, crashing, or seeking deep pressure?",
      "Can the student maintain an upright posture for the duration?",
    ],
    supports: [
      "Offer a standing option, wobble cushion, or resistance band on chair legs",
      "Build in heavy work breaks (carrying books, wall push-ups, chair push-ups)",
      "Allow movement within the task (walking and reading, pacing while thinking)",
      "Provide a weighted lap pad or compression vest if appropriate",
    ],
  },
  {
    id: "vestibular",
    label: "Vestibular",
    color: "#e63946",
    prompts: [
      "Does {activity} require balance or changes in head position?",
      "Is the student seeking or avoiding movement?",
      "Does the student become anxious with feet off the ground?",
      "Is the student rocking, spinning, or swaying during the task?",
    ],
    supports: [
      "Allow rocking or gentle movement during seated tasks",
      "Offer movement breaks between task segments",
      "Ensure feet are firmly supported on the floor",
      "Use slow, rhythmic movement for calming (swinging, rocking chair)",
    ],
  },
  {
    id: "interoceptive",
    label: "Interoceptive",
    color: "#2c8c99",
    prompts: [
      "Can the student recognize internal signals (hunger, thirst, bathroom needs)?",
      "Is the student aware of their emotional state before starting {activity}?",
      "Does the student notice when they are becoming frustrated or overwhelmed?",
      "Can the student identify when they need a break?",
    ],
    supports: [
      "Use body-based check-ins: 'How does your body feel right now?'",
      "Teach the connection between body signals and emotions",
      "Offer proactive breaks before the student is in crisis",
      "Use visuals: body maps, feelings thermometers, zones of regulation",
    ],
  },
];

// ─────────── GLOBAL STYLES ───────────

const STYLE = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Outfit', sans-serif;
  -webkit-font-smoothing: antialiased;
  line-height: 1.6;
  transition: background 0.3s, color 0.3s;
}
button { font-family: 'Outfit', sans-serif; cursor: pointer; }
@media print {
  body { background: #fff !important; color: #222 !important; }
  .no-print { display: none !important; }
}
`;

// ─────────── COMPONENTS ───────────

function ThemeToggle({ dark, toggle, t }) {
  return (
    <button
      onClick={toggle}
      className="no-print"
      style={{
        background: "transparent", border: `1px solid ${t.border}`, borderRadius: 20,
        padding: "5px 14px", fontFamily: "'Space Mono', monospace", fontSize: 11,
        color: t.textMuted, cursor: "pointer", transition: "all 0.2s",
        display: "inline-flex", alignItems: "center", gap: 6,
      }}
    >
      {dark ? "\u263E Dark" : "\u2600 Light"}
    </button>
  );
}

function SectionCard({ color, title, desc, source, children, open, onToggle, t }) {
  return (
    <div style={{
      background: t.card, border: `1px solid ${t.border}`, borderLeft: `3px solid ${color}`,
      borderRadius: 14, marginBottom: 12, overflow: "hidden", transition: "all 0.3s",
    }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%", background: "transparent", border: "none", padding: "16px 20px",
          display: "flex", alignItems: "center", gap: 12, cursor: "pointer", textAlign: "left",
        }}
      >
        <span style={{
          width: 10, height: 10, borderRadius: "50%", background: color, flexShrink: 0,
        }} />
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 13,
            color: color, letterSpacing: 1, textTransform: "uppercase",
          }}>{title}</div>
          <div style={{ fontSize: 13, color: t.textMuted, marginTop: 2 }}>{desc}</div>
        </div>
        <span style={{
          color: t.textDim, fontSize: 18, transition: "transform 0.2s",
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
        }}>&#9662;</span>
      </button>
      {open && (
        <div style={{ padding: "0 20px 20px", borderTop: `1px solid ${t.border}` }}>
          {source && (
            <div style={{
              fontFamily: "'Space Mono', monospace", fontSize: 10, color: t.textDim,
              marginTop: 10, marginBottom: 4, fontStyle: "italic",
            }}>{source}</div>
          )}
          {children}
        </div>
      )}
    </div>
  );
}

function PromptList({ prompts, activity, color, t }) {
  const fill = (s) => s.replace("{activity}", activity || "this activity");
  return (
    <div style={{ marginTop: 14 }}>
      <div style={{
        fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700,
        color: color, letterSpacing: 1, marginBottom: 8, textTransform: "uppercase",
      }}>Reflection Prompts</div>
      {prompts.map((p, i) => (
        <div key={i} style={{
          fontSize: 14, color: t.text, padding: "8px 0",
          borderBottom: i < prompts.length - 1 ? `1px solid ${t.border}` : "none",
          lineHeight: 1.6,
        }}>
          <span style={{ color: color, marginRight: 8, fontWeight: 700 }}>{i + 1}.</span>
          {fill(p)}
        </div>
      ))}
    </div>
  );
}

function AdaptationList({ adaptations, checked, onCheck, sectionId, color, t }) {
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{
        fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700,
        color: color, letterSpacing: 1, marginBottom: 8, textTransform: "uppercase",
      }}>Suggested Adaptations</div>
      {adaptations.map((a, i) => {
        const key = `${sectionId}_${i}`;
        const isChecked = checked[key] || false;
        return (
          <label key={i} style={{
            display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 0",
            borderBottom: i < adaptations.length - 1 ? `1px solid ${t.border}` : "none",
            cursor: "pointer", fontSize: 14, color: t.text, lineHeight: 1.6,
          }}>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => onCheck(key)}
              style={{ marginTop: 4, accentColor: color, width: 16, height: 16, flexShrink: 0 }}
            />
            <span style={{ opacity: isChecked ? 1 : 0.8 }}>{a}</span>
          </label>
        );
      })}
    </div>
  );
}

function NotesField({ value, onChange, color, t }) {
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{
        fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700,
        color: color, letterSpacing: 1, marginBottom: 8, textTransform: "uppercase",
      }}>Your Notes</div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Add notes for this section..."
        rows={3}
        style={{
          width: "100%", background: t.inputBg, color: t.text, border: `1px solid ${t.border}`,
          borderRadius: 8, padding: 12, fontSize: 14, fontFamily: "'Outfit', sans-serif",
          resize: "vertical", outline: "none", lineHeight: 1.6,
        }}
      />
    </div>
  );
}

function SensoryDomainCard({ domain, activity, t }) {
  const fill = (s) => s.replace("{activity}", activity || "this activity");
  return (
    <div style={{
      background: t.card, border: `1px solid ${t.border}`, borderTop: `3px solid ${domain.color}`,
      borderRadius: 14, padding: 20, transition: "all 0.3s",
    }}>
      <div style={{
        fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 13,
        color: domain.color, letterSpacing: 1, marginBottom: 10, textTransform: "uppercase",
      }}>{domain.label}</div>
      <div style={{
        fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700,
        color: t.textDim, letterSpacing: 1, marginBottom: 6, textTransform: "uppercase",
      }}>Consider</div>
      {domain.prompts.map((p, i) => (
        <div key={i} style={{
          fontSize: 13, color: t.text, padding: "4px 0", lineHeight: 1.5,
        }}>
          <span style={{ color: domain.color, marginRight: 6 }}>&#8226;</span>
          {fill(p)}
        </div>
      ))}
      <div style={{
        fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700,
        color: t.textDim, letterSpacing: 1, marginTop: 12, marginBottom: 6, textTransform: "uppercase",
      }}>Supports</div>
      {domain.supports.map((s, i) => (
        <div key={i} style={{
          fontSize: 13, color: t.textSub, padding: "4px 0", lineHeight: 1.5,
        }}>
          <span style={{ color: domain.color, marginRight: 6 }}>+</span>
          {s}
        </div>
      ))}
    </div>
  );
}

// ─────────── MAIN APP ───────────

export default function App() {
  const [dark, setDark] = useState(false);
  const [activity, setActivity] = useState("");
  const [activeTab, setActiveTab] = useState("samhsa");
  const [expanded, setExpanded] = useState(null);
  const [checked, setChecked] = useState({});
  const [notes, setNotes] = useState({});

  const t = dark ? T.dark : T.light;

  useEffect(() => {
    document.body.style.background = t.bg;
    document.body.style.color = t.text;
  }, [dark]);

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = STYLE;
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  const toggleCheck = (key) => setChecked((p) => ({ ...p, [key]: !p[key] }));
  const setNote = (id, val) => setNotes((p) => ({ ...p, [id]: val }));
  const toggleExpand = (id) => setExpanded((p) => (p === id ? null : id));

  const tabs = [
    { key: "samhsa", label: "SAMHSA Principles" },
    { key: "dir", label: "DIR Levels" },
    { key: "sensory", label: "Sensory" },
    { key: "summary", label: "Summary" },
  ];

  const checkedAdaptations = Object.entries(checked)
    .filter(([, v]) => v)
    .map(([key]) => {
      const [sectionId, idx] = key.split("_");
      const samhsa = SAMHSA.find((s) => s.id === sectionId);
      if (samhsa) return { section: samhsa.label, text: samhsa.adaptations[parseInt(idx)], color: samhsa.color };
      const dirMatch = DIR_LEVELS.find((d) => `dir${d.level}` === sectionId);
      if (dirMatch) return { section: `DIR ${dirMatch.level}: ${dirMatch.label}`, text: dirMatch.adaptations[parseInt(idx)], color: dirMatch.color };
      return null;
    })
    .filter(Boolean);

  const activeNotes = Object.entries(notes).filter(([, v]) => v.trim());

  const handlePrint = () => window.print();

  const handleExport = () => {
    const data = {
      activity,
      date: new Date().toISOString().split("T")[0],
      selectedAdaptations: checkedAdaptations,
      notes: Object.fromEntries(activeNotes),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `adaptation-plan-${data.date}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px" }}>

      {/* ── Header ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <div style={{
            fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700,
            letterSpacing: 3, textTransform: "uppercase", color: t.textDim, marginBottom: 4,
          }}>Trauma-Informed Practice</div>
          <h1 style={{
            fontFamily: "'Outfit', sans-serif", fontSize: 28, fontWeight: 800,
            color: t.text, letterSpacing: -0.5, marginBottom: 4,
          }}>Activity Adaptation Planner</h1>
          <div style={{
            fontFamily: "'Space Mono', monospace", fontSize: 11, color: t.textMuted,
            letterSpacing: 1,
          }}>SAMHSA + DIR/Floortime + Sensory</div>
        </div>
        <ThemeToggle dark={dark} toggle={() => setDark((d) => !d)} t={t} />
      </div>

      {/* ── Activity Input ── */}
      <div style={{
        background: t.card, border: `1px solid ${t.border}`, borderRadius: 16,
        padding: 24, marginBottom: 28, transition: "all 0.3s",
      }}>
        <label style={{
          fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700,
          letterSpacing: 2, textTransform: "uppercase", color: t.textDim, display: "block", marginBottom: 10,
        }}>Describe the Activity</label>
        <input
          type="text"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          placeholder="e.g., worksheet in class, reading a passage aloud, group discussion..."
          style={{
            width: "100%", background: t.inputBg, color: t.text, border: `1px solid ${t.border}`,
            borderRadius: 10, padding: "14px 16px", fontSize: 16, fontFamily: "'Outfit', sans-serif",
            outline: "none", transition: "border-color 0.2s",
          }}
          onFocus={(e) => (e.target.style.borderColor = t.accent)}
          onBlur={(e) => (e.target.style.borderColor = t.border)}
        />
        {activity && (
          <div style={{
            marginTop: 12, fontSize: 13, color: t.textMuted, lineHeight: 1.5,
          }}>
            Adapt <strong style={{ color: t.text }}>"{activity}"</strong> through the lenses below.
          </div>
        )}
      </div>

      {/* ── Tabs ── */}
      <div className="no-print" style={{
        display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20,
      }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: "8px 16px", borderRadius: 20,
              border: `1px solid ${activeTab === tab.key ? t.accent : t.border}`,
              background: activeTab === tab.key ? t.accent : "transparent",
              color: activeTab === tab.key ? "#fff" : t.textMuted,
              fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700,
              letterSpacing: 0.5, transition: "all 0.2s", cursor: "pointer",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── SAMHSA Tab ── */}
      {activeTab === "samhsa" && (
        <div>
          <div style={{
            fontSize: 13, color: t.textMuted, marginBottom: 16, lineHeight: 1.6,
          }}>
            SAMHSA's six principles of trauma-informed care. Expand each to see reflection prompts and suggested adaptations.
          </div>
          {SAMHSA.map((p) => (
            <SectionCard
              key={p.id}
              color={p.color}
              title={p.label}
              desc={p.desc}
              source={p.source}
              open={expanded === p.id}
              onToggle={() => toggleExpand(p.id)}
              t={t}
            >
              <PromptList prompts={p.prompts} activity={activity} color={p.color} t={t} />
              <AdaptationList
                adaptations={p.adaptations}
                checked={checked}
                onCheck={toggleCheck}
                sectionId={p.id}
                color={p.color}
                t={t}
              />
              <NotesField
                value={notes[p.id] || ""}
                onChange={(val) => setNote(p.id, val)}
                color={p.color}
                t={t}
              />
            </SectionCard>
          ))}
        </div>
      )}

      {/* ── DIR Tab ── */}
      {activeTab === "dir" && (
        <div>
          <div style={{
            fontSize: 13, color: t.textMuted, marginBottom: 16, lineHeight: 1.6,
          }}>
            DIR/Floortime functional emotional developmental capacities. Each level builds on the ones before it.
          </div>
          {DIR_LEVELS.map((d) => {
            const id = `dir${d.level}`;
            return (
              <SectionCard
                key={id}
                color={d.color}
                title={`Level ${d.level}: ${d.label}`}
                desc={d.desc}
                source={d.source}
                open={expanded === id}
                onToggle={() => toggleExpand(id)}
                t={t}
              >
                <PromptList prompts={d.prompts} activity={activity} color={d.color} t={t} />
                <AdaptationList
                  adaptations={d.adaptations}
                  checked={checked}
                  onCheck={toggleCheck}
                  sectionId={id}
                  color={d.color}
                  t={t}
                />
                {d.sensory && d.sensory.length > 0 && (
                  <div style={{ marginTop: 16 }}>
                    <div style={{
                      fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700,
                      color: d.color, letterSpacing: 1, marginBottom: 8, textTransform: "uppercase",
                    }}>Sensory Considerations</div>
                    {d.sensory.map((s, i) => (
                      <div key={i} style={{
                        fontSize: 13, color: t.textSub, padding: "4px 0", lineHeight: 1.5,
                      }}>
                        <span style={{ color: d.color, marginRight: 6 }}>&#8226;</span>{s}
                      </div>
                    ))}
                  </div>
                )}
                <NotesField
                  value={notes[id] || ""}
                  onChange={(val) => setNote(id, val)}
                  color={d.color}
                  t={t}
                />
              </SectionCard>
            );
          })}
        </div>
      )}

      {/* ── Sensory Tab ── */}
      {activeTab === "sensory" && (
        <div>
          <div style={{
            fontSize: 13, color: t.textMuted, marginBottom: 16, lineHeight: 1.6,
          }}>
            Sensory processing considerations for adapting the activity. Think about what the student's nervous system needs.
          </div>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 14,
          }}>
            {SENSORY.map((d) => (
              <SensoryDomainCard key={d.id} domain={d} activity={activity} t={t} />
            ))}
          </div>
        </div>
      )}

      {/* ── Summary Tab ── */}
      {activeTab === "summary" && (
        <div>
          <div style={{
            background: t.card, border: `1px solid ${t.border}`, borderRadius: 14,
            padding: 24, marginBottom: 20, transition: "all 0.3s",
          }}>
            <div style={{
              fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700,
              letterSpacing: 2, color: t.textDim, textTransform: "uppercase", marginBottom: 4,
            }}>Adaptation Plan</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: t.text, marginBottom: 4 }}>
              {activity || "No activity entered"}
            </div>
            <div style={{
              fontFamily: "'Space Mono', monospace", fontSize: 11, color: t.textMuted,
            }}>
              {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </div>
          </div>

          {checkedAdaptations.length > 0 ? (
            <div style={{
              background: t.card, border: `1px solid ${t.border}`, borderRadius: 14,
              padding: 24, marginBottom: 20, transition: "all 0.3s",
            }}>
              <div style={{
                fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700,
                letterSpacing: 1, color: t.accent, textTransform: "uppercase", marginBottom: 14,
              }}>Selected Adaptations ({checkedAdaptations.length})</div>
              {checkedAdaptations.map((a, i) => (
                <div key={i} style={{
                  padding: "10px 0",
                  borderBottom: i < checkedAdaptations.length - 1 ? `1px solid ${t.border}` : "none",
                  display: "flex", alignItems: "flex-start", gap: 10,
                }}>
                  <span style={{
                    width: 8, height: 8, borderRadius: "50%", background: a.color,
                    flexShrink: 0, marginTop: 6,
                  }} />
                  <div>
                    <div style={{
                      fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700,
                      color: a.color, letterSpacing: 1, textTransform: "uppercase",
                    }}>{a.section}</div>
                    <div style={{ fontSize: 14, color: t.text, lineHeight: 1.5, marginTop: 2 }}>{a.text}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              background: t.card, border: `1px solid ${t.border}`, borderRadius: 14,
              padding: 24, marginBottom: 20, textAlign: "center", transition: "all 0.3s",
            }}>
              <div style={{ fontSize: 14, color: t.textMuted }}>
                No adaptations selected yet. Check adaptations in the SAMHSA and DIR tabs.
              </div>
            </div>
          )}

          {activeNotes.length > 0 && (
            <div style={{
              background: t.card, border: `1px solid ${t.border}`, borderRadius: 14,
              padding: 24, marginBottom: 20, transition: "all 0.3s",
            }}>
              <div style={{
                fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700,
                letterSpacing: 1, color: t.accent, textTransform: "uppercase", marginBottom: 14,
              }}>Notes</div>
              {activeNotes.map(([id, text]) => {
                const samhsa = SAMHSA.find((s) => s.id === id);
                const dir = DIR_LEVELS.find((d) => `dir${d.level}` === id);
                const label = samhsa ? samhsa.label : dir ? `DIR ${dir.level}: ${dir.label}` : id;
                const color = samhsa ? samhsa.color : dir ? dir.color : t.accent;
                return (
                  <div key={id} style={{
                    padding: "10px 0",
                    borderBottom: `1px solid ${t.border}`,
                  }}>
                    <div style={{
                      fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700,
                      color, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4,
                    }}>{label}</div>
                    <div style={{ fontSize: 14, color: t.text, lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{text}</div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="no-print" style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 24 }}>
            <button
              onClick={handlePrint}
              style={{
                padding: "12px 28px", borderRadius: 10, border: "none",
                background: t.accent, color: "#fff", fontWeight: 600, fontSize: 14,
                letterSpacing: 0.5, cursor: "pointer",
              }}
            >
              Print
            </button>
            <button
              onClick={handleExport}
              style={{
                padding: "12px 28px", borderRadius: 10,
                border: `1px solid ${t.border}`, background: "transparent",
                color: t.text, fontWeight: 600, fontSize: 14,
                letterSpacing: 0.5, cursor: "pointer",
              }}
            >
              Export JSON
            </button>
          </div>
        </div>
      )}

      {/* ── References ── */}
      <div style={{
        background: t.card, border: `1px solid ${t.border}`, borderRadius: 14,
        padding: 24, marginTop: 40, transition: "all 0.3s",
      }}>
        <div style={{
          fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700,
          letterSpacing: 2, color: t.textDim, textTransform: "uppercase", marginBottom: 14,
        }}>References</div>
        {REFERENCES.map((r) => (
          <div key={r.id} style={{
            fontSize: 13, color: t.textMuted, lineHeight: 1.7, marginBottom: 8,
            paddingLeft: 20, textIndent: -20,
          }}>
            {r.url ? (
              <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ color: t.accent, textDecoration: "none" }}>
                {r.full}
              </a>
            ) : r.full}
          </div>
        ))}
      </div>

      {/* ── Footer ── */}
      <footer style={{
        textAlign: "center", marginTop: 48, paddingTop: 20,
        borderTop: `1px solid ${t.border}`,
        fontFamily: "'Space Mono', monospace", fontSize: 11, color: t.textDim,
        letterSpacing: 0.5, lineHeight: 1.8,
      }}>
        <p>Rachel Norton, MS, CCC-SLP</p>
        <p>RTN Communication & Literacy &middot; rachelslp.org</p>
      </footer>
    </div>
  );
}
