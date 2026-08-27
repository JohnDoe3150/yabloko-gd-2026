import def from '#app/data/def.js?v=21';
import controller from '#app/controller.js?v=21';
import util from '#app/util.js?v=21';

export default new class
{
	start ()
	{
		controller.menu.turnOnItem('donate');

		this.initPage();
		
		controller.tg.initLink();
	}

	initPage ()
	{
		$('#main').html
		(`
			<div class=content>
				<div class=article>
					<div class=txt>${util.toH(def.txt.donate_header, 2)}${util.formatTxt(def.txt.donate_txt)}</div>
					<div class=list>
						<a class="link-external btn btn-med" href="${def.url.donate}">${def.txt.donate_url}</a>
					</div>
				</div>
			</div>
		`);
	}
}