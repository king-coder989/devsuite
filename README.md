# 🚀 DevSuite – The Modular Dev Toolkit for Sui Blockchain

> "Why ship one tool when you can build the factory?"  

**DevSuite** is a Vercel-inspired modular dashboard tailored for developers building on the Sui blockchain. It centralizes essential tools for deploying, testing, debugging, and evolving smart contracts — all from a single interface.

---

## ⚡ TL;DR

The Sui ecosystem is powerful but fragmented. DevSuite fixes that by bundling the most critical dev workflows — schema querying, migration diffing, and cross-chain logic simulation — into a single, beautiful interface. Modular by design. Expandable by devs. Production-ready.

---

## ❗ The Problem

- Sui’s new GraphQL RPC 2.0 is underused due to lack of query playgrounds.
- Devs struggle comparing SDK changes across Sui upgrades.
- Bridge flows are risky — no safe way to simulate or teach them.
- Tooling is scattered across random repos, CLI hacks, or unmaintained widgets.

---

## ✅ The DevSuite Solution

DevSuite unifies the top 3 infrastructure pain points under one roof:

- A powerful **GraphQL API playground** for live query building + code generation.
- A **SDK migration diff tool** to instantly detect contract-breaking changes.
- A sleek, step-by-step **Bridge UI simulator** to model token flows visually.

Built for solo devs, hackathon teams, and Sui core contributors alike.

---

## 🔧 Features (MVP Modules)

### 1. **SuiGraphQLStudio**
A modern GraphQL playground for Sui's RPC 2.0  
- Query builder with auto-complete  
- Live preview of on-chain data  
- Code export (TS, Move)  
- Schema viewer  

### 2. **SDKMigrationGuide**
Easily compare 2 versions of your Move code or SDK usage.  
- Side-by-side editor  
- Claude-powered breaking change detector  
- Exportable diff report  

### 3. **BridgeFlowComposer**
A mock token bridge UI — without the risk.  
- Visual deposit/bridge/withdraw simulator  
- Fake tx hashes + object mapping  
- No backend required — just a safe teaching/demo tool

---

## 💭 Why We Built This

- Move is new to us — this dashboard helped us onboard faster.
- We realized every Sui project was rebuilding the same 3 utilities.
- AI tools were powerful but inconsistent — this UI acts as a stable frontend for them.
- We needed a workspace we’d actually use post-hackathon.

---

## 🧨 Challenges Faced

- GPT hallucinated broken Move functions — we had to manually validate logic.
- Lovable AI exported code with strict TS + Tailwind configs → had to debug conflicts.
- Sui GraphQL schema is complex — required mocking queries to test formatting.
- GitHub commit history overwrite wasn't enough — the contribution watermark stayed.

---

## 🧭 What’s Next

- Full SCION network simulator backend  
- Object composition visualizer  
- Move state previewer  
- Plugin SDK to let other devs inject their own modules  
- Live devnet deploy tracking and faucet automation

---

## 🧪 Tech Stack

- React + Tailwind  
- GPT-4 / Claude AI  
- Perplexity AI (resources + SDKs)  
- Sui's ecosytem 
- Netlify (hosting)  

---

## 🧑‍💻 Team

**Built solo by:** `@king-coder989`  
Powered by AI, pressure, and the promise of $30,000.

---

## 📌 Submission

**Sui Overflow 2025 Hackathon**  
_Track: Infrastructure & Tooling_
