import def from '#app/data/def.js?v=28';
import controller from '#app/controller.js?v=28';
import router from '#app/router.js?v=28';

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