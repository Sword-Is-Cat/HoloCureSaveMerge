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
		fr.onload = () => {
			parseData(fr.result);
		}
		fr.readAsText(file);
	} else {
		print_message('[에러]:' + fileName + ' 파일을 첨부 해 주세요');
	}
}

const parseData = (str) => {
	try {
		data = JSON.parse(atob(str));
		print_message('[성공]:세이브 파일 로드');
	} catch (err) {
		print_message('[에러]:세이브 파일 로드 실패 ' + err.message);
	}
}

const encodeAndDownload = () => {
	if (data) {
		download(btoa(JSON.stringify(data)));
	} else {
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
				case 'ch_clear':
					data.completedStages.forEach((stg) => stg[1] = get_characters());
					text = '[성공]:clear-cheat';
					break;
			}
		} else {
			text = '[에러]:세이브파일이 로드되지 않았습니다';
		}
	} catch (err) {
		text = '[에러]:' + err.message;
	}
	return text;
}

let characters;

const get_characters = () => {
	if (!characters && data) {
		let non_characters = JSON.parse(all.non_character);
		characters = data.characters.map(element => element[0]).filter(chara => non_characters.indexOf(chara) === -1);
	}
	return characters;
}

let message_zone;

const print_message = (text) => {
	if (!message_zone)
		message_zone = document.getElementById('message_zone');
	let span = document.createElement('span');
	span.innerText = text;
	message_zone.appendChild(span);
	while(message_zone.children.length > 10){
		message_zone.children[0].remove();
	}
}

const all = {
	'non_character': '["none","empty","random"]',
	'character': '["kronii","fubuki","calli","suisei","roboco","fauna","sora","miko","gura","sana","okayu","irys","bae","azki","kiara","ina","korone","mio","ame","mumei","mel","matsuri","choco","ayame","haato","aki","shion","aqua","subaru"]',
	'item': '["Sake","Limiter","BodyPillow","InjectionAsacoco","CreditCard","Halu","HolyMilk","FaceMask","Plushie","SuccubusHorn","FullMeal","Membership","PikiPikiPiman","Headphones","ChickensFeather","GorillasPaw","UberSheep","IdolCostume","EnergyDrink","PiggyBank","StudyGlasses","Bandaid","GWSPill","SuperChattoTime","Breastplate","BlacksmithsGear","Shacklesss","HopeSoda","DevilHat"]',
	'weapone': '["SpiderCooking","EliteLava","CEOTears","WamyWater","HoloBomb","PsychoAxe","BLBook","CuttingBoard","HoloLaser","Tailplug","Glowstick","XPotato","IdolSong","ENCurse","BounceBall"]',
	'outfit': '["default","ameAlt2","ameAlt1","inaAlt2","inaAlt1","guraAlt2","guraAlt1","calliAlt2","calliAlt1","kiaraAlt2","kiaraAlt1","irysAlt2","irysAlt1","baeAlt1","sanaAlt1","faunaAlt2","faunaAlt1","mumeiAlt1","kroniiAlt2","kroniiAlt1","fubukiAlt1","kurokami","mioAlt1","koroneAlt1","okayuAlt1","soraAlt1","azkiAlt1","robocoAlt1","suiseiAlt1","mikoAlt1"]',
	'stage': '["STAGE 1","STAGE 2","STAGE 1 (HARD)","STAGE 3","TIME STAGE 1","STAGE 2 (HARD)"]',
	'collab': '["RapDog","BreatheInAsacoco","DragonBeam","BrokenDreams","EliteCooking","IdolConcert","StreamOfTears","BLLover","MiComet","MariLamy","FlatBoard","LightBeam","BoneBros","EldritchHorror","ImDie","RingOfFitness","SnowSake","AbsoluteWall","MiKorone"]'
}
