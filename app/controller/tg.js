import def from '#app/data/def.js?v=18';

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

		if (tg && tg.initData)
		{
			def.config.tg = true;
		
			console.log('App : inside tg');
		}
		else console.log('App : not inside tg');

		return this;
	}
	
	initSize ()
	{
		if (def.config.tg)
		{
			const tg = window.Telegram.WebApp;
		
			tg.ready();
		
			const full = def.config.tg_platform_full.includes(tg.platform);
		
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
}