// PM2 do app de eventos. NÃO vai no deploy (só o .output/ é enviado) — é uma referência
// pra você copiar pro servidor em ~/paintgo-eventos/ecosystem.config.cjs.
//
// Subir (o PIN vai pelo ambiente, nunca neste arquivo — repo é público):
//   cd ~/paintgo-eventos
//   NUXT_EVENT_ADMIN_PIN='SEU_PIN' pm2 start ecosystem.config.cjs --update-env
//   pm2 save
//
// A chave secreta do Supabase é embutida no build (secret do GitHub); só o PIN é runtime.
// Se algum dia precisar sobrescrever a secret no runtime, exporte-a no mesmo comando acima.

module.exports = {
  apps: [
    {
      name: 'paintgo-eventos',
      script: './.output/server/index.mjs',
      cwd: __dirname,
      exec_mode: 'fork',
      instances: 1,
      env: {
        PORT: 3100 // o site usa 3000; eventos na 3100 (bate com o proxy do .htaccess)
      }
    }
  ]
}
