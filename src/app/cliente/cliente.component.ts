import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { cliente } from '../cliente';
import { Form, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  clientes: cliente[] = [];
  isEditing: boolean = false;
  formGroupClient: FormGroup;

  constructor(private clienteService: ClienteService, private formBuilder: FormBuilder) {
    this.formGroupClient = formBuilder.group({
      id: [''],
      name: [''],
      email: [''],
      cpf: [''],
      endereco: ['']
    });

  }
  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes() {
    this.clienteService.getClientes().subscribe({
      next: data => this.clientes = data

    }
    );

  }
  SalvarCliente() {
    console.log(this.formGroupClient.value)
    if (this.isEditing) { 
      this.clienteService.EditarCliente(this.formGroupClient.value).subscribe(
        {
          next: () => {
            this.loadClientes();
            this.formGroupClient.reset();
            this.isEditing = false;
          }
        }
      )
    }
    else {
      this.clienteService.salvarCliente(this.formGroupClient.value).subscribe({
        next: data => {
          this.clientes.push(data);
          this.formGroupClient.reset();

        }
      }
      )
    }

  }

  EditarCliente(cliente: cliente) {
    this.formGroupClient.setValue(cliente);
    this.isEditing = true;
  }

  ExcluirCliente(cliente: cliente) {
    this.clienteService.ExcluirCliente(cliente).subscribe({
      next: () => this.loadClientes()
    })
  }
}
