import { Route, Router, Set } from '@redwoodjs/router';

import { AdminLayout } from './layouts/Layout/AdminLayout';
import Layout from './layouts/Layout/Layout';

const Routes = () => {
    return (
        <Router>
            <Set wrap={AdminLayout}>
                <Route path="/admin/users/new" page={UserNewUserPage} name="adminNewUser" />
                <Route path="/admin/users/{id:Int}/edit" page={UserEditUserPage} name="adminEditUser" />
                <Route path="/admin/users/{id:Int}" page={UserUserPage} name="adminUser" />
                <Route path="/admin/users" page={UserUsersPage} name="adminUsers" />
                <Route path="/admin/predictions/new" page={PredictionNewPredictionPage} name="adminNewPrediction" />
                <Route path="/admin/predictions/{id:Int}/edit" page={PredictionEditPredictionPage} name="adminEditPrediction" />
                <Route path="/admin/predictions/{id:Int}" page={PredictionPredictionPage} name="adminPrediction" />
                <Route path="/admin/predictions" page={PredictionPredictionsPage} name="adminPredictions" />
                <Route path="/admin/teams/new" page={TeamNewTeamPage} name="adminNewTeam" />
                <Route path="/admin/teams/{id:Int}/edit" page={TeamEditTeamPage} name="adminEditTeam" />
                <Route path="/admin/teams/{id:Int}" page={TeamTeamPage} name="adminTeam" />
                <Route path="/admin/teams" page={TeamTeamsPage} name="adminTeams" />
                <Route path="/admin/games/new" page={GameNewGamePage} name="adminNewGame" />
                <Route path="/admin/games/{id:Int}/edit" page={GameEditGamePage} name="adminEditGame" />
                <Route path="/admin/games/{id:Int}" page={GameGamePage} name="adminGame" />
                <Route path="/admin/games" page={GameGamesPage} name="adminGames" />
                <Route path="/admin/seasons/new" page={SeasonNewSeasonPage} name="adminNewSeason" />
                <Route path="/admin/seasons/{id:Int}/edit" page={SeasonEditSeasonPage} name="adminEditSeason" />
                <Route path="/admin/seasons/{id:Int}" page={SeasonSeasonPage} name="adminSeason" />
                <Route path="/admin/seasons" page={SeasonSeasonsPage} name="adminSeasons" />
            </Set>
            <Set wrap={Layout}>
                <Route path="/" page={HomePage} name="home" />
                <Route path="/predictions" page={PredictionsPage} name="predictions" />
                <Route path="/sign-up" page={SignUpPage} name="signUp" />
                <Route path="/login" page={LoginPage} name="login" />
                <Route path="/sign-out" page={SignOutPage} name="signOut" />
                <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
                <Route path="/games" page={GamesPage} name="games" />
                <Route path="/standings" page={StandingsPage} name="standings" />
                <Route notfound page={NotFoundPage} />
            </Set>
        </Router>
    );
};

export default Routes;
