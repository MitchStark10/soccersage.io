// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Route, Router, Set } from '@redwoodjs/router';
import GamesLayout from 'src/layouts/GamesLayout';
import PredictionsLayout from 'src/layouts/PredictionsLayout';
import TeamsLayout from 'src/layouts/TeamsLayout';;
import Layout from './layouts/Layout/Layout';
import SignUpPage from './pages/SignupPage/SignUpPage';

// TODO: Add authentication for the scaffolding pages
const Routes = () => {
    return (
        <Router>
            <Set wrap={PredictionsLayout}>
                <Route path="/admin/predictions/new" page={PredictionNewPredictionPage} name="newPrediction" />
                <Route path="/admin/predictions/{id:Int}/edit" page={PredictionEditPredictionPage} name="editPrediction" />
                <Route path="/admin/predictions/{id:Int}" page={PredictionPredictionPage} name="prediction" />
                <Route path="/admin/predictions" page={PredictionPredictionsPage} name="predictions" />
            </Set>
            <Set wrap={TeamsLayout}>
                <Route path="/admin/teams/new" page={TeamNewTeamPage} name="newTeam" />
                <Route path="/admin/teams/{id:Int}/edit" page={TeamEditTeamPage} name="editTeam" />
                <Route path="/admin/teams/{id:Int}" page={TeamTeamPage} name="team" />
                <Route path="/admin/teams" page={TeamTeamsPage} name="teams" />
            </Set>
            <Set wrap={GamesLayout}>
                <Route path="/admin/games/new" page={GameNewGamePage} name="newGame" />
                <Route path="/admin/games/{id:Int}/edit" page={GameEditGamePage} name="editGame" />
                <Route path="/admin/games/{id:Int}" page={GameGamePage} name="game" />
                <Route path="/admin/games" page={GameGamesPage} name="games" />
            </Set>
            <Set wrap={Layout}>
                {/* TODO: Build home page */}
                <Route path="/" page={HomePage} name="home" />
                <Route path="/sign-up" page={SignUpPage} name="signUp" />
                <Route path="/login" page={LoginPage} name="login" />
                <Route path="/sign-out" page={SignOutPage} name="signOut" />
                <Route notfound page={NotFoundPage} />
            </Set>
        </Router>
    );
};

export default Routes;
