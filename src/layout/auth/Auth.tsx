import { PropsWithChildren } from 'react';

function AuthLayout(props: PropsWithChildren<{
  title: string;
}>) {
  const { title, children } = props;
  return (
    <section className="vh-100">
      <div className="mask d-flex align-items-center h-100 banner">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card shadow">
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5 text-h1 text-muted">
                    {title}
                  </h2>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AuthLayout;
