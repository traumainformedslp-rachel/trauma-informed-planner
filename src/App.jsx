import { useState, useEffect } from "react";

// ─────────── THEME ───────────

const GRADIENT = "linear-gradient(135deg, #8a6cb8, #d4718e)";
const RAINBOW = "linear-gradient(90deg, #F9C5C5, #FDDBB4, #FFF0A8, #C2EDD0, #BEE3F8, #D8C8F8, #EED4F8)";

const T = {
  dark: {
    bg: "#0a0a0a", card: "#111", border: "#1e1e1e", inputBg: "#0e0e0e",
    text: "#e8e8e8", textMuted: "#888", textDim: "#555", textSub: "#aaa",
    accent: "#b9a0dc", btnBg: "#1a1a1a", tagBg: "#1a1a1a",
    checkBg: "#1a1226", checkColor: "#b9a0dc",
    zoneSafe: "#0a1a10", zoneHyper: "#1a0a0a", zoneHypo: "#120a1a",
    gradient: GRADIENT, rainbow: RAINBOW,
  },
  light: {
    bg: "#f5f5f0", card: "#ffffff", border: "#e0e0e0", inputBg: "#fafafa",
    text: "#222", textMuted: "#666", textDim: "#999", textSub: "#555",
    accent: "#8a6cb8", btnBg: "#f5f5f5", tagBg: "#f0f0f0",
    checkBg: "#F3EEFA", checkColor: "#8a6cb8",
    zoneSafe: "#eafaf0", zoneHyper: "#fff0f0", zoneHypo: "#f3eefa",
    gradient: GRADIENT, rainbow: RAINBOW,
  },
};

// ─────────── REFERENCES ───────────

const REFERENCES = [
  { id: "samhsa", full: "SAMHSA. (2014). SAMHSA's Concept of Trauma and Guidance for a Trauma-Informed Approach. HHS Pub. SMA14-4884.", url: "https://store.samhsa.gov/product/samhsas-concept-of-trauma-and-guidance-for-a-trauma-informed-approach/sma14-4884" },
  { id: "greenspan", full: "Greenspan, S. I., & Wieder, S. (2006). Engaging Autism: Using the Floortime Approach to Help Children Relate, Communicate, and Think. Da Capo Press." },
  { id: "greenspan1997", full: "Greenspan, S. I. (1997). The Growth of the Mind and the Endangered Origins of Intelligence. Addison-Wesley." },
  { id: "mahler2022", full: "Mahler, K. et al. (2022). Impact of an Interoception-Based Program on Emotion Regulation in Autistic Children. Occupational Therapy International." },
  { id: "mahler2024", full: "Mahler, K. et al. (2024). An Interoception-Based Intervention for Improving Emotional Regulation in Children in a Special Education Classroom. OT Health Care." },
  { id: "ogden", full: "Ogden, P., Minton, K., & Pain, C. (2006). Trauma and the Body: A Sensorimotor Approach to Psychotherapy. Norton." },
  { id: "porges", full: "Porges, S. W. (2011). The Polyvagal Theory: Neurophysiological Foundations of Emotions, Attachment, Communication, and Self-Regulation. Norton." },
  { id: "perry", full: "Perry, B. D. (2006). The Neurosequential Model of Therapeutics. In Working with Traumatized Youth in Child Welfare. Guilford Press." },
  { id: "champagne", full: "Champagne, T. & Stromberg, N. (2004). Sensory approaches in inpatient psychiatric settings. Journal of Psychosocial Nursing." },
  { id: "ayres", full: "Ayres, A. J. (2005). Sensory Integration and the Child (25th Anniversary Ed.). Western Psychological Services." },
  { id: "dunn", full: "Dunn, W. (2014). Sensory Profile 2: User's Manual. Pearson." },
  { id: "oleary", full: "O'Leary, N. et al. (2023). Understanding the why: Integration of trauma-informed care into SLT practice. Advances in Communication and Swallowing." },
  { id: "rupert", full: "Rupert, A.C. & Bartlett, L. (2022). Childhood Trauma and Attachment Gap in SLP. AJSLP." },
  { id: "goldstein", full: "Goldstein, E. et al. (2024). Effectiveness of TIC Implementation in Healthcare. The Permanente Journal." },
  { id: "cole", full: "Cole, S. F. et al. (2005). Helping Traumatized Children Learn. Massachusetts Advocates for Children." },
  { id: "bath", full: "Bath, H. (2008). The Three Pillars of Trauma-Informed Care. Reclaiming Children and Youth, 17(3), 17–21." },
  { id: "siegel", full: "Siegel, D. J. (2012). The Developing Mind (2nd Ed.). Guilford Press." },
];

// ─────────── SAMHSA PRINCIPLES ───────────

const SAMHSA = [
  {
    id: "safety", label: "Safety", color: "#27ae60",
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
    id: "trust", label: "Trustworthiness & Transparency", color: "#7eb8e0",
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
    id: "peer", label: "Peer Support", color: "#e89b2d",
    source: "SAMHSA, 2014; Perry, 2006",
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
    id: "collaboration", label: "Collaboration & Mutuality", color: "#9b59b6",
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
    id: "empowerment", label: "Empowerment, Voice & Choice", color: "#e63946",
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
    id: "cultural", label: "Cultural, Historical & Gender Issues", color: "#2c8c99",
    source: "SAMHSA, 2014; O'Leary et al., 2023",
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
      "Check for implicit bias in how you interpret engagement or body communication",
      "Invite family or community knowledge into the activity when appropriate",
      "Offer culturally sustaining options (e.g., storytelling, oral traditions)",
    ],
  },
];

// ─────────── DIR LEVELS ───────────

