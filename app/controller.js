import candidate from '#app/controller/candidate.js?v=23';
import donate from '#app/controller/donate.js?v=23';
import menu from '#app/controller/menu.js?v=23';
import page from '#app/controller/page.js?v=23';
import tg from '#app/controller/tg.js?v=23';

export default new class
{
	candidate = candidate;
	donate = donate;
	menu = menu;
	page = page;
	tg = tg;
}