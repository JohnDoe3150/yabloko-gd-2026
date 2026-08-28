import def from '#app/data/def.js?v=22';

export default new class
{
	start ()
	{
		const st = 'menu-item btn btn-med btn-style-main';
		
		$('#menu').html
		(`
			<div class=content>
				<div class=list>
					<a id=menu-candidate class="${st}" href="#/candidate">${def.txt.menu_candidate}</a>
					<a id=menu-donate class="${st}" href="#/donate">${def.txt.menu_donate}</a>
				</div>
			</div>
		`);
		
		return this;
	}
	
	turnOnItem (i)
	{
		$('.menu-item').removeClass('state-on');
		
		$('#menu-' + i).addClass('state-on');
		
		return this;
	}
}