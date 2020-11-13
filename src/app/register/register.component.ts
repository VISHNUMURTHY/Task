import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { AuthenticationService } from '@app/_services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
  alert:boolean=false
  registerForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

  constructor(
    private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,private http:HttpClient
  ) { 

   
  // }
  
}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      Role: ['', Validators.required]
    });
  }
     // convenience getter for easy access to form fields
     get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    console.log('input',this.f.firstName.value, this.f.lastName.value,this.f.username.value,this.f.password.value,this.f.Role.value);

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    } 
    this.loading = true;
    // let params=new HttpParams().set('FirstName',this.f.firstName.value);
    // params=params.append('LastName',this.f.lastName.value);
    // params=params.append('Username',this.f.username.value);
    // params=params.append('Password',this.f.password.value);
    // params=params.append('Role',this.f.Role.value);
     let params={'FirstName':this.f.firstName.value,'LastName':this.f.lastName.value,'Username':this.f.username.value,'Password':this.f.password.value,'Role':this.f.Role.value};
    console.log('params',params);
    let headers=new HttpHeaders().set('Access-Control-Allow-Origin','*');//{'Content-Type':'application/json','Host':'localhost:4200'}
  //  headers=headers.append('Content-Type','application/json');
    this.http.post<any>('http://localhost:51376/api/RegisterModels',params,{headers:headers,observe:'response'}).subscribe(res=>{
      console.log('adithya');
      console.log('output',res.body)
  },err=>{
      console.log('error',err);
  });

    
    





    this.http.post<any>('http://localhost:51376/api/RegisterModels',params).pipe(map(res=>{
      console.log('adithya');
      console.log('output',res)
  }));
    this.authenticationService.register(this.f.firstName.value, this.f.lastName.value,this.f.username.value,this.f.password.value,this.f.Role.value)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.error = error;
                this.loading = false;
            });
         
  }
}


  


