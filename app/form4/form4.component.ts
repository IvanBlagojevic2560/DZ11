import { Component, Directive } from 'angular2/core';
import {Component, FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES, FORM_BINDINGS} from 'angular2/common'
import {Http, HTTP_PROVIDERS, Headers} from 'angular2/http';
import 'rxjs/Rx';
import {Router, ROUTER_PROVIDERS} from 'angular2/router'

@Component({ 
  selector: 'FormPage4', 
  templateUrl: 'app/form4/form4.html',
  directives: [FORM_DIRECTIVES],
  viewBindings: [FORM_BINDINGS]
})

export class FormComponent4 { 

  registerForm: ControlGroup;
  http: Http;
  router: Router;
  postResponse: String;
  constructor(builder: FormBuilder, http: Http,  router: Router) {
	this.http = http;
	this.router = router;
    this.registerForm = builder.group({
     imeHotela: ["", Validators.none],
     lokacija: ["", Validators.none],
     sobe: ["", Validators.none],
	 kapacitet: ["", Validators.none],
   });
  }
  
  onAddHotel(): void {
	var data = "&imeHotela="+this.registerForm.value.imeHotela+"&lokacija="+this.registerForm.value.lokacija+"&sobe="+this.registerForm.value.sobe+"&kapacitet="+this.registerForm.value.kapacitet;
	var headers = new Headers();
	headers.append('Content-Type', 'application/x-www-form-urlencoded');
	this.http.post('http://localhost/php/addhotelservice.php',data, {headers:headers})
    .map(res => res)
    .subscribe( data => this.postResponse = data,
	err => alert(JSON.stringify(err)),
	() => { 
	 if(this.postResponse._body == "ok"){
	 alert("Uspesno dodavanje hotela");
	    this.router.parent.navigate(['./MainPage']);
	 }else{
		alert("Neuspesno dodavanje hotela");
	 }
	 }
	);
	
  }
}
