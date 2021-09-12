import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from '../shared/payment-detail.model';
import { PaymentDetailService } from '../shared/payment-detail.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styles: [
  ]
})
export class PaymentDetailsComponent implements OnInit {

  constructor(public service:PaymentDetailService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }
  polpulateForm(selectedRecord:PaymentDetail)
  {
    this.service.formData=Object.assign({},selectedRecord);
  }
  deleteRecord(id:number)
  {
    if(confirm('Are sure to delete this record')){

   
    this.service.deletePaymentRecord(id).subscribe(res=>{
    this.service.refreshList();
    this.toastr.error("Deleted Successfully","Payment detail deleted sucessfully");
      
    },err=>{console.log(err)})
  }    
  }
}
