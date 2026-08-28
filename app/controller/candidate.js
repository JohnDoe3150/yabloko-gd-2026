import def from '#app/data/def.js?v=26';
import data from '#app/data/getter/candidate.js?v=26';
import controller from '#app/controller.js?v=26';
import filter from '#app/controller/candidate/filter.js?v=26';
import search from '#app/controller/candidate/search.js?v=26';

function initPage ()
{
	const named = 'role-link btn btn-fix-small btn-style-link';
	const icon = 'role-link btn btn-fix-small btn-style-icon btn-icon-info';

	$('#main').html
	(`
		<div class=content>
			<div id=title>${def.txt.candidate_header}</div>
			<div id=link class=list>
				<a class="${named}" href="${def.url.gosuslugi}">${def.txt.gosuslugi}</a>
				<a class="${named}" href="${def.url.volunteer}">${def.txt.volunteer}</a>
				<a class="${named}" href="${def.url.observe}">${def.txt.observe}</a>
				<a class="${icon}" href="${def.url.candidate_source}"></a>
			</div>
			<div id=search><input id=input class=input type=text placeholder="${def.txt.search_placeholder}"></div>
			<div id=result></div>
		</div>
	`);

	return this;
}

function initData ()
{
	data.init(() =>
	{
		filter.start();
		search.start();
	});

	return this;
}

export default new class
{
	filter = filter;
	search = search;

	start ()
	{
		controller.menu.turnOnItem('candidate');

		initPage();
		
		this.search.init();
		this.search.showLoader();
		
		initData();
		
		controller.tg.listenToAllLinks();
	}
}