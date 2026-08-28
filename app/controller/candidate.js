import def from '#app/data/def.js?v=22';
import data from '#app/data/getter/candidate.js?v=22';
import controller from '#app/controller.js?v=22';
import filter from '#app/controller/candidate/filter.js?v=22';

export default new class
{
	filter = filter;

	timer;
	search = {};

	start ()
	{
		controller.menu.turnOnItem('candidate');

		this
			.initPage()
			.initSearch()
			.initData();
		
		controller.tg.listenToAllLinks();
	}

	initPage ()
	{
		const named = 'role-link btn btn-fix-small btn-style-link';
		const icon = 'role-link btn btn-fix-small btn-style-icon btn-icon-info';
		
		$('#main').html
		(`
			<div class=content>
				<div id=title>${def.txt.candidate_header}</div>
				<div id=link class=list>
					<a class="${named}" href="${def.url.gosuslugi}">${def.txt.gosuslugi}</a>
					<a class="${named}" href="${def.url.volunteer}">${def.txt.volunteer}</a>
					<a class="${named}" href="${def.url.observe}">${def.txt.observe}</a>
					<a class="${icon}" href="${def.url.candidate_source}"></a>
				</div>
				<div id=search><input id=input class=input type=text placeholder="${def.txt.search_placeholder}"></div>
				<div id=result>
					<div class=container>
						<div class=loader></div>
					</div>
				</div>
			</div>
		`);

		return this;
	}
	
	initData ()
	{
		data.init(() =>
		{
			this.filter.start();
			this.startSearch();
		});

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

		d = this.filter.filterData(d);

		if (input)
		{
			input = input.toLowerCase();
			
			d = d.filter((i) => this.hasSearchInput(i.search, input));
		}

		this.viewSearch(d);
		
		return this;
	}

	hasSearchInput (search, needle)
	{
		var o = needle.split(' ');

		for (let i of o) if (!search.includes(i)) return false

		return true;
	}
	
	////

	viewSearch (d)
	{
		var c = '';

		for (let i of d) c += this.viewSearchItem(i);

		if (!c) c = `<div class=container><div class=msg>${def.txt.empty}</div></div>`;

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
		if (i.url_about) c += `<a class="role-link btn btn-fix-smaller btn-style-icon btn-icon-info" href="${i.url_about}"></a>`;

		return c ? `<div class=name>${c}</div>` : '';
	}

	viewSearchItemUrl (i)
	{
		let c = '';
		let st = 'role-link btn btn-med btn-style-link';
		
		if (i.url_money) c += `<a class="${st}" href="${i.url_money}">${def.txt.url_money}</a>`;
		if (i.url_tg) c += `<a class="${st}" href="${i.url_tg}">${def.txt.url_tg}</a>`;

		return c ? `<div class=list>${c}</div>` : '';
	}
}