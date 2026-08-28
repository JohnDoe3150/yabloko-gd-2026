//import Navigo from '#lib/navigo.js?v=27';
import controller from '#app/controller.js?v=27';

export default new class
{
	start ()
	{
		const router = new Navigo('/', {hash: true});

		router
			.on('/candidate', () => controller.candidate.start())
			.on('/donate', () => controller.donate.start())
			.notFound(() => router.navigate('/candidate'))
			.resolve();
	}
}