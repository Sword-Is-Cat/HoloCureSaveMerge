/**
 * 
 */
let data;

$(function() {

	drawScreen();

	$('input[type=file]').on('change', function() {

		var fr = new FileReader();
		fr.onload = function() {

			parseData(fr.result);
			showData();
		}

		fr.readAsText(this.files[0]);
	});

	$('#download').on('click', function() {

		update();

	});

	$('input[type=number]').attr('min', 0).attr('max', 999);
	$('#holoCoins').attr('max', 1000000);

});

function drawScreen() {

	const $body = document.querySelector('tbody');

	let $tr, $th, $td;
	let $tr1, $tr2, $input, $option, $span;

	// CODE LINE create
	$tr = newChild('tr', $body);

	$th = newChild('th', $tr);
	$th.innerText = 'CODE';

	$td = newChild('td', $tr);
	$td.setAttribute('colspan', 7);
	$td.setAttribute('id', 'code');
	// !CODE LINE create

	// UPGRADE create
	$tr = newChild('tr', $body);

	$th = newChild('th', $tr);
	$th.setAttribute('colspan', 8);
	$th.innerText = 'UPGRADE';

	for (let idx = 0; idx < keys.upg.length; idx++) {

		let arr = keys.upg[idx];
		let key = arr[0];
		let cnt = arr[1];

		if (idx % 8 == 0) {
			$tr1 = newChild('tr', $body);
			$tr2 = newChild('tr', $body);
		}

		$th = newChild('th', $tr1);
		$td = newChild('td', $tr2);

		$th.innerText = dic[key]||key;
		if (key == 'holoCoins') {
			$input = newChild('input', $td);
			$input.setAttribute('type', 'number');
		} else {
			$input = newChild('select', $td);

			for (let i = 0; i <= cnt; i++) {
				$option = newChild('option', $input);
				$option.innerText = i;
				$option.value = i;
			}

		}

		$input.setAttribute('id', key);

		if (idx == keys.upg.length - 1) {
			let width = (79 - idx) % 8 +1 ;
			$th.setAttribute('colspan', width);
			$td.setAttribute('colspan', width);
		}

	}
	// !UPGRADE create

	// CHARACTER create
	$tr = newChild('tr', $body);

	$th = newChild('th', $tr);
	$th.setAttribute('colspan', 8);
	$th.innerText = 'CHARACTER';

	for (let idx = 0; idx < keys.chara.length; idx++) {

		let key = keys.chara[idx];

		if (idx % 4 == 0)
			$tr = newChild('tr', $body);

		$th = newChild('th', $tr);
		$td = newChild('td', $tr);
		$input = newChild('input', $td);

		$th.innerText = dic[key]||key;
		$input.setAttribute('type', 'number');
		$input.setAttribute('id', key);
		$input.value = 0;

		if (idx == keys.chara.length - 1) {
			let cnt = ((79 - idx) % 4) * 2;
			if(cnt>0){
				let $empty = newChild('td', $tr);
				$empty.setAttribute('colspan', cnt);
			}
		}

	}
	// !CHARACTER create
	
	// TEAR create
	$tr = newChild('tr', $body);

	$th = newChild('th', $tr);
	$th.setAttribute('colspan', 8);
	$th.innerText = 'TEARS';

	for (let idx = 0; idx < keys.tear.length; idx++) {

		let key = keys.tear[idx];

		if (idx % 4 == 0)
			$tr = newChild('tr', $body);

		$th = newChild('th', $tr);
		$td = newChild('td', $tr);
		$input = newChild('input', $td);

		$th.innerText = dic[key]||key;
		$input.setAttribute('type', 'number');
		$input.setAttribute('id', key);
		$input.value = 0;

		if (idx == keys.tear.length - 1) {
			let cnt = ((79 - idx) % 4) * 2;
			if(cnt>0){
				let $empty = newChild('td', $tr);
				$empty.setAttribute('colspan', cnt);
			}
		}

	}
	// !TEAR create

	// ITEMS create
	$tr = newChild('tr', $body);

	$th = newChild('th', $tr);
	$th.setAttribute('colspan', 8);
	$th.innerText = 'UNLOCK ITEMS';
	
	for(let idx = 0 ; idx<keys.item.length ; idx++){
		
		let key = keys.item[idx];
		
		if(idx%8==0)
			$tr = newChild('tr', $body);
		
		$td = newChild('td', $tr);
		
		newCheckbox(key, $td);
		
		if (idx == keys.item.length - 1) {
			let cnt = ((79 - idx) % 8) * 2;
			if(cnt>0){
				let $empty = newChild('td', $tr);
				$empty.setAttribute('colspan', cnt);
			}
		}
		
	}
	// !ITEMS create

	// WEAPONES create
	$tr = newChild('tr', $body);

	$th = newChild('th', $tr);
	$th.setAttribute('colspan', 8);
	$th.innerText = 'UNLOCK WEAPONES';

	for(let idx = 0 ; idx<keys.weapone.length ; idx++){
		
		let key = keys.weapone[idx];
		
		if(idx%8==0)
			$tr = newChild('tr', $body);
		
		$td = newChild('td', $tr);
		
		newCheckbox(key, $td);
		
		if (idx == keys.weapone.length - 1) {
			let cnt = ((79 - idx) % 8) * 2;
			if(cnt>0){
				let $empty = newChild('td', $tr);
				$empty.setAttribute('colspan', cnt);
			}
		}
		
	}
	// !WEAPONES create

	// COLLAB create
	$tr = newChild('tr', $body);

	$th = newChild('th', $tr);
	$th.setAttribute('colspan', 8);
	$th.innerText = 'UNLOCK COLLABS';
	
	for(let idx = 0 ; idx<keys.collab.length ; idx++){
		
		let key = keys.collab[idx];
		
		if(idx%8==0)
			$tr = newChild('tr', $body);
		
		$td = newChild('td', $tr);
		
		newCheckbox(key, $td);
		
		if (idx == keys.collab.length - 1) {
			let cnt = ((79 - idx) % 8) * 2;
			if(cnt>0){
				let $empty = newChild('td', $tr);
				$empty.setAttribute('colspan', cnt);
			}
		}
		
	}
	// !COLLAB create
	
	// OUTFIT create
	$tr = newChild('tr', $body);

	$th = newChild('th', $tr);
	$th.setAttribute('colspan', 8);
	$th.innerText = 'UNLOCK OUTFITS';

	for(let idx = 0 ; idx<keys.outfit.length ; idx++){
		
		let key = keys.outfit[idx];
		
		if(idx%8==0)
			$tr = newChild('tr', $body);
		
		$td = newChild('td', $tr);
		
		newCheckbox(key, $td);
		
		if (idx == keys.outfit.length - 1) {
			let cnt = ((79 - idx) % 8) * 2;
			if(cnt>0){
				let $empty = newChild('td', $tr);
				$empty.setAttribute('colspan', cnt);
			}
		}
		
	}
	// !OUTFIT create

}

