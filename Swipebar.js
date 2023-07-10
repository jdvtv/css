// MENÚ LATERAL
// ------------
function MenuLateral(){
	var dis     = this;
	dis.menu    = document.getElementById('menu-lateral');
	dis.btn     = document.getElementById('tn-menu-lateral');
	// Determino si puedo hacer touch o no.
	dis.touchsi = 'ontouchstart' in window;
	// Variables para guardar eventos.
	dis.empieza;
	dis.mientras;
	dis.termina;
	dis.moviendo = false;
	dis.puntoPartida;
	dis.movido;
	dis.pos;
	dis.abierto = true;
 
	// Pregunto si soporta touch para mobile y asigno los eventos a las variables.
	if (dis.touchsi) {
		dis.empieza  = 'touchstart';
		dis.mientras = 'touchmove';
		dis.termina  = 'touchend';
	}else{
		dis.empieza  = 'mousedown';
		dis.mientras = 'mousemove';
		dis.termina  = 'mouseup';
	}

	// Comienzo 
	dis.menu.addEventListener(dis.empieza, function(event){
      event.preventDefault;
		// Le digo que se está moviendo.
		dis.moviendo = true;

		// Si tiene touch uso este, si no el click.
		if (dis.touchsi) {
			// console.log('punto de partida '+event.touches[0].clientY);
			dis.puntoPartida = event.touches[0].clientY;
			// console.log('pos inicial '+dis.menu.offsetTop);
			dis.pos = dis.menu.offsetTp * -1;
		}else{
			// console.log('punto de partida '+event.touches[0].clientY);
			dis.puntoPartida = event.clientY;
			// console.log('pos inicial '+dis.menu.offsetTop);
			dis.pos = dis.menu.offsetTp * -1;
      }

	});
	
	document.addEventListener(dis.mientras, function(event){
      event.preventDefault();

		if(dis.moviendo){

			if(dis.touchsi){
				dis.movido = event.touches[0].clientY - dis.puntoPartida;
				console.log('movido: '+dis.movido);

			}else{
				dis.movido = event.clientY - dis.puntoPartida;
				console.log('movido: '+dis.movido);
         }

			dis.menu.style.top = (dis.movido - dis.pos)+'px';
		}else{

      }
	});

	document.addEventListener(dis.termina, function(event){
		dis.moviendo = false;
      event.preventDefault();
		//if(dis.touchsi){

			if(dis.movido > 0){
				dis.menu.style.top = 365+'px';
				dis.abierto  = true;

			}else if(dis.movido < 0){
				dis.menu.style.top = 0+'px';
				dis.abierto = false;
			}else{
				if(dis.abierto){
					dis.menu.style.top = 0+'px';
				}else{
					dis.menu.style.top =-365+'px';
				}
			}

		//}
      //else{
		//	if(dis.abierto){
		//		dis.menu.style.left = '-220px';
		//		dis.abierto = false;
		//	}else{
		//		dis.menu.style.left = '0px';
		//		dis.abierto  = true;
		//	}
		//}
	});
}
if (document.getElementById('menu-lateral') != null) {
	var lateral = new MenuLateral();
}
