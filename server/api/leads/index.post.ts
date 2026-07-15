import { serverSupabaseServiceRole } from '#supabase/server'

interface LeadBody {
  name: string
  phone: string
  email: string
  company: string
  website: string // honeypot — deve chegar vazio
}

// Campos de linha única: colapsa qualquer espaço em branco (tabs/quebras) e apara as pontas.
const clean = (v: unknown) => String(v ?? '').replace(/\s+/g, ' ').trim()
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

export default defineEventHandler(async (event) => {
  const body = await readBody<Partial<LeadBody>>(event)

  // Honeypot preenchido = bot. Responde sucesso e descarta em silêncio.
  if (clean(body.website)) return { success: true }

  const name = clean(body.name)
  const phone = clean(body.phone).replace(/\D/g, '')
  const email = clean(body.email).toLowerCase()
  const company = clean(body.company)

  // Front espelha estes limites; aqui é a fonte de verdade.
  const fail = (message: string) => createError({ statusCode: 400, message })
  if (!name || name.length > 120) throw fail('Informe seu nome completo.')
  if (phone.length < 10 || phone.length > 11) throw fail('Telefone/WhatsApp inválido.')
  if (!isEmail(email) || email.length > 160) throw fail('E-mail inválido.')
  if (company.length > 120) throw fail('Empresa/oficina muito longa.') // empresa é opcional

  const supabase = serverSupabaseServiceRole(event)
  const { error } = await supabase.from('event_leads').insert({ name, phone, email, company })

  // 23505 = unique violation nos índices de e-mail/telefone: já está cadastrado.
  if (error?.code === '23505') return { success: true, duplicate: true }
  if (error) throw createError({ statusCode: 500, message: 'Não foi possível cadastrar. Tente novamente.' })

  return { success: true }
})
