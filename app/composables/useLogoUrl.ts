// Logo horizontal (texto escuro, pra fundo claro) servido do bucket público do Supabase.
export function useLogoUrl() {
  const url = useRuntimeConfig().public.supabase.url
  return `${url}/storage/v1/object/public/media/public/logo-horizontal-dark.svg`
}
