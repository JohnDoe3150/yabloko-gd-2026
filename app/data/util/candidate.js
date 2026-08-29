import def from '#app/data/def.js?v=28';

var data;

function process (d)
{
	d.map((i) =>
	{
		i.name = i.name.toLowerCase();
		i.search = (i.num + i.name + i.region + i.district).replaceAll(' ', '').toLowerCase();
	});

	return d;
}

function getUrl ()
{
	if (def.config.app_data_external_enable)
	{
		if (def.config.app_test_enable)
		{
			var id = def.data.candidate_external_test[0];
			var sheet = def.data.candidate_external_test[1];
		}
		else
		{
			var id = def.data.candidate_external[0];
			var sheet = def.data.candidate_external[1];
		}

		var url = `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:csv&sheet=${sheet}`;

		return addTimeParam(url, true);
	}
	else
	{
		if (def.config.app_test_enable) var url = def.data.candidate_internal_test;
		else var url = def.data.candidate_internal;

		return addTimeParam(url);
	}
}

function addTimeParam (url, add)
{
	const t = `t=${new Date().getTime()}`;
	
	return url + (add ? def.symb.ampersand : def.symb.question) + t;
}
	
async function load (i)
{
	var r = await fetch(i);

	if (!r.ok) throw new Error('Network response was not ok');

	return await r.text();
}

async function obtain ()
{
	if (!data)
	{
		var d = await load(getUrl());

		d = Papa.parse(d, {
			header: true,
			skipEmptyLines: true,
		});

		data = process(d.data);
	}
	
	return data;
}

export default new class
{
	async init (callback)
	{
		obtain().then(() => callback());
	}
	
	get ()
	{
		return data;
	}
}