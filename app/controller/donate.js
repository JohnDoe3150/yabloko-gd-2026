import def from '#app/data/def.js?v=29';
import controller from '#app/controller.js?v=29';
import util from '#app/util.js?v=29';

export default new class
{
	start ()
	{
		controller.menu.turnOnItem('donate');

		this.initPage();
		
		controller.tg.listenToAllLinks();
	}

	initPage ()
	{
		$('#main').html
		(`
			<div class=content>
				<div class=article>
					<div class=txt>${util.toH(def.txt.donate_header, 2)}${util.formatTxt(def.txt.donate_txt)}</div>
					<div class=list>
						<a class="role-link btn btn-med btn-style-link" href="${def.link.donate.url}">${def.link.donate.txt}</a>
					</div>
				</div>
			</div>
		`);
	}
}