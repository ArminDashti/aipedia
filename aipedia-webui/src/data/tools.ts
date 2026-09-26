import type { CatalogSection, LinkRow } from './types'

export const toolSections: CatalogSection[] = [
  {
    id: 'agents',
    title: 'Agents & Platforms',
    description: 'Agent runtimes, collaboration platforms, and multi-agent control planes.',
    rows: [
      {
        owner: 'codeaholicguy',
        name: 'AI DevKit',
        description:
          'Control plane for multi-agent coding: shared config, console, local memory, and verification gates',
        github: 'https://github.com/codeaholicguy/ai-devkit',
        url: 'https://ai-devkit.com/',
        logo: 'https://www.google.com/s2/favicons?domain=ai-devkit.com&sz=32',
      },
      {
        owner: 'botpress',
        name: 'Botpress v12',
        description:
          'Open-source Botpress v12 chatbot platform for building and running conversational bots',
        github: 'https://github.com/botpress/v12',
        url: 'https://v12.botpress.com',
        logo: 'https://www.google.com/s2/favicons?domain=botpress.com&sz=32',
      },
      {
        owner: 'Coasty',
        name: 'Coasty',
        description:
          'Computer-use API: screenshot in, grounded actions out; BYOK cloud machines for desktop/browser agents',
        github: null,
        url: 'https://coasty.ai/',
        logo: 'https://www.google.com/s2/favicons?domain=coasty.ai&sz=32',
      },
      {
        owner: 'crewAIInc',
        name: 'CrewAI',
        description: 'Enterprise agent build and runtime platform for multi-agent crews with governance',
        github: 'https://github.com/crewAIInc/crewAI',
        url: 'https://crewai.com/',
        logo: 'https://www.google.com/s2/favicons?domain=crewai.com&sz=32',
      },
      {
        owner: 'codegen-sh',
        name: 'Codegen',
        description:
          'Enterprise orchestration platform for AI coding agents with governance and audit trails; now part of ClickUp',
        github: 'https://github.com/codegen-sh',
        url: 'https://codegen.com/',
        logo: 'https://www.google.com/s2/favicons?domain=codegen.com&sz=32',
      },
      {
        owner: 'cursor',
        name: 'Cursor Agent Kanban',
        description: 'Cursor cookbook sample: multi-agent kanban board built with the Cursor SDK',
        github: 'https://github.com/cursor/cookbook',
        url: 'https://github.com/cursor/cookbook/tree/main/sdk/agent-kanban',
        logo: 'https://www.google.com/s2/favicons?domain=cursor.com&sz=32',
      },
      {
        owner: 'langgenius',
        name: 'Dify',
        description:
          'Collaborative workspace for agentic workflows and RAG pipelines with multi-model and tool support',
        github: 'https://github.com/langgenius/dify',
        url: 'https://dify.ai',
        logo: 'https://www.google.com/s2/favicons?domain=dify.ai&sz=32',
      },
      {
        owner: 'Factory',
        name: 'Factory Droids',
        description:
          'Agent-native development platform; Droids plan, build, and ship work from CLI, chat, and CI',
        github: null,
        url: 'https://factory.com/',
        logo: 'https://www.google.com/s2/favicons?domain=factory.com&sz=32',
      },
      {
        owner: 'lobehub',
        name: 'LobeHub',
        description:
          'Agent collaboration platform with persistent agent teammates, group context, and MCP discovery',
        github: 'https://github.com/lobehub',
        url: 'https://lobehub.com/',
        logo: 'https://www.google.com/s2/favicons?domain=lobehub.com&sz=32',
      },
      {
        owner: 'letta-ai',
        name: 'Letta',
        description:
          'Platform for stateful agents with advanced memory that can learn and self-improve over time',
        github: 'https://github.com/letta-ai/letta',
        url: 'https://docs.letta.com/',
        logo: 'https://www.google.com/s2/favicons?domain=letta.com&sz=32',
      },
      {
        owner: 'OpenHands',
        name: 'OpenHands',
        description:
          'Open-source software engineering agents with GUI, CLI, SDK, and enterprise control plane',
        github: 'https://github.com/OpenHands',
        url: 'https://www.openhands.dev/',
        logo: 'https://www.google.com/s2/favicons?domain=openhands.dev&sz=32',
      },
      {
        owner: 'pydantic',
        name: 'Pydantic AI',
        description:
          'Python agent framework: typed agent loop with structured outputs and dependency injection; Graph, Evals, and voice add-ons',
        github: 'https://github.com/pydantic/pydantic-ai',
        url: 'https://pydantic.dev/docs/ai/',
        logo: 'https://www.google.com/s2/favicons?domain=pydantic.dev&sz=32',
      },
      {
        owner: 'RasaHQ',
        name: 'Rasa',
        description:
          'Open-source ML framework for text and voice bots: NLU, dialogue management, and channel connectors',
        github: 'https://github.com/RasaHQ/rasa',
        url: 'https://rasa.com/docs/rasa/',
        logo: 'https://www.google.com/s2/favicons?domain=rasa.com&sz=32',
      },
      {
        owner: 'RooCodeInc',
        name: 'Roomote',
        description:
          'Source-available cloud coding agent that runs in your own environment and opens verified pull requests',
        github: 'https://github.com/RooCodeInc/Roomote',
        url: 'https://roomote.dev/',
        logo: 'https://www.google.com/s2/favicons?domain=roomote.dev&sz=32',
      },
      {
        owner: 'tinyhumansai',
        name: 'TinyHumans',
        description:
          'Local-first open-source AI agents: OpenHuman for private research, OpenCompany for evidence-based decisions, and Medulla multi-agent terminal',
        github: 'https://github.com/tinyhumansai',
        url: 'https://tinyhumans.ai/',
        logo: 'https://www.google.com/s2/favicons?domain=tinyhumans.ai&sz=32',
      },
    ],
  },
  {
    id: 'memory',
    title: 'Memory',
    description: 'Persistent context, knowledge graphs, and session memory for agents.',
    rows: [
      {
        owner: 'rohitg00',
        name: 'AgentMemory',
        description:
          'Persistent memory for coding agents (Claude Code, Copilot CLI, Cursor, Gemini CLI): hook-based capture, compression, and cross-session injection',
        github: 'https://github.com/rohitg00/agentmemory',
        logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
      },
      {
        owner: 'DeusData',
        name: 'Codebase Memory MCP',
        description: 'MCP server for persistent codebase memory and retrieval',
        github: 'https://github.com/DeusData/codebase-memory-mcp',
        logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
      },
      {
        owner: 'topoteretes',
        name: 'Cognee',
        description:
          'Open-source agent memory platform; graph memory with MCP/SDK for Claude Code, Cursor, and more',
        github: 'https://github.com/topoteretes/cognee',
        url: 'https://www.cognee.ai/',
        logo: 'https://www.google.com/s2/favicons?domain=cognee.ai&sz=32',
      },
      {
        owner: 'thedotmack',
        name: 'Claude-Mem',
        description:
          'Persistent context across agent sessions: captures work, compresses with AI, injects relevant memory into future sessions',
        github: 'https://github.com/thedotmack/claude-mem',
        logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
      },
      {
        owner: 'vanzan01',
        name: 'Cursor Memory Bank',
        description:
          'Documentation-driven Cursor custom modes (VAN, PLAN, CREATIVE, IMPLEMENT) for persistent project memory and structured workflows',
        github: 'https://github.com/vanzan01/cursor-memory-bank',
        logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
      },
      {
        owner: 'getzep',
        name: 'Graphiti',
        description: 'Real-time knowledge graph memory for AI agents',
        github: 'https://github.com/getzep/graphiti',
        logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
      },
      {
        owner: 'langchain-ai',
        name: 'LangMem',
        description:
          'Long-term memory for LangChain/LangGraph agents; extract, consolidate, and search knowledge over time',
        github: 'https://github.com/langchain-ai/langmem',
        url: 'https://langchain-ai.github.io/langmem/',
        logo: 'https://www.google.com/s2/favicons?domain=langchain.com&sz=32',
      },
      {
        owner: 'modelcontextprotocol',
        name: 'MCP Memory Server',
        description: 'Persistent memory via local knowledge graph; official MCP reference server',
        github: 'https://github.com/modelcontextprotocol/servers',
        url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/memory',
        logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
      },
      {
        owner: 'mem0ai',
        name: 'Mem0',
        description: 'Drop-in memory infrastructure for AI agents; persists context across sessions',
        github: 'https://github.com/mem0ai/mem0',
        url: 'https://mem0.ai/',
        logo: 'https://www.google.com/s2/favicons?domain=mem0.ai&sz=32',
      },
      {
        owner: 'caura-ai',
        name: 'MemClaw',
        description: 'Governed shared memory for multi-agent fleets; MCP tools, permissions, audit trails',
        github: 'https://github.com/caura-ai/caura-memclaw',
        url: 'https://memclaw.net/',
        logo: 'https://www.google.com/s2/favicons?domain=memclaw.net&sz=32',
      },
      {
        owner: 'Memories',
        name: 'Memories',
        description:
          'Segmented agent memory (session, semantic, episodic, procedural); CLI, MCP, and SDK',
        github: null,
        url: 'https://memories.sh/',
        logo: 'https://www.google.com/s2/favicons?domain=memories.sh&sz=32',
      },
      {
        owner: 'memU',
        name: 'memU',
        description:
          'Personal memory layer across agents, sessions, and devices; source-linked inspectable recall',
        github: null,
        url: 'https://memu.pro/',
        logo: 'https://www.google.com/s2/favicons?domain=memu.pro&sz=32',
      },
      {
        owner: 'oleksiijko',
        name: 'PMB',
        description: 'Local-first persistent memory for AI coding agents over MCP; SQLite-backed, offline',
        github: 'https://github.com/oleksiijko/pmb',
        logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
      },
    ],
  },
  {
    id: 'compression',
    title: 'Compression',
    description: 'Prompt, context, and tool-output compression before the LLM.',
    rows: [
      {
        owner: 'headroomlabs-ai',
        name: 'Headroom',
        description:
          'Compress tool outputs, logs, files, and RAG chunks before the LLM; library, proxy, and MCP server',
        github: 'https://github.com/headroomlabs-ai/headroom',
        url: 'https://headroom-docs.vercel.app/',
        logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
      },
      {
        owner: 'microsoft',
        name: 'LLMLingua',
        description:
          'Prompt and KV-cache compression up to 20x with minimal performance loss (EMNLP\'23, ACL\'24)',
        github: 'https://github.com/microsoft/LLMLingua',
        url: 'https://llmlingua.com/',
        logo: 'https://www.google.com/s2/favicons?domain=microsoft.com&sz=32',
      },
    ],
  },
  {
    id: 'rag',
    title: 'RAG & Knowledge',
    description: 'Retrieval, document parsing, and knowledge bases for agents.',
    rows: [
      {
        owner: 'Mintplex-Labs',
        name: 'AnythingLLM',
        description: 'All-in-one desktop/self-hosted RAG app for docs, chat, and agents',
        github: 'https://github.com/Mintplex-Labs/anything-llm',
        url: 'https://anythingllm.com/',
        logo: 'https://www.google.com/s2/favicons?domain=anythingllm.com&sz=32',
      },
      {
        owner: 'docling-project',
        name: 'Docling',
        description:
          'Document parsing toolkit that converts PDFs and office files into structured data for gen AI / RAG',
        github: 'https://github.com/docling-project/docling',
        logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
      },
      {
        owner: 'inkeep',
        name: 'OpenKnowledge',
        description:
          'AI-native markdown editor and local-first knowledge base / LLM wiki for humans and agents',
        github: 'https://github.com/inkeep/open-knowledge',
        url: 'https://openknowledge.ai/',
        logo: 'https://www.google.com/s2/favicons?domain=openknowledge.ai&sz=32',
      },
      {
        owner: 'langchain-ai',
        name: 'OpenWiki',
        description: 'Open-source agent/CLI that generates and maintains repo wikis for coding agents',
        github: 'https://github.com/langchain-ai/openwiki',
        logo: 'https://www.google.com/s2/favicons?domain=langchain.com&sz=32',
      },
      {
        owner: 'infiniflow',
        name: 'RAGFlow',
        description: 'Open-source RAG engine based on deep document understanding',
        github: 'https://github.com/infiniflow/ragflow',
        url: 'https://ragflow.io/',
        logo: 'https://www.google.com/s2/favicons?domain=ragflow.io&sz=32',
      },
    ],
  },
  {
    id: 'context',
    title: 'Context & Repo Packing',
    description: 'Serialize repos and files into prompt-friendly context for LLMs.',
    rows: [
      {
        owner: 'mufeedvh',
        name: 'Code2prompt',
        description:
          'CLI that converts a codebase into a single LLM prompt with source tree, templating, and token counting',
        github: 'https://github.com/mufeedvh/code2prompt',
        logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
      },
      {
        owner: 'simonw',
        name: 'files-to-prompt',
        description: 'Concatenate a directory of files into one prompt-friendly string for LLMs',
        github: 'https://github.com/simonw/files-to-prompt',
        logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
      },
      {
        owner: 'coderamp-labs',
        name: 'Gitingest',
        description:
          'Replace hub with ingest in any GitHub URL to get a prompt-friendly extract of a codebase',
        github: 'https://github.com/coderamp-labs/gitingest',
        url: 'https://gitingest.com',
        logo: 'https://www.google.com/s2/favicons?domain=gitingest.com&sz=32',
      },
      {
        owner: 'microsoft',
        name: 'MarkItDown',
        description:
          'Python utility that converts PDF, Office, images, audio, HTML, and more into Markdown for LLMs',
        github: 'https://github.com/microsoft/markitdown',
        logo: 'https://www.google.com/s2/favicons?domain=microsoft.com&sz=32',
      },
      {
        owner: 'yamadashy',
        name: 'Repomix',
        description:
          'Packs an entire repository into one AI-friendly file for Claude, ChatGPT, Gemini, and other LLM tools',
        github: 'https://github.com/yamadashy/repomix',
        url: 'https://repomix.com',
        logo: 'https://www.google.com/s2/favicons?domain=repomix.com&sz=32',
      },
      {
        owner: 'manojmallick',
        name: 'Sigmap',
        description:
          'CLI that maps a codebase so AI coding assistants only receive the most relevant files; 30+ languages, offline, with MCP and IDE integration',
        github: 'https://github.com/manojmallick/sigmap',
        url: 'https://sigmap.io/',
        logo: 'https://www.google.com/s2/favicons?domain=sigmap.io&sz=32',
      },
      {
        owner: 'mohsen1',
        name: 'yek',
        description:
          'Fast Rust tool to serialize text-based files in a repo or directory for LLM consumption',
        github: 'https://github.com/mohsen1/yek',
        logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
      },
    ],
  },
  {
    id: 'vector',
    title: 'Vector Databases',
    description: 'Embedding stores and similarity search engines.',
    rows: [
      {
        owner: 'chroma-core',
        name: 'Chroma',
        description: 'Open-source embedding database for AI apps',
        github: 'https://github.com/chroma-core/chroma',
        url: 'https://www.trychroma.com/',
        logo: 'https://www.google.com/s2/favicons?domain=trychroma.com&sz=32',
      },
      {
        owner: 'milvus-io',
        name: 'Milvus',
        description: 'Cloud-native open-source vector database for embedding similarity search',
        github: 'https://github.com/milvus-io/milvus',
        url: 'https://milvus.io/',
        logo: 'https://www.google.com/s2/favicons?domain=milvus.io&sz=32',
      },
      {
        owner: 'pgvector',
        name: 'pgvector',
        description: 'Open-source vector similarity search for Postgres',
        github: 'https://github.com/pgvector/pgvector',
        logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
      },
      {
        owner: 'qdrant',
        name: 'Qdrant',
        description: 'High-performance vector similarity search engine and vector database',
        github: 'https://github.com/qdrant/qdrant',
        url: 'https://qdrant.tech/',
        logo: 'https://www.google.com/s2/favicons?domain=qdrant.tech&sz=32',
      },
      {
        owner: 'weaviate',
        name: 'Weaviate',
        description: 'Open-source vector database with hybrid search and generative modules',
        github: 'https://github.com/weaviate/weaviate',
        url: 'https://weaviate.io/',
        logo: 'https://www.google.com/s2/favicons?domain=weaviate.io&sz=32',
      },
    ],
  },
  {
    id: 'dev',
    title: 'Dev Tooling',
    description: 'Compilers, spec workflows, and agent-oriented development kits.',
    rows: [
      {
        owner: 'anyrobert',
        name: 'Cursor API Proxy',
        description:
          'API proxy that serves OpenAI-compatible endpoints backed by the Cursor agent CLI',
        github: 'https://github.com/anyrobert/cursor-api-proxy',
        logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
      },
      {
        owner: 'microsoft',
        name: 'Roslyn',
        description:
          '.NET compiler platform for C# and Visual Basic with code analysis APIs',
        github: 'https://github.com/dotnet/roslyn',
        logo: 'https://www.google.com/s2/favicons?domain=microsoft.com&sz=32',
      },
      {
        owner: 'github',
        name: 'Spec Kit',
        description: 'Toolkit for Spec-Driven Development with coding agents',
        github: 'https://github.com/github/spec-kit',
        logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
      },
      {
        owner: 'eclipse-theia',
        name: 'Theia Platform',
        description:
          'Vendor-neutral framework for building custom AI-native IDEs and tools for desktop and cloud',
        github: 'https://github.com/eclipse-theia/theia',
        url: 'https://theia-ide.org/',
        logo: 'https://www.google.com/s2/favicons?domain=theia-ide.org&sz=32',
      },
    ],
  },
  {
    id: 'chat',
    title: 'Chat UIs',
    description: 'Self-hosted chat frontends for models and agents.',
    rows: [
      {
        owner: 'danny-avila',
        name: 'LibreChat',
        description: 'Self-hosted ChatGPT-style UI; multi-provider, agents, and tools',
        github: 'https://github.com/danny-avila/LibreChat',
        url: 'https://www.librechat.ai/',
        logo: 'https://www.google.com/s2/favicons?domain=librechat.ai&sz=32',
      },
      {
        owner: 'open-webui',
        name: 'Open WebUI',
        description: 'Self-hosted web UI for Ollama and OpenAI-compatible APIs',
        github: 'https://github.com/open-webui/open-webui',
        url: 'https://openwebui.com/',
        logo: 'https://www.google.com/s2/favicons?domain=openwebui.com&sz=32',
      },
    ],
  },
  {
    id: 'gateways',
    title: 'Gateways & Inference',
    description: 'LLM routers, proxies, and hosted inference platforms.',
    rows: [
      {
        owner: 'BerriAI',
        name: 'LiteLLM',
        description:
          'Gateway and Python SDK that puts 100+ LLMs behind one OpenAI-compatible API with keys, budgets, and routing',
        github: 'https://github.com/BerriAI/litellm',
        url: 'https://litellm.ai/',
        logo: 'https://www.google.com/s2/favicons?domain=litellm.ai&sz=32',
        categories: ['dev'],
      },
      {
        owner: 'togethercomputer',
        name: 'Together AI',
        description:
          'Serverless and dedicated inference for open-weight models, plus GPU clusters and fine-tuning',
        github: 'https://github.com/togethercomputer',
        url: 'https://www.together.ai/',
        logo: 'https://www.google.com/s2/favicons?domain=together.ai&sz=32',
      },
      {
        owner: 'cerebras',
        name: 'Cerebras Inference',
        description:
          'Fast inference API for open models served from wafer-scale CS-3 and CS-4 systems',
        github: 'https://github.com/Cerebras',
        url: 'https://www.cerebras.ai/',
        logo: 'https://www.google.com/s2/favicons?domain=cerebras.ai&sz=32',
      },
      {
        owner: 'NVIDIA',
        name: 'NVIDIA NIM',
        description: 'Optimized inference microservices and hosted model endpoints on build.nvidia.com',
        github: 'https://github.com/NVIDIA',
        url: 'https://build.nvidia.com/',
        logo: 'https://www.google.com/s2/favicons?domain=build.nvidia.com&sz=32',
      },
      {
        owner: 'PrismML-Eng',
        name: 'PrismML',
        description:
          'Ternary and 1-bit Bonsai models for local inference; Bonsai 2 27B ships as a 5.9 GB GGUF',
        github: 'https://github.com/PrismML-Eng',
        url: 'https://prismml.com/',
        logo: 'https://www.google.com/s2/favicons?domain=prismml.com&sz=32',
      },
      {
        owner: 'GooseAI',
        name: 'GooseAI',
        description:
          'Fully managed OpenAI-compatible NLP inference API from CoreWeave and Anlatan; tiered per-request pricing',
        github: null,
        url: 'https://goose.ai/',
        logo: 'https://www.google.com/s2/favicons?domain=goose.ai&sz=32',
      },
      {
        owner: 'Tetrate',
        name: 'Tetrate',
        description:
          'Enterprise AI gateways: Agent Router, AI and MCP gateways, and guardrails with spend attribution by team and agent',
        github: 'https://github.com/tetrateio',
        url: 'https://tetrate.ai/',
        logo: 'https://www.google.com/s2/favicons?domain=tetrate.ai&sz=32',
      },
    ],
  },
  {
    id: 'observability',
    title: 'Observability & Code Review',
    description: 'Usage analytics, tracing, and automated pull-request review.',
    rows: [
      {
        owner: 'greptileai',
        name: 'Greptile',
        description:
          'AI reviewer that indexes a codebase into a graph and reviews pull requests with that context',
        github: 'https://github.com/greptileai',
        url: 'https://www.greptile.com/',
        logo: 'https://www.google.com/s2/favicons?domain=greptile.com&sz=32',
        categories: ['agents'],
      },
      {
        owner: 'HamedMP',
        name: 'CursorLens',
        description: 'Self-hosted proxy and dashboard that logs Cursor generations, token usage, and cost',
        github: 'https://github.com/HamedMP/CursorLens',
        logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
      },
      {
        owner: 'future-agi',
        name: 'traceAI',
        description:
          'OpenTelemetry-native tracing for LLM and agent apps in Python, TypeScript, Java, and C#',
        github: 'https://github.com/future-agi/traceAI',
        logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
        categories: ['dev'],
      },
    ],
  },
  {
    id: 'evals',
    title: 'Evaluation & Benchmarks',
    description: 'Leaderboards and head-to-head model evaluation.',
    rows: [
      {
        owner: 'Arena Intelligence',
        name: 'Arena AI',
        description:
          'LLM leaderboard and arena where models compete head-to-head on human-voted prompts; formerly LMArena',
        github: null,
        url: 'https://arena.ai/',
        logo: 'https://www.google.com/s2/favicons?domain=arena.ai&sz=32',
      },
    ],
  },
  {
    id: 'standards',
    title: 'Specs & Standards',
    description: 'Shared conventions that coding agents and harnesses read.',
    rows: [
      {
        owner: 'agentsmd',
        name: 'AGENTS.md',
        description:
          'Open Markdown format that gives coding agents repo-specific instructions; no required fields',
        github: 'https://github.com/agentsmd/agents.md',
        url: 'https://agents.md/',
        logo: 'https://www.google.com/s2/favicons?domain=agents.md&sz=32',
      },
    ],
  },
  {
    id: 'media',
    title: 'Media & Creative',
    description: 'Generation workspaces for image, video, audio, and 3D.',
    rows: [
      {
        owner: 'MuseSpark AI',
        name: 'MuseSpark',
        description:
          'AI generation workspace spanning image, video, audio, 3D, and text models behind one subscription',
        github: null,
        url: 'https://musespark.ai/',
        logo: 'https://www.google.com/s2/favicons?domain=musespark.ai&sz=32',
      },
    ],
  },
]

export const tools: LinkRow[] = toolSections.flatMap((section) => section.rows)
