import def from '#app/data/def.js?v=22';

function initConfig ()
{
	const tg = window.Telegram?.WebApp;

	if (tg && tg.initData)
	{
		def.config.tg_enable = true;

		console.log('App : inside tg');
	}
	else console.log('App : not inside tg');
}

function initSize ()
{
	if (def.config.tg_enable)
	{
		const tg = window.Telegram.WebApp;

		tg.ready();

		const full = def.config.tg_platform_full.includes(tg.platform);

		if (full) tg.requestFullscreen();
		else tg.expand();
	}
}
		
export default new class
{
	start ()
	{
		initConfig()
		initSize();
	}
	

	listenToAllLinks ()
	{
		if (def.config.tg_enable)
		{
			const tg = window.Telegram.WebApp;
		
			$(document).off('click',  'a.role-link').on('click', 'a.role-link', (e) =>
			{
				e.preventDefault();

				tg.openLink($(e.target).attr('href'));
			});
		}
		
		return this;
	}
}