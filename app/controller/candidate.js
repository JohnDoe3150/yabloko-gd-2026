import def from '#app/data/def.js?v=29';
import data from '#app/data/getter/candidate.js?v=29';
import controller from '#app/controller.js?v=29';
import filter from '#app/controller/candidate/filter.js?v=29';
import search from '#app/controller/candidate/search.js?v=29';

function initPage ()
{
	const named = 'role-link btn btn-fix-small btn-style-link';
	const icon = 'role-link btn btn-fix-small btn-style-icon btn-icon-info';

	$('#main').html
	(`
		<div class=content>
			<div id=title>${def.txt.candidate_header}</div>
			<div id=link class=list>
				<a class="${named}" href="${def.link.gosuslugi.url}">${def.link.gosuslugi.txt}</a>
				<a class="${named}" href="${def.link.volunteer.url}">${def.link.volunteer.txt}</a>
				<a class="${named}" href="${def.link.observe.url}">${def.link.observe.txt}</a>
				<a class="${icon}" href="${def.link.candidate.url}"></a>
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