import { Component, OnInit } from '@angular/core';;
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  name;

  constructor( private router: Router,private http: HttpClient,private location: Location ) { }

  
  ngOnInit() {

    this.getCategories()   // function called to getCategories 
  }


  getCategories()    // function body
  {
   
    this.http.get("http://localhost:8080/categoryDetail").subscribe( (data: any[]) => {  // nodejs server running on same system(localhost) with port 8080 under categorydetail path(url)
        
       if(data.length==0)
       {
         alert("No data found");      // if data is array of objects sent as reponse from nodejs if its length==0 , alert("no data")
       }

        this.name = data;          // to display categories details with products in table data is assigned to name object , 
                                  // name is the ojbect of the HomeComponet itself so we need to access this.name (object of current class)
        
    })
  }  // end getCategories()

  deleteCategoty(categorydetails)   // delete categorydetails row after cliked delete icon in homecomponent.html
  {

  var res=confirm("Are You Sure to Delete the Categories     " + categorydetails.category_name); // asking for user confirmation to delete

    if(res==true)                    // ok or cancel will given by confirm alert box , if user clicks ok , true is returned by confirm();
                                     // if user clicks on cancel res will false, control goes to else
    {
  
    var categorydelte=categorydetails._id;   //  geeting object_id of cliked record and send to nodejs running on same system(localhos) with port 8080

    this.http.delete('http://localhost:8080/categoryDelete' +categorydelte ,{}).subscribe((result: any[])=>{console.log(result)
                      
    location.reload();   // reload window after record deleted from database , it will not show deleted records
                 
  })
} //    if


else
{

}     // else

}  // end of delete()
 

}  // end of homecoponent class
