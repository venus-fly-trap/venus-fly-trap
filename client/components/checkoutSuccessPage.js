import React from 'react'
import toastr from 'toastr'

const CheckoutSuccess = props => {
  toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    progressBar: false,
    positionClass: 'toast-bottom-left',
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
  toastr.success(
    'Your payment successfully went through and your order is on its way!',
    'Thank You'
  )
  props.history.push('/')
  return <div />
}

export default CheckoutSuccess
