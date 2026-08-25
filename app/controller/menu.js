import def from '#app/data/def.js?v=14';

export default new class
{
	start ()
	{
		$('#menu').html
		(`
			<div class=content>
				<div class=list>
					<a id=menu-candidate class="menu-item btn btn-med-spacious btn-disa" href="#/candidate">${def.txt.menu_candidate}</a>
					<a id=menu-donate class="menu-item btn btn-med-spacious btn-disa" href="#/donate">${def.txt.menu_donate}</a>
				</div>
			</div>
		`);
		
		return this;
	}
	
	turnOnItem (i)
	{
		$('.menu-item').removeClass('btn-ena');
		
		$('#menu-' + i).addClass('btn-ena');
		
		return this;
	}
}