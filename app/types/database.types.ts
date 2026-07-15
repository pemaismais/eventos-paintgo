// Tipo mínimo só com a tabela do app (event_leads). App isolado — não puxamos o schema
// inteiro do projeto Supabase de propósito, pra não acoplar ao site institucional.
export type Database = {
  public: {
    Tables: {
      event_leads: {
        Row: {
          id: string
          created_at: string
          name: string
          phone: string
          email: string
          company: string
          won: boolean
          won_at: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          phone: string
          email: string
          company: string
          won?: boolean
          won_at?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          phone?: string
          email?: string
          company?: string
          won?: boolean
          won_at?: string | null
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
