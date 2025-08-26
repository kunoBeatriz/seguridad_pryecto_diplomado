import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-guests',
  standalone: true,
  templateUrl: './guests.component.html',
  styleUrl: './guests.component.scss',
  imports: [
    CommonModule,
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatCardModule, 
    MatTableModule
  ]
})
export class GuestsComponent implements OnInit {
  guests: any[] = [];
  form: any = {
    name: '',
    table_number: 0,
    side: '',
    cerveza: 0,
    dinero: 0,
    presente: '',
    id_guest: 0,
  };
  
//  cervezaOptions = ["Paceña", "Huari", "Corona", "Quilmes"];
  cervezaOptions = [2, 4, 6, 8, 10];
  dineroOptions = [100, 200, 400, 1000];
  presenteOptions = ["Muebles", "Electrodomésticos", "Otro"];

//  selectedCerveza = "";
  selectedCerveza = 2;
  selectedDinero = 100;
  selectedPresente = "";

  constructor(private api: ApiService){}

  ngOnInit(){
    this.load();
  }
  async load(){
    await this.api.guestsList().subscribe((r) => {
      this.guests = r;
      console.log("this.guests",this.guests);
    });
    
  }
  add(){
    this.api.createGuest(this.form).subscribe(()=>{
      this.form={name:'',table_number:0,side:''}; this.load();
    });
  }
  edit(g:any){
    console.log("g",g);
    this.form = {...g};
  }
  save(){
    console.log("this.form",this.form);
    this.form.id_guest = this.form.id;
    this.api.updateGuest(this.form.id, this.form).subscribe(()=> this.load());
  }
  del(id:number){
    this.api.deleteGuest(id).subscribe(()=> this.load());
  }

  selecionarCerveza(event: any){
    const valor = (event.target as HTMLSelectElement).value;
    console.log("valor", valor);
    this.form.cerveza = Number(valor);
    console.log("this.form", this.form);
  }

  selecionarDinero(event: any){
    const valor = (event.target as HTMLSelectElement).value;
    console.log("valor", valor);
    this.form.dinero = Number(valor);
    console.log("this.form", this.form);
  }

  selecionarPresente(event: any){
    const valor = (event.target as HTMLSelectElement).value;
    console.log("valor", valor);
    this.form.presente = valor;
    console.log("this.form", this.form);
  }

}
