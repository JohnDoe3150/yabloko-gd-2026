import candidate from '#app/controller/candidate.js?v=29';
import donate from '#app/controller/donate.js?v=29';
import menu from '#app/controller/menu.js?v=29';
import page from '#app/controller/page.js?v=29';
import tg from '#app/controller/tg.js?v=29';

export default new class
{
	candidate = candidate;
	donate = donate;
	menu = menu;
	page = page;
	tg = tg;
}