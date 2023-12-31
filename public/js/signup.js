/* eslint-env jquery, browser */
$(document).ready(() => {
    // Form submission JS. Served only on the create account page
    $('#create-new-account').on('click', event => {
      event.preventDefault()
      const errorArray = []
      let errors = false
      if (!$('#username-create').val().trim().match(/^[a-zA-Z0-9 _-]{6,15}$/)) {
        errors = true
        errorArray.push("'Username' field must be from 6 to 15 characters with no special characters!")
      }
      if (!$('#password-create').val().trim().match(/^[a-zA-Z0-9 _-]{6,15}$/)) {
        errors = true
        errorArray.push("'Password' field must be from 6 to 15 characters with no special characters!")
      }
      if (!$('#email-create').val().trim().match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        errors = true
        errorArray.push("'Email' field was blank or not in the proper format!")
      }
      if ($('#password-create').val().trim() !== $('#password-create-verify').val().trim()) {
        errors = true
        errorArray.push("'Password' and 'Verify Password' fields don't match!")
      }
      if (errors) {
        $('#signup_error').removeClass('invisible')
        $('#signup_error').html(errorArray.join('<br />'))
      } else {
        const newUser = {
          username: $('#username-create').val().trim(),
          password: $('#password-create').val().trim(),
          email: $('#email-create').val().trim()
        }
  
        $.ajax('/api/account/signup', {
          type: 'POST',
          data: newUser
        }).then(res => {
          if (res === 'success') {
            $(location).attr('href', '/login')
          } else {
            $('#signup_error').removeClass('invisible')
            $('#signup_error').text('Sorry, that username is already taken!')
          }
        })
      }
    })
  })
  