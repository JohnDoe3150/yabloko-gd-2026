import candidate from '#app/controller/candidate.js?v=9';
import donate from '#app/controller/donate.js?v=9';
import menu from '#app/controller/menu.js?v=9';
import page from '#app/controller/page.js?v=9';

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