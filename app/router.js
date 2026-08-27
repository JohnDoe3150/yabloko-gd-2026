//import Navigo from '#lib/navigo.js?v=17';
import controller from '#app/controller.js?v=17';

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