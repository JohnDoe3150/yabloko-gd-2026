import candidate from '#app/controller/candidate.js?v=17';
import donate from '#app/controller/donate.js?v=17';
import menu from '#app/controller/menu.js?v=17';
import page from '#app/controller/page.js?v=17';
import tg from '#app/controller/tg.js?v=17';

export default new class
{
	candidate = candidate;
	donate = donate;
	menu = menu;
	page = page;
	tg = tg;
}