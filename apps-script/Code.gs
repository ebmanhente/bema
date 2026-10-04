const GROUP_EMAIL = 'professores@aeaf.edu.pt';

function doGet() {
  const email = Session.getActiveUser().getEmail();
  if (!email) {
    return HtmlService.createHtmlOutput('<h2>É necessário iniciar sessão com a conta institucional.</h2>');
  }

  let allowed = false;
  try {
    const group = GroupsApp.getGroupByEmail(GROUP_EMAIL);
    allowed = group.hasUser(email);
  } catch (err) {
    return HtmlService.createHtmlOutput(
      '<h2>Não foi possível validar o grupo de professores.</h2>' +
      '<p>Verifique a configuração do Google Apps Script e do grupo.</p>'
    );
  }

  if (!allowed) {
    return HtmlService.createHtmlOutput(
      '<h2>Acesso reservado a professores</h2>' +
      '<p>A conta <strong>' + escapeHtml_(email) + '</strong> não pertence ao grupo autorizado.</p>'
    );
  }

  return HtmlService.createTemplateFromFile('Professores').evaluate()
    .setTitle('BEMA — Área reservada a professores')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function escapeHtml_(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
