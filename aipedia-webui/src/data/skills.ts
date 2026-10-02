import type { CatalogSection, LinkRow } from './types'

export const skillSections: CatalogSection[] = [
  {
    id: 'collections',
    title: 'Collections & Curated Packs',
    description: 'Large skill libraries and community-curated packs for coding agents.',
    rows: [
      {
        owner: 'softaworks',
        name: 'Agent Toolkit',
        description:
          'Curated skills packing instructions and scripts for AI coding agents across dev and professional workflows',
        github: 'https://github.com/softaworks/agent-toolkit',
        logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
      },
      {
        owner: 'Anthropic',
        name: 'Anthropic Skills',
        description: 'Official public Agent Skills repository from Anthropic',
        github: 'https://github.com/anthropics/skills',
        logo: 'https://www.google.com/s2/favicons?domain=anthropic.com&sz=32',
      },
      {
        owner: 'new-silvermoon',
        name: 'Awesome Android Agent Skills',
        description:
          'Agent skills teaching Copilot, Claude, Gemini, and Cursor modern Android (Kotlin, Jetpack Compose)',
        github: 'https://github.com/new-silvermoon/awesome-android-agent-skills',
        logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
      },
      {
        owner: 'github',
        name: 'Awesome Copilot',
        description:
          'Community collection of Copilot agents, instructions, skills, hooks, workflows, and plugins',
        github: 'https://github.com/github/awesome-copilot',
        logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
      },
      {
        owner: 'alirezarezvani',
        name: 'claude-skills',
        description:
          '345+ Claude Code skills, agents, and plugins for Claude Code, Codex, Gemini CLI, Cursor, and more',
        github: 'https://github.com/alirezarezvani/claude-skills',
        logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
      },
    ],
  },
  {
    id: 'design',
    title: 'Design & UI',
    description: 'Skills for design systems, UI polish, and front-end craft.',
    rows: [
      {
        owner: 'emilkowalski',
        name: 'Emil Kowalski Skills',
        description: 'Skills for designers and engineers',
        github: 'https://github.com/emilkowalski/skills',
        url: 'https://emilkowal.ski/skill',
        logo: 'https://www.google.com/s2/favicons?domain=emilkowal.ski&sz=32',
      },
      {
        owner: 'greensock',
        name: 'GSAP Skills',
        description:
          'Official AI skills teaching agents correct GSAP usage, patterns, and plugins',
        github: 'https://github.com/greensock/gsap-skills',
        logo: 'https://www.google.com/s2/favicons?domain=gsap.com&sz=32',
      },
      {
        owner: 'pbakaus',
        name: 'Impeccable',
        description: 'Design language that makes AI harnesses better at design',
        github: 'https://github.com/pbakaus/impeccable',
        url: 'https://impeccable.style',
        logo: 'https://www.google.com/s2/favicons?domain=impeccable.style&sz=32',
      },
      {
        owner: 'Leonxlnx',
        name: 'Taste Skill',
        description: 'Gives AI good taste and reduces generic, boring UI/design slop',
        github: 'https://github.com/Leonxlnx/taste-skill',
        url: 'https://tasteskill.dev',
        logo: 'https://www.google.com/s2/favicons?domain=tasteskill.dev&sz=32',
      },
      {
        owner: 'nextlevelbuilder',
        name: 'UI UX Pro Max',
        description: 'Design intelligence skill for professional UI/UX across platforms',
        github: 'https://github.com/nextlevelbuilder/ui-ux-pro-max-skill',
        url: 'https://www.uupm.cc/',
        logo: 'https://www.google.com/s2/favicons?domain=uupm.cc&sz=32',
      },
      {
        owner: 'iqonicdesignofficial',
        name: 'Hope UI Design System',
        description: 'Open-source admin dashboard and UI design system',
        github: 'https://github.com/iqonicdesignofficial/hope-ui-design-system',
        logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
      },
      {
        owner: 'tt-a1i',
        name: 'Archify',
        description:
          'Agent skill for verifiable architecture, workflow, sequence, and data-flow diagrams as self-contained HTML with motion and export',
        github: 'https://github.com/tt-a1i/archify',
        url: 'https://tt-a1i.github.io/archify/',
        logo: 'https://www.google.com/s2/favicons?domain=tt-a1i.github.io&sz=32',
      },
    ],
  },
  {
    id: 'marketing',
    title: 'Marketing & Content',
    description: 'Growth, copywriting, and social content skills.',
    rows: [
      {
        owner: 'coreyhaines31',
        name: 'Marketing Skills',
        description:
          'Marketing skills for Claude Code and AI agents: CRO, copywriting, SEO, analytics, and growth',
        github: 'https://github.com/coreyhaines31/marketingskills',
        url: 'https://marketing-skills.com',
        logo: 'https://www.google.com/s2/favicons?domain=marketing-skills.com&sz=32',
      },
      {
        owner: 'charlie947',
        name: 'Social Media Skills',
        description:
          "Claude skills for Charlie Hills' content system across LinkedIn, Instagram, Substack, X, and YouTube",
        github: 'https://github.com/charlie947/social-media-skills',
        logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
      },
    ],
  },
  {
    id: 'productivity',
    title: 'Productivity & Writing',
    description: 'Output style, focus, and writing-quality skills.',
    rows: [
      {
        owner: 'JuliusBrussee',
        name: 'Caveman',
        description: 'Claude Code skill that cuts ~65% of tokens by talking like a caveman',
        github: 'https://github.com/JuliusBrussee/caveman',
        url: 'https://caveman.so/',
        logo: 'https://www.google.com/s2/favicons?domain=caveman.so&sz=32',
      },
      {
        owner: 'jarrodwatts',
        name: 'Claude HUD',
        description:
          'Claude Code plugin that shows context usage, active tools, running agents, and todo progress',
        github: 'https://github.com/jarrodwatts/claude-hud',
        logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
      },
      {
        owner: 'blader',
        name: 'Humanizer',
        description: 'Agent skill that removes signs of AI-generated writing from text',
        github: 'https://github.com/blader/humanizer',
        url: 'https://skills.sh/blader/humanizer',
        logo: 'https://www.google.com/s2/favicons?domain=skills.sh&sz=32',
      },
      {
        owner: 'ayghri',
        name: 'I Have ADHD',
        description:
          'Skill that stops coding agents from burying the answer; ADHD-friendly output',
        github: 'https://github.com/ayghri/i-have-adhd',
        logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
      },
      {
        owner: 'DietrichGebert',
        name: 'Ponytail',
        description:
          'Makes agents think like a lazy senior: prefer not writing code that is not needed',
        github: 'https://github.com/DietrichGebert/ponytail',
        url: 'https://ponytail.dev',
        logo: 'https://www.google.com/s2/favicons?domain=ponytail.dev&sz=32',
      },
      {
        owner: 'OthmanAdi',
        name: 'Planning with Files',
        description:
          'Persistent file-based planning for agents: crash-proof markdown plans, session recovery, and per-turn re-injection against context rot',
        github: 'https://github.com/OthmanAdi/planning-with-files',
        url: 'https://www.skills.sh/othmanadi/planning-with-files/planning-with-files',
        logo: 'https://www.google.com/s2/favicons?domain=skills.sh&sz=32',
      },
    ],
  },
  {
    id: 'frameworks',
    title: 'Frameworks, Workflows & Integrations',
    description: 'Methodologies, harness integrations, and domain workflow packs.',
    rows: [
      {
        owner: 'openai',
        name: 'Codex Plugin CC',
        description: 'Use Codex from Claude Code to review code or delegate tasks',
        github: 'https://github.com/openai/codex-plugin-cc',
        logo: 'https://www.google.com/s2/favicons?domain=openai.com&sz=32',
      },
      {
        owner: 'garrytan',
        name: 'gstack',
        description:
          "Garry Tan's Claude Code setup: 23 opinionated tools covering CEO, design, eng, release, docs, and QA roles",
        github: 'https://github.com/garrytan/gstack',
        logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
      },
      {
        owner: 'mvanhorn',
        name: 'Last 30 Days',
        description:
          'Researches a topic across Reddit, X, YouTube, HN, Polymarket, and the web into a grounded summary',
        github: 'https://github.com/mvanhorn/last30days-skill',
        logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
      },
      {
        owner: 'remotion-dev',
        name: 'Remotion Skills',
        description: 'Agent skills for Remotion programmatic video',
        github: 'https://github.com/remotion-dev/skills',
        logo: 'https://www.google.com/s2/favicons?domain=remotion.dev&sz=32',
      },
      {
        owner: 'obra',
        name: 'Superpowers',
        description: 'Agentic skills framework and software development methodology',
        github: 'https://github.com/obra/superpowers',
        logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
      },
      {
        owner: 'Graphify-Labs',
        name: 'Graphify',
        description:
          'Turns any codebase with docs, SQL schemas, configs, and PDFs into a queryable knowledge graph via a /graphify skill for Claude Code, Cursor, Codex, and Gemini CLI',
        github: 'https://github.com/Graphify-Labs/graphify',
        url: 'https://www.graphify.com',
        logo: 'https://www.google.com/s2/favicons?domain=graphify.com&sz=32',
      },
      {
        owner: 'calesthio',
        name: 'OpenMontage',
        description:
          'Agentic video production system: 12 production pipelines, 100+ tools, and 700+ skill files that turn a coding assistant into a video studio',
        github: 'https://github.com/calesthio/OpenMontage',
        url: 'https://www.openmontage.video/',
        logo: 'https://www.google.com/s2/favicons?domain=openmontage.video&sz=32',
      },
    ],
  },
  {
    id: 'directories',
    title: 'Directories & CLIs',
    description: 'Skill marketplaces and install tooling.',
    rows: [
      {
        owner: 'vercel-labs',
        name: 'Skills',
        description: 'Open agent skills CLI (`npx skills`) for finding and installing skills',
        github: 'https://github.com/vercel-labs/skills',
        url: 'https://skills.sh',
        logo: 'https://www.google.com/s2/favicons?domain=skills.sh&sz=32',
      },
      {
        owner: 'vercel-labs',
        name: 'skills.sh',
        description: 'Open agent skills directory and install leaderboard',
        github: null,
        url: 'https://www.skills.sh/',
        logo: 'https://www.google.com/s2/favicons?domain=skills.sh&sz=32',
      },
      {
        owner: 'NVIDIA',
        name: 'NVIDIA Skills',
        description: 'Catalog of NVIDIA-verified agent skills, installed with `npx skills add NVIDIA/skills`',
        github: 'https://github.com/NVIDIA/skills',
        url: 'https://build.nvidia.com/skills',
        logo: 'https://www.google.com/s2/favicons?domain=build.nvidia.com&sz=32',
      },
      {
        owner: 'NVIDIA',
        name: 'SkillSpector',
        description:
          'Security scanner for agent skills: detects prompt injection, data exfiltration, and supply-chain risks before install',
        github: 'https://github.com/NVIDIA/SkillSpector',
        url: 'https://docs.nvidia.com/skills/scanning-agent-skills',
        logo: 'https://www.google.com/s2/favicons?domain=build.nvidia.com&sz=32',
      },
      {
        owner: 'yusufkaraaslan',
        name: 'Skill Seekers',
        description:
          'Converts documentation sites, GitHub repos, and PDFs into Claude skills with automatic conflict detection',
        github: 'https://github.com/yusufkaraaslan/Skill_Seekers',
        url: 'https://skillseekersweb.com/',
        logo: 'https://www.google.com/s2/favicons?domain=skillseekersweb.com&sz=32',
      },
    ],
  },
  {
    id: 'courses',
    title: 'Courses & Learning',
    description: 'Hands-on courses and learning paths for building AI systems.',
    rows: [
      {
        owner: 'jamwithai',
        name: 'Production Agentic RAG Course',
        description:
          'Hands-on course building production RAG systems from the ground up, starting with an arXiv paper curator in Python',
        github: 'https://github.com/jamwithai/production-agentic-rag-course',
        logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
      },
    ],
  },
]

export const skills: LinkRow[] = skillSections.flatMap((section) => section.rows)
