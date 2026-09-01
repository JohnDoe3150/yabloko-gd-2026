import candidate from '#app/controller/candidate.js?v=30';
import donate from '#app/controller/donate.js?v=30';
import menu from '#app/controller/menu.js?v=30';
import page from '#app/controller/page.js?v=30';
import tg from '#app/controller/tg.js?v=30';

export default new class
{
	candidate = candidate;
	donate = donate;
	menu = menu;
	page = page;
	tg = tg;
}