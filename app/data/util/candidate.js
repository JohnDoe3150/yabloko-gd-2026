import def from '#app/data/def.js?v=13';

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

async function load (i)
{
	var r = await fetch(i);

	if (!r.ok) throw new Error('Network response was not ok');

	return await r.text();
}

export async function obtain ()
{
	if (!data)
	{
		var d = await load(def.url.candidate + `?t=${new Date().getTime()}`);

		d = Papa.parse(d, {
			header: true,
			skipEmptyLines: true,
		});

		data = process(d.data);
	}
	
	return data;
}

export const obtainer = new class
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