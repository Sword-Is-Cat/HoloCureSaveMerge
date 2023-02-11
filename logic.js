/**
 * 
 */
let data;
const fileName = 'save_n.dat';

document.addEventListener("DOMContentLoaded", () => {
	initialize();
});

const initialize = () => {

	const dropzone = document.getElementById('drop_zone');
	dropzone.ondragover = (evt) => {
		evt.preventDefault();
	}
	// 파일 드롭
	dropzone.ondrop = (evt) => {
		dropHandler(evt);
	}

	// 치트버튼
	document.querySelectorAll('button[name=cheat]').forEach((btn) => {
		btn.onclick = () => cheat(btn.id);
	});

	// 다운로드
	document.getElementById('download').onclick = () => {
		encodeAndDownload();
	}
}

const dropHandler = (ev) => {
	console.log('File(s) dropped');
	// Prevent default behavior (Prevent file from being opened)
	ev.preventDefault();

	if (ev.dataTransfer.items) {
		// Use DataTransferItemList interface to access the file(s)
		[...ev.dataTransfer.items].forEach((item, i) => {
			// If dropped items aren't files, reject them
			if (item.kind === 'file') {
				const file = item.getAsFile();
				readFile(file);
			}
		});
	} else {
		// Use DataTransfer interface to access the file(s)
		[...ev.dataTransfer.files].forEach((file, i) => {
			readFile(file);
		});
	}
}

const readFile = (file) => {
	if (file.name === fileName) {
		let fr = new FileReader();
		fr.onload = function () {
			parseData(fr.result);
		}
		fr.readAsText(file);
	} else {
		print_message('[에러]:'+fileName + ' 파일을 첨부 해 주세요');
	}
}

const parseData = (str) => {
	try{
		data = JSON.parse(atob(str));
		print_message('[성공]:세이브 파일 로드');
	}catch(err){
		print_message('[에러]:세이브 파일 로드 실패');
	}
}

const encodeAndDownload = () => {
	if(data){
		download(btoa(JSON.stringify(data)));
	}else{
		print_message('[에러]:세이브파일이 로드되지 않았습니다');
	}
}

const download = (encoded_string) => {

	if (encoded_string) {

		let element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(encoded_string));
		element.setAttribute('download', fileName);

		element.className = 'hide';

		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);

	}
}

const cheat = (key) => {
	let text = cheat_action(key);
	print_message(text);
}

const cheat_action = (key) => {
	let text;
	try {
		if (data) {
			switch (key) {
				case 'ch_coin':
					data.holoCoins += 1000000;
					text = '[성공]:coin-cheat';
					break;
				case 'ch_tear':
					data.tears.forEach((arr) => arr[1] += 100);
					text = '[성공]:tear-cheat';
					break;
				case 'ch_chara':
					data.characters.forEach((chara) => chara[1] += 10);
					text = '[성공]:chara-cheat';
					break;
			}
		}else{
			text = '[에러]:세이브파일이 로드되지 않았습니다';
		}
	} catch (err) {
		text = '[에러]:'+err.message;
	}
	return text;
}

const print_message = (text) => {
	let span = document.createElement('span');
	span.innerText = text;
	document.getElementById('message_zone').appendChild(span);
}

const keys = {

	'upg': [
		['HP', 10],
		['ATK', 10],
		['SPD', 10],
		['crit', 5],
		['pickupRange', 10],
		['haste', 5],
		['regen', 5],
		['specUnlock', 1],
		['specCDR', 5],
		['growth', 1],
		['EXP', 5],
		['food', 5],
		['moneyGain', 10],
		['reroll', 5],
		['enhanceUp', 5],
		['DR', 5],
		['holoCoins']],
	'chara':
		['ame', 'gura', 'ina', 'kiara', 'calli',
			'bae', 'kronii', 'fauna', 'mumei', 'sana',
			'irys', 'fubuki', 'mio', 'okayu', 'korone',
			'sora', 'azki', 'roboco', 'suisei', 'miko'],
	'weapone': [
		'SpiderCooking', 'EliteLava', 'CEOTears', 'WamyWater', 'HoloBomb', 'PsychoAxe', 'BLBook',
		'CuttingBoard', 'HoloLaser', 'Tailplug', 'Glowstick', 'XPotato', 'IdolSong'
	],
	'item': [
		'Sake',
		'Limiter', 'BodyPillow', 'InjectionAsacoco', 'CreditCard', 'Halu', 'HolyMilk', 'FaceMask',
		'Plushie', 'SuccubusHorn', 'FullMeal', 'Membership', 'PikiPikiPiman', 'Headphones', 'ChickensFeather',
		'GorillasPaw', 'UberSheep', 'IdolCostume', 'EnergyDrink', 'PiggyBank', 'StudyGlasses', 'Bandaid',
		'GWSPill', 'SuperChattoTime'
	],
	'collab': [
		'RapDog', 'BreatheInAsacoco', 'DragonBeam', 'BrokenDreams', 'EliteCooking',
		'IdolConcert', 'StreamOfTears', 'BLLover', 'MiComet', 'MariLamy', 'FlatBoard', 'LightBeam'
	],
	'outfit':
		['kurokami', 'ameAlt1', 'inaAlt1', 'guraAlt1', 'calliAlt1', 'kiaraAlt1', 'irysAlt1', 'baeAlt1', 'sanaAlt1', 'faunaAlt1', 'mumeiAlt1', 'kroniiAlt1'],

};