const DIR_LEVELS = [
  {
    level: 1, label: "Shared Attention & Regulation", subtitle: "Calm, alert, engaged",
    color: "#7eb8e0", source: "Greenspan & Wieder, 2006; Porges, 2011",
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
    level: 2, label: "Engagement & Relating", subtitle: "Warm, trusting connection",
    color: "#27ae60", source: "Greenspan & Wieder, 2006; Perry, 2006",
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
    level: 3, label: "Two-Way Communication", subtitle: "Purposeful back-and-forth",
    color: "#e89b2d", source: "Greenspan & Wieder, 2006; Greenspan, 1997",
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
    level: 4, label: "Complex Communication & Problem-Solving", subtitle: "Sustained shared thinking",
    color: "#9b59b6", source: "Greenspan & Wieder, 2006; Greenspan, 1997",
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
    level: 5, label: "Emotional Ideas", subtitle: "Symbolic & creative use of ideas",
    color: "#e63946", source: "Greenspan & Wieder, 2006; Greenspan, 1997",
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
    level: 6, label: "Emotional Thinking", subtitle: "Logical bridges between ideas",
    color: "#2c8c99", source: "Greenspan & Wieder, 2006; Greenspan, 1997",
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

// ─────────── NERVOUS SYSTEM FRAMEWORKS ───────────

const POLYVAGAL_STATES = [
  {
    id: "ventral", label: "Ventral Vagal", subtitle: "Safe & Social",
    color: "#27ae60", icon: "\u2764",
    desc: "The student appears calm, connected, and socially engaged. They can think, learn, and relate.",
    approach: "This is the ideal window for learning. Enrich, challenge gently, and build skills.",
    sensoryFocus: "Enrichment activities: varied textures, music, collaborative movement, creative expression",
  },
  {
    id: "sympathetic", label: "Sympathetic", subtitle: "Fight / Flight",
    color: "#e63946", icon: "\u26A1",
    desc: "The student's body is mobilized — restless, reactive, anxious, irritable, or hypervigilant. Their nervous system is saying 'danger.'",
    approach: "Prioritize calming and organizing sensory input. Do not add cognitive demands until the body settles.",
    sensoryFocus: "Calming input: deep pressure, slow rhythmic movement, low lighting, reduced noise, heavy work, weighted items",
  },
  {
    id: "dorsal", label: "Dorsal Vagal", subtitle: "Freeze / Shutdown",
    color: "#7eb8e0", icon: "\u2744",
    desc: "The student appears flat, disconnected, withdrawn, spacey, or collapsed. Their nervous system has shut down to protect them.",
    approach: "Gently activate — do not startle or demand. Use warmth, rhythm, and gentle sensory invitations.",
    sensoryFocus: "Alerting input: gentle movement, bright colors, crunchy/cold snacks, upbeat rhythm, playful affect, position changes",
  },
];

const WINDOW_ZONES = [
  { id: "hyper", label: "Hyperarousal Zone", color: "#e63946",
    desc: "Above the window: anxiety, panic, hypervigilance, emotional flooding, aggression, rapid speech/movement",
    goal: "Bring the student DOWN into the window with calming, organizing, grounding input",
    strategies: ["Deep pressure (weighted blanket, bear hug, wall push-ups)", "Slow rhythmic movement (rocking, swinging)", "Cold water on wrists, ice cube to hold", "Dim lighting, reduce noise", "Slow, low-tone voice", "Bilateral movement (cross-body tapping, walking)"],
  },
  { id: "window", label: "Window of Tolerance", color: "#27ae60",
    desc: "In the window: regulated, flexible, able to think and feel simultaneously, can tolerate manageable stress",
    goal: "Maintain and gently expand the window through enrichment and supported challenge",
    strategies: ["Introduce new learning and skill-building", "Practice emotional vocabulary and body awareness", "Engage in collaborative problem-solving", "Offer meaningful choice within structured tasks", "Build interoceptive awareness", "Celebrate effort and process"],
  },
  { id: "hypo", label: "Hypoarousal Zone", color: "#7eb8e0",
    desc: "Below the window: numbness, disconnection, flat affect, dissociation, lethargy, social withdrawal",
    goal: "Bring the student UP into the window with alerting, activating, connecting input",
    strategies: ["Gentle movement (stretching, walking, bouncing)", "Crunchy or sour snacks, cold drinks", "Bright or warm lighting", "Upbeat music or rhythmic clapping", "Playful, animated affect from the adult", "Position changes (stand up, change seats, move rooms)"],
  },
];

const NMT_SEQUENCE = [
  { level: 1, label: "Brainstem", subtitle: "Regulate", color: "#e63946",
    desc: "Patterned, repetitive, rhythmic, somatosensory. Address the body first — the brainstem controls basic regulation (heart rate, breathing, startle response, sleep-wake cycles).",
    question: "Is this student's body regulated enough to be present?",
    activities: ["Rhythmic drumming or clapping", "Rocking, swinging, bouncing", "Deep breathing with visual support", "Heavy work (carrying, pushing, pulling)", "Predictable routine and sensory environment"],
  },
  { level: 2, label: "Midbrain", subtitle: "Relate", color: "#e89b2d",
    desc: "Relational, attuned, nurturing. Once regulated, the student can begin to connect. The midbrain processes reward, attachment, and relational safety.",
    question: "Does this student feel safe enough with me to engage?",
    activities: ["Warm greeting rituals", "Shared play or co-creative activities", "Attunement through affect matching", "Parallel activities (drawing together, side-by-side reading)", "Gentle humor and playfulness"],
  },
  { level: 3, label: "Limbic", subtitle: "Reason", color: "#27ae60",
    desc: "Emotional, relational, narrative. With regulation and connection in place, the student can begin to process emotions, build narratives, and develop relational skills.",
    question: "Can this student tolerate emotional content right now?",
    activities: ["Story-based activities", "Emotion identification and labeling", "Social problem-solving scenarios", "Perspective-taking activities", "Memory and narrative building"],
  },
  { level: 4, label: "Cortex", subtitle: "Learn", color: "#7eb8e0",
    desc: "Abstract, cognitive, creative. Only when regulated, connected, and emotionally safe can the cortex fully engage for academic and complex cognitive work.",
    question: "Is this student ready for cognitive demands?",
    activities: ["Academic instruction and practice", "Abstract reasoning tasks", "Reading comprehension", "Writing and composition", "Complex multi-step problem-solving"],
  },
];

// ─────────── SENSORY DOMAINS (EXPANDED) ───────────

const SENSORY = [
  {
    id: "tactile", label: "Tactile", color: "#e89b2d",
    neuroscience: "Trauma often disrupts the tactile system — unexpected touch may trigger a protective stress response. The skin is the body's largest sensory organ and a primary boundary between self and world. For students with trauma histories, touch can carry associations with harm, and even neutral tactile input may be interpreted as threat.",
    evidence: "Ayres Sensory Integration; Champagne Sensory Modulation; Ogden Sensorimotor Psychotherapy",
    samhsa: "Safety, Empowerment/Voice/Choice",
    reauthoring: "The goal is not to 'desensitize' — it is to help the student become the author of their own tactile experience. Every touch interaction is an opportunity to practice consent, agency, and body ownership.",
    prompts: [
      "Does {activity} involve touching materials the student may find aversive?",
      "Is consent built into every tactile interaction? ('Would it be okay if we tried...?')",
      "Are there unexpected tactile experiences (glue, paint, textured paper)?",
      "Does the student have control over when and how they touch materials?",
    ],
    adaptations: [
      { text: "Always ask before introducing touch: 'Would it be okay if we tried this texture?'", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83C\uDFE0\uD83D\uDCBB", evidence: "Champagne Sensory Modulation" },
      { text: "Offer 'bridge' objects (popsicle sticks, gloves, tongs) before direct contact with new textures", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83C\uDFE0", evidence: "Ayres Sensory Integration" },
      { text: "Use a body storybook approach: narrate what the student will feel before they feel it", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83C\uDFE0\uD83D\uDCBB", evidence: "Ogden Sensorimotor Psychotherapy" },
      { text: "Celebrate micro-wins: 'You touched it with one finger — that took courage'", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83C\uDFE0\uD83D\uDCBB", evidence: "Strengths-based practice" },
      { text: "Provide a tactile menu: 'Here are 3 options — you pick which one feels right'", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83C\uDFE0", evidence: "UDL + TIC integration" },
      { text: "Allow the student to observe others first without pressure to participate", settings: "\uD83C\uDFEB\uD83C\uDFE5", evidence: "Champagne Sensory Modulation" },
    ],
    crossSetting: {
      school: "Collaborate with teacher on tactile-heavy activities (art, science labs). Offer alternative materials. Use UDL framing: 'multiple ways to participate' benefits everyone.",
      clinic: "Build a client-chosen sensory kit. Start with preferred textures and gradually introduce novel ones — always at the student's pace.",
      home: "Coach caregivers on consent-based touch. Provide low-cost alternatives (rice bins, playdough, water play). Normalize the student's body communication.",
      telehealth: "Send a pre-session tactile kit list. Guide the student through texture exploration on camera. Use 'show me' instead of 'do this.'",
    },
  },
  {
    id: "auditory", label: "Auditory", color: "#7eb8e0",
    neuroscience: "The auditory system is directly linked to the threat-detection circuits in the brainstem and amygdala. For trauma-affected students, sudden or loud sounds can trigger a startle response, hypervigilance, or dissociation. Porges' polyvagal theory explains how the middle ear muscles tune to human voice frequencies when safe — and tune to low-frequency danger sounds when stressed.",
    evidence: "Porges Polyvagal Theory; Ayres Sensory Integration; Champagne Sensory Modulation",
    samhsa: "Safety, Trustworthiness & Transparency",
    reauthoring: "A predictable sound environment tells the nervous system: 'You are safe here.' The goal is not silence — it is giving the student authorship over their auditory world.",
    prompts: [
      "Is the environment noisy or unpredictable?",
      "Does {activity} require sustained listening?",
      "Are there competing auditory inputs (hallway noise, HVAC, peers)?",
      "Will there be sudden sound changes (timers, bells, raised voices)?",
    ],
    adaptations: [
      { text: "Offer noise-canceling headphones or a quieter space — frame as a tool, not a privilege", settings: "\uD83C\uDFEB\uD83C\uDFE5", evidence: "Champagne Sensory Modulation" },
      { text: "Give transition warnings before sound changes: 'In 2 minutes, I'll ring the chime'", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83C\uDFE0\uD83D\uDCBB", evidence: "SAMHSA Safety principle" },
      { text: "Maintain a predictable sound environment — same volume, same signals, same routine", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83C\uDFE0", evidence: "Porges Polyvagal Theory" },
      { text: "Pair auditory instructions with visual supports (written steps, picture cues)", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83D\uDCBB", evidence: "UDL + TIC integration" },
      { text: "Offer a low-stimulation alternative for each activity that has high auditory demand", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83C\uDFE0\uD83D\uDCBB", evidence: "Ayres Sensory Integration" },
      { text: "Use a calm, even tone — the prosody of safety activates the ventral vagal system", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83C\uDFE0\uD83D\uDCBB", evidence: "Porges Polyvagal Theory" },
    ],
    crossSetting: {
      school: "Conduct a classroom sound audit with the teacher. Identify the noisiest moments and build in transition warnings. Advocate for consistent auditory signals.",
      clinic: "Control the sound environment — white noise machine, consistent music, advance warning for any sound changes. Let the student set the volume.",
      home: "Coach caregivers on reducing auditory surprise. Create a 'sound plan' for predictable household routines. Offer low-cost ear protection options.",
      telehealth: "Advise on a quiet space with minimal background noise. Use consistent opening/closing sounds. Mute notifications during sessions.",
    },
  },
  {
    id: "visual", label: "Visual", color: "#27ae60",
    neuroscience: "The visual system is a primary threat-detection channel. Students with trauma histories may be hypervigilant to movement in their peripheral visual field, facial expressions, or environmental changes. Fluorescent lighting can increase stress. Visual predictability signals safety to the nervous system.",
    evidence: "Ayres Sensory Integration; Ogden Sensorimotor Psychotherapy; Champagne Sensory Modulation",
    samhsa: "Safety, Trustworthiness & Transparency",
    reauthoring: "A visually organized environment is not about aesthetics — it is about reducing the nervous system's need to scan for threat, freeing capacity for learning and connection.",
    prompts: [
      "Are materials visually cluttered or overwhelming?",
      "Is the lighting too bright, too dim, or flickering?",
      "Does the student need to track visually across a page or board?",
      "Could sudden movement in the visual field startle the student?",
    ],
    adaptations: [
      { text: "Offer adjustable lighting options — lamps, dimmer switches, or natural light over fluorescents", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83C\uDFE0", evidence: "Champagne Sensory Modulation" },
      { text: "Use low-contrast, clean-layout materials with adequate whitespace", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83D\uDCBB", evidence: "UDL + TIC integration" },
      { text: "Avoid sudden movement in the student's visual field — approach from the front, not behind", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83C\uDFE0", evidence: "Ogden Sensorimotor Psychotherapy" },
      { text: "Provide visual schedules for predictability: 'Here is what we will do today'", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83C\uDFE0\uD83D\uDCBB", evidence: "SAMHSA Safety principle" },
      { text: "Offer a reading window or line guide to reduce visual tracking demands", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83C\uDFE0", evidence: "Ayres Sensory Integration" },
      { text: "Allow the student to choose their seating position — facing the door may feel safer", settings: "\uD83C\uDFEB\uD83C\uDFE5", evidence: "Porges Polyvagal Theory" },
    ],
    crossSetting: {
      school: "Conduct a visual environment audit: wall clutter, lighting, desk arrangement. Advocate for whole-class visual schedules (UDL framing). Reduce visual noise on worksheets.",
      clinic: "Create a visually calming treatment room: neutral colors, organized materials, soft lighting. Let the student arrange their space.",
      home: "Coach caregivers on reducing visual clutter in homework areas. Suggest warm-toned lamps. Provide clean-layout homework templates.",
      telehealth: "Use clean, uncluttered screen backgrounds. Share materials with simple layouts. Adjust screen brightness together.",
    },
  },
  {
    id: "proprioceptive", label: "Proprioceptive / Heavy Work", color: "#9b59b6",
    neuroscience: "Proprioception — input from muscles and joints — is one of the most powerful organizing sensory systems. Deep pressure and heavy work activate the parasympathetic nervous system, helping to downregulate fight/flight responses. For students with trauma, proprioceptive input can restore a sense of where their body is in space — a felt sense of 'I am here, I am real, I am contained.'",
    evidence: "Ayres Sensory Integration; Champagne Sensory Modulation; Ogden Sensorimotor Psychotherapy",
    samhsa: "Safety, Empowerment/Voice/Choice",
    reauthoring: "Frame proprioceptive input as 'body organizing' — not behavior management. The student is not being 'fixed'; their nervous system is being supported to find its own equilibrium.",
    prompts: [
      "Does {activity} require the student to sit still for extended periods?",
      "Does the student's body seem to need more input (leaning, pushing, crashing, fidgeting)?",
      "Are there natural opportunities to embed movement into the task?",
      "Is the student's seating supporting or competing with their ability to attend?",
    ],
    adaptations: [
      { text: "Offer weighted items (lap pad, shoulder wrap, weighted stuffed animal) — 'Would you like to try this?'", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83C\uDFE0", evidence: "Champagne Sensory Modulation" },
      { text: "Build in heavy work breaks: wall push-ups, chair push-ups, carrying books, pushing a cart", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83C\uDFE0", evidence: "Ayres Sensory Integration" },
      { text: "Offer a standing option, wobble cushion, or resistance band on chair legs", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83C\uDFE0", evidence: "Ayres Sensory Integration" },
      { text: "Allow movement within the task: walking and reading, pacing while thinking, standing to write", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83C\uDFE0\uD83D\uDCBB", evidence: "UDL + TIC integration" },
      { text: "Frame movement as body organizing: 'Your body is telling you it needs to move — let's listen'", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83C\uDFE0\uD83D\uDCBB", evidence: "Strengths-based / Neurodiversity-affirming" },
      { text: "Use somatic tracking: 'Notice how your body feels after those push-ups. What changed?'", settings: "\uD83C\uDFE5\uD83D\uDCBB", evidence: "Ogden Sensorimotor Psychotherapy" },
    ],
    crossSetting: {
      school: "Advocate for whole-class movement breaks (UDL framing). Suggest classroom jobs with heavy work (carrying bins, pushing chairs). Collaborate on flexible seating options.",
      clinic: "Offer heavy work before seated tasks. Build a movement menu with the student. Use resistance activities as part of session routine.",
      home: "Coach caregivers on naturalistic heavy work: carrying groceries, pushing a laundry basket, animal walks before homework. Low-cost: fill water bottles as hand weights.",
      telehealth: "Create an at-home heavy work menu (wall push-ups, carrying books, jumping jacks). Guide movement breaks on camera. Use 'body check' after movement.",
    },
  },
  {
    id: "vestibular", label: "Vestibular", color: "#e63946",
    neuroscience: "The vestibular system detects movement and gravity — it is foundational to feeling grounded and oriented in space. Trauma can make the vestibular system hyperreactive (anxiety with movement, motion sickness, gravitational insecurity) or hyporeactive (constant seeking of spinning, rocking, or swinging). Slow, rhythmic vestibular input is one of the most powerful calming inputs available.",
    evidence: "Ayres Sensory Integration; Perry NMT (rhythmic, brainstem-level input); Porges Polyvagal Theory",
    samhsa: "Safety, Collaboration & Mutuality",
    reauthoring: "The student controls the pace and duration of all movement. Vestibular work is about restoring the student's relationship with gravity and their sense of being safely held in space.",
    prompts: [
      "Does {activity} require balance or changes in head position?",
      "Is the student seeking or avoiding movement?",
      "Does the student become anxious with feet off the ground?",
      "Is the student rocking, spinning, or swaying — and is that body communication?",
    ],
    adaptations: [
      { text: "Offer rhythmic rocking or swinging options — the student controls pace and duration", settings: "\uD83C\uDFE5\uD83C\uDFE0", evidence: "Ayres Sensory Integration" },
      { text: "Start with slow, predictable movement before faster or less predictable options", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83C\uDFE0", evidence: "Perry NMT" },
      { text: "Allow rocking or gentle movement during seated tasks — this is regulation, not disruption", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83C\uDFE0", evidence: "Neurodiversity-affirming" },
      { text: "Ensure feet are firmly supported on the floor to provide gravitational security", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83C\uDFE0", evidence: "Ayres Sensory Integration" },
      { text: "Use movement breaks between task segments with clear beginning and end", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83C\uDFE0\uD83D\uDCBB", evidence: "Champagne Sensory Modulation" },
      { text: "Never force movement — 'You can stop anytime' should be stated and meant", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83C\uDFE0\uD83D\uDCBB", evidence: "SAMHSA Safety principle" },
    ],
    crossSetting: {
      school: "Advocate for movement-based transitions. Suggest rocking chairs or wobble stools for students who benefit. Frame as whole-class options.",
      clinic: "Use swings, therapy balls, and rocking as session warm-ups. Always start slow. Let the student control speed and duration.",
      home: "Coach caregivers on rhythmic movement: rocking chair time, gentle swinging, trampoline. Emphasize predictable, slow start.",
      telehealth: "Guide the student through chair rocking, spinning in place, or gentle bouncing at home. Use visual timer for movement breaks.",
    },
  },
  {
    id: "olfactory", label: "Olfactory / Gustatory", color: "#2c8c99",
    neuroscience: "Smell and taste bypass the thalamus and connect directly to the amygdala and hippocampus — making them the most powerful triggers for traumatic memory. A smell can instantly transport a student to a past unsafe experience. For feeding/swallowing SLPs, this is especially critical: food introduction must be consent-based and paced.",
    evidence: "Ayres Sensory Integration; Champagne Sensory Modulation; Ogden Sensorimotor Psychotherapy",
    samhsa: "Safety, Empowerment/Voice/Choice",
    reauthoring: "The student is the expert on what smells and tastes feel safe in their body. Surprise exposure is never therapeutic — it is re-traumatizing. The goal is to expand the student's world at their pace, building trust with each new sensory experience.",
    prompts: [
      "Does {activity} involve food, cooking materials, or strong smells?",
      "Are there environmental smells that could be triggering (cleaning products, perfume, cafeteria)?",
      "For feeding/swallowing: is the student in control of what enters their mouth?",
      "Has the student been warned about and consented to any new smell or taste?",
    ],
    adaptations: [
      { text: "Provide advance warning before introducing any new smell or taste: 'I'm going to open this — it has a strong smell'", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83C\uDFE0", evidence: "SAMHSA Safety principle" },
      { text: "The student controls introduction: they choose when and how to engage with new smells/tastes", settings: "\uD83C\uDFE5\uD83C\uDFE0", evidence: "Champagne Sensory Modulation" },
      { text: "Never use surprise exposure — even 'just a little taste' without consent can be re-traumatizing", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83C\uDFE0\uD83D\uDCBB", evidence: "Ogden Sensorimotor Psychotherapy" },
      { text: "Offer a scent-free option for any activity that involves smell or taste", settings: "\uD83C\uDFEB\uD83C\uDFE5", evidence: "UDL + TIC integration" },
      { text: "For feeding therapy: use a graduated hierarchy (look, touch, smell, lick, taste) at the student's pace", settings: "\uD83C\uDFE5\uD83C\uDFE0", evidence: "Ayres Sensory Integration" },
      { text: "Be aware of environmental smells in your space — cleaning products, air fresheners, markers", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83C\uDFE0", evidence: "Champagne Sensory Modulation" },
    ],
    crossSetting: {
      school: "Conduct a scent audit of the classroom. Coordinate with cafeteria transitions. Advocate for scent-free policies where possible.",
      clinic: "Create a scent-neutral treatment room. For feeding therapy, build the food hierarchy collaboratively with the student. Use the SOS approach.",
      home: "Coach caregivers on consent-based food introduction. Provide a visual food exploration hierarchy. Normalize slow pacing.",
      telehealth: "Pre-plan any scent/taste activities. Send materials in advance. Guide the student through self-paced exploration on camera.",
    },
  },
];

// ─────────── INTEROCEPTION (MAHLER FRAMEWORK) ───────────

const INTEROCEPTION = [
  {
    level: 1, label: "Awareness", subtitle: "Noticing body signals", color: "#7eb8e0",
    source: "Mahler et al., 2022, 2024",
    desc: "Can the student notice and attend to body signals — heartbeat, breathing, stomach sensations, muscle tension — without judgment?",
    traumaNote: "Trauma disrupts interoceptive accuracy. Body sensations may feel unsafe, overwhelming, or meaningless. Never force awareness. Start with external senses as a bridge if needed (exteroception before interoception). Validate confusion, numbness, or avoidance as protective adaptations.",
    activities: [
      { text: "Body scan prompts: 'Notice your feet on the floor. Notice your hands. Notice your breathing.'", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83C\uDFE0\uD83D\uDCBB", consent: "Would it be okay if we did a body check-in? You can skip any part." },
      { text: "'How does my body feel right now?' check-in using a visual body map (point, circle, color)", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83C\uDFE0\uD83D\uDCBB", consent: "You can pass or say 'I'm not sure' — that's always okay." },
      { text: "Body signal vocabulary building: create a personal word bank (tight, buzzy, heavy, floaty, warm, cold)", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83C\uDFE0\uD83D\uDCBB", consent: "We're just noticing — there are no wrong answers." },
      { text: "For AAC users: body signal vocabulary boards with visual symbols and core words", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83C\uDFE0\uD83D\uDCBB", consent: "Show me with your board how your body feels, or point to 'I don't know.'" },
      { text: "Exteroception bridge: start with external senses ('What do you hear? What do you see?') before internal", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83C\uDFE0\uD83D\uDCBB", consent: "Let's start with what you notice outside your body first." },
    ],
  },
  {
    level: 2, label: "Discrimination", subtitle: "What does the signal mean?", color: "#e89b2d",
    source: "Mahler et al., 2022, 2024",
    desc: "Can the student identify what a body signal means — distinguishing between hunger and anxiety, excitement and fear, tiredness and sadness?",
    traumaNote: "For students with alexithymia (common in trauma), body signals may all feel the same ('bad') or may not be connected to emotion words at all. This is a protective adaptation, not a deficit. Go slowly. Use curiosity, not correction: 'I wonder what that feeling might be about.'",
    activities: [
      { text: "Body signal journal: draw or write what the body felt + what was happening at the time", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83C\uDFE0\uD83D\uDCBB", consent: "You get to decide what to share and what to keep private." },
      { text: "Connection mapping: body sensation \u2192 emotion word (e.g., 'tight chest' \u2192 'worried')", settings: "\uD83C\uDFE5\uD83C\uDFE0\uD83D\uDCBB", consent: "This is just a guess — we can always change it." },
      { text: "Guess-and-check games: do 10 jumping jacks, then check — 'What does your body feel now? What word fits?'", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83C\uDFE0\uD83D\uDCBB", consent: "Would you like to try a body experiment?" },
      { text: "Compare two states: 'How did your body feel before vs. after that movement? What's different?'", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83C\uDFE0\uD83D\uDCBB", consent: "Let's get curious about what your body noticed." },
      { text: "For AAC users: create a personal body-emotion connection board with visual supports", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83C\uDFE0\uD83D\uDCBB", consent: "Let's build your own body-feelings chart together." },
    ],
  },
  {
    level: 3, label: "Action", subtitle: "What does my body need?", color: "#27ae60",
    source: "Mahler et al., 2022, 2024",
    desc: "Can the student connect body signals to self-regulation strategies proactively — using internal cues to guide action before reaching crisis?",
    traumaNote: "This level requires Levels 1 and 2 to be in place. For students with trauma, the idea that 'my body can tell me what I need' may be completely new. This is a paradigm shift: from 'adults tell me what to do with my body' to 'I can listen to my own body.' Celebrate every attempt.",
    activities: [
      { text: "Personal 'feel-good menu' creation: student builds their own list of strategies that work for their body", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83C\uDFE0\uD83D\uDCBB", consent: "What are the things that help YOUR body feel okay?" },
      { text: "Body signal \u2192 strategy matching chart: 'When I feel ___, I can try ___'", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83C\uDFE0\uD83D\uDCBB", consent: "Let's figure out your body's personal instruction manual." },
      { text: "In-the-moment cue use: practice noticing a signal and choosing a strategy in real time", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83C\uDFE0", consent: "I noticed you paused — would you like to check in with your body?" },
      { text: "Yoga cards + body check: do a pose, then check 'What does my body feel now? Do I want more or less?'", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83C\uDFE0\uD83D\uDCBB", consent: "You're in charge of what your body does." },
      { text: "Interoception check-in ritual at session start: visual scale, body map pointing, or felt-sense word", settings: "\uD83C\uDFEB\uD83C\uDFE5\uD83D\uDCBB", consent: "Let's start with a body weather report — what's the forecast inside?" },
    ],
  },
];

// ─────────── SENSORY ENVIRONMENT CHECKLIST ───────────

const ENV_CHECKLIST = {
  categories: [
    { label: "Lighting", items: ["Adjustable brightness", "No flickering fluorescents", "Natural light option", "Lamp or warm-tone alternative"] },
    { label: "Sound", items: ["Background noise level checked", "Consistent auditory signals", "Noise-canceling tools available", "Advance warning for sound changes"] },
    { label: "Smell", items: ["Scent-neutral environment", "No surprise scent introductions", "Fragrance-free products", "Ventilation adequate"] },
    { label: "Seating", items: ["Flexible seating options", "Feet-on-floor support", "Movement-friendly option (wobble, standing)", "Choice of position in room"] },
    { label: "Textures", items: ["Materials previewed with student", "Alternative tools available", "Fidget options accessible", "Consent before tactile activities"] },
    { label: "Exit Access", items: ["Student knows how to take a break", "Break signal established", "Calm corner or safe space identified", "No social cost for leaving"] },
  ],
};

// ─────────── GLOBAL STYLES ───────────

const STYLE = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Outfit', sans-serif; -webkit-font-smoothing: antialiased; line-height: 1.6; transition: background 0.3s, color 0.3s; }
button { font-family: 'Outfit', sans-serif; cursor: pointer; }
@media print { body { background: #fff !important; color: #222 !important; } .no-print { display: none !important; } }
`;

// ─────────── COMPONENTS ───────────

function ThemeToggle({ dark, toggle, t }) {
  return (
    <button onClick={toggle} className="no-print" style={{
      background: "transparent", border: `1px solid ${t.border}`, borderRadius: 20,
      padding: "5px 14px", fontFamily: "'Space Mono', monospace", fontSize: 11,
      color: t.textMuted, cursor: "pointer", transition: "all 0.2s",
      display: "inline-flex", alignItems: "center", gap: 6,
    }}>
      {dark ? "\u263E Dark" : "\u2600 Light"}
    </button>
  );
}

const Tag = ({ text, color, t }) => (
  <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 10, fontSize: 10, fontFamily: "'Space Mono', monospace", fontWeight: 700, background: `${color}18`, color, marginRight: 4, marginBottom: 4, letterSpacing: 0.5, }}>{text}</span>
);

const SettingTags = ({ settings }) => (
  <span style={{ fontSize: 12, marginLeft: 4 }}>{settings}</span>
);

function SectionCard({ color, title, desc, source, children, open, onToggle, t }) {
  return (
    <div style={{ background: t.card, border: `1px solid ${t.border}`, borderLeft: `3px solid ${color}`, borderRadius: 14, marginBottom: 12, overflow: "hidden", transition: "all 0.3s" }}>
      <button onClick={onToggle} style={{ width: "100%", background: "transparent", border: "none", padding: "16px 20px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", textAlign: "left" }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: color, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 13, color, letterSpacing: 1, textTransform: "uppercase" }}>{title}</div>
          <div style={{ fontSize: 13, color: t.textMuted, marginTop: 2 }}>{desc}</div>
        </div>
        <span style={{ color: t.textDim, fontSize: 18, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>{"\u25BE"}</span>
      </button>
      {open && (
        <div style={{ padding: "0 20px 20px", borderTop: `1px solid ${t.border}` }}>
          {source && <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: t.textDim, marginTop: 10, marginBottom: 4, fontStyle: "italic" }}>{source}</div>}
          {children}
        </div>
      )}
    </div>
  );
}

function PromptList({ prompts, activity, color, t }) {
  const fill = (s) => s.replace(/\{activity\}/g, activity || "this activity");
  return (
    <div style={{ marginTop: 14 }}>
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, color, letterSpacing: 1, marginBottom: 8, textTransform: "uppercase" }}>Reflection Prompts</div>
      {prompts.map((p, i) => (
        <div key={i} style={{ fontSize: 14, color: t.text, padding: "8px 0", borderBottom: i < prompts.length - 1 ? `1px solid ${t.border}` : "none", lineHeight: 1.6 }}>
          <span style={{ color, marginRight: 8, fontWeight: 700 }}>{i + 1}.</span>{fill(p)}
        </div>
      ))}
    </div>
  );
}

function AdaptationList({ adaptations, checked, onCheck, sectionId, color, t }) {
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, color, letterSpacing: 1, marginBottom: 8, textTransform: "uppercase" }}>Suggested Adaptations</div>
      {adaptations.map((a, i) => {
        const key = `${sectionId}_${i}`;
        const isChecked = checked[key] || false;
        const isObj = typeof a === "object";
        const text = isObj ? a.text : a;
        return (
          <label key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 0", borderBottom: i < adaptations.length - 1 ? `1px solid ${t.border}` : "none", cursor: "pointer", fontSize: 14, color: t.text, lineHeight: 1.6 }}>
            <input type="checkbox" checked={isChecked} onChange={() => onCheck(key)} style={{ marginTop: 4, accentColor: color, width: 16, height: 16, flexShrink: 0 }} />
            <div>
              <span style={{ opacity: isChecked ? 1 : 0.8 }}>{text}</span>
              {isObj && (
                <div style={{ marginTop: 3 }}>
                  <SettingTags settings={a.settings} />
                  <Tag text={a.evidence} color={color} t={t} />
                </div>
              )}
            </div>
          </label>
        );
      })}
    </div>
  );
}

function NotesField({ value, onChange, color, t }) {
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, color, letterSpacing: 1, marginBottom: 8, textTransform: "uppercase" }}>Your Notes</div>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder="Add notes for this section..." rows={3} style={{ width: "100%", background: t.inputBg, color: t.text, border: `1px solid ${t.border}`, borderRadius: 8, padding: 12, fontSize: 14, fontFamily: "'Outfit', sans-serif", resize: "vertical", outline: "none", lineHeight: 1.6 }} />
    </div>
  );
}

// ─────────── ABOUT MODAL ───────────

function AboutModal({ onClose, t }) {
  const h3 = { fontFamily: "'Fraunces', Georgia, serif", fontSize: 18, fontWeight: 600, color: t.text, margin: "22px 0 8px", display: "flex", alignItems: "center", gap: 8 };
  const p = { fontSize: 14, color: t.textSub, lineHeight: 1.65, marginBottom: 10 };
  const li = { fontSize: 14, color: t.textSub, lineHeight: 1.65, marginBottom: 4 };
  return (
    <div onClick={(e) => { if (e.target === e.currentTarget) onClose(); }} role="dialog" aria-modal="true" aria-labelledby="about-title"
      style={{ position: "fixed", inset: 0, background: "rgba(10,10,15,0.55)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, overflowY: "auto" }}
      className="no-print">
      <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 18, maxWidth: 640, width: "100%", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, padding: "22px 26px 14px", borderBottom: `1px solid ${t.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: t.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>📖</div>
            <div>
              <h2 id="about-title" style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 22, fontWeight: 700, color: t.text, lineHeight: 1.2 }}>About Activity Adaptation Planner</h2>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: t.textMuted, letterSpacing: 1, marginTop: 2 }}>RTN Communication &amp; Literacy</div>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close" style={{ background: "transparent", border: "none", color: t.textMuted, fontSize: 26, lineHeight: 1, cursor: "pointer", padding: 4 }}>×</button>
        </div>

        <div style={{ padding: "6px 26px 24px" }}>
          <h3 style={h3}><span>✨</span>About this resource</h3>
          <p style={p}>Activity Adaptation Planner is a free, open-source tool for applying trauma-informed, neurodevelopmental, and sensory lenses to everyday learning activities. It was built by a speech-language pathologist to support SLPs, educators, OTs, and interventionists in adapting instruction for students with trauma histories, sensory differences, and developmental variability.</p>
          <p style={p}>The tool runs entirely in your browser. No account, login, or internet connection is required after the initial load. No data is sent to any server, stored in any database, or shared with any third party. Plan data exists only in browser memory during use unless you choose to export it.</p>

          <h3 style={h3}><span>🔬</span>Evidence basis</h3>
          <p style={p}>The six lenses reflect converging evidence-based frameworks for trauma-informed and developmentally attuned practice:</p>
          <ul style={{ paddingLeft: 20, marginBottom: 10 }}>
            <li style={li}>SAMHSA's six principles of trauma-informed care (SAMHSA, 2014; Bath, 2008)</li>
            <li style={li}>DIR/Floortime functional emotional developmental capacities (Greenspan &amp; Wieder, 2006)</li>
            <li style={li}>Polyvagal Theory and the Window of Tolerance (Porges, 2011; Siegel, 2012; Ogden et al., 2006)</li>
            <li style={li}>Neurosequential Model of Therapeutics (Perry, 2006)</li>
            <li style={li}>Ayres Sensory Integration and sensory processing frameworks (Ayres, 2005; Dunn, 2014; Champagne &amp; Stromberg, 2004)</li>
            <li style={li}>Interoception-based regulation research (Mahler et al., 2022, 2024)</li>
          </ul>
          <p style={p}>Prompts and adaptations are synthesized from peer-reviewed literature on trauma-informed care in educational and clinical settings (O'Leary et al., 2023; Rupert &amp; Bartlett, 2022; Goldstein et al., 2024; Cole et al., 2005).</p>

          <h3 style={h3}><span>⚖️</span>Disclaimer</h3>
          <p style={p}>This tool is designed to support reflective planning for qualified professionals. It is not a diagnostic tool and is not a substitute for clinical judgment, formal assessment, trauma-specific therapy, or individualized treatment planning. Users are responsible for ensuring that their practices comply with applicable professional standards, scope of practice guidelines, and institutional policies.</p>
          <p style={p}>Activity Adaptation Planner is an independent project and is not affiliated with, endorsed by, or sponsored by SAMHSA, ICDL, the ChildTrauma Academy, or any other organization whose frameworks are referenced. All program names and trademarks belong to their respective owners.</p>

          <h3 style={h3}><span>📎</span>Citation</h3>
          <div style={{ fontSize: 13, color: t.textSub, fontStyle: "italic", background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: 10, padding: "12px 14px", lineHeight: 1.6 }}>
            Norton, R. T. (2026). Activity Adaptation Planner: A trauma-informed lens for adapting learning activities [Web application]. RTN Communication &amp; Literacy.
          </div>

          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: t.textDim, letterSpacing: 0.5, marginTop: 18, textAlign: "center" }}>Code licensed under MIT. Educational content licensed under CC BY-NC 4.0.</div>
          <div aria-hidden="true" style={{ height: 3, borderRadius: 3, background: t.rainbow, marginTop: 14 }} />
        </div>
      </div>
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
  const [nervousState, setNervousState] = useState(null);
  const [wotZone, setWotZone] = useState(null);
  const [showAbout, setShowAbout] = useState(false);

  const t = dark ? T.dark : T.light;

  useEffect(() => { document.body.style.background = t.bg; document.body.style.color = t.text; }, [dark]);
  useEffect(() => { const el = document.createElement("style"); el.textContent = STYLE; document.head.appendChild(el); return () => el.remove(); }, []);
  useEffect(() => {
    if (!showAbout) return;
    const onKey = (e) => { if (e.key === "Escape") setShowAbout(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showAbout]);

  const toggleCheck = (key) => setChecked((p) => ({ ...p, [key]: !p[key] }));
  const setNote = (id, val) => setNotes((p) => ({ ...p, [id]: val }));
  const toggleExpand = (id) => setExpanded((p) => (p === id ? null : id));

  const tabs = [
    { key: "samhsa", label: "SAMHSA" },
    { key: "dir", label: "DIR" },
    { key: "nervous", label: "Nervous System" },
    { key: "sensory", label: "Sensory" },
    { key: "interoception", label: "Interoception" },
    { key: "summary", label: "Summary" },
  ];

  // Collect all checked adaptations for summary
  const collectChecked = () => {
    return Object.entries(checked).filter(([, v]) => v).map(([key]) => {
      const parts = key.split("_"); const idx = parseInt(parts[parts.length - 1]); const sectionId = parts.slice(0, -1).join("_");
      const samhsa = SAMHSA.find((s) => s.id === sectionId);
      if (samhsa) { const a = samhsa.adaptations[idx]; return { section: samhsa.label, text: typeof a === "object" ? a.text : a, color: samhsa.color }; }
      const dirMatch = DIR_LEVELS.find((d) => `dir${d.level}` === sectionId);
      if (dirMatch) { const a = dirMatch.adaptations[idx]; return { section: `DIR ${dirMatch.level}: ${dirMatch.label}`, text: typeof a === "object" ? a.text : a, color: dirMatch.color }; }
      const sensMatch = SENSORY.find((s) => s.id === sectionId);
      if (sensMatch) { const a = sensMatch.adaptations[idx]; return { section: `Sensory: ${sensMatch.label}`, text: typeof a === "object" ? a.text : a, color: sensMatch.color }; }
      const intMatch = INTEROCEPTION.find((l) => `intero${l.level}` === sectionId);
      if (intMatch) { const a = intMatch.activities[idx]; return { section: `Interoception L${intMatch.level}: ${intMatch.label}`, text: typeof a === "object" ? a.text : a, color: intMatch.color }; }
      return null;
    }).filter(Boolean);
  };

  const checkedAdaptations = collectChecked();
  const activeNotes = Object.entries(notes).filter(([, v]) => v.trim());

  const handlePrint = () => window.print();
  const handleExport = () => {
    const data = { activity, date: new Date().toISOString().split("T")[0], nervousSystemState: nervousState, windowOfTolerance: wotZone, selectedAdaptations: checkedAdaptations, notes: Object.fromEntries(activeNotes) };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `adaptation-plan-${data.date}.json`; a.click(); URL.revokeObjectURL(url);
  };

  const fill = (s) => s.replace(/\{activity\}/g, activity || "this activity");

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px" }}>

      {/* Rainbow accent strip */}
      <div aria-hidden="true" style={{ height: 4, borderRadius: 3, background: t.rainbow, marginBottom: 20 }} />

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: t.textDim, marginBottom: 4 }}>Trauma-Informed Practice</div>
          <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 34, fontWeight: 700, color: t.text, letterSpacing: -0.5, marginBottom: 6, lineHeight: 1.1 }}>Activity Adaptation Planner</h1>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: t.textMuted, letterSpacing: 1 }}>SAMHSA + DIR + Polyvagal + NMT + Sensory + Interoception</div>
        </div>
        <ThemeToggle dark={dark} toggle={() => setDark((d) => !d)} t={t} />
      </div>

      {/* Activity Input */}
      <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: 24, marginBottom: 28, transition: "all 0.3s" }}>
        <label style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: t.textDim, display: "block", marginBottom: 10 }}>Describe the Activity</label>
        <input type="text" value={activity} onChange={(e) => setActivity(e.target.value)} placeholder="e.g., worksheet in class, reading a passage aloud, group discussion..." style={{ width: "100%", background: t.inputBg, color: t.text, border: `1px solid ${t.border}`, borderRadius: 10, padding: "14px 16px", fontSize: 16, fontFamily: "'Outfit', sans-serif", outline: "none", transition: "border-color 0.2s" }} onFocus={(e) => (e.target.style.borderColor = t.accent)} onBlur={(e) => (e.target.style.borderColor = t.border)} />
        {activity && <div style={{ marginTop: 12, fontSize: 13, color: t.textMuted, lineHeight: 1.5 }}>Adapt <strong style={{ color: t.text }}>"{activity}"</strong> through the lenses below.</div>}
      </div>

      {/* Tabs */}
      <div className="no-print" style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
        {tabs.map((tab) => (
          <button key={tab.key} onClick={() => { setActiveTab(tab.key); setExpanded(null); }} style={{ padding: "8px 16px", borderRadius: 999, border: `1px solid ${activeTab === tab.key ? "transparent" : t.border}`, background: activeTab === tab.key ? t.gradient : "transparent", color: activeTab === tab.key ? "#fff" : t.textMuted, fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: 0.5, transition: "all 0.2s", cursor: "pointer", boxShadow: activeTab === tab.key ? "0 3px 12px rgba(138,108,184,0.25)" : "none" }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── SAMHSA Tab ── */}
      {activeTab === "samhsa" && (
        <div>
          <div style={{ fontSize: 13, color: t.textMuted, marginBottom: 16, lineHeight: 1.6 }}>SAMHSA's six principles of trauma-informed care (2014). Every adaptation should map to at least one principle.</div>
          {SAMHSA.map((p) => (
            <SectionCard key={p.id} color={p.color} title={p.label} desc={p.desc} source={p.source} open={expanded === p.id} onToggle={() => toggleExpand(p.id)} t={t}>
              <PromptList prompts={p.prompts} activity={activity} color={p.color} t={t} />
              <AdaptationList adaptations={p.adaptations} checked={checked} onCheck={toggleCheck} sectionId={p.id} color={p.color} t={t} />
              <NotesField value={notes[p.id] || ""} onChange={(val) => setNote(p.id, val)} color={p.color} t={t} />
            </SectionCard>
          ))}
        </div>
      )}

      {/* ── DIR Tab ── */}
      {activeTab === "dir" && (
        <div>
          <div style={{ fontSize: 13, color: t.textMuted, marginBottom: 16, lineHeight: 1.6 }}>DIR/Floortime functional emotional developmental capacities (Greenspan & Wieder, 2006). Each level builds on the ones before it.</div>
          {DIR_LEVELS.map((d) => {
            const id = `dir${d.level}`;
            return (
              <SectionCard key={id} color={d.color} title={`Level ${d.level}: ${d.label}`} desc={d.desc} source={d.source} open={expanded === id} onToggle={() => toggleExpand(id)} t={t}>
                <PromptList prompts={d.prompts} activity={activity} color={d.color} t={t} />
                <AdaptationList adaptations={d.adaptations} checked={checked} onCheck={toggleCheck} sectionId={id} color={d.color} t={t} />
                {d.sensory?.length > 0 && (
                  <div style={{ marginTop: 16 }}>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, color: d.color, letterSpacing: 1, marginBottom: 8, textTransform: "uppercase" }}>Sensory Considerations</div>
                    {d.sensory.map((s, i) => <div key={i} style={{ fontSize: 13, color: t.textSub, padding: "4px 0", lineHeight: 1.5 }}><span style={{ color: d.color, marginRight: 6 }}>{"\u2022"}</span>{s}</div>)}
                  </div>
                )}
                <NotesField value={notes[id] || ""} onChange={(val) => setNote(id, val)} color={d.color} t={t} />
              </SectionCard>
            );
          })}
        </div>
      )}

      {/* ── Nervous System Tab ── */}
      {activeTab === "nervous" && (
        <div>
          {/* Polyvagal State Check */}
          <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: 24, marginBottom: 20 }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: 2, color: t.textDim, textTransform: "uppercase", marginBottom: 4 }}>Polyvagal State Check</div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: t.textDim, fontStyle: "italic", marginBottom: 12 }}>Porges, 2011 — "State first, then story"</div>
            <div style={{ fontSize: 13, color: t.textMuted, marginBottom: 16, lineHeight: 1.6 }}>Before planning sensory adaptations, consider: what nervous system state is this student in right now? Sensory input should match the state.</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {POLYVAGAL_STATES.map((s) => (
                <button key={s.id} onClick={() => setNervousState(s.id)} style={{ background: nervousState === s.id ? `${s.color}15` : "transparent", border: `1px solid ${nervousState === s.id ? s.color : t.border}`, borderLeft: `3px solid ${s.color}`, borderRadius: 12, padding: 16, textAlign: "left", cursor: "pointer", transition: "all 0.2s" }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 13, color: s.color, letterSpacing: 1 }}>{s.icon} {s.label} <span style={{ fontWeight: 400, fontSize: 11, color: t.textMuted }}>— {s.subtitle}</span></div>
                  <div style={{ fontSize: 13, color: t.text, marginTop: 6, lineHeight: 1.5 }}>{s.desc}</div>
                  {nervousState === s.id && (
                    <div style={{ marginTop: 10, padding: 12, background: `${s.color}10`, borderRadius: 8 }}>
                      <div style={{ fontSize: 13, color: s.color, fontWeight: 600, marginBottom: 4 }}>Approach:</div>
                      <div style={{ fontSize: 13, color: t.text, lineHeight: 1.5 }}>{s.approach}</div>
                      <div style={{ fontSize: 13, color: s.color, fontWeight: 600, marginTop: 8, marginBottom: 4 }}>Sensory focus:</div>
                      <div style={{ fontSize: 13, color: t.text, lineHeight: 1.5 }}>{s.sensoryFocus}</div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Window of Tolerance */}
          <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: 24, marginBottom: 20 }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: 2, color: t.textDim, textTransform: "uppercase", marginBottom: 4 }}>Window of Tolerance</div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: t.textDim, fontStyle: "italic", marginBottom: 12 }}>Siegel, 2012; Ogden et al., 2006</div>
            <div style={{ fontSize: 13, color: t.textMuted, marginBottom: 16, lineHeight: 1.6 }}>Where is the student right now? Adaptations should match the zone — calming for hyperarousal, activating for hypoarousal, enriching within the window.</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {WINDOW_ZONES.map((z) => (
                <button key={z.id} onClick={() => setWotZone(z.id)} style={{ background: wotZone === z.id ? `${z.color}15` : "transparent", border: `1px solid ${wotZone === z.id ? z.color : t.border}`, borderLeft: `3px solid ${z.color}`, borderRadius: 12, padding: 16, textAlign: "left", cursor: "pointer", transition: "all 0.2s" }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 13, color: z.color, letterSpacing: 1 }}>{z.label}</div>
                  <div style={{ fontSize: 13, color: t.textMuted, marginTop: 4, lineHeight: 1.5 }}>{z.desc}</div>
                  {wotZone === z.id && (
                    <div style={{ marginTop: 10 }}>
                      <div style={{ fontSize: 13, color: z.color, fontWeight: 600, marginBottom: 6 }}>Goal: {z.goal}</div>
                      {z.strategies.map((s, i) => <div key={i} style={{ fontSize: 13, color: t.text, padding: "3px 0", lineHeight: 1.5 }}><span style={{ color: z.color, marginRight: 6 }}>{"\u2022"}</span>{s}</div>)}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* NMT Readiness */}
          <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: 24 }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: 2, color: t.textDim, textTransform: "uppercase", marginBottom: 4 }}>NMT Readiness Sequence</div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: t.textDim, fontStyle: "italic", marginBottom: 12 }}>Perry, 2006 — "Regulate, Relate, Reason"</div>
            <div style={{ fontSize: 13, color: t.textMuted, marginBottom: 16, lineHeight: 1.6 }}>Interventions must follow a bottom-up sequence. Start at the brainstem. You cannot reason with a dysregulated brain.</div>
            {NMT_SEQUENCE.map((n) => (
              <SectionCard key={n.level} color={n.color} title={`${n.label}: ${n.subtitle}`} desc={n.desc} open={expanded === `nmt${n.level}`} onToggle={() => toggleExpand(`nmt${n.level}`)} t={t}>
                <div style={{ fontSize: 14, color: t.accent, fontWeight: 600, marginTop: 10, marginBottom: 8 }}>Ask yourself: {n.question}</div>
                {n.activities.map((a, i) => <div key={i} style={{ fontSize: 13, color: t.text, padding: "4px 0", lineHeight: 1.5 }}><span style={{ color: n.color, marginRight: 6 }}>{"\u2022"}</span>{a}</div>)}
              </SectionCard>
            ))}
          </div>
        </div>
      )}

      {/* ── Sensory Tab ── */}
      {activeTab === "sensory" && (
        <div>
          <div style={{ fontSize: 13, color: t.textMuted, marginBottom: 6, lineHeight: 1.6 }}>Evidence-based sensory adaptations with setting tags and framework citations. Framed through a strengths-based, neurodiversity-affirming lens.</div>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 16 }}>
            <Tag text="\uD83C\uDFEB School" color={t.textMuted} t={t} /><Tag text="\uD83C\uDFE5 Clinic" color={t.textMuted} t={t} /><Tag text="\uD83C\uDFE0 Home" color={t.textMuted} t={t} /><Tag text="\uD83D\uDCBB Telehealth" color={t.textMuted} t={t} />
          </div>

          {SENSORY.map((s) => (
            <SectionCard key={s.id} color={s.color} title={s.label} desc={s.reauthoring} source={s.evidence} open={expanded === s.id} onToggle={() => toggleExpand(s.id)} t={t}>
              {/* Neuroscience rationale */}
              <div style={{ marginTop: 10, padding: 14, background: `${s.color}08`, borderRadius: 10, borderLeft: `2px solid ${s.color}` }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700, color: s.color, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Why trauma impacts this sense</div>
                <div style={{ fontSize: 13, color: t.text, lineHeight: 1.6 }}>{s.neuroscience}</div>
              </div>
              <div style={{ marginTop: 8 }}><Tag text={`SAMHSA: ${s.samhsa}`} color={s.color} t={t} /></div>
              <PromptList prompts={s.prompts} activity={activity} color={s.color} t={t} />
              <AdaptationList adaptations={s.adaptations} checked={checked} onCheck={toggleCheck} sectionId={s.id} color={s.color} t={t} />
              {/* Cross-setting guide */}
              <div style={{ marginTop: 16 }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, color: s.color, letterSpacing: 1, marginBottom: 8, textTransform: "uppercase" }}>Across Settings</div>
                {Object.entries(s.crossSetting).map(([setting, text]) => (
                  <div key={setting} style={{ fontSize: 13, color: t.text, padding: "6px 0", borderBottom: `1px solid ${t.border}`, lineHeight: 1.5 }}>
                    <span style={{ fontWeight: 700, color: s.color }}>{setting === "school" ? "\uD83C\uDFEB" : setting === "clinic" ? "\uD83C\uDFE5" : setting === "home" ? "\uD83C\uDFE0" : "\uD83D\uDCBB"} {setting.charAt(0).toUpperCase() + setting.slice(1)}:</span> {text}
                  </div>
                ))}
              </div>
              <NotesField value={notes[s.id] || ""} onChange={(val) => setNote(s.id, val)} color={s.color} t={t} />
            </SectionCard>
          ))}

          {/* Sensory Environment Checklist */}
          <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: 24, marginTop: 20 }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: 2, color: t.textDim, textTransform: "uppercase", marginBottom: 4 }}>Sensory Environment Checklist</div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: t.textDim, fontStyle: "italic", marginBottom: 12 }}>Champagne & Stromberg, 2004</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
              {ENV_CHECKLIST.categories.map((cat) => (
                <div key={cat.label}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, color: t.accent, letterSpacing: 1, marginBottom: 6 }}>{cat.label}</div>
                  {cat.items.map((item, i) => {
                    const key = `env_${cat.label}_${i}`;
                    return (
                      <label key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0", fontSize: 13, color: t.text, cursor: "pointer" }}>
                        <input type="checkbox" checked={checked[key] || false} onChange={() => toggleCheck(key)} style={{ accentColor: t.accent, width: 14, height: 14 }} />
                        {item}
                      </label>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Interoception Tab ── */}
      {activeTab === "interoception" && (
        <div>
          <div style={{ fontSize: 13, color: t.textMuted, marginBottom: 6, lineHeight: 1.6 }}>Kelly Mahler's Interoception Curriculum — the gold-standard evidence-based approach for building body-signal awareness, emotional regulation, and self-advocacy.</div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: t.textDim, fontStyle: "italic", marginBottom: 16 }}>Mahler et al., 2022 (OT International); Mahler et al., 2024 (OT Health Care)</div>

          <div style={{ background: `${t.accent}10`, border: `1px solid ${t.accent}30`, borderRadius: 12, padding: 16, marginBottom: 20 }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, color: t.accent, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Trauma Considerations for All Interoception Work</div>
            <div style={{ fontSize: 13, color: t.text, lineHeight: 1.7 }}>
              {"\u2022"} Felt safety must be established before interoception work begins<br />
              {"\u2022"} Paced, curiosity-based exploration only — frame as "noticing," not "fixing"<br />
              {"\u2022"} Validate confusion, numbness, or avoidance as protective adaptations<br />
              {"\u2022"} Never force body awareness — the student can always pass<br />
              {"\u2022"} For clients with alexithymia: start with exteroception as a bridge into body awareness
            </div>
          </div>

          {INTEROCEPTION.map((lvl) => {
            const id = `intero${lvl.level}`;
            return (
              <SectionCard key={id} color={lvl.color} title={`Level ${lvl.level}: ${lvl.label}`} desc={lvl.desc} source={lvl.source} open={expanded === id} onToggle={() => toggleExpand(id)} t={t}>
                <div style={{ marginTop: 10, padding: 14, background: `${lvl.color}08`, borderRadius: 10, borderLeft: `2px solid ${lvl.color}` }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700, color: lvl.color, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Trauma Note</div>
                  <div style={{ fontSize: 13, color: t.text, lineHeight: 1.6 }}>{lvl.traumaNote}</div>
                </div>
                <div style={{ marginTop: 16 }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, color: lvl.color, letterSpacing: 1, marginBottom: 8, textTransform: "uppercase" }}>Activities</div>
                  {lvl.activities.map((a, i) => {
                    const key = `${id}_${i}`;
                    const isChecked = checked[key] || false;
                    return (
                      <label key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 0", borderBottom: i < lvl.activities.length - 1 ? `1px solid ${t.border}` : "none", cursor: "pointer", fontSize: 14, color: t.text, lineHeight: 1.6 }}>
                        <input type="checkbox" checked={isChecked} onChange={() => toggleCheck(key)} style={{ marginTop: 4, accentColor: lvl.color, width: 16, height: 16, flexShrink: 0 }} />
                        <div>
                          <div style={{ opacity: isChecked ? 1 : 0.8 }}>{a.text}</div>
                          <div style={{ marginTop: 3 }}>
                            <SettingTags settings={a.settings} />
                          </div>
                          <div style={{ fontSize: 12, color: lvl.color, fontStyle: "italic", marginTop: 2 }}>Consent language: "{a.consent}"</div>
                        </div>
                      </label>
                    );
                  })}
                </div>
                <NotesField value={notes[id] || ""} onChange={(val) => setNote(id, val)} color={lvl.color} t={t} />
              </SectionCard>
            );
          })}
        </div>
      )}

      {/* ── Summary Tab ── */}
      {activeTab === "summary" && (
        <div>
          <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: 24, marginBottom: 20 }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: 2, color: t.textDim, textTransform: "uppercase", marginBottom: 4 }}>Adaptation Plan</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: t.text, marginBottom: 4 }}>{activity || "No activity entered"}</div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: t.textMuted }}>{new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</div>
            {(nervousState || wotZone) && (
              <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
                {nervousState && <Tag text={`Polyvagal: ${POLYVAGAL_STATES.find(s => s.id === nervousState)?.label}`} color={POLYVAGAL_STATES.find(s => s.id === nervousState)?.color} t={t} />}
                {wotZone && <Tag text={`WoT: ${WINDOW_ZONES.find(z => z.id === wotZone)?.label}`} color={WINDOW_ZONES.find(z => z.id === wotZone)?.color} t={t} />}
              </div>
            )}
          </div>

          {checkedAdaptations.length > 0 ? (
            <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: 24, marginBottom: 20 }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: 1, color: t.accent, textTransform: "uppercase", marginBottom: 14 }}>Selected Adaptations ({checkedAdaptations.length})</div>
              {checkedAdaptations.map((a, i) => (
                <div key={i} style={{ padding: "10px 0", borderBottom: i < checkedAdaptations.length - 1 ? `1px solid ${t.border}` : "none", display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: a.color, flexShrink: 0, marginTop: 6 }} />
                  <div>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700, color: a.color, letterSpacing: 1, textTransform: "uppercase" }}>{a.section}</div>
                    <div style={{ fontSize: 14, color: t.text, lineHeight: 1.5, marginTop: 2 }}>{a.text}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: 24, marginBottom: 20, textAlign: "center" }}>
              <div style={{ fontSize: 14, color: t.textMuted }}>No adaptations selected yet. Check adaptations in the other tabs.</div>
            </div>
          )}

          {activeNotes.length > 0 && (
            <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: 24, marginBottom: 20 }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: 1, color: t.accent, textTransform: "uppercase", marginBottom: 14 }}>Notes</div>
              {activeNotes.map(([id, text]) => {
                const samhsa = SAMHSA.find((s) => s.id === id); const dir = DIR_LEVELS.find((d) => `dir${d.level}` === id);
                const sens = SENSORY.find((s) => s.id === id); const intero = INTEROCEPTION.find((l) => `intero${l.level}` === id);
                const label = samhsa ? samhsa.label : dir ? `DIR ${dir.level}: ${dir.label}` : sens ? `Sensory: ${sens.label}` : intero ? `Interoception L${intero.level}` : id;
                const color = samhsa?.color || dir?.color || sens?.color || intero?.color || t.accent;
                return (
                  <div key={id} style={{ padding: "10px 0", borderBottom: `1px solid ${t.border}` }}>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700, color, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>{label}</div>
                    <div style={{ fontSize: 14, color: t.text, lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{text}</div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="no-print" style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 24 }}>
            <button onClick={handlePrint} style={{ padding: "12px 28px", borderRadius: 10, border: "none", background: t.accent, color: "#fff", fontWeight: 600, fontSize: 14, letterSpacing: 0.5, cursor: "pointer" }}>Print</button>
            <button onClick={handleExport} style={{ padding: "12px 28px", borderRadius: 10, border: `1px solid ${t.border}`, background: "transparent", color: t.text, fontWeight: 600, fontSize: 14, letterSpacing: 0.5, cursor: "pointer" }}>Export JSON</button>
          </div>
        </div>
      )}

      {/* References */}
      <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: 24, marginTop: 40 }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: 2, color: t.textDim, textTransform: "uppercase", marginBottom: 14 }}>References</div>
        {REFERENCES.map((r) => (
          <div key={r.id} style={{ fontSize: 12, color: t.textMuted, lineHeight: 1.7, marginBottom: 6, paddingLeft: 20, textIndent: -20 }}>
            {r.url ? <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ color: t.accent, textDecoration: "none" }}>{r.full}</a> : r.full}
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer style={{ textAlign: "center", marginTop: 48, paddingTop: 20, borderTop: `1px solid ${t.border}`, fontFamily: "'Space Mono', monospace", fontSize: 11, color: t.textDim, letterSpacing: 0.5, lineHeight: 1.8 }}>
        <button onClick={() => setShowAbout(true)} className="no-print" aria-label="About this resource"
          style={{ background: "transparent", border: `1px solid ${t.border}`, borderRadius: 20, padding: "6px 16px", fontFamily: "'Space Mono', monospace", fontSize: 11, color: t.textMuted, cursor: "pointer", letterSpacing: 0.5, marginBottom: 14, display: "inline-flex", alignItems: "center", gap: 6 }}>
          📖 About this resource
        </button>
        <p>Rachel Norton, MS, CCC-SLP</p>
        <p>RTN Communication & Literacy &middot; rachelslp.org</p>
      </footer>

      {showAbout && <AboutModal onClose={() => setShowAbout(false)} t={t} />}
    </div>
  );
}
