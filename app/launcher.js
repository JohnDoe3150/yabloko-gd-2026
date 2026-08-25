import controller from '#app/controller.js?v=13';
import router from '#app/router.js?v=13';

export default new class
{
	start ()
	{
		controller.page.start();
		controller.menu.start();
		
		router.start();
	}
}