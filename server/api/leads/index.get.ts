import { serverSupabaseServiceRole } from '#supabase/server'
import type { EventLead } from '~~/shared/types/lead'

export default defineEventHandler(async (event): Promise<EventLead[]> => {
  requirePin(event)
  const supabase = serverSupabaseServiceRole(event)
  const { data, error } = await supabase
    .from('event_leads')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw createError({ statusCode: 500, message: error.message })
  return (data ?? []) as EventLead[]
})
