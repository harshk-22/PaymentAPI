import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styles: [
  ]
})
export class PaymentDetailFormComponent implements OnInit {

  constructor(public service:PaymentDetailService,private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    //Based on id value we can decide it is an update or insert
    // this.service.postPaymentDetail().subscribe(
    //   res=>{
    //     this.resetForm(form);
    //     this.toastr.success('Submitted successfully','Payment Detail Register')
    //   },
    //   err=>{console.log(err)}
    // );
    if(this.service.formData.paymentDetailId==0)
    this.insertRecord(form);
    else
    this.updateRecord(form);

  }
  insertRecord(form:NgForm){
    this.service.postPaymentDetail().subscribe(
      res=>{
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Submitted successfully','Payment Detail Register')
      },
      err=>{console.log(err)}
    );
  }

  updateRecord(form:NgForm){
    this.service.updateRecord().subscribe(
      res=>{
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info('updated successfully','Payment Detail Register')
      },
      err=>{console.log(err)}
    );
  }
  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData=new PaymentDetail();
  }


}
