import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LogicComponent } from './auth/login/login.component';
import { CreateComponent } from './components/create/create.component';
import { CharactersListComponent } from './components/characters-list/characters-list.component';
import { GameViewComponent } from './components/game-view/game-view.component';
import { GraveyardComponent } from './components/graveyard/graveyard.component';
import { authGuard } from './auth/auth.guard';


export const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LogicComponent,
  },
  {
    path: 'create',
    component: CreateComponent,
    canActivate: [authGuard]
  },
  {
    path: 'list',
    component: CharactersListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'game',
    component: GameViewComponent,
    canActivate: [authGuard]
  },
  { path: 'graveyard', component: GraveyardComponent }

];
