import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";

export class LoginInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Login Interceptor');
        console.log(req.url);
        return next.handle(req).pipe(tap(event => {
            if(event.type === HttpEventType.Response) {
                console.log('Incoming response');
                console.log(event.body);
            }
        }));
    }
}