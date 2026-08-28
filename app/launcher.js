import def from '#app/data/def.js?v=26';
import controller from '#app/controller.js?v=26';
import router from '#app/router.js?v=26';

export default new class
{
	start ()
	{
		if (def.config.app_launch_enable)
		{
			controller.tg.start();
			controller.page.start();
			controller.menu.start();

			router.start();
		}
	}
}