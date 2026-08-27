import controller from '#app/controller.js?v=16';
import router from '#app/router.js?v=16';

export default new class
{
	start ()
	{
		controller.tg.start();
		controller.page.start();
		controller.menu.start();
		
		router.start();
	}
}