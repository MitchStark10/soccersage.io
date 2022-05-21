// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'
import TeamsLayout from 'src/layouts/TeamsLayout'
import GamesLayout from 'src/layouts/GamesLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={TeamsLayout}>
        <Route path="/teams/new" page={TeamNewTeamPage} name="newTeam" />
        <Route path="/teams/{id:Int}/edit" page={TeamEditTeamPage} name="editTeam" />
        <Route path="/teams/{id:Int}" page={TeamTeamPage} name="team" />
        <Route path="/teams" page={TeamTeamsPage} name="teams" />
      </Set>
      <Set wrap={GamesLayout}>
        <Route path="/games/new" page={GameNewGamePage} name="newGame" />
        <Route path="/games/{id:Int}/edit" page={GameEditGamePage} name="editGame" />
        <Route path="/games/{id:Int}" page={GameGamePage} name="game" />
        <Route path="/games" page={GameGamesPage} name="games" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
