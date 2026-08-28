import def from '#app/data/def.js?v=25';

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
	if (def.config.app_test_enable) return addTimeParam(def.url.candidate_data_test);
	{
		if (def.config.candidate_data_google_enable)
		{
			const id = def.url.candidate_data_google
			const name = 'Data';
			const url = `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:csv&sheet=${name}`
			
			return addTimeParam(url, true);
		}
		else return addTimeParam(def.url.candidate_data);
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