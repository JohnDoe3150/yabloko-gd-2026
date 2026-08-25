import candidate from '#app/controller/candidate.js?v=14';
import donate from '#app/controller/donate.js?v=14';
import menu from '#app/controller/menu.js?v=14';
import page from '#app/controller/page.js?v=14';

export default new class
{
	candidate = candidate;
	donate = donate;
	menu = menu;
	page = page;
}