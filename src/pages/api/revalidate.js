import config from '@/config.json';

export default async function handler(req, res) {
	if (req.query.secret !== config.revalidatetoken) {
		return res.status(401).json({ message: 'Invalid token' });
	}

	try {
		await res.revalidate('/ticks');
		return res.json({ revalidated: true });
	} catch (err) {
		console.log(err);
		return res.status(500).send('Error revalidating');
	}
}
