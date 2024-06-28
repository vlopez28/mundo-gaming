import { Component, OnInit } from '@angular/core';
import { Game } from '../../interfaces/Game';
import { GameCartService } from '../../services/game-cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.scss'
})
export class GameListComponent implements OnInit{
  currentRating: number = 0;
  games$: Observable<Game[]>;

  constructor(private gameCartService: GameCartService){
    this.games$ = gameCartService.games.asObservable();
  }

  addCart(game: Game){
    this.gameCartService.addToCart(game);
  }

  ngOnInit(): void {
  }

//cambia clase del boton comprar(carrito)
//si esta comprado lo deshabilita
getClassCart(game: Game){
  let rdo:{} = {'card-btn-buy': true};
  if(game.bought){
    rdo = {
      'card-btn-buy': false,
      'card-btn-buy-bought': true,
    } 
  } 
  return rdo;
}

//setea la propiedad comprado a true
// changeClass(game: Game):void{
//   game.bought = true;
// }

//setea calificacion segun id, segun estrella clickeada
changeQualification(event: any, game: Game): void {
  game.qualification = event.target.id;
}

//toggle de clases segun calificacion
//cuando hago click se detecta el cambio y el ngClass reevalua las clases css
getClassStar(rating: number, game: Game): string {
  return game.qualification >= rating ? 'filled' : 'empty';
}

//retorna la clase de card, segun tipo
getClass(game: Game):{} {
  return {
    'card': true,
    'tag': true,
    [game.type]: true
  };
}
  
}
