import candidate from '#app/controller/candidate.js?v=20';
import donate from '#app/controller/donate.js?v=20';
import menu from '#app/controller/menu.js?v=20';
import page from '#app/controller/page.js?v=20';
import tg from '#app/controller/tg.js?v=20';

export default new class
{
	candidate = candidate;
	donate = donate;
	menu = menu;
	page = page;
	tg = tg;
}