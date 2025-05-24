export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing URL parameter' });
  }

  try {
    const response = await fetch(url);
    const data = await response.text(); // ou .json() se tiver certeza do formato
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados', detail: error.message });
  }
}
