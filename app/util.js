export default new class
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