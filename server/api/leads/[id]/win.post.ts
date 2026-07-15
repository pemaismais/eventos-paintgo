import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  requirePin(event)
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, message: 'ID ausente.' })

  const supabase = serverSupabaseServiceRole(event)
  const { error } = await supabase
    .from('event_leads')
    .update({ won: true, won_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw createError({ statusCode: 500, message: error.message })

  return { success: true }
})
