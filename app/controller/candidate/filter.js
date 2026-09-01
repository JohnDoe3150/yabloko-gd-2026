import def from '#app/data/def.js?v=30';
import data from '#app/data/getter/candidate.js?v=30';
import controller from '#app/controller.js?v=30';

var curr = {};

function initFilter ()
{
	curr.filter = {};
	
	for (let k in def.filter)
	{
		if (def.filter[k].enable)
		{
			curr.filter[k] = structuredClone(def.filter[k]);
			curr.filter[k].id = k;
		}
	}
}

function viewFilter ()
{
	var s = '';
	
	for (let k in curr.filter)
	{
		let i = curr.filter[k];
		let desc = i.desc ? `title="${i.desc}"` : '';
		
		s += `<div class="role-filter btn btn-fix-small btn-style-filter" ${desc} data-id="${i.id}">${i.txt}</div>`;
	}
	
	if (s)
	{
		$('#search').after(`<div id=filter class=list>${s}</div>`);
	}
}

function listenToAllFilters ()
{
	$(document).off('click',  '.role-filter').on('click', '.role-filter', (e) =>
	{
		const id = $(e.target).attr('data-id');
		
		if (flipFilterState(id)) $(e.target).addClass('state-on');
		else $(e.target).removeClass('state-on');
		
		controller.candidate.search.startSearch();
	});
}

function flipFilterState (i)
{
	if (curr.filter[i].state) return curr.filter[i].state = false;
	else return curr.filter[i].state = true;
}

function considerFilter (i)
{
	for (let k in curr.filter)
	{
		var o = curr.filter[k];
		
		if (o.state)
		{
			if (o.type == 'pos')
			{
				if (!i[o.field]) return false;
			}
			else if (o.type == 'neg')
			{
				if (i[o.field]) return false;
			}
		}
	}

	return true;
}

export default new class
{
	start ()
	{
		if (def.config.filter_enable)
		{
			initFilter();
			viewFilter();
			listenToAllFilters();
		}
	}
	
	filterData (d)
	{
		if (def.config.filter_enable) return d.filter(considerFilter);
		else return d;
	}
}