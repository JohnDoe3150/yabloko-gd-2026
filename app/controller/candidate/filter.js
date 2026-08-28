import def from '#app/data/def.js?v=24';
import data from '#app/data/getter/candidate.js?v=24';
import controller from '#app/controller.js?v=24';

var curr = {};

function initFilter ()
{
	curr.state = {};
	
	for (let v of data.get())
	{
		for (let v1 of def.config.filter)
		{
			if (v[v1]) curr.state[v1] = false;
		}
	}
}

function viewFilter ()
{
	var s = '';
	
	for (let k in curr.state) s += `<div class="role-filter btn btn-fix-small btn-style-filter" data-id="${k}">${def.txt[k]}</div>`;
	
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
		
		controller.candidate.search.start();
	});
}

function flipFilterState (i)
{
	if (curr.state[i]) return curr.state[i] = false;
	else return curr.state[i] = true;
}

function considerFilter (i)
{
	for (let k in curr.state)
	{
		if (curr.state[k])
		{
			if (!i[k]) return false;
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