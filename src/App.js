import Layout from "./compoenents/layout";
import { Home, PageNotFound, BlogList, Blog, CV, Projects } from "./pages";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/blog" exact component={BlogList} />
          <Route path="/blog/:id" component={Blog} />
          <Route
            path={["/project/", "/project/:id"]}
            exact
            component={Projects}
          />
          <Route path="/cv" component={CV} />
          <Route component={PageNotFound} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
