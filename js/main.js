var buttons = document.querySelectorAll(".button"), 
		accum = 0, 
		operation = undefined,
		isCalculated = false;

function clickButton() {  //Обработчик нажатия кнопки
	var button = this.querySelector("p").innerHTML;
	var output = document.querySelector("#output");
	
	if(!isNaN(button)){
		if(isCalculated){  //Проверка на то, подсчитано ли значение или нет, чтоб обнулить строку ввода
			output.value = '0';
			isCalculated = false;
		}
		
		if(output.value === '0'){ //Отдельная обработка ввода нуля
			output.value = button; 
		} else{
			output.value += button;
		}
	} else{
		if(button === '.'){  //Обработка ввода точки
			if (output.value.indexOf('.')<0){
				output.value += '.';
			}
		} else{
			if(button === 'C'){  //Обработка сброса
				output.value = '0';
				accum = 0;
				operation = undefined;
			} else{ 
				if((!operation)&&(button!== '=')){  //Если это первое нажатие кнопки операции, то в буфер записываем операцию
					operation = button;
					accum = output.value;
					output.value = '0';
					output.style.backgroundColor = '#FFA';
				} else{
					switch (operation){  //Подсчёт выражения с записанной операцией
						case '+': output.value = +accum + (+output.value); break;
						case '-': output.value = +accum - (+output.value); break;
						case '*': output.value = +accum * (+output.value);break;
						case '/': if(output.value === '0'){
							alert('Div by 0');
							accum = 0;
							output.value = '0';
							operation = undefined;
						}	else{
							output.value = +accum / (+output.value);
						}
						break;
						case '=':console.log('Ravno');break;
						default: console.log('UNKNOWN');
					}
					accum = 0;
					operation = undefined;
					output.style.backgroundColor = '#FFF';
					isCalculated = true;
				}
			}
		}
	}
}

for(var i=0;i<buttons.length;i++){  //Включения обработчика событий на каждой кнопке
	buttons[i].addEventListener("click",clickButton);
}