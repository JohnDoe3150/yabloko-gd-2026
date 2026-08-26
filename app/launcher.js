import controller from '#app/controller.js?v=15';
import router from '#app/router.js?v=15';

export default new class
{
	start ()
	{
		this.tg()
		
		controller.page.start();
		controller.menu.start();
		
		router.start();
	}
	
	tg ()
	{
		const tg = window.Telegram?.WebApp;

		if (tg)
		{
			tg.ready();
			tg.expand();
		
			const desktop = ['tdesktop'].includes(tg.platform);
		
			if (desktop) tg.requestFullscreen();
		}
	}
}