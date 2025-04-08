import { Switch, Route } from 'react-router-dom';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" />
      <Route path="/new" />
      <Route path="/edit/:id" />
    </Switch>
  );
}
