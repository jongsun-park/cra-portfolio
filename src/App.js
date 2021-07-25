import Layout from "./compoenents/layout";
import { Home, PageNotFound, Blog } from "./pages";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import fs from "fs";

// import listReactFiles from "list-react-files";

// listReactFiles(__dirname).then((files) => console.log(files));
// need eject
console.log(fs);

const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/blog" component={Blog} />
          <Route component={PageNotFound} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
