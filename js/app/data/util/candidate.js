import def from '#app/data/def.js?v=9';

var data = [];

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
	var d = await load(def.url.candidate + `?t=${new Date().getTime()}`);

	d = Papa.parse(d, {
		header: true,
		skipEmptyLines: true,
	});

	d = process(d.data);
	
	return d;
}