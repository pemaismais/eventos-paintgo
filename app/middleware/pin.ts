// Protege /sorteio e /leads: sem cookie da equipe, manda pro login guardando o destino.
export default defineNuxtRouteMiddleware((to) => {
  const team = useCookie('event_team')
  if (!team.value) {
    return navigateTo(`/equipe-login?redirect=${encodeURIComponent(to.path)}`)
  }
})
