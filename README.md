# Área reservada a professores — BEMA

Esta versão prepara a página `professores.html` para autenticação através de um Google Apps Script.

## Porque esta solução

O site BEMA continua alojado no GitHub Pages, mas a validação do acesso acontece fora do HTML público. O Apps Script pode ser publicado como web app restrito ao domínio e executar como o utilizador que está a aceder; o serviço Google Groups permite verificar se esse utilizador pertence ao grupo de professores.

Documentação oficial:
- https://developers.google.com/apps-script/guides/web
- https://developers.google.com/apps-script/reference/groups

## O que falta configurar

1. Criar um projeto Google Apps Script.
2. Colocar o código de `apps-script/Code.gs` e `appsscript.json` no projeto.
3. Substituir `professores@aeaf.edu.pt` pelo endereço real do grupo.
4. Publicar como Web App, limitado ao domínio `aeaf.edu.pt`.
5. Copiar o URL `/exec` do Web App para o `href` do botão `Entrar com Google` em `professores.html`, substituindo `COLOCAR_AQUI_O_URL_DO_WEB_APP`.

## Nota de segurança

Não colocar a lista de emails dos professores em JavaScript, HTML ou ficheiros públicos do GitHub.

A página pública apenas inicia o processo. A autorização deve ocorrer no Apps Script/Google, antes de servir o conteúdo reservado.
