import def from '#app/data/def.js?v=22';
import candidate from '#app/data/getter/candidate.js?v=22';
import controller from '#app/controller.js?v=22';

var data = {};

function initFilter ()
{
	data.state = {};
	
	for (let v of candidate.get())
	{
		for (let v1 of def.config.filter)
		{
			if (v[v1]) data.state[v1] = false;
		}
	}
}

function viewFilter ()
{
	var s = '';
	
	for (let k in data.state) s += `<div class="role-filter btn btn-fix-small btn-style-filter" data-id="${k}">${def.txt[k]}</div>`;
	
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
		
		controller.candidate.startSearch();
	});
}

function flipFilterState (i)
{
	if (data.state[i]) return data.state[i] = false;
	else return data.state[i] = true;
}

function considerFilter (i)
{
	for (let k in data.state)
	{
		if (data.state[k])
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