import { Route, Router, Set } from '@redwoodjs/router';
import { AdminLayout } from './layouts/Layout/AdminLayout';
import Layout from './layouts/Layout/Layout';
import SignUpPage from './pages/SignupPage/SignUpPage';

const Routes = () => {
    return (
        <Router>
            <Set wrap={Layout}>
                {/* TODO: Build home page */}
                <Route path="/" page={HomePage} name="home" />
                <Route path="/predictions" page={PredictionsPage} name="predictions" />
                <Route path="/sign-up" page={SignUpPage} name="signUp" />
                <Route path="/login" page={LoginPage} name="login" />
                <Route path="/sign-out" page={SignOutPage} name="signOut" />
                <Route path="/games" page={GamesPage} name="games" />
                <Route notfound page={NotFoundPage} />
            </Set>
            <Set wrap={AdminLayout}>
                <Route path="/admin/users/new" page={UserNewUserPage} name="newUser" />
                <Route path="/admin/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
                <Route path="/admin/users/{id:Int}" page={UserUserPage} name="user" />
                <Route path="/admin/users" page={UserUsersPage} name="users" />
                <Route path="/admin/predictions/new" page={PredictionNewPredictionPage} name="newPrediction" />
                <Route path="/admin/predictions/{id:Int}/edit" page={PredictionEditPredictionPage} name="editPrediction" />
                <Route path="/admin/predictions/{id:Int}" page={PredictionPredictionPage} name="prediction" />
                <Route path="/admin/predictions" page={PredictionPredictionsPage} name="predictions" />
                <Route path="/admin/teams/new" page={TeamNewTeamPage} name="newTeam" />
                <Route path="/admin/teams/{id:Int}/edit" page={TeamEditTeamPage} name="editTeam" />
                <Route path="/admin/teams/{id:Int}" page={TeamTeamPage} name="team" />
                <Route path="/admin/teams" page={TeamTeamsPage} name="teams" />
                <Route path="/admin/games/new" page={GameNewGamePage} name="newGame" />
                <Route path="/admin/games/{id:Int}/edit" page={GameEditGamePage} name="editGame" />
                <Route path="/admin/games/{id:Int}" page={GameGamePage} name="game" />
                <Route path="/admin/games" page={GameGamesPage} name="games" />
            </Set>
        </Router>
    );
};

export default Routes;