function newChild(tagName, parent) {

	let element = document.createElement(tagName);
	if (parent)
		parent.appendChild(element);
	return element;

}

function newCheckbox(key, $td){
	
	let $label = newChild('label', $td);

	let $input = newChild('input', $label);
	$input.setAttribute('type', 'checkbox');
	$input.setAttribute('name', 'item');
	$input.setAttribute('value', key);
	$input.setAttribute('id', key);

	let $span = newChild('span', $label);
	$span.innerText = dic[key]||key;
	
}

function parseData(str) {

	data = new Object();

	data.uid = str.substring(0, 80);
	data.spec = JSON.parse(atob(str.substring(80)).replaceAll('\x00', ''));

}

function showData() {

	console.log(data);

	$('#code').text(data.uid);
	let spec = data.spec;

	keys.upg.forEach(function(arr) {
		let key = arr[0];
		$('#' + key).val(data.spec[key]);
	});

	data.spec.characters.forEach(function(arr) {
		let key = arr[0], lv = arr[1];
		$('#' + key).val(lv);
	});
	
	data.spec.tears.forEach(function(arr) {
		let key = arr[0], lv = arr[1];
		$('#' + key).val(lv);
	});
	
	data.spec.seenCollabs.forEach(function(key){
		$('#'+key).prop('checked', true);
	});
	
	data.spec.unlockedItems.forEach(function(key){
		$('#'+key).prop('checked', true);
	});
	
	data.spec.unlockedWeapons.forEach(function(key){
		$('#'+key).prop('checked', true);
	});
	
	data.spec.unlockedOutfits.forEach(function(key){
		$('#'+key).prop('checked', true);
	});
	
	$('tbody').show();

}

function update(){
	
	if (data && data.uid) {

		upgrades();
		data.spec.unlockedItems = items();
		data.spec.unlockedWeapons = weapones();
		data.spec.seenCollabs = collabs();
		data.spec.unlockedOutfits = outfits();
		data.spec.characters = characters();
		data.spec.tears = tears();
		
		encoding();

	} else {
		alert('원본 세이브파일이 필요합니다');
	}
	
	
}

function encoding() {

	if (data && data.uid) {

		let encoded = data.uid
				+ btoa(JSON.stringify(data.spec)).replaceAll('=', 'A');
		download(encoded);

	} else {
		alert('원본 세이브파일이 필요합니다');
	}

}

function download(encoded_string) {

	if (encoded_string) {

		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,'
				+ encodeURIComponent(encoded_string));
		element.setAttribute('download', 'save.dat');

		element.style.display = 'none';

		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);

	}
}

function items() {

	let arr = [];

	$('input:checkbox[name=item]:checked').each(function() {
		arr.push(this.value);
	});

	return arr;

}

