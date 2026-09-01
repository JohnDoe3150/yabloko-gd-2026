import def from '#app/data/def.js?v=29';
import data from '#app/data/getter/candidate.js?v=29';
import controller from '#app/controller.js?v=29';

var curr = {};

function initSearch ()
{
	$('#input').on('input', () => startSearchWithTimeout());

	$('#input').on('keydown', function(e)
	{
		if (e.key === 'Escape') resetSearch();
		else if (e.key === 'Enter') startSearch();
	});
}

function startSearchWithTimeout (fast)
{
	showLoader();

	clearTimeout(curr.timer);

	curr.timer = setTimeout(startSearch, calcSearchTimeout(fast));
}

function calcSearchTimeout (fast)
{
	return fast ? def.config.search_timeout_fast : def.config.search_timeout;
}

function startSearch ()
{
	curr.search = {};
	
	showLoader();
	
	clearTimeout(curr.timer);

	var result = [];
	var input = $('#input').val();
	var d = data.get();

	d = controller.candidate.filter.filterData(d);

	if (input)
	{
		input = input.toLowerCase();

		d = d.filter((i) => hasSearchInput(i.search, input));
	}

	viewSearch(d);
}

function resetSearch ()
{
	$('#input').val('');

	startSearch();
}

////

function hasSearchInput (search, needle)
{
	var o = needle.split(' ');

	for (let i of o) if (!search.includes(i)) return false

	return true;
}

////

function viewSearch (d)
{
	var c = '';

	for (let i of d) c += viewSearchItem(i);

	if (c) curr.search.state = 'some';
	else
	{
		c = `<div class=container><div class=txt>${def.txt.search_empty}</div></div>`;
		
		curr.search.state = 'empty';
	}

	$('#result').html(c);
}

function viewSearchItem (i)
{
	let c = '';

	c += (
		`<div class=item>
			<div class=num>${i.num} ${def.txt.num}</div>
			<div class=region>${i.region}</div>
			<div class=district>${i.district}</div>
			<div class=hr><hr></div>
			<div class=name>${i.name}</div>
			<div class=desc>${i.desc}</div>
			${viewSearchItemOfUrl(i)}
		</div>`
	);

	return c;
}

function viewSearchItemOfUrl (i)
{
	let c = '';
	let named = 'role-link btn btn-fix-med btn-style-link';
	let named_neg = 'role-link btn btn-fix-med btn-style-link btn-mood-neg';
	let icon = 'role-link btn btn-fix-med btn-style-icon btn-icon-info';

	if (i.url_removed) c += `<a class="${named_neg}" href="${i.url_removed}">${def.txt.url_removed}</a>`;
	if (i.url_money) c += `<a class="${named}" href="${i.url_money}">${def.txt.url_money}</a>`;
	if (i.url_tg) c += `<a class="${named}" href="${i.url_tg}">${def.txt.url_tg}</a>`;
	if (i.url_about) c += `<a class="${icon}" href="${i.url_about}"></a>`;

	return c ? `<div class=list>${c}</div>` : '';
}

////

function showLoader ()
{
	if ($('#result').has('.container.for-loader').length == 0) $('#result').html('<div class="container for-loader"><div class=block><div class=loader></div></div></div>');
}

////

export default new class
{

	init ()
	{
		initSearch();
	}
	
	start ()
	{
		startSearch();
	}
	
	startSearch (fast)
	{
		startSearchWithTimeout(fast);
	}
	
	showLoader ()
	{
		showLoader();
	}
}