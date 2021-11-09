import React from "react";
import { NavLink } from "react-router-dom";
import Layout from "../../components/Layout";

const ErrorPage = (props) => {
  return (
    <Layout title="Error Page">
      <section class="content">
        <div class="error-page">
          <h2 class="headline text-warning"> 404</h2>
          <div class="error-content">
            <h3>
              <i class="fas fa-exclamation-triangle text-warning"></i> Oops!
              Page not found.
            </h3>
            <p>
              We could not find the page you were looking for. Meanwhile, you
              may <NavLink to={"/"}>return to dashboard</NavLink> or try using
              valid path.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ErrorPage;
