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
import TeamsLayout from 'src/layouts/TeamsLayout';
import UsersLayout from 'src/layouts/UsersLayout';
import Layout from './layouts/Layout/Layout';
import SignUpPage from './pages/SignupPage/SignUpPage';

// TODO: Add authentication for the scaffolding pages
const Routes = () => {
    return (
        <Router>
            <Set wrap={UsersLayout}>
                <Route path="/users/new" page={UserNewUserPage} name="newUser" />
                <Route path="/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
                <Route path="/users/{id:Int}" page={UserUserPage} name="user" />
                <Route path="/users" page={UserUsersPage} name="users" />
            </Set>
            <Set wrap={PredictionsLayout}>
                <Route path="/predictions/new" page={PredictionNewPredictionPage} name="newPrediction" />
                <Route path="/predictions/{id:Int}/edit" page={PredictionEditPredictionPage} name="editPrediction" />
                <Route path="/predictions/{id:Int}" page={PredictionPredictionPage} name="prediction" />
                <Route path="/predictions" page={PredictionPredictionsPage} name="predictions" />
            </Set>
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
            <Set wrap={Layout}>
                {/* TODO: Build home page */}
                {/* <Route path="/" page={HomePage} name="home" /> */}
                <Route path="/sign-up" page={SignUpPage} name="signUp" />
                <Route path="/login" page={LoginPage} name="login" />
                <Route path="/sign-out" page={SignOutPage} name="signOut" />
                <Route notfound page={NotFoundPage} />
            </Set>
        </Router>
    );
};

export default Routes;
