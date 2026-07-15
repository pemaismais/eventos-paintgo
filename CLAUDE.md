Use the `typescript-pro` skill as your typescript guesses for code generation, analysis, and refactoring.

# Contexto do Projeto (Project Context)
- **App:** PaintGo Eventos — web app de estande para captura de leads (via QR code) e sorteio ao vivo, reutilizável em feiras/eventos. Separado do site institucional.
- **Stack Tecnológico:** Nuxt 4, Vue 3 (Composition API / `<script setup>`), TypeScript, TailwindCSS 4, Supabase, Nuxt UI.
- **Identidade:** dark theme, laranja `#FF6210` em destaque, tom tech/industrial da marca PaintGo.
- **Idioma:** Interações, explicações e documentação para o usuário devem ser em Português do Brasil. O código (variáveis, funções) pode seguir o padrão em inglês do repositório.
- **Arquitetura:** Siga os padrões do Nuxt 4 (auto-imports de composables e componentes, diretórios de `pages`, `server/api`, etc.).
- **TypeScript:** É estritamente proibido o uso do tipo `any`. Mantenha a tipagem estrita.
- **Validação / Linting:** Sempre rode os linters (`pnpm run lint`) ao final das suas modificações para garantir a qualidade do código.
- **Commits:** Mensagens de commit NÃO devem conter o nome do "Claude", do "Agente" ou qualquer menção a IA. Use mensagens curtas, claras e estritamente profissionais.
- **Simplicidade (YAGNI):** Siga rigorosamente o princípio YAGNI. Não crie abstrações, componentes ou lógicas antecipando necessidades futuras. Construa apenas o estritamente necessário para resolver o problema atual.
- **Código Conciso (One-liners):** Busque sempre soluções simples e diretas. Dê forte preferência para soluções em uma única linha usando funções nativas do JS/TS, métodos de array, etc., desde que a legibilidade não seja destruída.
- **Comentários autocontidos:** Um comentário do código nunca cita documento de fora do código. Escreva o **porquê na própria linha**: afirme o fato/motivo (segurança, PII/LGPD, fronteira de módulo, regra de negócio), não o endereço onde ele está documentado.

# 10-rule

These rules apply to every task in this project unless explicitly overridden.
Bias: caution over speed on non-trivial work. Use judgment on trivial tasks.

## Rule 1 — Think Before Coding
State assumptions explicitly. If uncertain, ask rather than guess.
Present multiple interpretations when ambiguity exists.
Push back when a simpler approach exists.
Stop when confused. Name what's unclear.

## Rule 2 — Simplicity First
Minimum code that solves the problem. Nothing speculative.
No features beyond what was asked. No abstractions for single-use code.
Test: would a senior engineer say this is overcomplicated? If yes, simplify.

## Rule 3 — Surgical Changes
Touch only what you must. Clean up only your own mess.
Don't "improve" adjacent code, comments, or formatting.
Don't refactor what isn't broken. Match existing style.

## Rule 4 — Goal-Driven Execution
Define success criteria. Loop until verified.
Don't follow steps. Define success and iterate.
Strong success criteria let you loop independently.

## Rule 5 — Use the model only for judgment calls
Use me for: classification, drafting, summarization, extraction.
Do NOT use me for: routing, retries, deterministic transforms.
If code can answer, code answers.

## Rule 6 — Token budgets are not advisory
Per-task: 4,000 tokens. Per-session: 30,000 tokens.
If approaching budget, summarize and start fresh.
Surface the breach. Do not silently overrun.

## Rule 7 — Surface conflicts, don't average them
If two patterns contradict, pick one (more recent / more tested).
Explain why. Flag the other for cleanup.
Don't blend conflicting patterns.

## Rule 8 — Read before you write
Before adding code, read exports, immediate callers, shared utilities.
"Looks orthogonal" is dangerous. If unsure why code is structured a way, find out.

## Rule 9 — Tests verify intent, not just behavior
Tests must encode WHY behavior matters, not just WHAT it does.
A test that can't fail when business logic changes is wrong.

## Rule 10 — Checkpoint after every significant step
Summarize what was done, what's verified, what's left.
Don't continue from a state you can't describe back.
If you lose track, stop and restate.
