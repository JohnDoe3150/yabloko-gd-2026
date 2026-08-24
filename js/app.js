import def from './../data/def.json?v=7' with {type: 'json'};

const util = new class
{
	formatTxt (i)
	{
		if (Array.isArray(i)) 
		{
			var s = '';
			
			for (let e of i) s += `<p>${e}</p>`;
			
			return s;
		}
		else return i;
	}
	
	toH (i, n = 1)
	{
		return `<h${n}>${i}</h${n}>`;
	}
}

const data = new class
{
	obtained = false;
	data = [];

	init (callback)
	{
		if (this.obtained) callback();
		else
		{
			var that = this;
			
			this.obtainData().then((d) => 
			{
				d.map((i) =>
				{
					i.name = i.name.toLowerCase();
					i.search = (i.num + i.name + i.region + i.district).replaceAll(' ', '').toLowerCase();
				});

				that.data = d;
				that.obtained = true;
				
				callback();
			});
		}
	}

	async obtainData ()
	{
		let url = def.url.people + `?t=${new Date().getTime()}`;
		
		const r = await fetch(url);
		
		if (!r.ok) throw new Error('Network response was not ok');
		
		const t = await r.text();
		
		var d = Papa.parse(t, {
			header: true,
			skipEmptyLines: true
		});
		
		return d.data;
	}

	get ()
	{
		return this.data;
	}
}

const view = new class
{
	page ()
	{
		$('body').html
		(`
			<div id=menu></div>
			<div id=main></div>
		`);
		
		return this;
	}
	
	menu ()
	{
		$('#menu').html
		(`
			<div class=content>
				<div class=list>
					<a id=menu-candidate class="menu-item btn btn-big btn-disa" href="#/candidate">${def.txt.menu_candidate}</a>
					<a id=menu-donate class="menu-item btn btn-big btn-disa" href="#/donate">${def.txt.menu_donate}</a>
				</div>
			</div>
		`);
		
		return this;
	}
	
	menuItem (i)
	{
		$('.menu-item').removeClass('btn-ena');
		
		$('#menu-' + i).addClass('btn-ena');
		
		return this;
	}
};

const page = new class
{
	constructor ()
	{
		view
			.page()
			.menu();
	}
	
	candidate = new class
	{
		timer;
		
		start ()
		{
			view.menuItem('candidate');
			
			this
				.initPage()
				.initData()
				.initSearch();
		}
		
		initPage ()
		{
			$('#main').html
			(`
				<div class=content>
					<div class=info>
						<div class=txt>${def.txt.candidate_header}</div>
						<div class=list>
							<a class="btn btn-small" href="${def.url.candidate_source}">${def.txt.url_source}</a>
						</div>
					</div>
					<div class=search><input id=input class=input type=text id=search placeholder="${def.txt.search_placeholder}"></div>
					<div id=result class=result></div>
				</div>
			`);
			
			return this;
		}
		
		initData ()
		{
			data.init(() => this.resetSearch());
			
			return this;
		}
		
		initSearch ()
		{
			var that = this;

			$('#input').on('input', function ()
			{
				clearTimeout(that.timer);

				that.timer = setTimeout(() => that.startSearch(), def.config.timer_time);
			});

			$('#input').on('keydown', function(e)
			{
				if (e.key === 'Escape') that.resetSearch();
				else if (e.key === 'Enter') that.startSearch();
			});

			return this;
		}

		resetSearch ()
		{
			$('#input').val('');

			this.startSearch();
		}

		startSearch ()
		{
			clearTimeout(this.timer);
			
			var result = [];
			var input = $('#input').val();
			var d = data.get();
			
			if (input)
			{
				var result = [];

				input = input.toLowerCase();

				if (d)
				{
					for (let i of d) if (this.hasSearchInput(i.search, input)) result.push(i);
				}
				else console.log('Search : No Data');

				this.viewSearch(result);
			}
			else result = d;
			
			this.viewSearch(result);
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

			if (!c) c = `<div class=msg>${def.txt.empty}</div>`;

			$('#result').html(c);
		}

		viewSearchItem (i)
		{
			let c = '';

			c += (
				`<div class=item>
					<div class=num>${i.num} ${def.txt.num}</div>
					<div class=region>${i.region}</div>
					<div class=district>${i.district}</div>
					<div class=hr><hr></div>
					${this.viewSearchItemName(i)}
					<div class=desc>${i.desc}</div>
					${this.viewSearchItemUrl(i)}
				</div>`
			);

			return c;
		}

		viewSearchItemName (i)
		{
			let c = '';

			if (i.name) c += `<div class=txt>${i.name}</div>`;
			if (i.url_about) c += `<a class="btn btn-icon" href="${i.url_about}"></a>`;

			return c ? `<div class=name>${c}</div>` : '';
		}

		viewSearchItemUrl (i)
		{
			let c = '';

			if (i.url_tg) c += `<a class="btn btn-med" href="${i.url_tg}">${def.txt.url_tg}</a>`;

			return c ? `<div class=list>${c}</div>` : '';
		}

		viewAllData ()
		{
			this.viewSearch(data.get());
		}
	}
	
	donate = new class
	{
		start ()
		{
			view.menuItem('donate');
			
			this.initPage();
		}
		
		initPage ()
		{
			$('#main').html
			(`
				<div class=content>
					<div class=article>
						<div class=txt>${util.toH(def.txt.donate_header, 2)}${util.formatTxt(def.txt.donate_txt)}</div>
						<div class=list>
							<a class="btn btn-med" href="${def.url.donate}">${def.txt.donate_url}</a>
						</div>
					</div>
				</div>
			`);
			
			return this;
		}
	}
}

const router = new class
{
	start ()
	{
		const router = new Navigo('/', {hash: true});
		
		router
			.on('/candidate', () => page.candidate.start())
			.on('/donate', () => page.donate.start())
			.notFound(() => router.navigate('/candidate'))
			.resolve();
	}
}

export function start ()
{
	router.start();
}