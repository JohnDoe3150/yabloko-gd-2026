import controller from '#app/controller.js?v=15';
import router from '#app/router.js?v=15';

export default new class
{
	start ()
	{
		controller.page.start();
		controller.menu.start();
		
		router.start();
	}
}