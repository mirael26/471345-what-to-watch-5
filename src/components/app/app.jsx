import React from "react";
import {Switch, Route, Router as BrowserRouter} from "react-router-dom";
import browserHistory from "../../browser-history";

import {AppRoute} from "../../const";

import Main from "../main/main";
import SignIn from "../sign-in/sign-in";
import MyList from "../my-list/my-list";
import Movie from "../movie/movie";
import Player from "../player/player";
import AddReview from "../add-review/add-review";
import PrivateRoute from "../private-route/private-route";
import withActiveControl from "../../hocs/with-active-control/with-active-control";

const PlayerWithControlPanel = withActiveControl(Player);

const App = () => {

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route
          exact
          path={AppRoute.MAIN}
          render={({history}) => <Main onPlayerButtonClick={(id) => history.push(`${AppRoute.PLAYER}/${id}`)}/>}>
        </Route>
        <Route path={AppRoute.LOGIN}>
          <SignIn />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.MY_LIST}
          render={() => <MyList />}
        />
        <Route
          exact
          path={`${AppRoute.MOVIE}/:id`}
          render={({match, history}) => <Movie
            match={match}
            onPlayerButtonClick={(id) => history.push(`${AppRoute.PLAYER}/${id}`)} />}
        />
        <PrivateRoute
          exact
          path={`${AppRoute.MOVIE}/:id${AppRoute.REVIEW}`}
          render={(routerProps) => <AddReview {...routerProps} />}
        />
        <Route
          exact
          path={`${AppRoute.PLAYER}/:id`}
          render={({match, history}) =>
            <PlayerWithControlPanel
              match={match}
              onExitButtonClick={() => history.goBack()}
            />
          }>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
