$(document).ready(() => {
    $.get('/category/list', data => {
      data.categoryList.forEach(element => $('#dropdownItems').append("<a class='dropdown-item' href='/category/" + element.id + " ' title='" + element.description + "'>" + element.name + '</a>'))
    })
    $.get('/user/status', data => {
      if (data.user) {
        $.get('/cart/info', data => {
          $('#navbar-cart-amount').text(data.cartInfo.totalItems)
          $('#navbar-cart-amount::after').text('items in')
          if (data.cartInfo.totalCost > 0) {
            $('#cart_info').html(`<i class="fas fa-dollar-sign px-0">${data.cartInfo.totalCost}</i> `)
          }
        })
      }
    })
    $('#login_btn').on('click', (event) => {
      event.preventDefault()
      const loginCheck = {
        username: $('#username-login').val().trim(),
        password: $('#user-password').val().trim()
      }
      $.post('/api/account/login', loginCheck)
        .then(res => {
          if (res === 'success') {
            $(location).attr('href', '/')
          } else {
            $('#login_error').removeClass('invisible')
            $('#login_error').text(res)
          }
        })
    })
    $('.add-item').on('click', function (event) {
      event.preventDefault()
      const addItem = {
        num: 1,
        each_price: $(this).data('price'),
        productId: $(this).data('id')
      }
      $.ajax('/api/cart', {
        type: 'POST',
        data: addItem
      }).then(res => {
        if (res === 'created' || res === 'updated') {
          location.reload()
        } else {
          $(location).attr('href', '/')
        }
      })
    })
    $('.delete-item').on('click', function (event) {
      event.preventDefault()
      const deleteItem = {
        id: $(this).attr('data-itemid')
      }
      $.ajax('/api/cart', {
        type: 'DELETE',
        data: deleteItem
      }).then(res => {
        if (res === 'success') {
          $(location).attr('href', '/cart')
        } else {
          $(location).attr('href', '/cart')
        }
      })
    })
    $('.update-quantity').on('click', function (event) {
      event.preventDefault()
      const numberInput = $(this).parent().siblings()
      const newQuantity = Number(numberInput.val())
      if (newQuantity >= 1) {
        $.ajax('/api/cart', {
          type: 'PUT',
          data: {
            num: newQuantity,
            id: numberInput.attr('data-itemid')
          }
        }).then(res => {
          if (res === 'success') {
            $(location).attr('href', '/cart')
          } else {
            $(location).attr('href', '/')
          }
        })
      }
    })
    
    $('#payment-button').on('click', (event) => {
      event.preventDefault()
      const total = $('#display-payment-button').attr('data-totalcost')
  
      const orderTotal = {
        order_total: total
      }
      $.post('/api/cart/submitted', orderTotal).then((res) => {
        $(location).attr('href', '/account/orders/' + res.orderId)// '/account/orders/'+res.orderId
      })
    })
    
    $('#navbar-search-btn').on('click', event => {
      event.preventDefault()
      const search = $('#navbar-search-input').val()
      $(location).attr('href', '/search/' + search)
    })
  })
  