# Notas de Segurança - Capsula Pro Saúde

## Implementações Realizadas (Client-Side)

### 1. Content Security Policy (CSP)
Implementamos uma política de segurança de conteúdo via meta tag `<meta http-equiv="Content-Security-Policy">` em `INDEX.html` e `produto1.html`.
- **Objetivo**: Mitigar riscos de XSS (Cross-Site Scripting) e injeção de dados.
- **Política**:
  - `default-src 'self'`: Permite recursos apenas do próprio domínio por padrão.
  - `script-src`: Permite scripts locais e do CDN `cdnjs.cloudflare.com`.
  - `style-src`: Permite estilos locais e fontes do Google.
  - `img-src`: Permite imagens locais, dados em base64 (para o upload de admin) e do domínio de afiliados `ev.braip.com`.

### 2. HTTPS Forçado (Simulação)
Adicionamos um script no cabeçalho de todas as páginas para redirecionar automaticamente de HTTP para HTTPS (exceto em localhost).
- **Objetivo**: Garantir a confidencialidade e integridade dos dados em trânsito.
- **Nota**: Para uma segurança robusta, configure o redirecionamento 301 e HSTS diretamente no servidor (Nginx/Apache/Cloudflare).

### 3. Proteção de Links Externos
Adicionamos `rel="noopener noreferrer"` em todos os links externos do rodapé.
- **Objetivo**: Prevenir "tabnabbing" (onde uma página aberta pode controlar a página de origem).

### 4. Validação e Sanitização
- **Upload de Banners**: O painel administrativo valida o tipo MIME e o tamanho do arquivo antes do processamento.
- **Renderização de Dados**: O código JavaScript utiliza `textContent` em vez de `innerHTML` para renderizar textos de produtos, prevenindo a injeção de HTML malicioso.

## Recomendações para o Servidor (Server-Side)

Como este é um projeto estático, certas medidas devem ser configuradas no nível do servidor de hospedagem (ex: Apache, Nginx):

1.  **Strict-Transport-Security (HSTS)**
    - Configurar o header `Strict-Transport-Security: max-age=31536000; includeSubDomains`.
2.  **X-Frame-Options**
    - Configurar `X-Frame-Options: DENY` ou `SAMEORIGIN` para prevenir ataques de Clickjacking.
3.  **X-Content-Type-Options**
    - Configurar `X-Content-Type-Options: nosniff` para prevenir sniffing de MIME types.
4.  **Rate Limiting**
    - Deve ser configurado no firewall (WAF) ou balanceador de carga (ex: Cloudflare Rate Limiting) para limitar requisições por IP e prevenir força bruta.
5.  **SQL Injection**
    - Como o site é estático e não possui banco de dados conectado diretamente ao frontend, o risco é inexistente na camada atual. Se houver backend futuro, usar Prepared Statements.

## Testes Realizados
- **Navegação**: O redirecionamento HTTPS funciona corretamente.
- **Assets**: Fontes e estilos carregam normalmente sob a nova CSP.
- **Banners**: O upload de banners continua funcional (permitido via `img-src data:`).
