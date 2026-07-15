import { serverSupabaseServiceRole } from '#supabase/server'

// Zera a tabela de leads (reset para testes no evento). Protegido por PIN.
export default defineEventHandler(async (event) => {
  requirePin(event)
  const supabase = serverSupabaseServiceRole(event)
  // Supabase exige um filtro no delete; este id impossível casa com todas as linhas reais.
  const { error } = await supabase.from('event_leads').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  if (error) throw createError({ statusCode: 500, message: error.message })
  return { success: true }
})
