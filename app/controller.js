import candidate from '#app/controller/candidate.js?v=21';
import donate from '#app/controller/donate.js?v=21';
import menu from '#app/controller/menu.js?v=21';
import page from '#app/controller/page.js?v=21';
import tg from '#app/controller/tg.js?v=21';

export default new class
{
	candidate = candidate;
	donate = donate;
	menu = menu;
	page = page;
	tg = tg;
}