function collabs() {

	let arr = [];

	$('input:checkbox[name=collab]:checked').each(function() {
		arr.push(this.value);
	});

	return arr;

}

function outfits() {

	let arr = [];

	$('input:checkbox[name=outfit]:checked').each(function() {
		arr.push(this.value);
	});

	return arr;

}

function weapones() {

	let arr = [];

	$('input:checkbox[name=weapone]:checked').each(function() {
		arr.push(this.value);
	});

	return arr;

}

function characters(){
	
	let arr = [];
	let temp;
	keys.chara.forEach(function(key){
		
		temp = new Array();
		temp.push(key);
		temp.push((Number)($('#'+key).val()));
		arr.push(temp);
		
	});
	
	return arr;
	
}

function tears(){
	
	let arr = [];
	let temp;
	keys.tear.forEach(function(key){
		
		temp = new Array();
		temp.push(key);
		temp.push((Number)($('#'+key).val()));
		arr.push(temp);
		
	});
	
	return arr;
	
}

function upgrades(){
	
	keys.upg.forEach(function(arr){
		let key = arr[0];
		data.spec[key] = (Number)($('#'+key).val());
		
	});
	
}

const keys = {

	'upg' : [ 
		['HP',10],
		['ATK',10],
		['SPD',10],
		['crit',5],
		['pickupRange',10],
		['haste',5],
		['regen',5],
		['specUnlock',1],
		['specCDR',5],
		['growth',1],
		['EXP',5],
		['food',5],
		['moneyGain',10],
		['reroll',5],
		['enhanceUp',5],
		['DR',5],
		['holoCoins'] ],
	'chara' : 
		[ 'ame', 'gura', 'ina', 'kiara', 'calli', 
			'bae', 'kronii', 'fauna', 'mumei', 'sana', 
			'irys', 'fubuki', 'mio', 'okayu', 'korone', 
			'sora', 'azki', 'roboco', 'suisei', 'miko' ],
	'weapone' :[ 
		'SpiderCooking', 'EliteLava', 'CEOTears', 'WamyWater','HoloBomb', 'PsychoAxe', 'BLBook', 
		'CuttingBoard', 'HoloLaser', 'Tailplug', 'Glowstick', 'XPotato', 'IdolSong' 
		],
	'item' :[ 
		'Sake', 
		'Limiter', 'BodyPillow', 'InjectionAsacoco', 'CreditCard', 'Halu','HolyMilk', 'FaceMask', 
		'Plushie', 'SuccubusHorn', 'FullMeal', 'Membership', 'PikiPikiPiman', 'Headphones', 'ChickensFeather',
		'GorillasPaw', 'UberSheep', 'IdolCostume', 'EnergyDrink', 'PiggyBank', 'StudyGlasses', 'Bandaid',
		'GWSPill','SuperChattoTime'
		],
	'collab' :[ 
		'RapDog', 'BreatheInAsacoco', 'DragonBeam', 'BrokenDreams', 'EliteCooking', 
		'IdolConcert', 'StreamOfTears', 'BLLover', 'MiComet', 'MariLamy', 'FlatBoard', 'LightBeam' 
		],
	'outfit' :
		[ 'kurokami', 'ameAlt1', 'inaAlt1', 'guraAlt1', 'calliAlt1', 'kiaraAlt1', 'irysAlt1', 'baeAlt1', 'sanaAlt1', 'faunaAlt1', 'mumeiAlt1', 'kroniiAlt1'],
	'tear':
		['myth', 'councilHope', 'gamers', 'gen0']

};

const dic = {
		//UPG
		'pickupRange':'획득반경',
		'specUnlock':'스킬사용',
		'specCDR':'스킬쿨감',
		'growth':'성장',
		'reroll':'리롤',
		'enhanceUp':'강화확률',
		'DR':'방어',
		//CHARACTER
		'ame':'아메',
		'gura':'구라',
		'ina':'이나',
		'kiara':'키아라',
		'calli':'칼리',
		//TEAMNAME
		'myth':'MYTH',
		'councilHope':'카운슬(irys)',
		'gamers':'게이머즈',
		'gen0':'0기생',
		//ITEM
		'BodyPillow':'다키마쿠라',
		'InjectionAsacoco':'주입식아사코코',
		'PiggyBank':'돼지저금통',
		'SuperChattoTime':'슈퍼챗타임',
		//WEAPONE
		'CEOTears':'YAGOO의눈물',
		'CuttingBoard':'도마',
		'HoloLaser':'팬빔',
		'Tailplug':'삽입식아사코코',
		//COLLAB
		'BreatheInAsacoco':'흡입식아사코코',
		'MariLamy':'얼어붙은바다',
		//OUTFIT
		'kurokami':'쿠로카미',
		//END
		'LASTLINE':'LASTLINE'
}