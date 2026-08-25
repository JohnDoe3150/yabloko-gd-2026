import candidate from '#app/controller/candidate.js?v=13';
import donate from '#app/controller/donate.js?v=13';
import menu from '#app/controller/menu.js?v=13';
import page from '#app/controller/page.js?v=13';

export default new class
{
	candidate = candidate;
	donate = donate;
	menu = menu;
	page = page;
}