import candidate from '#app/controller/candidate.js?v=8';
import donate from '#app/controller/donate.js?v=8';
import menu from '#app/controller/menu.js?v=8';
import page from '#app/controller/page.js?v=8';

export default new class
{
	constructor ()
	{
		this.page.start();
		this.menu.start();
	}
	
	candidate = candidate;
	donate = donate;
	menu = menu;
	page = page;
}