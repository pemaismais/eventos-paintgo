export default defineEventHandler(async (event) => {
  const { pin } = await readBody<{ pin?: string }>(event)
  const { eventAdminPin } = useRuntimeConfig(event)
  // Nuxt pode carregar o PIN do env como número (destr); normaliza pra string dos dois lados.
  const configured = String(eventAdminPin ?? '').trim()

  if (!configured || String(pin ?? '').trim() !== configured) {
    throw createError({ statusCode: 401, message: 'PIN incorreto.' })
  }

  // Não é httpOnly de propósito: o middleware de rota no cliente lê a presença pra decidir
  // se mostra a tela ou manda pro login. A proteção real dos dados é server-side (requirePin).
  setCookie(event, 'event_team', configured, {
    httpOnly: false,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 12 // 12h cobrem o dia do evento
  })

  return { success: true }
})
