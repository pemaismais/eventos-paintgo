import type { H3Event } from 'h3'

// Gate da área da equipe (sorteio + lista de leads). O segredo é o PIN configurado;
// o cookie só transporta. Sem PIN configurado, nega por padrão (fail closed).
export function requirePin(event: H3Event) {
  const pin = getCookie(event, 'event_team')
  const { eventAdminPin } = useRuntimeConfig(event)
  // Nuxt pode carregar o PIN do env como número (destr); normaliza pra string dos dois lados.
  const configured = String(eventAdminPin ?? '').trim()
  if (!configured || pin !== configured) {
    throw createError({ statusCode: 401, message: 'Acesso restrito à equipe.' })
  }
}
