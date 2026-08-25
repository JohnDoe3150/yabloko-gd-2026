import candidate from '#app/controller/candidate.js?v=15';
import donate from '#app/controller/donate.js?v=15';
import menu from '#app/controller/menu.js?v=15';
import page from '#app/controller/page.js?v=15';

export default new class
{
	candidate = candidate;
	donate = donate;
	menu = menu;
	page = page;
}