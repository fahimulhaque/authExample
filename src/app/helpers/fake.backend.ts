import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';


export function fakeBackendFactory(
    backend: MockBackend,
    options: BaseRequestOptions) {

  // tslint:disable-next-line:max-line-length // non admin token
  // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkZhaGltdWwgSGFxdWUiLCJhZG1pbiI6ZmFsc2V9.RcuwEl-hHNMUhOHaqG0d3B-v_oCVL8LHrZNQAnfRdQA';

   // tslint:disable-next-line:max-line-length // admin token
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkZhaGltdWwgSGFxdWUiLCJhZG1pbiI6dHJ1ZX0.I3gJL3CDetoxTxMQ0aWzy51ZaI-3L3X4D59DQwUw4XY';
  backend.connections.subscribe((connection: MockConnection) => {
    // I am using the setTimeout() function to simulate an
    // asynchronous call to the server that takes 1 second.
    setTimeout(() => {
      //
      // Fake implementation of /api/authenticate
      //
      if (connection.request.url.endsWith('/api/authenticate') &&
        connection.request.method === RequestMethod.Post) {
        const body = JSON.parse(connection.request.getBody());

        if (body.email === 'fahim@domain.com' && body.password === '1234') {
          connection.mockRespond(new Response(
            new ResponseOptions({
              status: 200,
              body: { token: token }
           })));
        } else {
          connection.mockRespond(new Response(
            new ResponseOptions({ status: 200 })
          ));
        }
      }



       //
       // Fake implementation of /api/orders
       //
       if (connection.request.url.endsWith('/api/orders') &&
           connection.request.method === RequestMethod.Get) {
         if (connection.request.headers.get('Authorization') === 'Bearer ' + token) {
            connection.mockRespond(new Response(
              new ResponseOptions({ status: 200, body: [1, 2, 3] })
         ));
       } else {
           connection.mockRespond(new Response(
             new ResponseOptions({ status: 401 })
           ));
       }
    }



    }, 1000);
  });

  return new Http(backend, options);
}

export let fakeBackendProvider = {
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions]
};
