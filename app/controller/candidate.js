import def from '#app/data/def.js?v=18';
import data from '#app/data/getter/candidate.js?v=18';
import controller from '#app/controller.js?v=18';

export default new class
{
	timer;

	start ()
	{
		controller.menu.turnOnItem('candidate');

		this
			.initPage()
			.initSearch()
			.initData();
		
		controller.tg.initLink();
	}

	initPage ()
	{
		$('#main').html
		(`
			<div class=content>
				<div class=info>
					<div class=txt>${def.txt.candidate_header}</div>
					<div class=list>
						<a class="link-external btn btn-fix-small" href="${def.url.gosuslugi}">${def.txt.gosuslugi}</a>
						<a class="link-external btn btn-fix-small" href="${def.url.volunteer}">${def.txt.volunteer}</a>
						<a class="link-external btn btn-fix-small" href="${def.url.observe}">${def.txt.observe}</a>
						<a class="link-external btn btn-fix-small btn-icon btn-icon-info" href="${def.url.candidate_source}"></a>
					</div>
				</div>
				<div class=search><input id=input class=input type=text id=search placeholder="${def.txt.search_placeholder}"></div>
				<div id=result class=result>
					<div class=msg><div class=loader></div></div>
				</div>
			</div>
		`);

		return this;
	}
	
	initData ()
	{
		data.init(() => this.startSearch());

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
			input = input.toLowerCase();

			if (d)
			{
				for (let i of d) if (this.hasSearchInput(i.search, input)) result.push(i);
			}
			else console.log('Search : No Data');
		}
		else result = d;

		this.viewSearch(result);
		this.afterSearch();
		
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
		if (i.url_about) c += `<a class="link-external btn btn-fix-smaller btn-icon btn-icon-info" href="${i.url_about}"></a>`;

		return c ? `<div class=name>${c}</div>` : '';
	}

	viewSearchItemUrl (i)
	{
		let c = '';

		if (i.url_tg) c += `<a class="btn btn-med" href="${i.url_tg}">${def.txt.url_tg}</a>`;

		return c ? `<div class=list>${c}</div>` : '';
	}
	
	afterSearch ()
	{
		controller.tg.initLink();
	}
	
	////
	/*
	initObservation ()
	{
		//const config = { attributes: true, childList: true, subtree: true };
		const config = {childList: true};

		// Callback function to execute when mutations are observed
		const callback = (mutations, observer) =>
		{
			for (const mutation of mutations)
			{
				if (mutation.type === "childList") controller.tg.initLink();
			}
		};

		const observer = new MutationObserver(callback);

		observer.observe($('#result')[0], config);
	}
	*/
}