import { Injectable, Injector } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { User } from '../models/user';

const URLs = {
    user: {
        getUsers: {
            url: 'http://localhost:4200/v1/user',
            method: 'get',
            response: {
                data: [
                    {
                        _id: 1,
                        name: "Jane",
                        email: "jane@gmail.com",
                        hobbies: [],
                    }
                ]
            }
        },
        addUser: {
            url: 'http://localhost:4200/v1/user/register',
            method: 'post'
        },
    }
};

@Injectable()
export class HttpMockRequestInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url === URLs.user.getUsers.url) {
        return of(new HttpResponse({ status: 200, body: ((URLs.user.getUsers.response.data) as User[]) }));
    }
    return next.handle(request);
  }
}