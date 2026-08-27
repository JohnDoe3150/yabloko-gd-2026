import def from '#app/data/def.js?v=17';

export default new class
{
	start ()
	{
		this
			.initConfig()
			.initSize();
	}
	
	initConfig ()
	{
		const tg = window.Telegram?.WebApp;

		if (tg && this.isValidPlatform(tg.platform)) def.config.tg = true;

		return this;
	}
	
	initSize ()
	{
		if (def.config.tg)
		{
			const tg = window.Telegram.WebApp;
		
			tg.ready();
		
			const full = ['tdesktop'].includes(tg.platform);
		
			if (full) tg.requestFullscreen();
			else tg.expand();
		}
		
		return this;
	}
		
	initLink ()
	{
		if (def.config.tg)
		{
			const tg = window.Telegram.WebApp;

			$('a.link-external').off('click').on('click', (e) =>
			{
				e.preventDefault();

				tg.openLink($(e.target).attr('href'));
			});
		}
		
		return this;
	}
		
	isValidPlatform (i)
	{
		return def.config.tg_platform.includes(i);
	}
}