import React from 'react'
import toastr from 'toastr'

const CheckoutSuccess = () => {
  toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    progressBar: false,
    positionClass: 'toast-top-center',
    preventDuplicates: false,
    onclick: null,
    showDuration: '300',
    hideDuration: '1000',
    timeOut: '5000',
    extendedTimeOut: '1000',
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut'
  }
  toastr.info(
    'Your payment successfully went through and your order is on its way!',
    'Thank You'
  )

  return <div />
}

export default CheckoutSuccess
