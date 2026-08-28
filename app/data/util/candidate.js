import def from '#app/data/def.js?v=23';

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
	const i = def.config.app_test_enable ? def.url.candidate_data_test : def.url.candidate_data;
	
	return i + `?t=${new Date().getTime()}`;
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