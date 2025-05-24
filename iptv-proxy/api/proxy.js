import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) {
    res.status(400).json({ error: "Parâmetro 'url' é obrigatório." });
    return;
  }

  // Segurança básica: só permite URLs do domínio florentix.com
  if (!url.includes('florentix.com')) {
    res.status(403).json({ error: "URL não autorizada." });
    return;
  }

  try {
    const response = await fetch(url);
    const data = await response.text();

    // Tenta enviar como JSON se possível
    try {
      const json = JSON.parse(data);
      res.status(200).json(json);
    } catch {
      res.status(200).send(data);
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar URL: ' + error.message });
  }
}
