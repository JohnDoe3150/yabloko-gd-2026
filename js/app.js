class App
{
	URL_DATA = '/data/people.csv';
	URL_SOURCE = 'https://www.yabloko.ru/okruga-gd-2026';

	TXT_SEARCH_PLACEHOLDER = 'Поиск Кандидатов';
	TXT_PAGE_TITLE = 'Яблоко - Выборы в ГД 2026';
	TXT_INFO = 'Кандидаты от Яблоко на Выборы в Государственную Думу 2026 Года';
	TXT_UTL_TG = 'Телеграм';
	TXT_UTL_SOURCE = 'Источник';
	TXT_NUM = 'Округ';
	TXT_EMPTY = 'Нет Кандидатов, Соответствующих Поисковому Запросу';

	TIMER_TIME = 1000;

	data = [];
	timer;

	constructor ()
	{
		this
			.initData()
			.initPage()
			.initSearch();
	}
	
	initPage ()
	{
		$(document).prop('title', this.TXT_PAGE_TITLE);

		$('body').html
		(`
			<div class=content>
				<div class=info>
					<div class=txt>${this.TXT_INFO}</div>
					<div class=list>
						<a class=btn href="${this.URL_SOURCE}">${this.TXT_UTL_SOURCE}</a>
					</div>
				</div>
				<div class=search><input id=input class=input type=text id=search placeholder="${this.TXT_SEARCH_PLACEHOLDER}"></div>
				<div id=result class=result></div>
			</div>
		`);
		
		return this;
	}

	initData ()
	{
		var that = this;
		
		this.getData().then((d) => 
		{
			d.map((i) =>
			{
				i.name = i.name.toLowerCase();
				i.search = (i.num + i.name + i.region + i.district).replaceAll(' ', '').toLowerCase();
			});

			that.data = d;
			
			if (!that.timer) that.viewAllData();
		});

		return this;
	}

	initSearch ()
	{
		var that = this;

		$('#input').on('input', function ()
		{
			let d = $(this).val();
			
			clearTimeout(that.timer);

			that.timer = setTimeout((d) => that.startSearch(d), that.TIMER_TIME, d);
		});
		
		$('#input').on('keydown', function(e)
		{
			if (e.key === 'Escape') that.resetSearch();
		});
		
		return this;
	}

	resetSearch ()
	{
		$('#input').val('');

		clearTimeout(this.timer);

		this.viewAllData();
	}

	startSearch (input)
	{
		if (input)
		{
			var result = [];

			input = input.toLowerCase();

			if (this.data)
			{
				for (let i of this.data) if (this.hasSearchInput(i.search, input)) result.push(i);
			}
			else console.log('Search : No Data');
			
			this.viewSearch(result);
		}
		else this.viewAllData();
	}

	hasSearchInput (search, needle)
	{
		var o = needle.split(' ');
		
		for (let i of o) if (!search.includes(i)) return false

		return true;
	}
		
	viewSearch (d)
	{
		var c = '';
		
		for (let i of d) c += this.viewSearchItem(i);
		
		if (!c) c = `<div class=msg>${this.TXT_EMPTY}</div>`;
		
		$('#result').html(c);
	}

	viewSearchItem (i)
	{
		let c = '';
		
		c += (
			`<div class=item>
				<div class=num>${i.num} ${this.TXT_NUM}</div>
				<div class=region>${i.region}</div>
				<div class=district>${i.district}</div>
				<div class=hr><hr></div>
				<div class=name>${i.name}</div>
				<div class=desc>${i.desc}</div>
				${this.viewSearchItemUrl(i)}
			</div>`
		);
		
		return c;
	}

	viewSearchItemUrl (i)
	{
		let c = '';
		
		if (i.url_tg) c += `<a class=btn href="${i.url_tg}">${this.TXT_UTL_TG}</a>`;
		
		return c ?  `<div class=list>${c}</div>` : '';
	}

	viewAllData ()
	{
		this.viewSearch(this.data);
	}

	async getData ()
	{
		let url = this.URL_DATA + `?t=${new Date().getTime()}`;
		
		const r = await fetch(url);
		
		if (!r.ok) throw new Error('Network response was not ok');
		
		const t = await r.text();
		
		var d = Papa.parse(t, {
			header: true,
			skipEmptyLines: true
		});
		
		return d.data;
	}

	async getData1 ()
	{
		try {
			// 1. Append a timestamp to the URL to bypass browser caching
			const fileUrl = this.URL_DATA + `?t=${new Date().getTime()}`;

			// 2. Fetch the file from the server as an ArrayBuffer
			const response = await fetch(fileUrl);
			
			if (!response.ok) throw new Error('Network response was not ok');

			const arrayBuffer = await response.arrayBuffer();

			// 3. Convert ArrayBuffer into a Uint8Array for SheetJS processing
			//console.log(arrayBuffer);
			const data = new Uint8Array(arrayBuffer);

			// 4. Parse the Excel file data
			const workbook = XLSX.read(data);
			//const workbook = XLSX.read(data, {type: 'array',  codepage: 1251 });
			//const workbook = XLSX.read(data, {type: 'array'});
			//const workbook = XLSX.read(data, { type: "binary", codepage: 1251 });
			//const workbook = XLSX.read(data, { codepage: 1251 });

			// 5. Target the first sheet and convert it to JSON
			const firstSheetName = workbook.SheetNames[0];
			const worksheet = workbook.Sheets[firstSheetName];
			const jsonData = XLSX.utils.sheet_to_json(worksheet);
			//console.log(jsonData);
			//console.log("Successfully reloaded Excel data:", jsonData);
			return jsonData;
		} catch (error) {
			console.error("Failed to reload Excel file:", error);
		}
	}
}