<?php

// Vai no docroot do subdomínio eventos.paintgobrasil.com (public_html do subdomínio).
// Token lido de arquivo fora do webroot — nunca hardcoded aqui.
// Criar no servidor: echo 'SEU_TOKEN' > ~/.deploy_token_eventos && chmod 600 ~/.deploy_token_eventos
$serverUser = basename(trim((string) shell_exec('whoami')));
$serverHome = ($serverUser === 'root') ? '/root' : '/home/' . $serverUser;
$tokenFile   = $serverHome . '/.deploy_token_eventos';
$secret_token = file_exists($tokenFile) ? trim(file_get_contents($tokenFile)) : '';

$request_token = isset($_GET['token']) ? trim($_GET['token']) : '';

if ($secret_token === '' || !hash_equals($secret_token, $request_token)) {
    header('HTTP/1.0 403 Forbidden');
    die('Acesso Negado: Token invalido');
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('HTTP/1.0 405 Method Not Allowed');
    die('Apenas requisicoes POST sao aceitas.');
}

$deployDir = $serverHome . '/paintgo-eventos';

if (!isset($_FILES['package']) || $_FILES['package']['error'] !== UPLOAD_ERR_OK) {
    header('HTTP/1.0 400 Bad Request');
    die('ERRO: Nenhum arquivo enviado ou erro no upload.');
}

if (pathinfo($_FILES['package']['name'], PATHINFO_EXTENSION) !== 'zip') {
    header('HTTP/1.0 400 Bad Request');
    die('ERRO: Apenas arquivos .zip sao aceitos.');
}

$zipFile = sys_get_temp_dir() . '/deploy_eventos_' . uniqid('', true) . '.zip';

if (!move_uploaded_file($_FILES['package']['tmp_name'], $zipFile)) {
    header('HTTP/1.0 500 Internal Server Error');
    die('ERRO: Falha ao mover o arquivo enviado.');
}

$zip = new ZipArchive;
if ($zip->open($zipFile) !== TRUE) {
    unlink($zipFile);
    header('HTTP/1.0 500 Internal Server Error');
    die('ERRO: Nao foi possivel abrir o arquivo ZIP.');
}

$zip->extractTo($deployDir);
$zip->close();
unlink($zipFile);

echo "SUCESSO: Deploy realizado. Aguardando reinicio manual do PM2 (pm2 restart paintgo-eventos).";
