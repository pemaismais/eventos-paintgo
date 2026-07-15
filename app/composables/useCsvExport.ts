import type { EventLead } from '~~/shared/types/lead'

export function useCsvExport() {
  const esc = (v: string) => `"${v.replace(/"/g, '""')}"`

  function toCsv(rows: EventLead[]): string {
    const header = ['Nome', 'WhatsApp', 'E-mail', 'Empresa', 'Cadastrado em', 'Ganhou']
    const lines = rows.map(r => [
      r.name,
      r.phone,
      r.email,
      r.company,
      new Date(r.created_at).toLocaleString('pt-BR'),
      r.won ? 'Sim' : 'Não'
    ].map(v => esc(String(v))).join(','))
    return [header.join(','), ...lines].join('\r\n')
  }

  function download(rows: EventLead[]) {
    // O BOM (U+FEFF) no início faz o Excel abrir em UTF-8 e não quebrar acentos.
    const blob = new Blob(['﻿' + toCsv(rows)], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `paintgo_leads_${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return { download }
}
