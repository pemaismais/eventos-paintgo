# Contexto: PaintGo Eventos

App de estande para **feiras e eventos** da PaintGo Brasil. Duas funções:

1. **Captura de leads** — visitante escaneia um QR code, abre a URL pública no próprio
   celular e se cadastra (nome, WhatsApp, e-mail, empresa/oficina). Serve pro sorteio
   e pro follow-up comercial depois do evento.
2. **Sorteio ao vivo** — ao final da apresentação, a equipe roda um sorteio entre os
   cadastrados, com animação (roleta/reel), sorteando 1 ganhador por vez, sem repetir.

Reutilizável em vários eventos (primeiro uso: Reparashow, São Caetano do Sul/SP, 18/07).

## Sobre a PaintGo Brasil
Representante oficial no Brasil da ONEW, líder global em robôs inteligentes de pintura
automotiva. Democratiza automação de nível industrial para oficinas de funilaria e
pintura de todos os portes. Tom de voz: profissional, inovador, focado em ROI.

## Identidade visual
- Dark theme (fundo `zinc-950` / preto), laranja `#FF6210` em destaque.
- Tom tech/industrial. Logo oficial em `AppLogo.vue` (SVG, "P" pinta no primary/laranja).
- Botões grandes (evento, toque rápido, leitura à distância na tela do sorteio).

## Acesso
- `/` — cadastro público (alvo do QR).
- `/sorteio` e `/leads` — área da equipe, protegida por PIN (`EVENT_ADMIN_PIN`).
